// Bloco simples de testemunhos — sem carrossel, só um ou dois testemunhos fortes
// (ver src/data/testimonials.js).

import { testimonials } from '../data/testimonials.js';
import { getLang, onLangChange } from '../i18n.js';

export function initTestimonials() {
  const root = document.getElementById('testimonials-root');
  if (!root) return;

  function render() {
    const lang = getLang();
    root.innerHTML = testimonials
      .map(
        (item) => `
        <blockquote class="testimonial-block">
          <p class="testimonial-block__quote">&ldquo;${item.quote[lang]}&rdquo;</p>
          <footer class="testimonial-block__author">${item.author} — ${item.detail[lang]}</footer>
        </blockquote>`
      )
      .join('');
  }

  render();
  onLangChange(render);
}
