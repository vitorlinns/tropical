"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RiCloseLine,
  RiMapPinLine,
  RiFlightTakeoffLine,
  RiTimeLine,
  RiShoppingBag3Line,
  RiCheckLine,
} from "@remixicon/react";
import { useCart } from "@/lib/cart-context";
import { useMounted } from "@/lib/hooks/useMounted";
import { featuredFlights } from "@/lib/data/flights";
import type { Destination } from "@/lib/data/destinations";
import { fmtNumber } from "@/lib/utils";

interface Props {
  destination: Destination | null;
  onClose: () => void;
}

function Panel({ destination: dest, onClose }: { destination: Destination; onClose: () => void }) {
  const { addItem, isInCart } = useCart();
  const dialogRef = useRef<HTMLDivElement>(null);

  const relatedFlights = featuredFlights.filter(
    (f) => f.destination.toLowerCase() === dest.city.toLowerCase()
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    setTimeout(() => dialogRef.current?.focus(), 50);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ backgroundColor: "var(--color-black-40)" }}
        className="fixed inset-0 z-[60] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${dest.city}, ${dest.country}`}
        tabIndex={-1}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }}
        exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
        className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md flex flex-col focus-visible:outline-none overflow-y-auto no-scrollbar"
        style={{ backgroundColor: "var(--color-white)", boxShadow: "-8px 0 32px rgba(0,0,0,0.10)", overscrollBehavior: "contain" }}
      >
        {/* Hero image */}
        <div className="relative h-60 flex-shrink-0">
          <Image
            src={dest.imageUrl}
            alt={`${dest.city}, ${dest.country}`}
            fill
            sizes="448px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "var(--color-white)", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.45)"; }}
            aria-label="Fechar"
          >
            <RiCloseLine size={18} aria-hidden="true" />
          </button>

          <div className="absolute top-4 left-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              dest.directFlight ? "bg-brand text-white" : "bg-black/40 text-white/80 backdrop-blur-sm"
            }`}>
              {dest.directFlight ? "Voo direto" : "Com escala"}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white/60 text-xs flex items-center gap-1 mb-1">
              <RiMapPinLine size={11} aria-hidden="true" />
              {dest.country}
            </p>
            <h2 className="font-display font-bold text-3xl text-white leading-tight">{dest.city}</h2>
            <p className="text-white/70 text-sm mt-0.5">{dest.highlight}</p>
          </div>
        </div>

        {/* Miles summary */}
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: `1px solid var(--color-border)` }}>
          <div>
            <p className="text-xs mb-0.5" style={{ color: "var(--color-muted)" }}>A partir de</p>
            <p className="font-display font-bold text-2xl" style={{ color: "var(--color-ink)" }}>
              {fmtNumber(dest.miles)}
              <span className="text-sm font-normal ml-1.5" style={{ color: "var(--color-muted)" }}>milhas</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs mb-0.5" style={{ color: "var(--color-muted)" }}>Aeroporto</p>
            <p className="font-mono font-bold text-lg" style={{ color: "var(--color-ink)" }}>{dest.code}</p>
          </div>
        </div>

        {/* Flights */}
        <div className="flex-1 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--color-muted)" }}>
            Voos disponíveis
          </p>

          {relatedFlights.length === 0 ? (
            <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--color-surface)" }}>
              <RiFlightTakeoffLine size={28} className="mx-auto mb-3" style={{ color: "var(--color-muted-lighter)" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-ink)" }}>Em breve para {dest.city}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Novos voos são adicionados frequentemente. Entre em contato para verificar disponibilidade.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {relatedFlights.map((flight) => {
                const inCart = isInCart(flight.id);
                return (
                  <div key={flight.id} className="rounded-2xl p-4"
                    style={{ border: `1px solid var(--color-border)` }}>
                    {/* Airline + route */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center overflow-hidden p-0.5 flex-shrink-0"
                        style={{ borderColor: "var(--color-border)" }}>
                        <Image src={flight.airlineLogo} alt={flight.airline}
                          width={24} height={24} className="object-contain w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: "var(--color-ink)" }}>
                          {flight.originCode} → {flight.destinationCode}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                          {flight.airline} · {flight.flightClass}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display font-bold text-sm" style={{ color: "var(--color-brand)" }}>
                          {fmtNumber(flight.miles)}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--color-muted)" }}>milhas</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: "var(--color-muted)" }}>
                      <span className="flex items-center gap-1">
                        <RiTimeLine size={11} aria-hidden="true" />
                        {flight.duration}
                      </span>
                      <span>·</span>
                      <span>{flight.stops === "direto" ? "Voo direto" : "1 escala"}</span>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => { if (!inCart) addItem(flight); }}
                      disabled={inCart}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
                      style={{
                        backgroundColor: inCart ? "var(--color-surface-2)" : "var(--color-brand)",
                        color: inCart ? "var(--color-muted)" : "var(--color-white)",
                        cursor: inCart ? "default" : "pointer",
                      }}
                    >
                      {inCart
                        ? <><RiCheckLine size={15} aria-hidden="true" /> Adicionado ao carrinho</>
                        : <><RiShoppingBag3Line size={15} aria-hidden="true" /> Adicionar ao carrinho</>
                      }
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export function DestinationDrawer({ destination, onClose }: Props) {
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {destination && <Panel destination={destination} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
