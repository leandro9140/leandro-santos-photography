// Slideshow do hero: alterna imagens/vídeos em full-screen, com crossfade.
// Imagens ficam 3 segundos cada; vídeos tocam até ao fim (sem loop) antes de
// avançar para o slide seguinte. Respeita prefers-reduced-motion (mostra só o
// primeiro slide, sem alternar, e não arranca vídeos automaticamente).

import { heroSlides } from '../data/heroSlides.js';

const IMAGE_DURATION_MS = 3000;

function renderSlide(slide, index) {
  const activeClass = index === 0 ? ' is-active' : '';

  if (slide.type === 'video') {
    return `
      <video
        class="hero__slide${activeClass}"
        src="${slide.src}"
        muted
        playsinline
        ${index === 0 ? 'autoplay' : ''}
        preload="${index === 0 ? 'auto' : 'none'}"
      ></video>`;
  }

  return `
    <img
      class="hero__slide${activeClass}"
      src="${slide.src}"
      alt="${slide.alt || ''}"
      loading="${index === 0 ? 'eager' : 'lazy'}"
      ${index === 0 ? 'fetchpriority="high"' : ''}
    />`;
}

export function initHeroSlideshow() {
  const root = document.getElementById('hero-media');
  if (!root || !heroSlides.length) return;

  root.innerHTML = heroSlides.map(renderSlide).join('');

  const slides = root.querySelectorAll('.hero__slide');
  if (!slides.length) return;

  const activate = (slide) => {
    if (slide.tagName === 'VIDEO') {
      slide.currentTime = 0;
      slide.play().catch(() => {});
    }
  };

  activate(slides[0]);

  if (slides.length < 2) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let current = 0;

  function scheduleAdvance(slide) {
    if (slide.tagName === 'VIDEO') {
      slide.addEventListener('ended', goToNext, { once: true });
    } else {
      setTimeout(goToNext, IMAGE_DURATION_MS);
    }
  }

  function goToNext() {
    const outgoing = slides[current];
    outgoing.classList.remove('is-active');
    if (outgoing.tagName === 'VIDEO') outgoing.pause();

    current = (current + 1) % slides.length;
    const incoming = slides[current];
    incoming.classList.add('is-active');
    activate(incoming);
    scheduleAdvance(incoming);
  }

  scheduleAdvance(slides[0]);
}
