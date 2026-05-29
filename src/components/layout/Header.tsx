"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMapPin2Line,
  RiCalculatorLine,
  RiInformationLine,
  RiStarLine,
  RiUserLine,
  RiTicket2Line,
  RiMenuLine,
  RiCloseLine,
} from "@remixicon/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/colors";
import { useCart } from "@/lib/cart-context";
import { CartDialog } from "@/components/shared/CartDialog";

const navLinks = [
  { label: "Destinos",      href: "#destinos",      icon: RiMapPin2Line     },
  { label: "Calculadora",   href: "#calculadora",   icon: RiCalculatorLine  },
  { label: "Como funciona", href: "#como-funciona", icon: RiInformationLine },
  { label: "Depoimentos",   href: "#depoimentos",   icon: RiStarLine        },
];

function CartButton({ transparent }: { transparent: boolean }) {
  const { items }               = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const count                   = items.length;

  return (
    <>
      <button
        onClick={() => setCartOpen(true)}
        className={cn(
          "relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150",
          "cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2",
          transparent
            ? "focus-visible:ring-white"
            : "focus-visible:ring-[#FF6B35]"
        )}
        style={{ touchAction: "manipulation", color: transparent ? colors.white80 : colors.ink2 }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = transparent ? colors.white : colors.ink;
          e.currentTarget.style.backgroundColor = transparent ? colors.white10 : colors.surface;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = transparent ? colors.white80 : colors.ink2;
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        aria-label={count > 0 ? `Minhas compras — ${count} viagem${count > 1 ? "ns" : ""}` : "Minhas compras"}
      >
        <div className="relative">
          <RiTicket2Line size={18} aria-hidden="true" />
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center leading-none"
              style={{ backgroundColor: colors.brand, color: colors.white }}
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

/* Páginas que sempre mostram o header com fundo branco (sem efeito de scroll) */
const SOLID_HEADER_PATHS = ["/checkout"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const pathname = usePathname();

  const alwaysSolid = SOLID_HEADER_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (alwaysSolid) return;
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [alwaysSolid]);

  const isSolid    = alwaysSolid || scrolled || open;
  const transparent = !isSolid;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isSolid
          ? "py-3"
          : "bg-gradient-to-b from-black/50 to-transparent py-4"
      )}
      style={isSolid ? { backgroundColor: "rgba(255,255,255,0.97)", borderBottom: `1px solid ${colors.border}`, backdropFilter: "blur(12px)" } : {}}
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center gap-4"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 rounded-lg mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ outline: "none" }}
          aria-label="Tropical Milhas — página inicial"
        >
          <Image
            src="/isologo.png"
            alt="Tropical Milhas"
            width={280}
            height={52}
            className={cn("h-10 w-auto transition-all duration-300", transparent && "brightness-0 invert")}
            priority
          />
        </a>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1" role="list">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{ color: transparent ? colors.white70 : colors.ink3 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = transparent ? colors.white : colors.ink;
                  e.currentTarget.style.backgroundColor = transparent ? colors.white10 : colors.surface;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = transparent ? colors.white70 : colors.ink3;
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
          <CartButton transparent={transparent} />

          <a
            href="/login"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              transparent
                ? { backgroundColor: colors.white15, color: colors.white, border: `1px solid ${colors.white25}` }
                : { backgroundColor: colors.brand, color: colors.white }
            }
          >
            <RiUserLine size={15} aria-hidden="true" />
            Entrar / Criar conta
          </a>
        </div>

        {/* Right — mobile */}
        <div className="lg:hidden flex items-center gap-1 ml-auto">
          <CartButton transparent={transparent} />
          <button
            className="p-2 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
            style={
              transparent
                ? { borderColor: colors.white25, color: colors.white }
                : { borderColor: colors.border, color: colors.ink }
            }
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="lg:hidden px-6 py-4 flex flex-col gap-1"
            style={{ backgroundColor: colors.white, borderTop: `1px solid ${colors.border}`, overscrollBehavior: "contain" }}
          >
            {navLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
                style={{ color: colors.ink2 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; e.currentTarget.style.color = colors.ink; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.ink2; }}
              >
                <Icon size={18} style={{ color: colors.brand }} aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}

            <div className="mt-3 pt-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${colors.border}` }}>
              <a
                href="/login"
                className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
                style={{ color: colors.ink2 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <RiUserLine size={18} style={{ color: colors.muted }} aria-hidden="true" />
                <span className="text-sm font-medium">Entrar / Criar conta</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
