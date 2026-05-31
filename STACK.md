# Stack Padrão — Sites B2B/B2C de Alta Performance

> Documento técnico de referência para replicação desta arquitetura em novos projetos.  
> Baseado na implementação da **Tropical Milhas** (2026).

---

## Análise de Conformidade com o Mercado

### Veredicto: ✅ Acima do padrão para agências de desenvolvimento web B2B/B2C

| Critério | Status | Observação |
|---|---|---|
| Framework | ✅ Referência de mercado | Next.js App Router é o padrão dominante em 2025/2026 |
| Tipagem | ✅ Obrigatório em projetos sérios | TypeScript strict em todo o codebase |
| Estilização | ✅ Padrão atual | Tailwind CSS v4 (mais recente) |
| Animações | ✅ Above standard | Framer Motion v12 + GSAP (dual stack premium) |
| Renderização | ✅ Correto por contexto | SSG para páginas estáticas, Client Components apenas onde há interatividade |
| State management | ✅ Adequado ao escopo | React Context com `useReducer`-like pattern — correto para projetos sem backend real |
| Persistência | ✅ Implementado | `localStorage` com validação de schema (proteção contra dados corrompidos) |
| Fontes | ✅ Best practice | `next/font/google` com `display: swap` — zero layout shift |
| Imagens | ✅ Otimizado | `next/image` com `remotePatterns`, `fill`, `sizes` e lazy loading |
| SEO | ✅ Estruturado | `Metadata` API por rota, `lang="pt-BR"`, Open Graph, `aria-*` semântico |
| Legal/LGPD | ✅ Necessário no Brasil | Páginas completas de Termos e Política com base legal explícita |
| Acessibilidade | ✅ Parcial | `aria-label`, `role`, `aria-expanded`, `tabIndex`, `focus-visible` aplicados |
| Build tool | ✅ Bleeding edge | Turbopack ativo (substituto do Webpack, 10-700x mais rápido) |
| Icons | ✅ Consistente | Dual library: Remix Icons (UI) + Lucide (conteúdo) |

**Pontos que diferenciam do padrão mediano de agências:**
- Paleta de cores centralizada em arquivo único (`colors.tsx`) — zero "magic values" espalhados
- Animações com `useReducedMotion` — respeita preferências de acessibilidade do OS
- Validação de schema no `localStorage` — previne crash por dados legados
- Todas as fontes com `variable` CSS — permite uso em Tailwind via `font-display`/`font-body`

---

## Nome Técnico desta Arquitetura

Esta estrutura se encaixa no padrão chamado de:

**"Jamstack com App Router híbrido"** ou, mais precisamente:

> **Static-first Next.js App Router com Islands Architecture parcial**

- **Static-first**: todas as páginas são geradas estaticamente (`○ Static`) no build
- **Islands Architecture**: apenas os componentes que precisam de interatividade são Client Components (`"use client"`) — o restante é Server Component por padrão
- **Jamstack**: sem servidor de aplicação em runtime; conteúdo servido via CDN; APIs externas quando necessário

No contexto comercial de agências, esta arquitetura também é chamada de:

> **"Next.js Headless Frontend"** — quando o backend/CMS é desacoplado  
> **"Performance-first Marketing Site"** — quando o foco é conversão e SEO

---

## Stack Completa

### Core

| Tecnologia | Versão | Função |
|---|---|---|
| **Next.js** | 16.2.6 | Framework principal — roteamento, SSG, otimização de imagens, fonts |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Tipagem estática em todo o projeto |
| **Turbopack** | built-in | Bundler de desenvolvimento (substitui Webpack) |

### Estilização

| Tecnologia | Versão | Função |
|---|---|---|
| **Tailwind CSS** | ^4 | Utility-first CSS — classes utilitárias no JSX |
| **@tailwindcss/postcss** | ^4 | Integração PostCSS para o Tailwind v4 |
| **clsx** | ^2.1.1 | Composição condicional de classNames |
| **tailwind-merge** | ^3.6.0 | Resolve conflitos de classes Tailwind (`cn()` helper) |

> **Padrão de cores:** arquivo `src/lib/colors.tsx` como fonte única de verdade.  
> Cores aplicadas via `style={{ color: colors.brand }}` — não via classes Tailwind customizadas.  
> Isso garante consistência e facilita troca de tema.

### Animações

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| **Framer Motion** | ^12.40.0 | Animações declarativas de UI, transições de página, scroll-triggered, spring physics, layout animations, AnimatePresence |
| **GSAP** | ^3.15.0 | Disponível para animações de timeline complexas |
| **@gsap/react** | ^2.1.2 | Hook `useGSAP` para integração com React |

**Padrões de animação utilizados:**

```ts
// src/lib/animations.ts — variantes reutilizáveis
fadeUp    // entrada com subida suave (usado em seções)
fadeIn    // entrada apenas com opacidade
wordReveal // revelar palavras uma a uma (usado em títulos)
staggerContainer // coordena animações de filhos em sequência
scaleIn   // entrada com escala
```

**Técnicas aplicadas:**
- `whileInView` + `viewport={{ once: true }}` — anima apenas quando entra na viewport
- `useReducedMotion()` — desativa animações se o usuário preferir (acessibilidade)
- `useMotionValue` + `useTransform` + `useSpring` — tilt 3D interativo (CardPromo)
- `AnimatePresence` — animações de saída (menu mobile, dialogs, carrossel)
- `layoutId` — animação de layout compartilhado (sumário das páginas legais)
- `useScroll` + `useSpring` — barra de progresso de leitura (páginas legais)

### Ícones

| Biblioteca | Uso |
|---|---|
| **@remixicon/react** ^4.9.0 | Ícones de interface (nav, botões, formulários, cards) |
| **lucide-react** ^1.17.0 | Ícones de conteúdo (seções, features, decorativos) |

### Fontes

Carregadas via `next/font/google` no `src/app/layout.tsx`:

| Font | Variável CSS | Uso |
|---|---|---|
| **Bricolage Grotesque** | `--font-bricolage` | Display/títulos (`font-display`) |
| **DM Sans** | `--font-dm-sans` | Corpo/texto (`font-body`, padrão do `body`) |

---

## Arquitetura de Pastas

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — providers, fonts, metadata global
│   ├── globals.css               # Reset, @theme (Tailwind), utilitários globais
│   ├── (main)/                   # Route Group — compartilha Header + Footer
│   │   ├── layout.tsx            # Layout do grupo: <Header> + <main> + <Footer>
│   │   ├── page.tsx              # Home ( / )
│   │   ├── checkout/page.tsx     # Checkout ( /checkout )
│   │   ├── termos-de-uso/        # Termos de Uso ( /termos-de-uso )
│   │   └── politica-de-privacidade/  # Privacidade ( /politica-de-privacidade )
│   └── login/
│       └── page.tsx              # Login/Registro ( /login ) — fora do grupo (sem header padrão)
│
├── components/
│   ├── layout/                   # Componentes estruturais globais
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # Seções da home page (uma por arquivo)
│   │   ├── Hero.tsx
│   │   ├── FlightSearch.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Destinations.tsx
│   │   ├── Stats.tsx
│   │   ├── Calculator.tsx
│   │   ├── CardPromo.tsx
│   │   ├── CardBlack.tsx
│   │   ├── Blog.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── CTASection.tsx
│   ├── shared/                   # Componentes reutilizáveis entre páginas
│   │   ├── AnimatedText.tsx      # Revelar palavras com animação
│   │   ├── CartDialog.tsx        # Drawer da sacola (portal)
│   │   ├── CheckoutDialog.tsx
│   │   ├── CustomCursor.tsx      # Cursor customizado
│   │   ├── DestinationDrawer.tsx
│   │   ├── GlassCard.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   └── legal/                    # Componentes exclusivos das páginas legais
│       ├── LegalPageLayout.tsx   # Layout com sumário + scroll-spy
│       └── LegalContent.tsx      # Primitivos de conteúdo (P, Sub, Bullets, Notice…)
│
└── lib/
    ├── animations.ts             # Variantes Framer Motion reutilizáveis
    ├── colors.tsx                # Paleta de cores — fonte única de verdade
    ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
    ├── cart-context.tsx          # Estado global do carrinho + persistência localStorage
    └── data/                     # Mock data (substituir por API/CMS em produção)
        ├── flights.ts
        ├── airports.ts
        └── destinations.ts
```

### Por que Route Groups `(main)`?

O parêntese no nome da pasta **não cria segmento de URL**. Serve para compartilhar um `layout.tsx` (Header + Footer) entre rotas sem poluir a URL. A rota `/login` fica fora do grupo porque tem layout próprio (sem header padrão).

---

## Padrões de Componente

### Server Component vs Client Component

```
Server Component (padrão)     → páginas, layouts, LegalContent
Client Component ("use client") → tudo com: useState, useEffect,
                                  event handlers, hooks do browser,
                                  Framer Motion, useCart
```

**Regra aplicada:** mover `"use client"` o mais para baixo possível na árvore. Páginas como `/termos-de-uso` são Server Components — apenas o layout interativo (`LegalPageLayout`) é Client.

### Componentes de Seção

Cada seção da home é um componente isolado:
- **Auto-contido**: importa seus próprios dados, ícones e estilos
- **Sem props obrigatórias**: pode ser usado em qualquer ordem
- **Animação própria**: `whileInView` com `once: true` — não depende do pai

### Estado Global

Único estado global: o carrinho (`CartContext`).  
**Não usa Redux, Zustand ou similar** — React Context é suficiente para o escopo.

Padrão de persistência implementado:
```
mount → lê localStorage → valida schema → hidrata state
state change → (se hydrated) → escreve localStorage
```

---

## CSS e Design System

### Abordagem Híbrida

O projeto usa **duas estratégias de estilo em paralelo**, cada uma com seu propósito:

| Estratégia | Quando usar |
|---|---|
| `style={{ color: colors.brand }}` | Cores da paleta de marca — garante consistência |
| `className="rounded-2xl px-6 py-4"` | Espaçamento, layout, tipografia, bordas — Tailwind |

### Tokens de Cor (`src/lib/colors.tsx`)

```ts
brand / brandHover / brandLight / brandMid   // Laranja (#FF6B35)
ink / ink2 / ink3 / ink4                     // Texto (escala de cinza escuro)
muted / mutedLight / mutedLighter            // Texto secundário
white / surface / surface2 / dark            // Fundos
border / borderHover                         // Bordas
white10 → white80                            // Overlays translúcidos
danger / dangerLight                         // Estados de erro
```

### Tailwind v4 — Diferenças do v3

- Configuração via `@theme {}` no CSS (não em `tailwind.config.js`)
- PostCSS plugin: `@tailwindcss/postcss` (não `tailwindcss`)
- Sem arquivo `tailwind.config.js` — tudo em `globals.css`

---

## Páginas e Rotas

| Rota | Tipo | Layout | Descrição |
|---|---|---|---|
| `/` | SSG | Header + Footer | Home com todas as seções |
| `/checkout` | SSG* | Header + Footer | Cálculo de milhas e resumo |
| `/login` | SSG | Próprio | Login e cadastro |
| `/termos-de-uso` | SSG | Header + Footer | Termos (LGPD) |
| `/politica-de-privacidade` | SSG | Header + Footer | Privacidade (LGPD) |

*Checkout é estático mas renderiza conteúdo dinâmico no cliente via Context.

---

## Sequência de Seções (Home)

```
Hero              → carrossel de destinos com voos em destaque
FlightSearch      → busca de voos com aeroportos e calendário
HowItWorks        → 3 passos: escolha, informe milhas, acompanhe
Destinations      → grid de destinos com drawer de detalhes
Stats             → contadores animados (passagens, destinos, satisfação)
Calculator        → simulador de milhas por programa
CardBlack         → seção do Cartão Tropical × Mastercard Black
Blog              → 3 cards de conteúdo editorial
Testimonials      → depoimentos com carrossel
FAQ               → perguntas frequentes com acordeão
CTASection        → call to action final
```

---

## Como Replicar em Novos Projetos

### 1. Inicialização

```bash
npx create-next-app@latest nome-do-projeto \
  --typescript --tailwind --app --turbopack --src-dir
```

### 2. Dependências padrão desta stack

```bash
npm install framer-motion gsap @gsap/react \
  @remixicon/react lucide-react \
  clsx tailwind-merge
```

### 3. Arquivos a copiar como boilerplate

| Arquivo | Por quê copiar |
|---|---|
| `src/lib/colors.tsx` | Substituir cores, manter estrutura |
| `src/lib/animations.ts` | Variantes prontas, raramente mudam |
| `src/lib/utils.ts` | `cn()` helper — use em todo projeto |
| `src/components/shared/AnimatedText.tsx` | Reutilizável em qualquer projeto |
| `src/components/shared/Input.tsx` | Input com validação e ícone |
| `src/components/shared/Select.tsx` | Select estilizado |
| `src/components/legal/` | Adaptar textos, estrutura é universal |
| `src/app/globals.css` | Ajustar `@theme`, manter reset |

### 4. Substituições por projeto

| O que substituir | Por quê |
|---|---|
| `src/lib/data/*.ts` | Conectar a API real ou CMS (Sanity, Contentful, Strapi) |
| `src/lib/colors.tsx` | Paleta de cores do cliente |
| Fontes no `layout.tsx` | Identidade tipográfica do cliente |
| Imagens em `/public` | Assets do cliente |
| Textos legais | CNPJ, endereço e dados reais do cliente |

### 5. Escala para projetos maiores

Quando o projeto crescer além de landing page/site institucional:

| Necessidade | Adicionar |
|---|---|
| Autenticação real | NextAuth.js v5 / Clerk |
| CMS | Sanity.io / Contentful / Payload CMS |
| Backend/API | Next.js Route Handlers ou API separada (FastAPI, NestJS) |
| Banco de dados | Prisma + PostgreSQL / Supabase |
| Deploy | Vercel (zero config para Next.js) / Coolify (self-hosted) |
| Analytics | Vercel Analytics / Plausible |
| Formulários | React Hook Form + Zod |
| State complexo | Zustand (substitui Context para projetos grandes) |

---

## Checklist de Qualidade por Projeto

- [ ] `colors.tsx` com paleta do cliente
- [ ] Fontes do cliente via `next/font`
- [ ] `Metadata` configurado por rota (título, descrição, OG)
- [ ] `lang` correto no `<html>`
- [ ] Imagens com `alt`, `sizes` e `priority` nas above-the-fold
- [ ] `aria-label` em botões sem texto visível
- [ ] `useReducedMotion` em todas as animações
- [ ] Páginas legais (Termos + Privacidade) com dados reais do cliente
- [ ] `localStorage` com validação de schema (se usar persistência)
- [ ] Build passando sem erros de TypeScript (`npx tsc --noEmit`)
- [ ] Todas as rotas gerando como `○ Static` no build

---

*Stack documentada em maio de 2026. Versões devem ser verificadas em novos projetos.*
