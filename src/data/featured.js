// Casamentos em destaque ("Featured Galleries") — apresentação editorial, história a
// história, em vez de uma grelha genérica.
//
// Cada entrada usa uma imagem GRANDE dedicada (distinta das miniaturas da grelha do
// portefólio) e reaproveita os dados do casal (nome, local, data) de src/data/portfolio.js,
// para não duplicar essa informação em dois sítios.
//
// O link "Ver galeria completa" faz scroll até #portfolio E ativa automaticamente o
// filtro deste casamento nessa secção (ver data-filter no HTML e a lógica em
// src/modules/smoothScroll.js).

export const featured = [
  {
    weddingId: 'sara-roberto',
    image: '/images/featured-sara-roberto.jpg',
    alt: 'Sara e Roberto',
  },
  {
    weddingId: 'sandra-bernardo',
    image: '/images/featured-sandra-bernardo.jpg',
    alt: 'Sandra e Bernardo',
  },
  {
    weddingId: 'diogo-leticia',
    image: '/images/featured-diogo-leticia.jpg',
    alt: 'Diogo e Letícia',
  },
];
