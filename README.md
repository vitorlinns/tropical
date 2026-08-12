# Tropical Milhas

Site institucional e de vendas da Tropical Milhas agência que emite passagens aéreas usando milhas de cartão de crédito. Busca de voos, calculadora de milhas, carrinho de compras e checkout, além de páginas institucionais e legais (Termos de Uso, Política de Privacidade).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) tema e cores centralizados em `src/app/globals.css` via `@theme`
- [Framer Motion](https://motion.dev) e [GSAP](https://gsap.com) para animações
- [Remixicon](https://remixicon.com) e [Lucide](https://lucide.dev) para ícones
- Fontes locais (Bricolage Grotesque e DM Sans) via `next/font/local`, servidas de `public/font`

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # sobe o build de produção
npm run lint    # eslint
```

## Estrutura do projeto

```
src/
├── app/                  # rotas (App Router)
│   ├── (main)/           # páginas com header/footer do site
│   │   ├── page.tsx      # home
│   │   ├── checkout/
│   │   ├── termos-de-uso/
│   │   └── politica-de-privacidade/
│   └── login/            # login/cadastro (fora do grupo (main))
├── sections/             # seções da home (Hero, FlightSearch, Destinations, Calculator, FAQ...)
├── components/
│   ├── layout/           # Header, Footer
│   ├── legal/            # layout e blocos de conteúdo das páginas legais
│   └── shared/           # componentes reutilizáveis (Input, Select, CartDialog, DestinationDrawer...)
└── lib/
    ├── data/             # dados mockados (voos, destinos, aeroportos)
    ├── hooks/            # hooks compartilhados
    ├── cart-context.tsx  # estado do carrinho (persistido em localStorage)
    ├── animations.ts     # variantes do Framer Motion
    └── utils.ts          # helpers (cn, fmtBRL, fmtNumber)
```

## Notas

- Não há backend: dados de voos/destinos são mockados em `src/lib/data`, e os fluxos de login e pagamento no checkout são simulados (sem persistência real de usuário nem processamento de pagamento).
- Cores do design system vivem como variáveis CSS em `src/app/globals.css` (`--color-*`), e o Tailwind gera as utilities (`bg-brand`, `text-ink` etc.) automaticamente a partir delas.
