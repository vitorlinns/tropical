"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  RiFlightTakeoffLine,
  RiMapPinLine,
  RiStarLine,
  RiHandCoinLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { fadeUp } from "@/lib/animations";
import { colors } from "@/lib/colors";
import { fmtNumber } from "@/lib/utils";

const stats: {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  icon: RemixiconComponentType;
}[] = [
  { value: 12000, suffix: "+", prefix: "",    label: "Passagens emitidas",   icon: RiFlightTakeoffLine },
  { value: 47,    suffix: "+", prefix: "",    label: "Destinos disponíveis", icon: RiMapPinLine        },
  { value: 98,    suffix: "%", prefix: "",    label: "Clientes satisfeitos", icon: RiStarLine          },
  { value: 8000,  suffix: "",  prefix: "R$ ", label: "Economizados em média",icon: RiHandCoinLine      },
];

function Counter({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const [count, setCount]   = useState(0);
  const ref                  = useRef<HTMLSpanElement>(null);
  const inView               = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce         = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduce) { setCount(target); return; }
    const duration = 1800;
    const start    = performance.now();
    const raf = requestAnimationFrame(function step(now) {
      const t    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, target, shouldReduce]);

  return (
    <span ref={ref}>
      {prefix}{fmtNumber(count)}{suffix}
    </span>
  );
}

export function Stats() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-label="Números da Tropical Milhas"
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

      <div className="max-w-7xl mx-auto px-6 relative">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={shouldReduce ? {} : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Ícone */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <Icon size={20} style={{ color: colors.white }} aria-hidden="true" />
                </div>

                <dt className="sr-only">{s.label}</dt>
                <dd className="w-full">
                  <p
                    className="font-display font-bold text-4xl md:text-5xl mb-1.5"
                    style={{ color: colors.white }}
                    aria-live="polite"
                  >
                    <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {s.label}
                  </p>
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
