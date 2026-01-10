document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-ready");

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
  if (revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    revealTargets.forEach((target, index) => {
      target.style.transitionDelay = `${Math.min(index * 80, 600)}ms`;
      observer.observe(target);
    });
  }

  const shuffleButton = document.querySelector("[data-shuffle]");
  const fleetGrid = document.querySelector("[data-fleet-grid]");

  if (shuffleButton && fleetGrid) {
    shuffleButton.addEventListener("click", () => {
      const cards = Array.from(fleetGrid.children);
      for (let i = cards.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      cards.forEach((card) => fleetGrid.appendChild(card));
    });
  }
});
