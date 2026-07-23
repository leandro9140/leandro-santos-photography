import { portfolio } from '../data/portfolio.js';
import { initLightbox } from './lightbox.js';

function renderFilters(container, onFilter) {
  const buttons = [
    { id: 'all', label: 'Todos' },
    ...portfolio.map((w) => ({ id: w.id, label: w.couple })),
  ];

  container.innerHTML = buttons
    .map(
      (btn, i) => `
      <button
        class="gallery-filter${i === 0 ? ' is-active' : ''}"
        data-filter="${btn.id}"
        role="tab"
        aria-selected="${i === 0 ? 'true' : 'false'}"
      >${btn.label}</button>`
    )
    .join('');

  container.addEventListener('click', (event) => {
    const btn = event.target.closest('.gallery-filter');
    if (!btn) return;
    container.querySelectorAll('.gallery-filter').forEach((el) => {
      el.classList.toggle('is-active', el === btn);
      el.setAttribute('aria-selected', el === btn ? 'true' : 'false');
    });
    onFilter(btn.dataset.filter);
  });
}

function renderGallery(root, weddingId, lightbox) {
  const weddings = weddingId === 'all' ? portfolio : portfolio.filter((w) => w.id === weddingId);

  root.innerHTML = weddings
    .map(
      (wedding) => `
      <div class="wedding-group" data-wedding="${wedding.id}">
        ${
          weddingId === 'all'
            ? `<div class="wedding-heading">
                <h3 style="font-size: var(--fs-h3);">${wedding.couple}</h3>
                <span class="wedding-heading__meta">${wedding.location} — ${wedding.date}</span>
              </div>`
            : ''
        }
        <div class="gallery-grid" data-gallery="${wedding.id}">
          ${wedding.images
            .map(
              (img, i) => `
              <button class="gallery-item${i === 1 ? ' gallery-item--wide' : ''}" data-index="${i}" aria-label="Ver imagem: ${img.alt}">
                <figure class="media-frame">
                  <img src="${img.src}" alt="${img.alt}" loading="lazy" />
                </figure>
              </button>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('');

  root.querySelectorAll('.wedding-group').forEach((group) => {
    const id = group.dataset.wedding;
    const wedding = portfolio.find((w) => w.id === id);
    group.querySelectorAll('.gallery-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        const images = wedding.images.map((img) => ({ ...img, caption: `${wedding.couple} — ${wedding.location}` }));
        lightbox.open(images, index, btn);
      });
    });
  });
}

export function initGallery() {
  const filtersEl = document.getElementById('gallery-filters');
  const root = document.getElementById('gallery-root');
  if (!filtersEl || !root) return;

  const lightbox = initLightbox();

  renderFilters(filtersEl, (filter) => renderGallery(root, filter, lightbox));
  renderGallery(root, 'all', lightbox);
}
