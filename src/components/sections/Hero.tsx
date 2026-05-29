"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plane, Clock, MapPin } from "lucide-react";
import {
  RiShoppingBag3Line,
  RiCheckLine,
} from "@remixicon/react";
import Image from "next/image";
import { featuredFlights, type Flight } from "@/lib/data/flights";
import { useCart } from "@/lib/cart-context";

/* ─── Progress bar ─────────────────────────────────────────── */
function ProgressBar({ active, total, progress }: { active: number; total: number; progress: number }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slides do carrossel">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} role="presentation" className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-none"
            style={{ width: i < active ? "100%" : i === active ? `${progress}%` : "0%" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Flight info card ──────────────────────────────────────── */
function FlightCard({ flight }: { flight: Flight }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(flight.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 } }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-full max-w-sm"
    >
      {/* Route */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-center">
          <p className="font-display font-bold text-white text-xl leading-none">{flight.originCode}</p>
          <p className="text-white/50 text-xs mt-0.5">{flight.origin}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 w-full">
            <div className="h-px flex-1 bg-white/30" />
            <Plane size={14} className="text-white/60 rotate-0" aria-hidden="true" />
            <div className="h-px flex-1 bg-white/30" />
          </div>
          <span className="text-white/40 text-[10px]">{flight.stops}</span>
        </div>
        <div className="text-center">
          <p className="font-display font-bold text-white text-xl leading-none">{flight.destinationCode}</p>
          <p className="text-white/50 text-xs mt-0.5">{flight.destination}</p>
        </div>
      </div>

      {/* Details row */}
      <div className="grid grid-cols-3 gap-2 mb-5 py-4 border-y border-white/10">
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Companhia</p>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-white flex items-center justify-center flex-shrink-0 overflow-hidden p-0.5">
              <Image
                src={flight.airlineLogo}
                alt={flight.airline}
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white text-xs font-medium leading-tight truncate">{flight.airline}</p>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Classe</p>
          <p className="text-white text-xs font-medium">{flight.flightClass}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Duração</p>
          <p className="text-white text-xs font-medium flex items-center gap-1">
            <Clock size={10} aria-hidden="true" />
            {flight.duration}
          </p>
        </div>
      </div>

      {/* Miles + CTA */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-wider">A partir de</p>
          <p className="font-display font-bold text-white text-lg leading-tight">
            {Intl.NumberFormat("pt-BR").format(flight.miles)}
            <span className="text-white/60 font-normal text-sm ml-1">milhas</span>
          </p>
        </div>
        <button
          onClick={() => addItem(flight)}
          disabled={inCart}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-transparent ${
            inCart
              ? "bg-white/20 text-white/70 cursor-default"
              : "bg-[#FF6B35] hover:bg-[#E85D2B] text-white"
          }`}
          aria-label={inCart ? "Já adicionado às suas compras" : `Adicionar ${flight.destination} às suas compras`}
          style={{ touchAction: "manipulation" }}
        >
          {inCart
            ? <><RiCheckLine size={13} aria-hidden="true" /> Adicionado</>
            : <><RiShoppingBag3Line size={13} aria-hidden="true" /> Adicionar</>
          }
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────── */
const DURATION = 6000;

export function Hero() {
  const [active,   setActive]   = useState(0);
  const [dir,      setDir]      = useState(1);
  const [progress, setProgress] = useState(0);
  const shouldReduce = useReducedMotion();
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef       = useRef<number | null>(null);
  const startRef     = useRef<number>(0);

  const goTo = useCallback((index: number, direction: number) => {
    setDir(direction);
    setActive(index);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % featuredFlights.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + featuredFlights.length) % featuredFlights.length, -1);
  }, [active, goTo]);

  /* Auto-advance + progress */
  useEffect(() => {
    if (shouldReduce) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct     = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        setActive((v) => {
          const next = (v + 1) % featuredFlights.length;
          setDir(1);
          return next;
        });
        setProgress(0);
        startRef.current = performance.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [shouldReduce]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const flight = featuredFlights[active];

  const imgVariants = {
    enter: (d: number) => ({ opacity: 0, scale: 1.04, x: d * 30 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
    exit:   (d: number) => ({ opacity: 0, scale: 0.98, x: d * -20, transition: { duration: 0.5 } }),
  };

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[#111111]"
      aria-label="Destinos em destaque"
      aria-roledescription="carrossel"
    >
      {/* ── Background images ── */}
      <AnimatePresence initial={false} custom={dir} mode="sync">
        <motion.div
          key={flight.id}
          custom={dir}
          variants={shouldReduce ? {} : imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src={flight.image}
            alt={`${flight.destination}, ${flight.country}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={active === 0}
            loading={active === 0 ? "eager" : "lazy"}
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 pt-28 pb-10 max-w-7xl mx-auto">

        {/* Top: destination name */}
        <div className="flex-1 flex flex-col justify-end pb-8">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`text-${flight.id}`}
              custom={dir}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: 0.1 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              className="mb-8"
            >
              <p className="text-white text-sm font-medium flex items-center gap-1.5 mb-3">
                <MapPin size={13} aria-hidden="true" />
                {flight.country}
              </p>
              <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight">
                {flight.destination}
              </h1>
              <p className="text-white text-base mt-3">{flight.tagline}</p>
            </motion.div>
          </AnimatePresence>

          {/* Bottom row: flight card + controls */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            {/* Flight card */}
            <AnimatePresence mode="wait">
              <FlightCard key={`card-${flight.id}`} flight={flight} />
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col gap-4 items-end flex-shrink-0">
              {/* Progress */}
              <div className="w-48">
                <ProgressBar active={active} total={featuredFlights.length} progress={progress} />
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Destino anterior"
                  style={{ touchAction: "manipulation" }}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Próximo destino"
                  style={{ touchAction: "manipulation" }}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Slide counter */}
              <p className="text-white/40 text-sm tabular-nums">
                <span className="text-white font-semibold">{String(active + 1).padStart(2, "0")}</span>
                {" / "}
                {String(featuredFlights.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip (desktop) ── */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col justify-center gap-2 pr-4 z-20"
        role="tablist"
        aria-label="Navegar por destino"
      >
        {featuredFlights.map((f, i) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`${f.destination}, ${f.country}`}
            onClick={() => goTo(i, i > active ? 1 : -1)}
            className={`relative w-14 overflow-hidden rounded-xl border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              i === active
                ? "h-20 border-white opacity-100"
                : "h-12 border-transparent opacity-40 hover:opacity-70"
            }`}
            style={{ touchAction: "manipulation" }}
          >
            <Image
              src={f.image}
              alt={f.destination}
              fill
              sizes="56px"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
