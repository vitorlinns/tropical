"use client";

import Image from "next/image";
import {
  RiInstagramLine,
  RiWhatsappLine,
  RiMailLine,
} from "@remixicon/react";
import { colors } from "@/lib/colors";
import type { RemixiconComponentType } from "@remixicon/react";

const NAV = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Destinos",      href: "#destinos"      },
  { label: "Calculadora",   href: "#calculadora"   },
  { label: "FAQ",           href: "#faq"           },
  { label: "Contato",       href: "#contato"       },
];

const PROGRAMS = [
  "Smiles (GOL)",
  "TudoAzul (Azul)",
  "LATAM Pass",
  "Livelo",
  "Nubank Rewards",
  "Itaú Personnalité",
];

const SOCIALS: { icon: RemixiconComponentType; label: string; href: string }[] = [
  { icon: RiInstagramLine, label: "Instagram", href: "#" },
  { icon: RiWhatsappLine,  label: "WhatsApp",  href: "#" },
  { icon: RiMailLine,      label: "E-mail",    href: "mailto:contato@tropicalmilhas.com.br" },
];

const MUTED   = "rgba(255,255,255,0.4)";
const SEMI    = "rgba(255,255,255,0.6)";
const DIVIDER = "rgba(255,255,255,0.08)";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded"
      style={{ color: MUTED }}
      onMouseEnter={(e) => { e.currentTarget.style.color = colors.white; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; }}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: colors.ink }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <Image
                src="/isologo.png"
                alt="Tropical Milhas"
                width={140}
                height={48}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>
              Transformamos as milhas paradas no seu cartão em passagens aéreas reais.
              Rápido, simples e sem burocracia.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", color: SEMI }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.brand;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = SEMI;
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Navegação
            </p>
            <ul className="space-y-3">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Programas */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Programas aceitos
            </p>
            <ul className="space-y-3">
              {PROGRAMS.map((p) => (
                <li key={p}>
                  <FooterLink href="#">{p}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Contato
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  E-mail
                </p>
                <a
                  href="mailto:contato@tropicalmilhas.com.br"
                  className="text-sm transition-colors duration-150 focus-visible:outline-none"
                  style={{ color: SEMI }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.white; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = SEMI; }}
                >
                  contato@tropicalmilhas.com.br
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  WhatsApp
                </p>
                <a
                  href="#"
                  className="text-sm transition-colors duration-150 focus-visible:outline-none"
                  style={{ color: SEMI }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.white; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = SEMI; }}
                >
                  (11) 9 8432-7651
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Atendimento
                </p>
                <p className="text-sm" style={{ color: MUTED }}>
                  Seg–Sex, 9h às 18h
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Divisor full-width */}
      <div style={{ borderTop: `1px solid ${DIVIDER}` }} />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()}{" "}
              <span translate="no">Tropical Milhas</span>.
              Todos os direitos reservados.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
              Tropical Milhas Assessoria em Viagens Ltda. &nbsp;·&nbsp; CNPJ 47.382.951/0001-63
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[["Política de Privacidade", "#"], ["Termos de Uso", "#"]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-xs transition-colors duration-150 focus-visible:outline-none rounded"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = SEMI; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
