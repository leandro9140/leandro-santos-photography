import { featured } from '../data/featured.js';
import { portfolio } from '../data/portfolio.js';
import { t, onLangChange } from '../i18n.js';

export function initFeaturedGalleries() {
  const root = document.getElementById('featured-root');
  if (!root) return;

  function render() {
    root.innerHTML = featured
      .map((item) => {
        const wedding = portfolio.find((w) => w.id === item.weddingId);
        if (!wedding) return '';

        return `
        <article class="featured-item" data-reveal>
          <figure class="media-frame featured-item__media">
            <img src="${item.image}" alt="${item.alt}" loading="lazy" />
          </figure>
          <div class="featured-item__caption">
            <div>
              <h3 class="editorial-heading">
                <span class="editorial-heading__line editorial-heading__line--sm">${wedding.couple}</span>
              </h3>
              <p class="featured-item__meta">${wedding.location} — ${wedding.date}</p>
            </div>
            <a href="#portfolio" data-filter="${wedding.id}" class="featured-item__link">${t('featured.cta')}</a>
          </div>
        </article>`;
      })
      .join('');
  }

  render();
  onLangChange(render);
}
