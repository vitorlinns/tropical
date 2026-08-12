"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiFlightTakeoffLine,
  RiTimeLine,
  RiShoppingBag3Line,
  RiArrowRightLine,
} from "@remixicon/react";
import { useCart } from "@/lib/cart-context";
import { useMounted } from "@/lib/hooks/useMounted";
import { fmtNumber } from "@/lib/utils";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

function Panel({ onClose }: { onClose: () => void }) {
  const { items, removeItem, clear } = useCart();
  const router    = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setTimeout(() => dialogRef.current?.focus(), 50);
  }, []);

  const totalMiles = items.reduce((sum, i) => sum + i.flight.miles, 0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: "var(--color-black-40)" }}
        className="fixed inset-0 z-[60] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        key="panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Minhas compras"
        tabIndex={-1}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } }}
        exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
        className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md flex flex-col focus-visible:outline-none"
        style={{ backgroundColor: "var(--color-white)", overscrollBehavior: "contain", boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid var(--color-border)` }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-brand-light)" }}>
              <RiShoppingBag3Line size={17} style={{ color: "var(--color-brand)" }} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base leading-tight" style={{ color: "var(--color-ink)" }}>
                Minhas compras
              </h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {items.length === 0
                  ? "Nenhuma viagem selecionada"
                  : `${items.length} viagem${items.length > 1 ? "ns" : ""} selecionada${items.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-surface)"; e.currentTarget.style.color = "var(--color-ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-muted)"; }}
            aria-label="Fechar carrinho"
          >
            <RiCloseLine size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--color-surface)" }}>
                <RiFlightTakeoffLine size={26} style={{ color: "var(--color-muted-lighter)" }} aria-hidden="true" />
              </div>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                Nenhuma viagem adicionada ainda.<br />
                Escolha um destino na página inicial.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-4"
                  style={{ border: `1px solid var(--color-border)` }}
                >
                  {/* Rota */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base" style={{ color: "var(--color-ink)" }}>
                        {item.flight.originCode}
                      </span>
                      <div className="flex items-center gap-1" style={{ color: "var(--color-muted-lighter)" }}>
                        <div className="h-px w-5" style={{ backgroundColor: "var(--color-border)" }} />
                        <RiFlightTakeoffLine size={13} aria-hidden="true" />
                        <div className="h-px w-5" style={{ backgroundColor: "var(--color-border)" }} />
                      </div>
                      <span className="font-display font-bold text-base" style={{ color: "var(--color-ink)" }}>
                        {item.flight.destinationCode}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      style={{ color: "var(--color-muted-lighter)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-danger-light)"; e.currentTarget.style.color = "var(--color-danger)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-muted-lighter)"; }}
                      aria-label={`Remover ${item.flight.destination}`}
                    >
                      <RiDeleteBinLine size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-ink)" }}>
                    {item.flight.destination}, {item.flight.country}
                  </p>
                  <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                    {item.flight.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 rounded-xl p-3" style={{ backgroundColor: "var(--color-surface)" }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-muted-light)" }}>Companhia</p>
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--color-ink)" }}>{item.flight.airline}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-muted-light)" }}>Classe</p>
                      <p className="text-xs font-semibold" style={{ color: "var(--color-ink)" }}>{item.flight.flightClass}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-muted-light)" }}>Duração</p>
                      <p className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "var(--color-ink)" }}>
                        <RiTimeLine size={10} aria-hidden="true" />
                        {item.flight.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid var(--color-surface-2)` }}>
                    <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>
                      {item.flight.stops === "direto" ? "✈ Voo direto" : "✈ 1 escala"}
                    </span>
                    <span className="font-display font-bold text-sm" style={{ color: "var(--color-brand)" }}>
                      {fmtNumber(item.flight.miles)} milhas
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 space-y-3" style={{ borderTop: `1px solid var(--color-border)` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>Total estimado</span>
              <div className="text-right">
                <span className="font-display font-bold text-lg" style={{ color: "var(--color-ink)" }}>
                  {fmtNumber(totalMiles)}
                </span>
                <span className="text-sm ml-1" style={{ color: "var(--color-muted)" }}>milhas</span>
              </div>
            </div>

            <button
              onClick={() => { onClose(); router.push("/checkout"); }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
              style={{ backgroundColor: "var(--color-brand)", color: "var(--color-white)" }}
            >
              Finalizar compra
              <RiArrowRightLine size={16} aria-hidden="true" />
            </button>

            <button
              onClick={clear}
              className="w-full text-center text-xs py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 rounded"
              style={{ color: "var(--color-muted-light)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-muted)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted-light)"; }}
            >
              Limpar seleção
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export function CartDialog({ open, onClose }: CartDialogProps) {
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>,
    document.body
  );
}
