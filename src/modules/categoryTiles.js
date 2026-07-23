import { categories } from '../data/categories.js';

export function initCategoryTiles() {
  const root = document.getElementById('category-tiles-root');
  if (!root) return;

  root.innerHTML = categories
    .map(
      (category) => `
      <a class="category-tile" href="${category.href}">
        <figure class="category-tile__media">
          <img src="${category.image}" alt="${category.alt}" loading="lazy" />
        </figure>
        <div class="category-tile__content">
          <h3 class="category-tile__title">${category.title}</h3>
          <p class="category-tile__desc">${category.description}</p>
          <span class="category-tile__label">Ver Portefólio</span>
        </div>
      </a>`
    )
    .join('');
}
