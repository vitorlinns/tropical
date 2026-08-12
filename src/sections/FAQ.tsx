"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RiAddLine, RiSubtractLine, RiArrowRightLine } from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { faqs } from "@/lib/data/destinations";
import { fadeUp } from "@/lib/animations";

export function FAQ() {
  const [open, setOpen]  = useState<number | null>(0);
  const shouldReduce     = useReducedMotion();

  return (
    <section className="py-28" aria-labelledby="faq-title"
      style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <h2 id="faq-title" className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6"
              style={{ color: "var(--color-ink)" }}>
              <AnimatedText text="Perguntas" className="block" />
              <AnimatedText text="frequentes" className="block text-brand" delay={0.1} />
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-muted)" }}>
              Não encontrou sua dúvida? Nossa equipe responde em até 30 minutos.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
            >
              Falar com a equipe
              <RiArrowRightLine size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Right */}
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="space-y-2"
          >
            {faqs.map((faq, i) => (
              <div key={i} className="card bg-white overflow-hidden">
                <dt>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset rounded-[1.25rem]"
                    style={{ ["--tw-ring-color" as string]: "var(--color-brand)" }}
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-semibold text-sm md:text-base leading-snug"
                      style={{ color: "var(--color-ink)" }}>
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                      style={{
                        backgroundColor: open === i ? "var(--color-brand-light)" : "var(--color-surface)",
                      }}
                    >
                      {open === i
                        ? <RiSubtractLine size={14} style={{ color: "var(--color-brand)" }} aria-hidden="true" />
                        : <RiAddLine      size={14} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
                      }
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.dd
                      id={`faq-answer-${i}`}
                      initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.28, ease: "easeOut" as const } }}
                      exit={shouldReduce ? {} : { height: 0, opacity: 0, transition: { duration: 0.2 } }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed pt-4"
                        style={{ color: "var(--color-ink-3)", borderTop: `1px solid var(--color-surface-2)` }}>
                        {faq.a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.dl>

        </div>
      </div>
    </section>
  );
}
