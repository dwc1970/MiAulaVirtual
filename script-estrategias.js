document.addEventListener("DOMContentLoaded", () => {
  // --- Get all modal elements ---
  const loginModal = document.getElementById("login-modal");
  const moduloAModal = document.getElementById("modulo-a-content-modal");
  const moduloBModal = document.getElementById("modulo-b-content-modal");
  const moduloCModal = document.getElementById("modulo-c-content-modal");
  const evaluacionModal = document.getElementById("evaluacion-content-modal");
  const ciudadaniaDigitalModal = document.getElementById(
    "ciudadania-digital-content-modal"
  );
  const pedagogiaAumentadaModal = document.getElementById(
    "pedagogia-aumentada-content-modal"
  );

  // --- Get all close buttons ---
  // Note: The close button for loginModal is still selected using querySelector,
  // assuming it's the first .close-button without a specific ID.
  const closeLoginModalButton = loginModal
    ? loginModal.querySelector(".close-button")
    : null;

  const closeModuloAModalButton = document.getElementById(
    "close-modulo-a-modal"
  );
  const closeModuloBModalButton = document.getElementById(
    "close-modulo-b-modal"
  );
  const closeModuloCModalButton = document.getElementById(
    "close-modulo-c-modal"
  );
  const closeEvaluacionModalButton = document.getElementById(
    "close-evaluacion-modal"
  );
  const closeCiudadaniaDigitalModalButton = document.getElementById(
    "close-ciudadania-digital-modal"
  );
  const closePedagogiaAumentadaModalButton = document.getElementById(
    "close-pedagogia-aumentada-modal"
  );

  // --- Helper functions for opening and closing modals ---
  function openModal(modalElement) {
    if (modalElement) {
      modalElement.style.display = "flex"; // Use flex for centering, if your CSS supports it
    }
  }

  function closeModal(modalElement) {
    if (modalElement) {
      modalElement.style.display = "none";
    }
  }

  // --- Event Listeners for Opening Modals ---

  // Login Modal
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(loginModal);
    });
  }

  // "Ver Detalle" buttons for all modules
  const courseButtons = document.querySelectorAll(".course-button");
  courseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "open-modulo-a-btn") {
        openModal(moduloAModal);
      } else if (button.id === "open-modulo-b-btn") {
        openModal(moduloBModal);
      } else if (button.id === "open-modulo-c-btn") {
        openModal(moduloCModal);
      } else if (button.id === "open-evaluacion-btn") {
        openModal(evaluacionModal);
      } else if (button.id === "open-ciudadania-digital-btn") {
        openModal(ciudadaniaDigitalModal);
      } else if (button.id === "open-pedagogia-aumentada-btn") {
        openModal(pedagogiaAumentadaModal);
      }
      // Add more conditions here for other modules as needed
    });
  });

  // --- Event Listeners for Closing Modals (using their specific close buttons) ---

  if (closeLoginModalButton) {
    closeLoginModalButton.addEventListener("click", () =>
      closeModal(loginModal)
    );
  }
  if (closeModuloAModalButton) {
    closeModuloAModalButton.addEventListener("click", () =>
      closeModal(moduloAModal)
    );
  }
  if (closeModuloBModalButton) {
    closeModuloBModalButton.addEventListener("click", () =>
      closeModal(moduloBModal)
    );
  }
  if (closeModuloCModalButton) {
    closeModuloCModalButton.addEventListener("click", () =>
      closeModal(moduloCModal)
    );
  }
  if (closeEvaluacionModalButton) {
    closeEvaluacionModalButton.addEventListener("click", () =>
      closeModal(evaluacionModal)
    );
  }
  if (closeCiudadaniaDigitalModalButton) {
    closeCiudadaniaDigitalModalButton.addEventListener("click", () =>
      closeModal(ciudadaniaDigitalModal)
    );
  }
  if (closePedagogiaAumentadaModalButton) {
    closePedagogiaAumentadaModalButton.addEventListener("click", () =>
      closeModal(pedagogiaAumentadaModal)
    );
  }

  // --- Close any open modal if user clicks outside of the modal content ---
  window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      closeModal(loginModal);
    }
    if (event.target === moduloAModal) {
      closeModal(moduloAModal);
    }
    if (event.target === moduloBModal) {
      closeModal(moduloBModal);
    }
    if (event.target === moduloCModal) {
      closeModal(moduloCModal);
    }
    if (event.target === evaluacionModal) {
      closeModal(evaluacionModal);
    }
    if (event.target === ciudadaniaDigitalModal) {
      closeModal(ciudadaniaDigitalModal);
    }
    if (event.target === pedagogiaAumentadaModal) {
      closeModal(pedagogiaAumentadaModal);
    }
  });

  // --- Other existing functionalities (kept as is) ---

  // Funcionalidad de "Explorar Estrategias" (simulación)
  const exploreCoursesBtn = document.getElementById("explore-courses");
  if (exploreCoursesBtn) {
    exploreCoursesBtn.addEventListener("click", () => {
      alert(
        "¡Explorando nuestras estrategias y metodologías! (En un aula virtual real, esto te llevaría a la página de cursos)"
      );
    });
  }

  // Simulación de navegación (para los enlaces del menú)
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    // Evitamos el botón de inicio de sesión, ya que tiene su propia función
    if (link.id !== "login-btn") {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        const linkText = e.target.textContent;
        alert(
          `Navegando a: ${linkText}. (Esto es una simulación de navegación)`
        );
      });
    }
  });

  // Removed "Funcionalidad de Carga de Archivos (Simulada)" as it wasn't connected to the HTML provided.
  // If you need it, please add the relevant HTML elements for it.
});
