// Fade-in subtil ao entrar no ecrã (respeita prefers-reduced-motion via CSS).

let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  return observer;
}

// Módulos que regeneram HTML com `data-reveal` próprio (ex.: featuredGalleries.js
// ao trocar de idioma) precisam de voltar a observar os elementos novos — o
// initReveal() original só corre uma vez, no arranque, e não vê nós recriados
// depois. observe() num alvo já observado não faz nada de mal (é idempotente).
export function observeReveal(root = document) {
  root.querySelectorAll('[data-reveal]').forEach((target) => getObserver().observe(target));
}

export function initReveal() {
  observeReveal(document);
}
