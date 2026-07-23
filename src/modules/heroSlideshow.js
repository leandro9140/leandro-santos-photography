// Slideshow do hero: alterna imagens em full-screen a cada 3 segundos, com crossfade.
// Respeita prefers-reduced-motion (mostra só a primeira imagem, sem alternar).

import { heroSlides } from '../data/heroSlides.js';

const INTERVAL_MS = 3000;

export function initHeroSlideshow() {
  const root = document.getElementById('hero-media');
  if (!root || !heroSlides.length) return;

  root.innerHTML = heroSlides
    .map(
      (slide, i) => `
      <img
        class="hero__slide${i === 0 ? ' is-active' : ''}"
        src="${slide.src}"
        alt="${slide.alt}"
        loading="${i === 0 ? 'eager' : 'lazy'}"
        ${i === 0 ? 'fetchpriority="high"' : ''}
      />`
    )
    .join('');

  const slides = root.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, INTERVAL_MS);
}
