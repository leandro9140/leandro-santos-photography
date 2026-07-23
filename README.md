# Leandro Santos Photography — Site de Portefólio

Site de portefólio para fotógrafo de casamentos, sediado no Porto. Construído com
[Vite](https://vitejs.dev) + JavaScript vanilla + HTML5 + CSS moderno — sem framework
de UI (React/Vue, etc.), porque o site é essencialmente conteúdo estático (texto,
imagens, um formulário) e um framework de componentes não traria benefício real face
ao peso extra e à complexidade de build adicional.

## Porquê single-page?

O site é uma única página (`index.html`) com secções ancoradas (`#sobre`, `#categorias`,
`#destaques`, `#portfolio`, `#pacotes`, `#testemunhos`, `#contacto`) em vez de várias
páginas separadas. Para um portefólio deste tamanho isto é preferível porque:

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

Ordem das secções (de cima a baixo): Hero (mosaico) → Sobre (preview + versão completa)
→ Categorias de portefólio (tiles) → Casamentos em destaque → Portefólio completo
(grelha com filtros) → Pacotes → Testemunhos → Chamada final → Contacto → Footer.

## Estrutura de ficheiros

```
├── index.html                  # Marcação HTML de toda a página (única página do site)
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                 # Imagens placeholder (SVG) — ver "Imagens" abaixo
├── scripts/
│   └── generate-placeholders.mjs  # Gera as imagens placeholder em public/images
├── src/
│   ├── main.js                 # Ponto de entrada — importa CSS e inicializa os módulos
│   ├── style/
│   │   ├── variables.css       # Cores, tipografia (incl. escala "editorial-heading"), espaçamentos
│   │   ├── base.css            # Reset e estilos base
│   │   ├── layout.css          # Grelhas, container, section head, utilitário .bg-graphite
│   │   ├── components.css      # Nav, overlay de menu, botões, cards, editorial-heading, formulário, lightbox
│   │   ├── sections.css        # Hero (mosaico), sobre, categorias, destaques, portefólio, pacotes, testemunhos, CTA final, contacto, footer
│   │   ├── animations.css      # Fade-in ao scroll
│   │   └── main.css            # Agrega todos os ficheiros CSS acima
│   ├── data/
│   │   ├── portfolio.js        # Casamentos/sessões do portefólio (fácil de editar)
│   │   ├── categories.js       # Categorias de portefólio (tiles): Casamentos, Casal, Família
│   │   ├── featured.js         # Casamentos em destaque (imagens dedicadas + referência ao portfolio.js)
│   │   └── testimonials.js     # Testemunhos de clientes (1-2, sem carrossel)
│   └── modules/
│       ├── smoothScroll.js     # Scroll suave (Lenis) + scroll/filtro por delegação de eventos
│       ├── nav.js              # Header, overlay de menu full-screen, scrollspy
│       ├── reveal.js           # Fade-in ao entrar no ecrã (IntersectionObserver)
│       ├── gallery.js          # Filtros + grelha do portefólio completo
│       ├── categoryTiles.js    # Tiles de categoria (Casamentos / Casal / Família)
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

## Imagens — placeholders

Todas as imagens atuais são **placeholders gerados por SVG**, claramente identificados
com a palavra "PLACEHOLDER" sobreposta, para que seja óbvio o que ainda falta substituir.
Foram gerados pelo script `scripts/generate-placeholders.mjs` (podes correr
`npm run generate:placeholders` outra vez se precisares de mais).

**Para substituir por fotos reais:**

1. Exporta as fotos finais em `.webp` (com um `.jpg` de fallback, para browsers antigos).
2. Coloca-as em `public/images/`, com nomes descritivos (ex.: `wedding-04-01.webp`).
3. Atualiza os caminhos em `src/data/portfolio.js` (cada casamento é um objeto simples —
   basta copiar um existente e ajustar `couple`, `location`, `date`, `cover` e `images`).
4. Para melhor performance, usa este padrão em vez de um `<img>` simples quando tiveres
   WebP + fallback:
   ```html
   <picture>
     <source srcset="/images/wedding-04-01.webp" type="image/webp" />
     <img src="/images/wedding-04-01.jpg" alt="..." loading="lazy" />
   </picture>
   ```
5. Substitui também as imagens do hero (`hero-mosaic-01.svg` a `04.svg`), `about.svg`,
   as 3 imagens de categoria (`category-*.svg`), as 3 imagens de destaque (`featured-*.svg`)
   e `og-cover.svg` (esta última deve ser uma imagem `1200×630px`, formato `.jpg` ou
   `.png`, para aparecer corretamente quando o site for partilhado no Instagram/Facebook/WhatsApp).

### Categorias de portefólio e casamentos em destaque

- `src/data/categories.js` — os 3 tiles da secção "O que fotografo". Neste momento todos
  apontam (`href`) para `#portfolio`, porque só o portefólio de casamentos tem galeria
  própria no site. Quando existirem galerias dedicadas a sessões de casal/família,
  atualiza o `href` de cada categoria para essa âncora/página.
- `src/data/featured.js` — a secção "Casamentos em destaque" usa imagens **dedicadas**
  (maiores, distintas das miniaturas da grelha), mas reaproveita o nome do casal, local e
  data de `src/data/portfolio.js` através do campo `weddingId`, para não duplicar essa
  informação em dois sítios. O link "Ver galeria completa" faz scroll até `#portfolio` e
  ativa automaticamente o filtro desse casamento (mecanismo em `src/modules/smoothScroll.js`,
  via atributo `data-filter` no link).

## Adicionar/editar conteúdo de texto

Todo o texto do site está em `index.html`, marcado com comentários `<!-- PLACEHOLDER -->`
nos pontos onde o texto é fictício e deve ser reescrito com o texto real da marca
(apresentação, tagline, descrições de pacotes, etc.). Os testemunhos estão em
`src/data/testimonials.js`.

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
- [ ] Substituir todas as imagens placeholder por fotografias reais.
- [ ] Reescrever os textos marcados com `<!-- PLACEHOLDER -->` em `index.html`.
- [ ] Atualizar `src/data/testimonials.js` com testemunhos reais de clientes.
- [ ] Atualizar `src/data/portfolio.js` com os casamentos reais (nomes, locais, datas).
- [ ] Atualizar `src/data/featured.js` com imagens dedicadas reais para os casamentos em destaque.
- [ ] Rever os `href` em `src/data/categories.js` quando existirem galerias próprias para
      sessões de casal/família (atualmente todas apontam para `#portfolio`).
- [ ] Substituir o link do Instagram (`https://instagram.com/`) pelo perfil real.
- [ ] Decidir e comprar um domínio (ex. `leandrosantosphotography.pt`), e atualizar esse
      domínio em `index.html` (`og:url`, `canonical`), `public/robots.txt` e
      `public/sitemap.xml`, que atualmente têm um domínio placeholder.
- [ ] Publicar no Netlify/Vercel e ligar o domínio.
- [ ] Confirmar que o e-mail leandrosantosphotography@hotmail.com está a receber os
      testes do formulário antes de divulgar o site.
