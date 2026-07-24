import { categories } from '../data/categories.js';
import { t, getLang, onLangChange } from '../i18n.js';

export function initCategoryTiles() {
  const root = document.getElementById('category-tiles-root');
  if (!root) return;

  function render() {
    const lang = getLang();
    root.innerHTML = categories
      .map(
        (category) => `
        <a class="category-tile" href="${category.href}">
          <figure class="media-frame category-tile__media">
            <img src="${category.image}" alt="${category.alt[lang]}" loading="lazy" />
          </figure>
          <div class="category-tile__caption">
            <h3 class="category-tile__title">${category.title[lang]}</h3>
            <p class="category-tile__desc">${category.description[lang]}</p>
            <span class="category-tile__label">${t('category.cta')}</span>
          </div>
        </a>`
      )
      .join('');
  }

  render();
  onLangChange(render);
}
