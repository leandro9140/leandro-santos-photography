// Categorias de portefólio (tiles da secção "O que fotografo" na página principal) —
// representam os três momentos de um casamento.
//
// `href` aponta para onde o tile leva ao ser clicado. Neste momento aponta para
// "#portfolio" (a grelha completa), porque não existem galerias dedicadas por
// momento no site. Se um dia existirem, troca o href por essa âncora/página.

export const categories = [
  {
    id: 'preparacao',
    title: 'Preparação',
    description: 'Os últimos retoques antes do grande momento.',
    image: '/images/category-preparacao.jpg',
    alt: 'Preparação da noiva antes da cerimónia',
    href: '#portfolio',
  },
  {
    id: 'sessao',
    title: 'Sessão',
    description: 'Retratos a dois, em luz natural.',
    image: '/images/category-sessao.jpg',
    alt: 'Sessão de retratos do casal',
    href: '#portfolio',
  },
  {
    id: 'festa',
    title: 'Festa',
    description: 'Onde a noite ganha vida.',
    image: '/images/category-festa.jpg',
    alt: 'Festa de casamento',
    href: '#portfolio',
  },
];
