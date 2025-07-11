const quizForm = document.getElementById("quizForm");
const startButton = document.getElementById("startButton");
const endAttemptButton = document.getElementById("endAttemptButton");
const timerDisplay = document.getElementById("timer");
const resultModal = document.getElementById("resultModal");
const correctAnswersSpan = document.getElementById("correctAnswers");
const incorrectAnswersSpan = document.getElementById("incorrectAnswers");
const totalScoreSpan = document.getElementById("totalScore");
const previousAttemptResultDiv = document.getElementById(
  "previousAttemptResult"
);
const prevScoreSpan = document.getElementById("prevScore");
const finalScoreSummaryDiv = document.getElementById("finalScoreSummary");
const finalScoreValueSpan = document.getElementById("finalScoreValue");
const retryButton = document.getElementById("retryButton");
const finishEvaluationButton = document.getElementById(
  "finishEvaluationButton"
); // Este será el botón para "Cerrar" / "Terminar Evaluación"
const noMoreAttemptsMessage = document.getElementById("noMoreAttemptsMessage");
const attemptsInfo = document.getElementById("attemptsInfo");
const closeButton = document.querySelector(".close-button"); // La "X" del modal

let timerInterval;
const MAX_TIME = 600; // 10 minutos en segundos
const MAX_ATTEMPTS = 2;
const MAX_TOTAL_SCORE = 100; // 20 preguntas * 5 puntos/pregunta

let timeLeft = MAX_TIME;
let attemptsLeft = MAX_ATTEMPTS;
let currentAttemptScore = 0;
let bestScore = 0;

const correctAnswers = {
  q1: "A",
  q2: "C",
  q3: "C",
  q4: "D",
  q5: "A",
  q6: "B",
  q7: "C", // Capital de Francia: París
  q8: "B", // Planeta Rojo: Marte
  q9: "C", // Océano más grande: Pacífico
  q10: "B", // Don Quijote: Miguel de Cervantes
  q11: "C", // Continentes: 7 (Asia, África, América del Norte, América del Sur, Antártida, Europa, Australia)
  q12: "B", // Elemento más abundante en la corteza terrestre: Oxígeno
  q13: "B", // Hombre en la luna: 1969
  q14: "A", // Río más largo: Amazonas (aunque a veces se disputa con el Nilo, la tendencia es Amazonas)
  q15: "C", // Mona Lisa: Leonardo da Vinci
  q16: "C", // País más grande: Rusia
  q17: "B", // Animal más rápido: Guepardo (en tierra), Halcón Peregrino (en vuelo) - ajusta si necesitas uno específico. Basándonos en las opciones, Guepardo es el más rápido en tierra.
  q18: "B", // Huesos adulto: 206
  q19: "B", // Montaña más alta: Monte Everest
  q20: "C", // Gas que respiramos: Oxígeno
};

// Cargar estado desde localStorage al iniciar
function loadState() {
  const storedBestScore = localStorage.getItem("quizBestScore");

  // SIEMPRE reiniciar los intentos a MAX_ATTEMPTS al cargar la página de la evaluación.
  // Esto asegura que cada vez que se abre la evaluación, se pueda intentar.
  attemptsLeft = MAX_ATTEMPTS;

  if (storedBestScore !== null) {
    bestScore = parseInt(storedBestScore);
  }

  updateAttemptsInfo(); // Actualiza el mensaje de "Intentos restantes"
  displayBestScore(); // Muestra el mejor puntaje almacenado

  // Asegurar que el botón de inicio sea visible y el formulario oculto al cargar,
  // ya que los intentos se reinician.
  startButton.style.display = "block";
  quizForm.style.display = "none";
  noMoreAttemptsMessage.style.display = "none"; // Ocultar el mensaje de intentos agotados
}

// Guardar estado en localStorage
function saveState() {
  localStorage.setItem("quizAttempts", attemptsLeft);
  localStorage.setItem("quizBestScore", bestScore);
}

// Actualizar información de intentos restantes
function updateAttemptsInfo() {
  attemptsInfo.textContent = `Intentos restantes: ${attemptsLeft}`;
  if (attemptsLeft <= 0) {
    noMoreAttemptsMessage.style.display = "block";
    startButton.style.display = "none";
    quizForm.style.display = "none";
    endAttemptButton.style.display = "none";
  } else {
    noMoreAttemptsMessage.style.display = "none";
  }
}

// Mostrar el mejor puntaje almacenado
function displayBestScore() {
  const bestScoreFromStorage = localStorage.getItem("quizBestScore");
  if (bestScoreFromStorage !== null) {
    finalScoreSummaryDiv.style.display = "block";
    finalScoreValueSpan.textContent = `${bestScoreFromStorage}/${MAX_TOTAL_SCORE}`;
    previousAttemptResultDiv.style.display = "none";
  } else {
    finalScoreSummaryDiv.style.display = "none";
    previousAttemptResultDiv.style.display = "none";
  }
}

// Reiniciar el quiz (para un nuevo intento)
function resetQuiz() {
  clearInterval(timerInterval);
  timeLeft = MAX_TIME;
  timerDisplay.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;
  quizForm.reset();
  quizForm.style.display = "block";
  startButton.style.display = "none";
  endAttemptButton.style.display = "block";
  resultModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Manejar el inicio de la evaluación
startButton.addEventListener("click", () => {
  if (attemptsLeft > 0) {
    resetQuiz();
    startTimer();
    attemptsLeft--;
    updateAttemptsInfo();
    saveState();
  } else {
    alert("Has agotado todos tus intentos.");
    // Redirigir a la ruta RELATIVA
    window.location.href = "estrategias/estrategias.html";
  }
});

// Manejar el envío del formulario (o terminar intento)
endAttemptButton.addEventListener("click", () => {
  evaluateQuiz();
  clearInterval(timerInterval);
});

// Lógica del temporizador
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("¡Tiempo agotado!");
      evaluateQuiz();
    }
  }, 1000);
}

// Formatear tiempo a MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Evaluar las respuestas del quiz
function evaluateQuiz() {
  let correctCount = 0;
  const formData = new FormData(quizForm);

  for (let i = 1; i <= 20; i++) {
    const questionName = `q${i}`;
    const userAnswer = formData.get(questionName);
    const correctAnswer = correctAnswers[questionName];

    if (userAnswer === correctAnswer) {
      correctCount++;
    }
  }

  const incorrectCount = 20 - correctCount;
  currentAttemptScore = correctCount * 5;

  displayResults(correctCount, incorrectCount, currentAttemptScore);
}

// Mostrar los resultados en el modal
function displayResults(correctCount, incorrectCount, score) {
  correctAnswersSpan.textContent = correctCount;
  incorrectAnswersSpan.textContent = incorrectCount;
  totalScoreSpan.textContent = `${score}/${MAX_TOTAL_SCORE}`;

  if (score > bestScore) {
    bestScore = score;
    saveState();
  }

  quizForm.style.display = "none";
  endAttemptButton.style.display = "none";

  finalScoreSummaryDiv.style.display = "block";
  finalScoreValueSpan.textContent = `${bestScore}/${MAX_TOTAL_SCORE}`;

  if (attemptsLeft > 0) {
    retryButton.style.display = "block";
    finishEvaluationButton.style.display = "block";
    finishEvaluationButton.textContent = "Terminar Evaluación";
    noMoreAttemptsMessage.style.display = "none";
    previousAttemptResultDiv.style.display = "none";
  } else {
    retryButton.style.display = "none";
    finishEvaluationButton.style.display = "block";
    finishEvaluationButton.textContent = "Cerrar Evaluación";
    noMoreAttemptsMessage.style.display = "block";
  }

  resultModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Manejar botón de Reintentar
retryButton.addEventListener("click", () => {
  resetQuiz();
  resultModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Manejar botón de Terminar Evaluación / Cerrar Evaluación
finishEvaluationButton.addEventListener("click", () => {
  localStorage.removeItem("quizAttempts");
  localStorage.removeItem("quizBestScore");

  // Redirigir a la ruta RELATIVA, ya que window.close() no es confiable.
  window.location.href = "estrategias/estrategias.html";
});

// Cerrar modal con la "X"
closeButton.addEventListener("click", () => {
  resultModal.style.display = "none";
  document.body.style.overflow = "auto";

  // Si no quedan intentos, la "X" también debería redirigir a la página de estrategias
  if (attemptsLeft <= 0) {
    localStorage.removeItem("quizAttempts");
    localStorage.removeItem("quizBestScore");
    // Redirigir a la ruta RELATIVA, ya que window.close() no es confiable.
    window.location.href = "estrategias/estrategias.html";
  } else {
    startButton.style.display = "block";
    quizForm.style.display = "none";
  }
});

// Inicializar al cargar la página
window.onload = loadState;
