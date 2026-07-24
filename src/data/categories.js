// Categorias de portefólio (tiles da secção "O que fotografo" na página principal) —
// representam os três momentos de um casamento.
//
// `href` aponta para onde o tile leva ao ser clicado. Neste momento aponta para
// "#portfolio" (a grelha completa), porque não existem galerias dedicadas por
// momento no site. Se um dia existirem, troca o href por essa âncora/página.

export const categories = [
  {
    id: 'preparacao',
    title: { pt: 'Preparação', en: 'Getting Ready' },
    description: {
      pt: 'Os últimos retoques antes do grande momento.',
      en: 'The final touches before the big moment.',
    },
    image: '/images/category-preparacao.jpg',
    alt: { pt: 'Preparação da noiva antes da cerimónia', en: 'The bride getting ready before the ceremony' },
    href: '#portfolio',
  },
  {
    id: 'sessao',
    title: { pt: 'Sessão', en: 'Portraits' },
    description: {
      pt: 'Retratos a dois, em luz natural.',
      en: 'Portraits of the couple, in natural light.',
    },
    image: '/images/category-sessao.jpg',
    alt: { pt: 'Sessão de retratos do casal', en: 'Portrait session with the couple' },
    href: '#portfolio',
  },
  {
    id: 'festa',
    title: { pt: 'Festa', en: 'Reception' },
    description: {
      pt: 'Onde a noite ganha vida.',
      en: 'Where the night comes alive.',
    },
    image: '/images/category-festa.jpg',
    alt: { pt: 'Festa de casamento', en: 'Wedding reception' },
    href: '#portfolio',
  },
];
