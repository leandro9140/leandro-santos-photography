// Gera imagens placeholder (SVG) para o portefólio.
// Corre com: npm run generate:placeholders
// As imagens ficam em public/images/ e têm o nome final que o site espera.
// Quando tiveres fotos reais, substitui os ficheiros mantendo o mesmo nome
// (ou atualiza os caminhos em src/data/portfolio.js).

import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/images');
mkdirSync(outDir, { recursive: true });

const BG_TONES = ['#1c1c1a', '#22221f', '#262622', '#1a1a18'];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function svgPlaceholder({ width, height, label, tone }) {
  const fontSize = Math.max(14, Math.round(width / 22));
  const safeLabel = escapeXml(label);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Imagem placeholder: ${safeLabel}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tone}"/>
      <stop offset="100%" stop-color="#0d0d0c"/>
    </linearGradient>
    <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="transparent"/>
      <circle cx="1" cy="1" r="0.4" fill="#ffffff" opacity="0.03"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#grain)"/>
  <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#a68a5b" stroke-opacity="0.35" stroke-width="1"/>
  <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#a68a5b" stroke-opacity="0.12" stroke-width="1"/>
  <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#a68a5b" stroke-opacity="0.12" stroke-width="1"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" letter-spacing="2" fill="#f5f4f0" opacity="0.85">PLACEHOLDER</text>
  <text x="50%" y="54%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(fontSize * 0.6)}" letter-spacing="1" fill="#a68a5b" opacity="0.9">${safeLabel}</text>
</svg>`;
}

const jobs = [
  // Hero — slideshow full-screen, 3 imagens que alternam (ver src/data/heroSlides.js
  // e src/modules/heroSlideshow.js)
  { file: 'hero-full.svg', width: 1920, height: 1200, label: 'Hero — slide 01' },
  { file: 'hero-slide-02.svg', width: 1920, height: 1200, label: 'Hero — slide 02' },
  { file: 'hero-slide-03.svg', width: 1920, height: 1200, label: 'Hero — slide 03' },

  { file: 'about.svg', width: 1200, height: 1500, label: 'Retrato do fotógrafo' },
  { file: 'og-cover.svg', width: 1200, height: 630, label: 'Imagem para redes sociais (Open Graph)' },

  // Categorias de portefólio (tiles) — ver src/data/categories.js
  { file: 'category-casamentos.svg', width: 1200, height: 1500, label: 'Categoria — Casamentos' },
  { file: 'category-casal.svg', width: 1200, height: 1500, label: 'Categoria — Sessões de Casal' },
  { file: 'category-familia.svg', width: 1200, height: 1500, label: 'Categoria — Família' },

  // Casamentos em destaque — imagens dedicadas, distintas das miniaturas da galeria (ver src/data/featured.js)
  { file: 'featured-01.svg', width: 1800, height: 1150, label: 'Destaque — Sofia & Miguel' },
  { file: 'featured-02.svg', width: 1800, height: 1150, label: 'Destaque — Rita & João' },
  { file: 'featured-03.svg', width: 1800, height: 1150, label: 'Destaque — Ana & Tiago' },

  { file: 'wedding-01-cover.svg', width: 1400, height: 1000, label: 'Capa — Sofia & Miguel' },
  { file: 'wedding-01-01.svg', width: 1200, height: 1500, label: 'Sofia & Miguel — 01' },
  { file: 'wedding-01-02.svg', width: 1500, height: 1000, label: 'Sofia & Miguel — 02' },
  { file: 'wedding-01-03.svg', width: 1200, height: 1500, label: 'Sofia & Miguel — 03' },
  { file: 'wedding-01-04.svg', width: 1500, height: 1000, label: 'Sofia & Miguel — 04' },
  { file: 'wedding-01-05.svg', width: 1200, height: 1500, label: 'Sofia & Miguel — 05' },
  { file: 'wedding-01-06.svg', width: 1500, height: 1000, label: 'Sofia & Miguel — 06' },

  { file: 'wedding-02-cover.svg', width: 1400, height: 1000, label: 'Capa — Rita & João' },
  { file: 'wedding-02-01.svg', width: 1500, height: 1000, label: 'Rita & João — 01' },
  { file: 'wedding-02-02.svg', width: 1200, height: 1500, label: 'Rita & João — 02' },
  { file: 'wedding-02-03.svg', width: 1500, height: 1000, label: 'Rita & João — 03' },
  { file: 'wedding-02-04.svg', width: 1200, height: 1500, label: 'Rita & João — 04' },
  { file: 'wedding-02-05.svg', width: 1500, height: 1000, label: 'Rita & João — 05' },
  { file: 'wedding-02-06.svg', width: 1200, height: 1500, label: 'Rita & João — 06' },

  { file: 'wedding-03-cover.svg', width: 1400, height: 1000, label: 'Capa — Ana & Tiago (Destination)' },
  { file: 'wedding-03-01.svg', width: 1200, height: 1500, label: 'Ana & Tiago — 01' },
  { file: 'wedding-03-02.svg', width: 1500, height: 1000, label: 'Ana & Tiago — 02' },
  { file: 'wedding-03-03.svg', width: 1200, height: 1500, label: 'Ana & Tiago — 03' },
  { file: 'wedding-03-04.svg', width: 1500, height: 1000, label: 'Ana & Tiago — 04' },
  { file: 'wedding-03-05.svg', width: 1200, height: 1500, label: 'Ana & Tiago — 05' },
  { file: 'wedding-03-06.svg', width: 1500, height: 1000, label: 'Ana & Tiago — 06' },
];

jobs.forEach((job, i) => {
  const tone = BG_TONES[i % BG_TONES.length];
  const svg = svgPlaceholder({ ...job, tone });
  writeFileSync(path.join(outDir, job.file), svg, 'utf8');
});

console.log(`Geradas ${jobs.length} imagens placeholder em public/images/`);
