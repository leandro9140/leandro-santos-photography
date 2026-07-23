// Dados do portefólio — organizado por casamento/sessão.
//
// Para adicionar um novo casamento:
// 1. Junta as fotos finais em public/images/ (ideal: .webp)
// 2. Copia um dos objetos abaixo e ajusta os campos
// 3. Cada imagem pode ter orientation: "portrait" | "landscape" (afeta o grid)
//
// PLACEHOLDER: nomes de casais, locais e datas são fictícios — substitui pelo conteúdo real.

export const portfolio = [
  {
    id: 'sofia-miguel',
    couple: 'Sofia & Miguel',
    location: 'Quinta do Douro',
    date: '2025',
    cover: '/images/wedding-01-cover.svg',
    images: [
      { src: '/images/wedding-01-01.svg', alt: 'Sofia & Miguel — preparativos da noiva', orientation: 'portrait' },
      { src: '/images/wedding-01-02.svg', alt: 'Sofia & Miguel — cerimónia ao ar livre', orientation: 'landscape' },
      { src: '/images/wedding-01-03.svg', alt: 'Sofia & Miguel — retrato dos noivos', orientation: 'portrait' },
      { src: '/images/wedding-01-04.svg', alt: 'Sofia & Miguel — brinde na festa', orientation: 'landscape' },
      { src: '/images/wedding-01-05.svg', alt: 'Sofia & Miguel — detalhe do vestido', orientation: 'portrait' },
      { src: '/images/wedding-01-06.svg', alt: 'Sofia & Miguel — primeira dança', orientation: 'landscape' },
    ],
  },
  {
    id: 'rita-joao',
    couple: 'Rita & João',
    location: 'Foz do Douro, Porto',
    date: '2025',
    cover: '/images/wedding-02-cover.svg',
    images: [
      { src: '/images/wedding-02-01.svg', alt: 'Rita & João — cerimónia civil', orientation: 'landscape' },
      { src: '/images/wedding-02-02.svg', alt: 'Rita & João — retrato de casal', orientation: 'portrait' },
      { src: '/images/wedding-02-03.svg', alt: 'Rita & João — making of dos anéis', orientation: 'landscape' },
      { src: '/images/wedding-02-04.svg', alt: 'Rita & João — convidados na festa', orientation: 'portrait' },
      { src: '/images/wedding-02-05.svg', alt: 'Rita & João — discurso de padrinho', orientation: 'landscape' },
      { src: '/images/wedding-02-06.svg', alt: 'Rita & João — saída dos noivos', orientation: 'portrait' },
    ],
  },
  {
    id: 'ana-tiago',
    couple: 'Ana & Tiago',
    location: 'Destination — Douro Valley',
    date: '2024',
    cover: '/images/wedding-03-cover.svg',
    images: [
      { src: '/images/wedding-03-01.svg', alt: 'Ana & Tiago — vista sobre o vale', orientation: 'portrait' },
      { src: '/images/wedding-03-02.svg', alt: 'Ana & Tiago — cerimónia entre vinhas', orientation: 'landscape' },
      { src: '/images/wedding-03-03.svg', alt: 'Ana & Tiago — retrato ao pôr do sol', orientation: 'portrait' },
      { src: '/images/wedding-03-04.svg', alt: 'Ana & Tiago — jantar ao ar livre', orientation: 'landscape' },
      { src: '/images/wedding-03-05.svg', alt: 'Ana & Tiago — detalhe da mesa', orientation: 'portrait' },
      { src: '/images/wedding-03-06.svg', alt: 'Ana & Tiago — última dança da noite', orientation: 'landscape' },
    ],
  },
];
