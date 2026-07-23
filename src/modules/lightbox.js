// Lightbox acessível: navegação por teclado (Esc, ←, →), foco preso dentro do diálogo.

let images = [];
let currentIndex = 0;
let lastFocusedElement = null;

let elLightbox, elImage, elCaption, elClose, elPrev, elNext;

function render() {
  const item = images[currentIndex];
  elImage.src = item.src;
  elImage.alt = item.alt;
  elCaption.textContent = item.caption || item.alt;
}

function show(index) {
  currentIndex = (index + images.length) % images.length;
  render();
}

function close() {
  elLightbox.classList.remove('is-open');
  elLightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

function handleKeydown(event) {
  if (elLightbox.hidden) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowRight') show(currentIndex + 1);
  if (event.key === 'ArrowLeft') show(currentIndex - 1);
}

export function initLightbox() {
  elLightbox = document.getElementById('lightbox');
  elImage = document.getElementById('lightbox-image');
  elCaption = document.getElementById('lightbox-caption');
  elClose = document.getElementById('lightbox-close');
  elPrev = document.getElementById('lightbox-prev');
  elNext = document.getElementById('lightbox-next');

  elClose.addEventListener('click', close);
  elPrev.addEventListener('click', () => show(currentIndex - 1));
  elNext.addEventListener('click', () => show(currentIndex + 1));
  elLightbox.addEventListener('click', (event) => {
    if (event.target === elLightbox) close();
  });
  document.addEventListener('keydown', handleKeydown);

  return {
    open(imageList, index, triggerEl) {
      images = imageList;
      lastFocusedElement = triggerEl || document.activeElement;
      elLightbox.hidden = false;
      elLightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      show(index);
      elClose.focus();
    },
  };
}
