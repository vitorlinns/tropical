"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  RiArrowRightLine,
  RiFlightTakeoffLine,
  RiTimeLine,
  RiStarLine,
  RiUserLine,
  RiHeadphoneLine,
} from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp } from "@/lib/animations";
import { colors } from "@/lib/colors";
import type { RemixiconComponentType } from "@remixicon/react";

const highlights: { icon: RemixiconComponentType; label: string }[] = [
  { icon: RiTimeLine,       label: "Emissão em até 24h úteis"     },
  { icon: RiStarLine,       label: "Todos os programas de milhas"  },
  { icon: RiUserLine,       label: "Acompanhamento do pedido"      },
  { icon: RiHeadphoneLine,  label: "Suporte especializado"         },
];

export function CTASection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="contato"
      className="py-32 relative overflow-hidden"
      aria-labelledby="cta-title"
      style={{ backgroundColor: colors.brand }}
    >
      {/* Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/site/pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          filter: "brightness(0) invert(1)",
          opacity: 0.07,
        }}
      />

      {/* Avião decorativo */}
      <motion.div
        animate={shouldReduce ? {} : { y: [0, -12, 0], rotate: [-45, -43, -45] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 right-[8%] pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.1 }}
      >
        <RiFlightTakeoffLine size={160} style={{ color: colors.white }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Esquerda — copy com blur */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <h2
              id="cta-title"
              className="font-display font-medium text-4xl md:text-5xl leading-tight mb-5"
              style={{ color: colors.white }}
            >
              <AnimatedText text="Reserve sua"    className="block" />
              <AnimatedText text="próxima viagem" className="block" delay={0.06} />
              <AnimatedText text="agora."         className="block" delay={0.12} />
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: colors.white }}>
              Escolha seu destino, informe suas milhas e finalize a compra em
              minutos. Nossa equipe cuida de todo o processo de emissão.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm"
                  style={{ color: colors.white }}>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)" }}
                  >
                    <Icon size={14} style={{ color: colors.white }} aria-hidden="true" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Direita — card de ação */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          >
            <div className="rounded-3xl p-8" style={{ backgroundColor: colors.white }}>
              <p className="font-display font-bold text-xl mb-2" style={{ color: colors.ink }}>
                Pronto para voar?
              </p>
              <p className="text-sm mb-6" style={{ color: colors.muted }}>
                Encontre o destino ideal e reserve com suas milhas.
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="#destinos"
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: colors.brand, color: colors.white }}
                >
                  <span>Ver destinos disponíveis</span>
                  <RiArrowRightLine size={16} aria-hidden="true" />
                </a>
                <a
                  href="#calculadora"
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                  style={{ backgroundColor: colors.surface, color: colors.ink, border: `1px solid ${colors.border}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface2; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
                >
                  <span>Simular com minhas milhas</span>
                  <RiArrowRightLine size={16} aria-hidden="true" />
                </a>
              </div>

              <p className="text-center text-xs" style={{ color: colors.mutedLight }}>
                Taxa de emissão a partir de{" "}
                <span style={{ color: colors.ink, fontWeight: 600 }}>R$ 189,00</span>
                {" "}por passagem
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
