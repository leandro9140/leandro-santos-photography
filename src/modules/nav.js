// Navegação: fundo sólido ao fazer scroll, overlay de menu full-screen, scrollspy simples.
//
// Estado "invertido" (texto/ícones escuros + logótipo preto): ativo quando a nav está
// scrollada OU quando o overlay do menu está aberto — em ambos os casos a nav deixa de
// estar sobre a foto escura do hero e passa a estar sobre um fundo claro (a barra sólida
// ou o próprio overlay), por isso precisa da versão escura do logótipo/ícones.

export function initNav() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('menu-overlay');
  const logo = document.getElementById('nav-logo');

  if (!nav) return;

  let overlayOpen = false;

  const updateChrome = () => {
    const scrolled = window.scrollY > 40;
    const inverted = scrolled || overlayOpen;
    nav.classList.toggle('is-scrolled', scrolled);
    nav.classList.toggle('is-inverted', inverted);
    if (logo) {
      logo.src = inverted ? logo.dataset.srcDark : logo.dataset.srcLight;
    }
  };

  updateChrome();
  window.addEventListener('scroll', updateChrome, { passive: true });

  if (toggle && overlay) {
    const closeMenu = () => {
      overlayOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      updateChrome();
    };

    toggle.addEventListener('click', () => {
      overlayOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(overlayOpen));
      overlay.classList.toggle('is-open', overlayOpen);
      document.body.style.overflow = overlayOpen ? 'hidden' : '';
      updateChrome();
    });

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }
}
