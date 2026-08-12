"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  RiArrowRightLine,
  RiGiftLine,
  RiExchangeDollarLine,
  RiVipCrownLine,
} from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp } from "@/lib/animations";

const perks = [
  {
    icon: RiExchangeDollarLine,
    title: "Complete o que falta",
    text:  "Cubra as milhas restantes e garanta sua passagem na hora.",
  },
  {
    icon: RiGiftLine,
    title: "Ganhe milhas em tudo",
    text:  "1,5 milha por R$ 1 em qualquer compra.",
  },
  {
    icon: RiVipCrownLine,
    title: "Benefícios Black",
    text:  "Sala VIP, seguro viagem e concierge 24h inclusos.",
  },
];

/* ─── Seção ──────────────────────────────────────────────────── */
export function CardBlack() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-28 relative overflow-hidden"
      aria-labelledby="card-black-title"
    >
      {/* Fundo escuro */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #111111 0%, #0D0D0D 60%, #141414 100%)" }}
      />

      {/* Pattern quase invisível */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/site/pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          filter: "brightness(0) invert(1)",
          opacity: 0.012,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Esquerda — copy ── */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          

            {/* Título */}
            <h2
              id="card-black-title"
              className="font-display font-bold text-4xl md:text-5xl xl:text-6xl leading-[1.08] mb-6"
              style={{ color: "var(--color-white)" }}
            >
              <AnimatedText text="Cada compra," className="block" />
              <AnimatedText text="uma nova" className="block" delay={0.08} />
              <span style={{ color: "var(--color-brand)" }}>
                <AnimatedText text="viagem." className="block" delay={0.14} />
              </span>
            </h2>

            <p
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: "var(--color-white)" }}
            >
              O Cartão Tropical Black chegou para transformar cada gasto em milhas.
              Complete o que falta para sua passagem e acumule pontos em tudo que comprar.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-5 mb-10">
              {perks.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "var(--color-white-10)", border: `1px solid var(--color-white-15)` }}
                  >
                    <Icon size={18} style={{ color: "var(--color-brand)" }} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-white)" }}>
                      {title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-white-80)" }}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
                style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
              >
                Solicitar cartão
                <RiArrowRightLine size={16} aria-hidden="true" />
              </a>
              <a
                href="#calculadora"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: "var(--color-white-10)",
                  border: `1px solid var(--color-white-15)`,
                  color: "var(--color-white)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-white-20)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-white-10)"; }}
              >
                Simular milhas
              </a>
            </div>
          </motion.div>

          {/* ── Direita — card.png solta, sem container ── */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Image
                src="/images/site/card.png"
                alt="Cartão Tropical Milhas Black Mastercard"
                width={480}
                height={302}
                className="w-full max-w-[480px] drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
