# Leandro Santos Photography — Site de Portefólio

Site de portefólio para fotógrafo de casamentos, sediado no Porto. Construído com
[Vite](https://vitejs.dev) + JavaScript vanilla + HTML5 + CSS moderno — sem framework
de UI (React/Vue, etc.), porque o site é essencialmente conteúdo estático (texto,
imagens, um formulário) e um framework de componentes não traria benefício real face
ao peso extra e à complexidade de build adicional.

## Porquê single-page?

O site é uma única página (`index.html`) com secções ancoradas (`#sobre`, `#categorias`,
`#destaques`, `#portfolio`, `#testemunhos`, `#contacto`) em vez de várias páginas
separadas. Para um portefólio deste tamanho isto é preferível porque:

- **Performance** — uma única carga inicial, sem re-pedidos de página ao navegar entre secções.
- **Conversão** — o percurso típico (ver trabalho → confiar → contactar) funciona melhor
  em scroll contínuo do que a saltar entre páginas.
- **SEO** — para um negócio local com uma proposta de valor única, uma página forte e bem
  estruturada (com `meta description`, Open Graph e hierarquia de títulos correta) compete
  melhor do que várias páginas finas de conteúdo. Os `title`/`meta description` estão
  otimizados para a intenção de pesquisa principal ("fotógrafo de casamento Porto").

Se no futuro fizer sentido ter uma página só para o blog ou para cada casamento
individual (ex. para SEO de long-tail por local/venue), a estrutura de dados em
`src/data/portfolio.js` já está pronta para alimentar páginas dedicadas mais tarde.

## Redesign — estrutura e ritmo editorial

A estrutura da página e o sistema tipográfico foram redesenhados tendo como referência
o **layout e as interações** de sites de fotografia de casamento de destino de luxo
(ritmo de secções, colagem tipográfica, tiles de categoria, galerias em destaque) —
**não** o texto, as imagens, os nomes de clientes nem a paleta de cores de nenhum site
de referência, que continuam a ser sempre nossos e a manter a paleta escura/neutra e o
tom de escrita contido já definidos para este projeto.

Ordem das secções (de cima a baixo): Hero (slideshow full-screen) → Sobre (preview +
versão completa) → Categorias de portefólio (tiles) → Casamentos em destaque →
Portefólio completo (grelha com filtros) → Testemunhos → Chamada final → Contacto →
Footer.

## Estrutura de ficheiros

```
├── index.html                  # Marcação HTML de toda a página (única página do site)
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/                 # Fotos reais (já otimizadas) + og-cover.svg (ainda placeholder)
│   └── videos/                 # Vídeos do slideshow do hero (H.264, sem áudio)
├── src/
│   ├── main.js                 # Ponto de entrada — importa CSS e inicializa os módulos
│   ├── style/
│   │   ├── variables.css       # Cores, tipografia (incl. escala "editorial-heading"), espaçamentos
│   │   ├── base.css            # Reset e estilos base
│   │   ├── layout.css          # Grelhas, container, section head, utilitário .bg-graphite
│   │   ├── components.css      # Nav, overlay de menu, botões, cards, editorial-heading, formulário, lightbox
│   │   ├── sections.css        # Hero, sobre, categorias, destaques, portefólio, testemunhos, CTA final, contacto, footer
│   │   ├── animations.css      # Fade-in ao scroll
│   │   └── main.css            # Agrega todos os ficheiros CSS acima
│   ├── data/
│   │   ├── portfolio.js        # Casamentos do portefólio (fácil de editar)
│   │   ├── categories.js       # Categorias de portefólio (tiles): Preparação, Sessão, Festa
│   │   ├── featured.js         # Casamentos em destaque (imagens dedicadas + referência ao portfolio.js)
│   │   ├── heroSlides.js       # Slides do hero (imagens e vídeos, full-screen, 3s cada)
│   │   └── testimonials.js     # Testemunhos de clientes (1-2, sem carrossel)
│   └── modules/
│       ├── smoothScroll.js     # Scroll suave (Lenis) + scroll/filtro por delegação de eventos
│       ├── nav.js              # Header, overlay de menu full-screen, scrollspy, troca de logo
│       ├── reveal.js           # Fade-in ao entrar no ecrã (IntersectionObserver)
│       ├── heroSlideshow.js    # Slideshow do hero (crossfade a cada 3s, imagem ou vídeo)
│       ├── gallery.js          # Filtros + grelha do portefólio completo
│       ├── categoryTiles.js    # Tiles de categoria (Preparação / Sessão / Festa)
│       ├── featuredGalleries.js # Casamentos em destaque
│       ├── lightbox.js         # Visualizador de imagem (acessível, teclado)
│       ├── testimonials.js     # Renderiza o bloco simples de testemunhos
│       └── contactForm.js      # Validação + envio do formulário (Web3Forms)
├── .env.example                 # Modelo da variável de ambiente do formulário
├── package.json
└── vite.config.js (não necessário — Vite usa a configuração por omissão)
```

## Correr o projeto localmente

Precisas de [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

```bash
npm install
```

```bash
npm run dev
```

Isto abre o site em `http://localhost:5173` com hot-reload.

## Build de produção

```bash
npm run build
```

Gera a versão otimizada em `dist/`. Para pré-visualizar esse build localmente:

```bash
npm run preview
```

## Deploy (sugestão: Netlify, grátis)

1. Cria conta em [netlify.com](https://www.netlify.com) (podes usar login com GitHub/Google).
2. Opção mais simples — **drag and drop**: corre `npm run build`, depois arrasta a pasta
   `dist/` gerada para a área de deploy manual do Netlify ("Deploys" → "Drag and drop").
3. Opção recomendada a prazo — **ligar o repositório Git**: envia este projeto para o
   GitHub/GitLab, cria um "New site from Git" no Netlify, e define:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Em "Environment variables", adiciona `VITE_WEB3FORMS_ACCESS_KEY` (ver secção seguinte)
     para que o build em produção tenha a chave do formulário.
4. Depois de publicado, liga o teu domínio próprio em "Domain settings" (a Netlify também
   emite HTTPS automaticamente).

(Vercel funciona de forma equivalente, se preferires.)

## Configurar o formulário de contacto

O site é 100% estático (sem servidor próprio), por isso o formulário envia os dados
diretamente para o e-mail **leandrosantosphotography@hotmail.com** através do serviço
gratuito **[Web3Forms](https://web3forms.com)** — não precisas de criar password nem
backend, só obter uma "Access Key".

**Passo a passo:**

1. Vai a [web3forms.com](https://web3forms.com).
2. Introduz o e-mail **leandrosantosphotography@hotmail.com** no campo "Create Access Key"
   na página inicial.
3. Vais receber um e-mail da Web3Forms nessa caixa de correio com a tua **Access Key**
   (um código). Confirma o e-mail se for pedido.
4. Copia essa chave.
5. Neste projeto, copia o ficheiro `.env.example` para um novo ficheiro chamado `.env`:
   ```bash
   cp .env.example .env
   ```
6. Abre `.env` e cola a tua chave:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=a-tua-chave-aqui
   ```
7. Reinicia o `npm run dev` (ou refaz o `npm run build` em produção) para a variável
   ser lida.
8. Ao publicar no Netlify/Vercel, adiciona a mesma variável de ambiente nas definições
   do site (nunca escrevas a chave diretamente no código-fonte, por isso está em `.env`,
   que está no `.gitignore` e não é enviado para o Git).

Todas as submissões passam a chegar diretamente à caixa de correio
**leandrosantosphotography@hotmail.com**, com nome, e-mail, telefone, data do
casamento, local e mensagem.

> Nota: a Access Key do Web3Forms é pensada para ser usada no browser (código
> client-side) — o serviço já tem proteção anti-spam própria (incluindo o campo
> "honeypot" invisível já incluído no formulário). Ainda assim, nunca coloques
> passwords ou chaves de outros serviços diretamente no código.

**Alternativa**: se preferires [Formspree](https://formspree.io) em vez de Web3Forms,
a troca é simples — cria lá o formulário apontado para o mesmo e-mail, e substitui o
endpoint/payload em `src/modules/contactForm.js` pelo formato do Formspree (basta um
`fetch` para o URL do endpoint deles com os campos do formulário).

## Imagens e vídeos

As fotos do hero, sobre, categorias, destaques e das 3 galerias de casamento (Sara &
Roberto, Sandra & Bernardo, Diogo & Letícia) já são **fotos reais**, redimensionadas e
comprimidas para web (ficheiros originais eram fotos de câmara de 5–19 MB cada;
foram reduzidos para o comprimento máximo adequado a cada uso e convertidos para JPEG
qualidade 82, ficando entre 80 KB e 400 KB cada). Os vídeos do hero foram convertidos de
HEVC para H.264 (compatibilidade universal nos browsers) e ficaram sem áudio (são
usados em loop, silenciosos, como fundo).

**Só continua por substituir:**

- `public/images/og-cover.svg` — imagem para partilha em redes sociais (Open Graph).
  Substitui por uma imagem real `1200×630px`, formato `.jpg` ou `.png`.
- `location` e `date` em `src/data/portfolio.js` — estão como "Local a confirmar" / "2025"
  para os 3 casais (Sara & Roberto, Sandra & Bernardo, Diogo & Letícia). Atualiza com o
  local e a data reais de cada casamento.

**Para adicionar mais fotos a um casamento existente ou criar um novo:**

1. Coloca as fotos em `public/images/`, com nomes descritivos (ex.: `novo-casal-01.jpg`).
   Se forem fotos de câmara em alta resolução, comprime-as primeiro (o ideal é o lado
   maior não passar de ~1800px para fotos de grelha, ou ~2400px para o hero).
2. Atualiza/acrescenta o objeto em `src/data/portfolio.js` (`id`, `couple`, `location`,
   `date`, `images`).

### Slideshow do hero

`src/data/heroSlides.js` lista os slides do hero (full-screen), a alternar a cada 3
segundos com crossfade — ver `src/modules/heroSlideshow.js`. Cada slide tem
`type: 'image'` ou `type: 'video'`:

```js
{ type: 'image', src: '/images/hero-01.jpg', alt: '...' }
{ type: 'video', src: '/videos/hero-video-01.mp4' }
```

Os vídeos tocam em loop, sem som (autoplay só funciona em browsers com o vídeo mudo).
Para adicionar um vídeo novo, converte-o para H.264 (compatibilidade universal — HEVC
só funciona bem no Safari):

```bash
ffmpeg -i original.mp4 -an -vf "scale=1920:-2" -c:v libx264 -profile:v main \
  -pix_fmt yuv420p -crf 23 -preset slow -movflags +faststart public/videos/novo-video.mp4
```

Com `prefers-reduced-motion` ativo, o slideshow não avança automaticamente — mostra só
o primeiro slide.

### Categorias de portefólio e casamentos em destaque

- `src/data/categories.js` — os 3 tiles da secção "O que fotografo": Preparação, Sessão
  e Festa (os três momentos de um casamento). Neste momento todos apontam (`href`) para
  `#portfolio`, porque não existem galerias dedicadas por momento no site.
- `src/data/featured.js` — a secção "Casamentos em destaque" usa imagens **dedicadas**
  (maiores, distintas das miniaturas da grelha), mas reaproveita o nome do casal, local e
  data de `src/data/portfolio.js` através do campo `weddingId`, para não duplicar essa
  informação em dois sítios. O link "Ver galeria completa" faz scroll até `#portfolio` e
  ativa automaticamente o filtro desse casamento (mecanismo em `src/modules/smoothScroll.js`,
  via atributo `data-filter` no link).

## Adicionar/editar conteúdo de texto

Todo o texto do site está em `index.html`, marcado com comentários `<!-- PLACEHOLDER -->`
nos pontos onde o texto ainda é fictício e deve ser reescrito com o texto real da marca.
Os testemunhos (ainda fictícios) estão em `src/data/testimonials.js`.

## Scroll suave (Lenis)

O site usa [Lenis](https://github.com/darkroomengineering/lenis) para um scroll mais
fluido e "premium" (roda do rato/trackpad com inércia suave), inicializado em
`src/modules/smoothScroll.js`. Os links de âncora (menu, indicador de scroll do hero)
usam o `lenis.scrollTo()` com um offset para não ficarem escondidos atrás do header fixo.

Se o utilizador tiver `prefers-reduced-motion` ativo no sistema, o Lenis **não é
inicializado** e o site usa o scroll nativo do browser — para não forçar movimento a
quem pediu para o reduzir.

## Acessibilidade e SEO já incluídos

- HTML5 semântico (`header`, `main`, `section`, `footer`, `nav`), hierarquia de
  `h1`–`h3` coerente.
- `alt` descritivo em todas as imagens (incluindo o aviso de placeholder).
- Navegação por teclado no menu, na galeria e no lightbox (Esc, ←, →, foco visível).
- `prefers-reduced-motion` respeitado (desliga animações para quem o pede no sistema).
- Meta tags Open Graph + Twitter Card para partilha em redes sociais.
- `robots.txt` e `sitemap.xml` incluídos em `public/`.
- Imagens com `loading="lazy"` (exceto a imagem do hero, que carrega logo).

## Checklist do que falta fazer manualmente

- [ ] Criar a conta/Access Key no Web3Forms e configurar o `.env` (ver secção acima).
- [ ] Reescrever os textos marcados com `<!-- PLACEHOLDER -->` em `index.html`.
- [ ] Atualizar `src/data/testimonials.js` com testemunhos reais de clientes.
- [ ] Atualizar `location` e `date` em `src/data/portfolio.js` para os 3 casais
      (atualmente "Local a confirmar" / "2025").
- [ ] Substituir `public/images/og-cover.svg` por uma imagem real (`1200×630px`).
- [ ] Confirmar que `https://www.instagram.com/leandrosantos.photo/` é o URL certo do perfil.
- [ ] Decidir e comprar um domínio (ex. `leandrosantosphotography.pt`), e atualizar esse
      domínio em `index.html` (`og:url`, `canonical`), `public/robots.txt` e
      `public/sitemap.xml`, que atualmente têm um domínio placeholder.
- [ ] Publicar no Netlify/Vercel e ligar o domínio.
- [ ] Confirmar que o e-mail leandrosantosphotography@hotmail.com está a receber os
      testes do formulário antes de divulgar o site.
