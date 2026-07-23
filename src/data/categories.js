// Categorias de portefólio (tiles da secção "categories" na página principal).
//
// `href` aponta para onde o tile leva ao ser clicado. Neste momento só o
// portefólio de casamentos tem galeria própria no site — por isso as outras
// categorias apontam também para "#portfolio". Quando existirem galerias
// dedicadas a sessões de casal/família, troca o href por essa âncora/página.

export const categories = [
  {
    id: 'casamentos',
    title: 'Casamentos',
    description: 'Cobertura completa do grande dia, do making of à festa.',
    image: '/images/category-casamentos.svg',
    alt: 'Placeholder — categoria Casamentos',
    href: '#portfolio',
  },
  {
    id: 'casal',
    title: 'Sessões de Casal',
    description: 'Noivado, pedido de casamento ou apenas um retrato a dois.',
    image: '/images/category-casal.svg',
    alt: 'Placeholder — categoria Sessões de Casal',
    href: '#portfolio',
  },
  {
    id: 'familia',
    title: 'Família',
    description: 'Sessões em luz natural, sem poses forçadas.',
    image: '/images/category-familia.svg',
    alt: 'Placeholder — categoria Família',
    href: '#portfolio',
  },
];
