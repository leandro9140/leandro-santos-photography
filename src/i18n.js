// Internacionalização (PT/EN) — troca de idioma sem sair da página.
//
// A marcação em index.html vem sempre em português (é o conteúdo "de origem",
// visto por motores de busca e por quem tem JS desligado). Este módulo aplica
// as traduções por cima, via atributos `data-i18n*`:
//   data-i18n="chave"            -> define textContent
//   data-i18n-html="chave"       -> define innerHTML (para títulos com <em>/<span>)
//   data-i18n-placeholder="chave"-> define o atributo placeholder
//   data-i18n-aria-label="chave" -> define o atributo aria-label
//
// Módulos que geram HTML a partir de src/data/*.js (categoryTiles, gallery,
// featuredGalleries, testimonials) importam `t`/`getLang` e voltam a
// renderizar-se quando ouvem o evento `site:langchange` (ver bottom deste ficheiro).

const STORAGE_KEY = 'site-lang';
const LANGCHANGE_EVENT = 'site:langchange';

const dict = {
  pt: {
    'skip-link': 'Saltar para o conteúdo',
    'nav.open-menu': 'Abrir menu',
    'nav.close-menu': 'Fechar menu',
    'menu.nav-label': 'Navegação completa',
    'menu.sobre': 'Sobre',
    'menu.portfolio': 'Portefólio',
    'menu.testemunhos': 'Testemunhos',
    'menu.contacto': 'Contacto',
    'menu.lang-label': 'Idioma',

    'hero.title': 'Leandro Santos Photography — Fotografia de casamentos no Porto',

    'about.eyebrow': 'Sobre',
    'about.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Menos pose.</span><span class="editorial-heading__line editorial-heading__line--lg">Mais <em>verdade</em>.</span>',
    'about.lead': 'Sete anos a fotografar o que acontece, não o que se encena. É esse o princípio que trago para o dia do teu casamento.',

    'categorias.eyebrow': 'Portefólio',
    'categorias.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">O que</span><span class="editorial-heading__line editorial-heading__line--lg">fotografo</span>',
    'category.cta': 'Ver Portefólio',

    'destaques.eyebrow': 'Casamentos em destaque',
    'destaques.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Histórias reais,</span><span class="editorial-heading__line editorial-heading__line--lg">contadas <em>com</em> tempo</span>',
    'featured.cta': 'Ver galeria completa',

    'portfolio.eyebrow': 'Portefólio completo',
    'portfolio.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Todos os</span><span class="editorial-heading__line editorial-heading__line--lg">casamentos</span>',
    'portfolio.lead': 'Uma seleção de histórias documentadas nos últimos meses, do Porto ao Douro.',
    'portfolio.filters-label': 'Filtrar por casamento',
    'gallery.all': 'Todos',
    'gallery.see-full': 'Ver portefólio completo',
    'gallery.view-image': 'Ver imagem',

    'lightbox.label': 'Visualizador de imagem',
    'lightbox.close': 'Fechar',
    'lightbox.prev': 'Imagem anterior',
    'lightbox.next': 'Imagem seguinte',

    'testemunhos.eyebrow': 'Testemunhos',
    'testemunhos.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">O que dizem</span><span class="editorial-heading__line editorial-heading__line--lg">os casais</span>',

    'cta.heading-html': '<span class="editorial-heading__line editorial-heading__line--md">Um dia.</span><span class="editorial-heading__line editorial-heading__line--lg">Histórias <em>para</em> sempre.</span>',
    'cta.button': 'Contactar',

    'contacto.eyebrow': 'Contacto',
    'contacto.heading-html': '<span class="editorial-heading__line editorial-heading__line--xs">Vamos falar sobre</span><span class="editorial-heading__line editorial-heading__line--md">o vosso casamento</span>',
    'contacto.lead': 'Respondo a todos os pedidos em até 48 horas. Contem-me a vossa data e o local — o resto tratamos juntos.',
    'contacto.email-label': 'E-mail',
    'contacto.location-label': 'Localização',
    'contacto.location-value': 'Porto, Portugal — disponível para todo o país e destination weddings',

    'form.name-label': 'Nome do casal *',
    'form.email-label': 'E-mail *',
    'form.phone-label': 'Telefone (opcional)',
    'form.date-label': 'Data do casamento',
    'form.venue-label': 'Local do casamento (opcional)',
    'form.venue-placeholder': 'Ex.: Quinta, Porto',
    'form.message-label': 'Mensagem',
    'form.message-placeholder': 'Contem-nos um pouco sobre o vosso dia...',
    'form.submit': 'Enviar pedido',
    'form.error.name': 'Por favor, indica o vosso nome.',
    'form.error.email-required': 'Por favor, indica um e-mail.',
    'form.error.email-invalid': 'Introduz um e-mail válido.',
    'form.status.sending': 'A enviar...',
    'form.status.success': 'Mensagem enviada! Entraremos em contacto em breve.',
    'form.status.error-api': 'Não foi possível enviar a mensagem. Tenta novamente ou escreve para o e-mail no rodapé.',
    'form.status.error-network': 'Erro de ligação. Verifica a tua internet e tenta novamente.',
    'form.status.not-configured': 'O formulário ainda não está configurado (falta a chave do Web3Forms). Ver README.md.',

    'footer.copyright-suffix': 'Leandro Santos Photography. Todos os direitos reservados.',
    'footer.email': 'E-mail',
  },
  en: {
    'skip-link': 'Skip to content',
    'nav.open-menu': 'Open menu',
    'nav.close-menu': 'Close menu',
    'menu.nav-label': 'Full navigation',
    'menu.sobre': 'About',
    'menu.portfolio': 'Portfolio',
    'menu.testemunhos': 'Testimonials',
    'menu.contacto': 'Contact',
    'menu.lang-label': 'Language',

    'hero.title': 'Leandro Santos Photography — Wedding Photography in Porto',

    'about.eyebrow': 'About',
    'about.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Less posing.</span><span class="editorial-heading__line editorial-heading__line--lg">More <em>truth</em>.</span>',
    'about.lead': 'Seven years photographing what happens, not what’s staged. That’s the principle I bring to your wedding day.',

    'categorias.eyebrow': 'Portfolio',
    'categorias.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">What I</span><span class="editorial-heading__line editorial-heading__line--lg">photograph</span>',
    'category.cta': 'View Portfolio',

    'destaques.eyebrow': 'Featured weddings',
    'destaques.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Real stories,</span><span class="editorial-heading__line editorial-heading__line--lg">told <em>with</em> time</span>',
    'featured.cta': 'View full gallery',

    'portfolio.eyebrow': 'Full portfolio',
    'portfolio.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">Every</span><span class="editorial-heading__line editorial-heading__line--lg">wedding</span>',
    'portfolio.lead': 'A selection of stories documented over the past months, from Porto to the Douro.',
    'portfolio.filters-label': 'Filter by wedding',
    'gallery.all': 'All',
    'gallery.see-full': 'View full portfolio',
    'gallery.view-image': 'View image',

    'lightbox.label': 'Image viewer',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous image',
    'lightbox.next': 'Next image',

    'testemunhos.eyebrow': 'Testimonials',
    'testemunhos.heading-html': '<span class="editorial-heading__line editorial-heading__line--sm">What couples</span><span class="editorial-heading__line editorial-heading__line--lg">are saying</span>',

    'cta.heading-html': '<span class="editorial-heading__line editorial-heading__line--md">One day.</span><span class="editorial-heading__line editorial-heading__line--lg">Stories <em>for</em>ever.</span>',
    'cta.button': 'Get in touch',

    'contacto.eyebrow': 'Contact',
    'contacto.heading-html': '<span class="editorial-heading__line editorial-heading__line--xs">Let’s talk about</span><span class="editorial-heading__line editorial-heading__line--md">your wedding</span>',
    'contacto.lead': 'I reply to every inquiry within 48 hours. Tell me your date and venue — we’ll figure out the rest together.',
    'contacto.email-label': 'Email',
    'contacto.location-label': 'Location',
    'contacto.location-value': 'Porto, Portugal — available nationwide and for destination weddings',

    'form.name-label': 'Couple’s name *',
    'form.email-label': 'Email *',
    'form.phone-label': 'Phone (optional)',
    'form.date-label': 'Wedding date',
    'form.venue-label': 'Wedding venue (optional)',
    'form.venue-placeholder': 'E.g.: Quinta, Porto',
    'form.message-label': 'Message',
    'form.message-placeholder': 'Tell us a bit about your day...',
    'form.submit': 'Send inquiry',
    'form.error.name': 'Please enter your names.',
    'form.error.email-required': 'Please enter an email address.',
    'form.error.email-invalid': 'Enter a valid email address.',
    'form.status.sending': 'Sending...',
    'form.status.success': 'Message sent! We’ll get back to you shortly.',
    'form.status.error-api': 'Could not send the message. Try again or email us directly (see footer).',
    'form.status.error-network': 'Connection error. Check your internet and try again.',
    'form.status.not-configured': 'The form isn’t configured yet (missing Web3Forms key). See README.md.',

    'footer.copyright-suffix': 'Leandro Santos Photography. All rights reserved.',
    'footer.email': 'Email',
  },
};

function currentLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'pt';
}

export function getLang() {
  return currentLang();
}

export function t(key) {
  const lang = currentLang();
  return dict[lang][key] ?? dict.pt[key] ?? key;
}

function applyTranslations() {
  const lang = currentLang();
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });

  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.langOption === lang);
  });
}

export function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang === 'en' ? 'en' : 'pt');
  applyTranslations();
  window.dispatchEvent(new CustomEvent(LANGCHANGE_EVENT));
}

export function onLangChange(callback) {
  window.addEventListener(LANGCHANGE_EVENT, callback);
}

export function initI18n() {
  applyTranslations();

  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langOption));
  });
}
