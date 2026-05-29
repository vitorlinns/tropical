"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RiFlightTakeoffLine, RiTicket2Line, RiUserLine, RiArrowRightLine } from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { colors } from "@/lib/colors";

const steps = [
  {
    icon: RiFlightTakeoffLine,
    number: "01",
    title: "Escolha sua viagem",
    description: "Busque entre dezenas de destinos e selecione o voo que cabe nas suas milhas.",
  },
  {
    icon: RiTicket2Line,
    number: "02",
    title: "Informe suas milhas",
    description: "Diga qual programa você usa e quantas milhas tem. Calculamos tudo na hora.",
  },
  {
    icon: RiUserLine,
    number: "03",
    title: "Acompanhe na sua conta",
    description: "Faça login e veja o status da emissão em tempo real, sem precisar ligar para ninguém.",
  },
];

export function HowItWorks() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="como-funciona"
      className="py-28 bg-[#F9F7F4] relative overflow-hidden"
      aria-labelledby="how-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/site/secao-como-funciona.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <h2 id="how-title" className="font-display font-bold text-4xl md:text-5xl text-[#111111] leading-tight">
            <AnimatedText text="Três passos para" className="block" />
            <AnimatedText text="usar suas milhas" className="text-[#FF6B35] block" delay={0.1} />
          </h2>
        </div>

        {/* Steps */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={shouldReduce ? {} : fadeUp}
                custom={i * 0.1}
                className="card p-8 bg-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF1EC] flex items-center justify-center">
                    <Icon size={20} className="text-[#FF6B35]" aria-hidden="true" />
                  </div>
                  <span className="font-display font-bold text-4xl text-[#F0EDE9]" aria-hidden="true">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#111111] mb-3">{step.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="mt-12 flex items-center gap-4"
        >
          <a
            href="#destinos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: colors.brand, color: colors.white }}
          >
            Ver destinos
            <RiArrowRightLine size={16} aria-hidden="true" />
          </a>
          <p className="text-sm" style={{ color: colors.muted }}>Passagem emitida em até 24h úteis</p>
        </motion.div>
      </div>
    </section>
  );
}
