"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { testimonials } from "@/lib/data/destinations";
import { fadeUp } from "@/lib/animations";

export function Testimonials() {
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setActive((v) => (v + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[active];

  const variants: import("framer-motion").Variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 30 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit:   (d: number) => ({ opacity: 0, x: d * -30, transition: { duration: 0.25 } }),
  };

  return (
    <section id="depoimentos" className="py-28 bg-white" aria-labelledby="testi-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — heading */}
          <div>
            <h2 id="testi-title" className="font-display font-bold text-4xl md:text-5xl text-[#111111] leading-tight mb-8">
              <AnimatedText text="Quem já voou" className="block" />
              <AnimatedText text="com a gente" className="text-[#FF6B35] block" delay={0.1} />
            </h2>

            {/* Mini cards */}
            <div className="grid grid-cols-2 gap-3">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                    i === active
                      ? "border-[#FF6B35] bg-[#FFF1EC]"
                      : "border-[#E8E4DF] bg-white hover:border-[#FFD5C0]"
                  }`}
                  aria-label={`Ver depoimento de ${item.name}`}
                  style={{ touchAction: "manipulation" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === active ? "bg-[#FF6B35] text-white" : "bg-[#F0EDE9] text-[#888888]"
                    }`} aria-hidden="true">
                      {item.avatar}
                    </div>
                    <span className="text-xs font-semibold text-[#111111] truncate">{item.name}</span>
                  </div>
                  <p className="text-xs text-[#888888]">Voou para {item.destination}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right — testimonial */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            <div className="card bg-[#F9F7F4] border-[#F0EDE9] p-8 md:p-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FF6B35] text-[#FF6B35]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative overflow-hidden min-h-[100px] mb-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={t.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-lg md:text-xl text-[#111111] leading-relaxed font-medium"
                  >
                    &ldquo;{t.text}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center font-bold text-sm text-white" aria-hidden="true">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111111] text-sm">{t.name}</p>
                    <p className="text-[#888888] text-xs">{t.city} &middot; {t.destination}</p>
                  </div>
                </div>

                {/* Nav */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    className="w-9 h-9 rounded-xl border border-[#E8E4DF] bg-white flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                    aria-label="Depoimento anterior"
                    style={{ touchAction: "manipulation" }}
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="w-9 h-9 rounded-xl border border-[#E8E4DF] bg-white flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                    aria-label="Próximo depoimento"
                    style={{ touchAction: "manipulation" }}
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
