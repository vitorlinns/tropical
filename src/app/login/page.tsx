"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RiMailLine,
  RiLockLine,
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowLeftLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { colors } from "@/lib/colors";
import { Input } from "@/components/shared/Input";

type Tab = "login" | "register";


function PasswordField({ label, id, value, onChange, error }: {
  label: string; id: string; value: string; onChange: (v: string) => void; error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Input
      label={label} id={id} type={show ? "text" : "password"}
      value={value} onChange={onChange} error={error}
      placeholder="••••••••" icon={RiLockLine}
      suffix={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="focus-visible:outline-none"
          style={{ color: colors.muted, cursor: "pointer" }}
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show
            ? <RiEyeOffLine size={16} aria-hidden="true" />
            : <RiEyeLine    size={16} aria-hidden="true" />
          }
        </button>
      }
    />
  );
}

/* ─── Login form ──────────────────────────────────────────── */
function LoginForm() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido";
    if (password.length < 6) e.password = "Mínimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => router.push("/checkout"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input label="E-mail" id="login-email" type="email" value={email}
        onChange={setEmail} placeholder="seu@email.com"
        icon={RiMailLine} error={errors.email} />
      <PasswordField label="Senha" id="login-password"
        value={password} onChange={setPassword} error={errors.password} />
      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs hover:underline focus-visible:outline-none"
          style={{ color: colors.brand, cursor: "pointer" }}
        >
          Esqueci minha senha
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60"
        style={{ backgroundColor: colors.brand, color: colors.white, cursor: loading ? "default" : "pointer" }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Entrando…
          </span>
        ) : "Entrar"}
      </button>
    </form>
  );
}

/* ─── Register form ───────────────────────────────────────── */
function RegisterForm() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().split(" ").length < 2) e.name = "Informe o nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido";
    if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (confirm !== password) e.confirm = "As senhas não coincidem";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => router.push("/checkout"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input label="Nome completo" id="reg-name" value={name} onChange={setName}
        placeholder="Seu nome completo" icon={RiUserLine} error={errors.name} />
      <Input label="E-mail" id="reg-email" type="email" value={email}
        onChange={setEmail} placeholder="seu@email.com" icon={RiMailLine} error={errors.email} />
      <PasswordField label="Senha" id="reg-password"
        value={password} onChange={setPassword} error={errors.password} />
      <PasswordField label="Confirmar senha" id="reg-confirm"
        value={confirm} onChange={setConfirm} error={errors.confirm} />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60"
        style={{ backgroundColor: colors.brand, color: colors.white, cursor: loading ? "default" : "pointer" }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Criando conta…
          </span>
        ) : "Criar conta"}
      </button>
    </form>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.white }}>

      {/* ── Esquerda — form ── */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto">

          {/* Voltar + logo */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-sm focus-visible:outline-none hover:opacity-70 transition-opacity"
              style={{ color: colors.ink3, cursor: "pointer" }}
            >
              <RiArrowLeftLine size={16} aria-hidden="true" />
              Voltar
            </button>
            <a href="/" aria-label="Tropical Milhas — início" style={{ cursor: "pointer" }}>
              <Image src="/isologo.png" alt="Tropical Milhas"
                width={120} height={40} className="h-8 w-auto" priority />
            </a>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}>

            <h1 className="font-display font-bold text-2xl mb-1" style={{ color: colors.ink }}>
              {tab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </h1>
            <p className="text-sm mb-7" style={{ color: colors.muted }}>
              {tab === "login"
                ? "Entre na sua conta."
                : "Cadastre-se grátis."}
            </p>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-colors mb-5 focus-visible:outline-none focus-visible:ring-2"
              style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.white,
                color: colors.ink,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; }}
            >
              <Image src="/images/icons/google.svg" alt="" width={16} height={16} aria-hidden="true" />
              Continuar com Google
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
              <span className="text-xs" style={{ color: colors.mutedLight }}>ou</span>
              <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl p-1 mb-6" style={{ backgroundColor: colors.surface }}>
              {(["login", "register"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: tab === t ? colors.white : "transparent",
                    color: tab === t ? colors.ink : colors.muted,
                    boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    cursor: "pointer",
                  }}
                >
                  {t === "login" ? "Entrar" : "Criar conta"}
                </button>
              ))}
            </div>

            {/* Form animado */}
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
              >
                {tab === "login" ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs mt-6" style={{ color: colors.mutedLight }}>
              Ao continuar, você concorda com os{" "}
              <a href="#" className="underline hover:opacity-70" style={{ color: colors.ink3, cursor: "pointer" }}>
                Termos de uso
              </a>{" "}e a{" "}
              <a href="#" className="underline hover:opacity-70" style={{ color: colors.ink3, cursor: "pointer" }}>
                Política de privacidade
              </a>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Direita — imagem Paris ── */}
      <div
        className="hidden lg:flex items-center justify-center w-[48%] flex-shrink-0 p-6"
        style={{ backgroundColor: colors.white }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <Image
            src="/images/hero/paris.webp"
            alt="Paris, França"
            fill
            sizes="48vw"
            className="object-cover"
            priority
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
