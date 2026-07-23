import './style/main.css';

import { initSmoothScroll } from './modules/smoothScroll.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initHeroSlideshow } from './modules/heroSlideshow.js';
import { initGallery } from './modules/gallery.js';
import { initCategoryTiles } from './modules/categoryTiles.js';
import { initFeaturedGalleries } from './modules/featuredGalleries.js';
import { initTestimonials } from './modules/testimonials.js';
import { initContactForm } from './modules/contactForm.js';

document.getElementById('footer-year').textContent = new Date().getFullYear();

initSmoothScroll();
initNav();
initHeroSlideshow();
initGallery();
initCategoryTiles();
initFeaturedGalleries();
initTestimonials();
initContactForm();
initReveal();
