import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const bricolage = localFont({
  src: "../../public/font/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
});

const dmSans = localFont({
  src: "../../public/font/DMSans-Variable.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Tropical Milhas | Reserve com suas milhas. Sem complicação.",
  description:
    "Emitimos passagens aéreas usando as milhas do seu cartão de crédito. Rápido, simples e sem burocracia. Mais de 47 destinos disponíveis.",
  keywords: ["milhas", "passagens aéreas", "agência de turismo", "cartão de crédito", "viagem"],
  icons: {
    icon:     "/favicon.png",
    shortcut: "/favicon.png",
    apple:    "/favicon.png",
  },
  openGraph: {
    title: "Tropical Milhas",
    description: "Reserve com suas milhas. Sem complicação.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
