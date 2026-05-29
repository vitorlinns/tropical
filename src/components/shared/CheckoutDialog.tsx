"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFlightTakeoffLine,
  RiShieldCheckLine,
  RiCheckboxCircleLine,
  RiBankCardLine,
  RiUserLine,
  RiLockLine,
} from "@remixicon/react";
import { useCart } from "@/lib/cart-context";
import { colors } from "@/lib/colors";

const SERVICE_FEE = 189; // R$ por passagem

/* ─── Helpers ─────────────────────────────────────────────── */
function maskCPF(v: string) {
  return v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskPhone(v: string) {
  return v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}
function maskCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16)
    .replace(/(\d{4})/g, "$1 ").trim();
}
function maskExpiry(v: string) {
  return v.replace(/\D/g, "").slice(0, 4)
    .replace(/(\d{2})(\d)/, "$1/$2");
}
function randomOrderId() {
  return "TM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

/* ─── Step indicators ─────────────────────────────────────── */
const STEPS = ["Resumo", "Passageiro", "Pagamento", "Confirmação"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300"
              style={{
                backgroundColor: i <= current ? colors.brand : colors.surface2,
                color: i <= current ? colors.white : colors.mutedLight,
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span className="text-[10px] whitespace-nowrap" style={{ color: i <= current ? colors.brand : colors.mutedLight }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mx-1 mb-4 transition-colors duration-300"
              style={{ backgroundColor: i < current ? colors.brand : colors.border }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Field ───────────────────────────────────────────────── */
function Field({
  label, id, value, onChange, placeholder, type = "text", maxLength, error,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; placeholder?: string;
  type?: string; maxLength?: number; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: colors.ink }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 transition-colors"
        style={{
          border: `1px solid ${error ? colors.danger : colors.border}`,
          color: colors.ink,
          backgroundColor: colors.white,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = error ? colors.danger : colors.brand; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? colors.danger : colors.border; }}
      />
      {error && <p className="text-xs mt-1" style={{ color: colors.danger }}>{error}</p>}
    </div>
  );
}

/* ─── Steps ───────────────────────────────────────────────── */
function StepResumo({ onNext }: { onNext: () => void }) {
  const { items } = useCart();
  const total = items.length * SERVICE_FEE;

  return (
    <div>
      <h3 className="font-display font-bold text-lg mb-4" style={{ color: colors.ink }}>
        Resumo do pedido
      </h3>

      <div className="space-y-3 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.brandLight }}>
              <RiFlightTakeoffLine size={16} style={{ color: colors.brand }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: colors.ink }}>
                {item.flight.originCode} → {item.flight.destinationCode}
              </p>
              <p className="text-xs truncate" style={{ color: colors.muted }}>
                {item.flight.destination} · {item.flight.airline}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs" style={{ color: colors.muted }}>Taxa de emissão</p>
              <p className="font-bold text-sm" style={{ color: colors.ink }}>
                {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(SERVICE_FEE)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: colors.brandLight, border: `1px solid ${colors.brandMid}` }}>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: colors.ink3 }}>Taxa de emissão ({items.length}x)</span>
          <span style={{ color: colors.ink }}>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: colors.ink3 }}>Milhas utilizadas</span>
          <span style={{ color: colors.ink }}>{Intl.NumberFormat("pt-BR").format(items.reduce((s, i) => s + i.flight.miles, 0))} mi</span>
        </div>
        <div className="h-px my-2" style={{ backgroundColor: colors.brandMid }} />
        <div className="flex justify-between font-bold">
          <span style={{ color: colors.ink }}>Total a pagar</span>
          <span style={{ color: colors.brand }}>
            {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}
          </span>
        </div>
      </div>

      <p className="text-xs mb-5" style={{ color: colors.muted }}>
        As milhas serão debitadas do seu programa após a confirmação do pagamento.
        A passagem é emitida em até 24h úteis.
      </p>

      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
        style={{ backgroundColor: colors.brand, color: colors.white }}
      >
        Continuar
        <RiArrowRightLine size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

type PassengerData = { name: string; email: string; cpf: string; phone: string; birthdate: string };

function StepPassageiro({ onNext, onBack, data, setData }: {
  onNext: () => void; onBack: () => void;
  data: PassengerData; setData: (d: PassengerData) => void;
}) {
  const [errors, setErrors] = useState<Partial<PassengerData>>({});

  const validate = () => {
    const e: Partial<PassengerData> = {};
    if (!data.name.trim() || data.name.trim().split(" ").length < 2) e.name = "Informe o nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "E-mail inválido";
    if (data.cpf.replace(/\D/g, "").length < 11) e.cpf = "CPF incompleto";
    if (data.phone.replace(/\D/g, "").length < 10) e.phone = "Telefone incompleto";
    if (!data.birthdate) e.birthdate = "Informe a data de nascimento";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <h3 className="font-display font-bold text-lg mb-4" style={{ color: colors.ink }}>
        Dados do passageiro
      </h3>

      <div className="space-y-4 mb-6">
        <Field label="Nome completo" id="name" value={data.name} error={errors.name}
          onChange={(v) => setData({ ...data, name: v })} placeholder="Como no documento de viagem" />
        <Field label="E-mail" id="email" type="email" value={data.email} error={errors.email}
          onChange={(v) => setData({ ...data, email: v })} placeholder="seu@email.com" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="CPF" id="cpf" value={data.cpf} error={errors.cpf} maxLength={14}
            onChange={(v) => setData({ ...data, cpf: maskCPF(v) })} placeholder="000.000.000-00" />
          <Field label="Telefone" id="phone" value={data.phone} error={errors.phone} maxLength={15}
            onChange={(v) => setData({ ...data, phone: maskPhone(v) })} placeholder="(00) 00000-0000" />
        </div>
        <Field label="Data de nascimento" id="birthdate" type="date" value={data.birthdate} error={errors.birthdate}
          onChange={(v) => setData({ ...data, birthdate: v })} />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
          style={{ border: `1px solid ${colors.border}`, color: colors.ink2, backgroundColor: colors.white }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; }}
        >
          <RiArrowLeftLine size={15} aria-hidden="true" /> Voltar
        </button>
        <button onClick={() => validate() && onNext()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
          style={{ backgroundColor: colors.brand, color: colors.white }}
        >
          Continuar <RiArrowRightLine size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type PaymentData = { cardNumber: string; cardName: string; expiry: string; cvv: string };

function StepPagamento({ onNext, onBack, data, setData, total }: {
  onNext: () => void; onBack: () => void;
  data: PaymentData; setData: (d: PaymentData) => void; total: number;
}) {
  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<PaymentData> = {};
    if (data.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Número inválido";
    if (!data.cardName.trim()) e.cardName = "Informe o nome";
    if (data.expiry.replace(/\D/g, "").length < 4) e.expiry = "Validade inválida";
    if (data.cvv.length < 3) e.cvv = "CVV inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 2000);
  };

  return (
    <div>
      <h3 className="font-display font-bold text-lg mb-1" style={{ color: colors.ink }}>Pagamento</h3>
      <p className="text-sm mb-5" style={{ color: colors.muted }}>Taxa de emissão de passagem ambiente simulado</p>

      <div className="rounded-xl p-4 mb-5 flex items-center justify-between" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
        <div className="flex items-center gap-2">
          <RiBankCardLine size={18} style={{ color: colors.brand }} aria-hidden="true" />
          <span className="text-sm font-medium" style={{ color: colors.ink }}>Total a pagar</span>
        </div>
        <span className="font-display font-bold text-lg" style={{ color: colors.brand }}>
          {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}
        </span>
      </div>

      <div className="space-y-4 mb-5">
        <Field label="Número do cartão" id="cardNumber" value={data.cardNumber} error={errors.cardNumber} maxLength={19}
          onChange={(v) => setData({ ...data, cardNumber: maskCard(v) })} placeholder="0000 0000 0000 0000" />
        <Field label="Nome no cartão" id="cardName" value={data.cardName} error={errors.cardName}
          onChange={(v) => setData({ ...data, cardName: v.toUpperCase() })} placeholder="COMO IMPRESSO NO CARTÃO" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Validade" id="expiry" value={data.expiry} error={errors.expiry} maxLength={5}
            onChange={(v) => setData({ ...data, expiry: maskExpiry(v) })} placeholder="MM/AA" />
          <Field label="CVV" id="cvv" value={data.cvv} error={errors.cvv} maxLength={4}
            onChange={(v) => setData({ ...data, cvv: v.replace(/\D/g, "") })} placeholder="000" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: colors.muted }}>
        <RiLockLine size={13} aria-hidden="true" />
        Ambiente de simulação nenhum dado é processado ou armazenado.
      </div>

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
          style={{ border: `1px solid ${colors.border}`, color: colors.ink2, backgroundColor: colors.white }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; }}
          disabled={loading}
        >
          <RiArrowLeftLine size={15} aria-hidden="true" /> Voltar
        </button>
        <button onClick={handlePay} disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 disabled:opacity-70"
          style={{ backgroundColor: colors.brand, color: colors.white }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processando…
            </span>
          ) : (
            <>
              <RiShieldCheckLine size={15} aria-hidden="true" />
              Pagar {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StepConfirmacao({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const { items, clear } = useCart();

  useEffect(() => { clear(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center text-center py-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 18 } }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: colors.brandLight }}
      >
        <RiCheckboxCircleLine size={44} style={{ color: colors.brand }} aria-hidden="true" />
      </motion.div>

      <h3 className="font-display font-bold text-2xl mb-2" style={{ color: colors.ink }}>
        Pedido confirmado!
      </h3>
      <p className="text-sm mb-1" style={{ color: colors.muted }}>Número do pedido</p>
      <p className="font-mono font-bold text-lg mb-5" style={{ color: colors.brand }}>{orderId}</p>

      <div className="w-full rounded-xl p-4 mb-6 text-left space-y-2" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
        {[
          "Você receberá um e-mail com os detalhes do pedido",
          "Nossa equipe emitirá sua passagem em até 24h úteis",
          "As milhas serão debitadas após a emissão",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: colors.ink3 }}>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: colors.brandLight, color: colors.brand }}>{i + 1}</span>
            {step}
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
        style={{ backgroundColor: colors.brand, color: colors.white }}
      >
        Concluir
      </button>
    </div>
  );
}

/* ─── Main dialog ──────────────────────────────────────────── */
interface Props { open: boolean; onClose: () => void; }

function CheckoutPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep]       = useState(0);
  const [orderId]             = useState(randomOrderId);
  const dialogRef             = useRef<HTMLDivElement>(null);

  const [passenger, setPassenger] = useState<PassengerData>(
    { name: "", email: "", cpf: "", phone: "", birthdate: "" }
  );
  const [payment, setPayment] = useState<PaymentData>(
    { cardNumber: "", cardName: "", expiry: "", cvv: "" }
  );

  const { items } = useCart();
  const total = items.length * SERVICE_FEE;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && step < 3) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => { setTimeout(() => dialogRef.current?.focus(), 50); }, []);

  return (
    <>
      <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] backdrop-blur-sm" style={{ backgroundColor: colors.black40 }}
        onClick={() => step < 3 && onClose()} aria-hidden="true" />

      <motion.div key="modal" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Finalizar compra"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }}
        exit={{ opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.2 } }}
        className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-[71] rounded-3xl shadow-2xl flex flex-col overflow-hidden focus-visible:outline-none"
        style={{ backgroundColor: colors.white }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: `1px solid ${colors.border}` }}>
          <div className="flex items-center gap-2">
            <RiFlightTakeoffLine size={18} style={{ color: colors.brand }} aria-hidden="true" />
            <span className="font-display font-bold text-base" style={{ color: colors.ink }}>Finalizar compra</span>
          </div>
          {step < 3 && (
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{ color: colors.muted }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; e.currentTarget.style.color = colors.ink; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.muted; }}
              aria-label="Fechar checkout"
            >
              <RiCloseLine size={18} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <StepBar current={step} />

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, x: -16, transition: { duration: 0.15 } }}
            >
              {step === 0 && <StepResumo onNext={() => setStep(1)} />}
              {step === 1 && <StepPassageiro onNext={() => setStep(2)} onBack={() => setStep(0)} data={passenger} setData={setPassenger} />}
              {step === 2 && <StepPagamento onNext={() => setStep(3)} onBack={() => setStep(1)} data={payment} setData={setPayment} total={total} />}
              {step === 3 && <StepConfirmacao orderId={orderId} onClose={onClose} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export function CheckoutDialog({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>{open && <CheckoutPanel onClose={onClose} />}</AnimatePresence>,
    document.body
  );
}
