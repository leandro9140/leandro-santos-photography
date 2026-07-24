import { portfolio } from '../data/portfolio.js';
import { initLightbox } from './lightbox.js';
import { t, onLangChange } from '../i18n.js';

const PREVIEW_COUNT = 4;

function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function renderFilters(container, activeId, onFilter) {
  const buttons = [
    { id: 'all', label: t('gallery.all') },
    ...portfolio.map((w) => ({ id: w.id, label: w.couple })),
  ];

  container.innerHTML = buttons
    .map(
      (btn) => `
      <button
        class="gallery-filter${btn.id === activeId ? ' is-active' : ''}"
        data-filter="${btn.id}"
        role="tab"
        aria-selected="${btn.id === activeId ? 'true' : 'false'}"
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

function renderGallery(root, weddingId, lightbox, shuffledByWedding, expandedWeddings) {
  const weddings = weddingId === 'all' ? portfolio : portfolio.filter((w) => w.id === weddingId);

  root.innerHTML = weddings
    .map((wedding) => {
      const shuffled = shuffledByWedding.get(wedding.id);
      const expanded = expandedWeddings.has(wedding.id);
      const visible = expanded ? shuffled : shuffled.slice(0, PREVIEW_COUNT);
      const hasMore = shuffled.length > PREVIEW_COUNT;

      return `
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
          ${visible
            .map(
              (img, i) => `
              <button class="gallery-item${i === 1 ? ' gallery-item--wide' : ''}" data-index="${i}" aria-label="${t('gallery.view-image')}: ${img.alt}">
                <figure class="media-frame">
                  <img src="${img.src}" alt="${img.alt}" loading="lazy" />
                </figure>
              </button>`
            )
            .join('')}
        </div>
        ${!expanded && hasMore ? `<button class="gallery-more" data-wedding-more="${wedding.id}">${t('gallery.see-full')}</button>` : ''}
      </div>`;
    })
    .join('');

  root.querySelectorAll('.wedding-group').forEach((group) => {
    const id = group.dataset.wedding;
    const wedding = portfolio.find((w) => w.id === id);
    const shuffled = shuffledByWedding.get(id);
    const expanded = expandedWeddings.has(id);
    const visible = expanded ? shuffled : shuffled.slice(0, PREVIEW_COUNT);

    group.querySelectorAll('.gallery-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        const images = visible.map((img) => ({ ...img, caption: `${wedding.couple} — ${wedding.location}` }));
        lightbox.open(images, index, btn);
      });
    });
  });

  root.querySelectorAll('[data-wedding-more]').forEach((btn) => {
    btn.addEventListener('click', () => {
      expandedWeddings.add(btn.dataset.weddingMore);
      renderGallery(root, weddingId, lightbox, shuffledByWedding, expandedWeddings);
    });
  });
}

export function initGallery() {
  const filtersEl = document.getElementById('gallery-filters');
  const root = document.getElementById('gallery-root');
  if (!filtersEl || !root) return;

  const lightbox = initLightbox();
  const shuffledByWedding = new Map(portfolio.map((wedding) => [wedding.id, shuffle(wedding.images)]));
  const expandedWeddings = new Set();
  let activeFilter = 'all';

  const setFilter = (filter) => {
    activeFilter = filter;
    renderGallery(root, filter, lightbox, shuffledByWedding, expandedWeddings);
  };

  renderFilters(filtersEl, activeFilter, setFilter);
  renderGallery(root, activeFilter, lightbox, shuffledByWedding, expandedWeddings);

  onLangChange(() => {
    renderFilters(filtersEl, activeFilter, setFilter);
    renderGallery(root, activeFilter, lightbox, shuffledByWedding, expandedWeddings);
  });
}
