// Slideshow do hero — imagens e vídeos em full-screen que alternam automaticamente
// (ver src/modules/heroSlideshow.js). Imagens ficam 3 segundos cada; vídeos tocam
// até ao fim antes de avançar para o slide seguinte.
//
// Cada slide tem type: 'video' | 'image'. Para adicionar mais slides, basta
// acrescentar mais objetos aqui (video: coloca o ficheiro em public/videos/,
// já convertido para H.264 — ver README).

export const heroSlides = [
  { type: 'image', src: '/images/hero-01.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-08.jpg', alt: 'Leandro Santos Photography — sessão pré-casamento' },
  { type: 'image', src: '/images/hero-02.jpg', alt: 'Leandro Santos Photography — casamento de Sara e Roberto' },
  { type: 'image', src: '/images/hero-09.jpg', alt: 'Leandro Santos Photography — sessão pré-casamento' },
  { type: 'image', src: '/images/hero-03.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-10.jpg', alt: 'Leandro Santos Photography — sessão pré-casamento' },
  { type: 'image', src: '/images/hero-04.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'video', src: '/videos/hero-video-01.mp4' },
  { type: 'video', src: '/videos/hero-video-02.mp4' },
  { type: 'image', src: '/images/hero-11.jpg', alt: 'Leandro Santos Photography — sessão pré-casamento' },
  { type: 'image', src: '/images/hero-05.jpg', alt: 'Leandro Santos Photography — sessão editorial' },
  { type: 'image', src: '/images/hero-12.jpg', alt: 'Leandro Santos Photography — sessão pré-casamento' },
  { type: 'image', src: '/images/hero-06.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-13.jpg', alt: 'Leandro Santos Photography — sessão editorial' },
  { type: 'image', src: '/images/hero-07.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-14.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-15.jpg', alt: 'Leandro Santos Photography — casamento' },
  { type: 'image', src: '/images/hero-16.jpg', alt: 'Leandro Santos Photography — casamento' },
];
