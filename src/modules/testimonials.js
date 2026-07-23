// Bloco simples de testemunhos — sem carrossel, só um ou dois testemunhos fortes
// (ver src/data/testimonials.js).

import { testimonials } from '../data/testimonials.js';

export function initTestimonials() {
  const root = document.getElementById('testimonials-root');
  if (!root) return;

  root.innerHTML = testimonials
    .map(
      (t) => `
      <blockquote class="testimonial-block">
        <p class="testimonial-block__quote">&ldquo;${t.quote}&rdquo;</p>
        <footer class="testimonial-block__author">${t.author} — ${t.detail}</footer>
      </blockquote>`
    )
    .join('');
}
