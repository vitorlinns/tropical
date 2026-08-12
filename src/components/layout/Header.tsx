"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMapPin2Line,
  RiCalculatorLine,
  RiInformationLine,
  RiArticleLine,
  RiUserLine,
  RiTicket2Line,
  RiMenuLine,
  RiCloseLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CartDialog } from "@/components/shared/CartDialog";

const navLinks = [
  { label: "Destinos",      href: "#destinos",      icon: RiMapPin2Line     },
  { label: "Calculadora",   href: "#calculadora",   icon: RiCalculatorLine  },
  { label: "Como funciona", href: "#como-funciona", icon: RiInformationLine },
  { label: "Blog",          href: "#blog",          icon: RiArticleLine     },
];

function CartButton() {
  const { items }               = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const count                   = items.length;

  return (
    <>
      <button
        onClick={() => setCartOpen(true)}
        className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        style={{ touchAction: "manipulation", color: "var(--color-ink-2)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--color-ink)";
          e.currentTarget.style.backgroundColor = "var(--color-surface)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--color-ink-2)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        aria-label={count > 0 ? `Minhas compras, ${count} viagem${count > 1 ? "ns" : ""}` : "Minhas compras"}
      >
        <div className="relative">
          <RiTicket2Line size={18} aria-hidden="true" />
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center leading-none"
              style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
              aria-hidden="true"
            >
              {count}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">Minhas compras</span>
      </button>

      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 py-3"
      style={{ backgroundColor: "rgba(255,255,255,0.97)", borderBottom: `1px solid var(--color-border)`, backdropFilter: "blur(12px)" }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center gap-4"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 rounded-lg mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ outline: "none" }}
          aria-label="Tropical Milhas, página inicial"
        >
          <Image
            src="/isologo.png"
            alt="Tropical Milhas"
            width={280}
            height={52}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1" role="list">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{ color: "var(--color-ink-3)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-ink)";
                  e.currentTarget.style.backgroundColor = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-ink-3)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — desktop */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          <CartButton />
          <a
            href="/login"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
          >
            <RiUserLine size={15} aria-hidden="true" />
            Entrar / Criar conta
          </a>
        </div>

        {/* Right — mobile */}
        <div className="lg:hidden flex items-center gap-1 ml-auto">
          <CartButton />
          <button
            className="p-2 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
            style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open
              ? <RiCloseLine size={20} aria-hidden="true" />
              : <RiMenuLine  size={20} aria-hidden="true" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } }}
            className="lg:hidden fixed inset-x-0 top-[73px] z-40 mx-3 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-white)",
              border: `1px solid var(--color-border)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
                  style={{ color: "var(--color-ink-2)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-surface)"; e.currentTarget.style.color = "var(--color-ink)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-ink-2)"; }}
                >
                  <Icon size={18} style={{ color: "var(--color-brand)" }} aria-hidden="true" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-1">
                <a
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
                  style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
                >
                  <RiUserLine size={18} aria-hidden="true" />
                  <span className="text-sm font-semibold">Entrar / Criar conta</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
