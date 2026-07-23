// Smooth scroll com Lenis — respeita prefers-reduced-motion (Lenis não é inicializado
// nesse caso, o scroll fica ao comportamento nativo do browser).
//
// A ligação aos links âncora usa DELEGAÇÃO DE EVENTOS (um único listener em `document`)
// em vez de listeners por elemento, porque secções como "Casamentos em destaque" e as
// categorias de portefólio injetam os seus links `<a href="#...">` via JS depois deste
// módulo arrancar — um querySelectorAll feito só uma vez no início não os apanharia.

import Lenis from 'lenis';

const NAV_OFFSET = -88; // compensa a altura do header fixo ao saltar para uma secção

let lenis = null;

function onDocumentClick(event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute('href');
  if (!hash || hash.length < 2) return;

  const target = document.querySelector(hash);
  if (!target) return;

  // Links como o de "Ver galeria completa" trazem data-filter com o id do casamento —
  // ativa esse filtro na grelha do portefólio antes (ou independentemente) do scroll.
  if (link.dataset.filter) {
    document.querySelector(`.gallery-filter[data-filter="${link.dataset.filter}"]`)?.click();
  }

  if (!lenis) return; // prefers-reduced-motion: deixa o browser fazer o salto nativo
  event.preventDefault();
  lenis.scrollTo(target, { offset: NAV_OFFSET });
}

export function initSmoothScroll() {
  document.addEventListener('click', onDocumentClick);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}
