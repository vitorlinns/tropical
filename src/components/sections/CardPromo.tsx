"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  RiFlightTakeoffLine,
  RiStarLine,
  RiTimeLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp } from "@/lib/animations";

const GOLD = "#D4AF37";

const benefits = [
  { icon: RiFlightTakeoffLine, text: "Complete as milhas que faltam para qualquer destino" },
  { icon: RiStarLine,          text: "Acumule milhas em todas as suas compras"             },
  { icon: RiTimeLine,          text: "Aprovação e emissão em até 24 horas"                 },
];

function CreditCard() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);

  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const rotateX    = useSpring(rotateXRaw, { stiffness: 300, damping: 30 });
  const rotateY    = useSpring(rotateYRaw, { stiffness: 300, damping: 30 });
  const shineX     = useTransform(mouseX, [-0.5, 0.5], ["-80%", "180%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      {/* Sombra flutuante */}
      <div
        className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-64 h-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative rounded-[22px] overflow-hidden select-none"
        aria-label="Cartão Tropical Milhas Black"
      >
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{
            width: 360,
            height: 227,
            boxShadow: "0 32px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(212,175,55,0.18)",
          }}
        >
          {/* Fundo black */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #2A2A2A 0%, #141414 55%, #0A0A0A 100%)" }}
          />

          {/* Textura pattern em dourado */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/images/site/pattern.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
              filter: `brightness(0) saturate(100%) invert(78%) sepia(55%) saturate(400%) hue-rotate(5deg)`,
              opacity: 0.07,
            }}
          />

          {/* Shine dourado (segue o mouse) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 25%, rgba(212,175,55,0.18) 50%, transparent 75%)`,
              x: shineX,
            }}
          />

          {/* Borda interna sutil dourada */}
          <div
            className="absolute inset-[1px] rounded-[21px] pointer-events-none"
            style={{ border: "1px solid rgba(212,175,55,0.12)" }}
          />

          {/* Conteúdo */}
          <div className="relative h-full flex flex-col justify-between p-6">

            {/* Topo */}
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="font-display font-bold text-lg leading-none tracking-wide"
                  style={{ color: GOLD }}
                >
                  Tropical
                </p>
                <p
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: `${GOLD}90` }}
                >
                  Milhas
                </p>
              </div>
              {/* Contactless dourado */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12a7 7 0 0 1 7-7"              stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
                <path d="M7.5 12a4.5 4.5 0 0 1 4.5-4.5"   stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <path d="M10 12a2 2 0 0 1 2-2"             stroke={GOLD} strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="1.25" fill={GOLD}/>
              </svg>
            </div>

            {/* Chip dourado */}
            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" aria-hidden="true">
              <rect width="44" height="34" rx="5" fill="#C8960C"/>
              <rect x="0.5" y="0.5" width="43" height="33" rx="4.5" stroke="#A07808" strokeWidth="0.75"/>
              <line x1="0" y1="11.5" x2="44" y2="11.5" stroke="#A07808" strokeWidth="0.75"/>
              <line x1="0" y1="22.5" x2="44" y2="22.5" stroke="#A07808" strokeWidth="0.75"/>
              <line x1="14.5" y1="0" x2="14.5" y2="34" stroke="#A07808" strokeWidth="0.75"/>
              <line x1="29.5" y1="0" x2="29.5" y2="34" stroke="#A07808" strokeWidth="0.75"/>
              <rect x="14.5" y="11.5" width="15" height="11" rx="1.5" fill="#E8B820" stroke="#A07808" strokeWidth="0.5"/>
            </svg>

            {/* Rodapé */}
            <div>
              <p
                className="font-mono text-sm tracking-[0.22em] mb-4"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                •••• •••• •••• 0001
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    Titular
                  </p>
                  <p className="text-xs font-semibold tracking-wider" style={{ color: GOLD }}>
                    TROPICAL MILHAS
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    Validade
                  </p>
                  <p className="text-xs font-semibold" style={{ color: GOLD }}>12/29</p>
                </div>
                {/* Logo rede */}
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: "#EB001B", opacity: 0.85 }} />
                  <div className="w-8 h-8 rounded-full -ml-3" style={{ backgroundColor: "#F79E1B", opacity: 0.85 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CardPromo() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-28 relative overflow-hidden"
      aria-labelledby="card-title"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Esquerda — copy */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: "var(--color-brand-light)",
                color: "var(--color-brand)",
                border: `1px solid var(--color-brand-mid)`,
              }}
            >
              <RiFlightTakeoffLine size={13} aria-hidden="true" />
              Cartão Tropical Milhas
            </div>

            <h2
              id="card-title"
              className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6"
              style={{ color: "var(--color-ink)" }}
            >
              <AnimatedText text="Faltou milhas?" className="block" />
              <AnimatedText text="A gente resolve." className="block text-brand" delay={0.1} />
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-muted)" }}>
              Use o Cartão Tropical para cobrir a diferença e garantir sua passagem.
              Simples, rápido e sem burocracia.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "var(--color-brand-light)",
                      border: `1px solid var(--color-brand-mid)`,
                    }}
                  >
                    <Icon size={17} style={{ color: "var(--color-brand)" }} aria-hidden="true" />
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-ink-3)" }}>{text}</p>
                </div>
              ))}
            </div>

            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: "var(--color-ink)", color: "var(--color-white)" }}
            >
              Solicitar cartão
              <RiArrowRightLine size={16} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Direita — mockup */}
          <motion.div
            variants={shouldReduce ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="flex justify-center lg:justify-end"
          >
            <CreditCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
