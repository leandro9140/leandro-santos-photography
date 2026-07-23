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
    weddingId: 'sofia-miguel',
    image: '/images/featured-01.svg',
    alt: 'Placeholder — destaque do casamento de Sofia & Miguel',
  },
  {
    weddingId: 'rita-joao',
    image: '/images/featured-02.svg',
    alt: 'Placeholder — destaque do casamento de Rita & João',
  },
  {
    weddingId: 'ana-tiago',
    image: '/images/featured-03.svg',
    alt: 'Placeholder — destaque do casamento de Ana & Tiago',
  },
];
