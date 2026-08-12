"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  RiFlightTakeoffLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiAlertLine,
  RiInformationLine,
  RiUserLine,
} from "@remixicon/react";
import { useCart } from "@/lib/cart-context";
import { colors } from "@/lib/colors";
import { fadeUp } from "@/lib/animations";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { fmtBRL, fmtNumber } from "@/lib/utils";

const SERVICE_FEE = 189;
const MILE_RATE   = 0.025;

const MILE_PROGRAMS = [
  { value: "smiles",    label: "Smiles (GOL)"     },
  { value: "tudoazul",  label: "TudoAzul (Azul)"  },
  { value: "latampass", label: "LATAM Pass"        },
  { value: "livelo",    label: "Livelo"            },
  { value: "nubank",    label: "Nubank Rewards"    },
  { value: "itau",      label: "Itaú"              },
  { value: "bradesco",  label: "Bradesco"          },
  { value: "santander", label: "Santander"         },
  { value: "c6",        label: "C6 Bank"           },
  { value: "inter",     label: "Inter"             },
  { value: "porto",     label: "Porto Seguro"      },
  { value: "outro",     label: "Outro"             },
];

function parseMiles(s: string) { return parseInt(s.replace(/\D/g, ""), 10) || 0; }
function maskMiles(s: string) {
  const n = s.replace(/\D/g, "");
  return n ? fmtNumber(parseInt(n, 10)) : "";
}

export default function CheckoutPage() {
  const { items } = useCart();
  const router    = useRouter();

  const [milesInputs,   setMilesInputs]   = useState<Record<string, string>>({});
  const [programInputs, setProgramInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0) router.replace("/");
  }, [items, router]);

  if (items.length === 0) return null;

  const totalFee    = items.length * SERVICE_FEE;
  const totalMilesNeeded = items.reduce((s, i) => s + i.flight.miles, 0);

  const totalShortage = items.reduce((sum, item) => {
    const user = parseMiles(milesInputs[item.id] ?? "");
    return sum + Math.max(0, item.flight.miles - user);
  }, 0);
  const shortageAmount = totalShortage * MILE_RATE;
  const grandTotal     = totalFee + shortageAmount;

  const setMilesInput   = (id: string, val: string) =>
    setMilesInputs((p)   => ({ ...p, [id]: maskMiles(val) }));
  const setProgramInput = (id: string, val: string) =>
    setProgramInputs((p) => ({ ...p, [id]: val }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6" style={{ backgroundColor: colors.surface }}>
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex items-center gap-2 text-sm mb-8" style={{ color: colors.muted }}>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:underline focus-visible:outline-none"
            style={{ color: colors.brand, cursor: "pointer" }}
          >
            <RiArrowLeftLine size={14} aria-hidden="true" /> Voltar
          </button>
          <span>/</span>
          <span>Checkout</span>
        </motion.div>

        {/* Título + passageiros */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl" style={{ color: colors.ink }}>
            Resumo da compra
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm" style={{ color: colors.muted }}>
              Informe seu programa e quantas milhas você tem para calcular o valor final.
            </p>
          </div>
          {/* Badge 1 passageiro */}
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: colors.surface2, color: colors.ink3 }}>
            <RiUserLine size={13} aria-hidden="true" />
            1 passageiro · Preços por pessoa
          </div>
        </motion.div>

        {/* Cards de voo */}
        <div className="space-y-4 mb-8">
          {items.map((item, i) => {
            const inputVal   = milesInputs[item.id]   ?? "";
            const program    = programInputs[item.id] ?? "";
            const userMiles  = parseMiles(inputVal);
            const needed     = item.flight.miles;
            const shortage   = Math.max(0, needed - userMiles);
            const surplus    = Math.max(0, userMiles - needed);
            const sufficient = userMiles >= needed && userMiles > 0;
            const hasInput   = userMiles > 0;

            return (
              <motion.div key={item.id} variants={fadeUp} initial="hidden" animate="visible" custom={0.1 + i * 0.08}>
                <div className="rounded-2xl overflow-hidden"
                  style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.white }}>

                  {/* Header */}
                  <div className="flex items-center gap-4 p-5"
                    style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.brandLight }}>
                      <RiFlightTakeoffLine size={18} style={{ color: colors.brand }} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-base" style={{ color: colors.ink }}>
                        {item.flight.originCode} → {item.flight.destinationCode}
                        <span className="font-normal text-sm ml-2" style={{ color: colors.muted }}>
                          {item.flight.destination}, {item.flight.country}
                        </span>
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <div className="w-5 h-5 rounded bg-white border flex items-center justify-center overflow-hidden p-0.5"
                          style={{ borderColor: colors.border }}>
                          <Image src={item.flight.airlineLogo} alt={item.flight.airline}
                            width={16} height={16} className="object-contain w-full h-full" />
                        </div>
                        <span className="text-xs" style={{ color: colors.muted }}>
                          {item.flight.airline} · {item.flight.flightClass} · {item.flight.stops}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs" style={{ color: colors.muted }}>Necessário</p>
                      <p className="font-bold" style={{ color: colors.ink }}>
                        {fmtNumber(needed)}{" "}
                        <span className="text-xs font-normal" style={{ color: colors.muted }}>mi</span>
                      </p>
                    </div>
                  </div>

                  {/* Calculadora */}
                  <div className="p-5 space-y-4">
                    {/* Programa de milhas */}
                    <Select
                      label="Programa de milhas"
                      id={`program-${item.id}`}
                      value={program}
                      onChange={(v) => setProgramInput(item.id, v)}
                      options={MILE_PROGRAMS}
                      placeholder="Selecione seu programa"
                    />

                    {/* Quantidade de milhas */}
                    <Input
                      label="Quantas milhas você tem neste programa?"
                      id={`miles-${item.id}`}
                      value={inputVal}
                      onChange={(v) => setMilesInput(item.id, v)}
                      placeholder={`Ex: ${fmtNumber(needed)}`}
                      inputMode="numeric"
                    />

                    {/* Feedback */}
                    {hasInput && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }} className="space-y-2">
                        {sufficient ? (
                          <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl"
                            style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}>
                            <RiCheckLine size={15} aria-hidden="true" />
                            <span>
                              Milhas suficientes!
                              {surplus > 0 && (
                                <span className="ml-1" style={{ color: "#15803D" }}>
                                  Sobrarão {fmtNumber(surplus)} milhas.
                                </span>
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className="rounded-xl p-3"
                            style={{ backgroundColor: "#FEF2F2", border: `1px solid #FEE2E2` }}>
                            <div className="flex items-start gap-2 text-sm" style={{ color: "#DC2626" }}>
                              <RiAlertLine size={15} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <div>
                                <p className="font-semibold">Faltam {fmtNumber(shortage)} milhas</p>
                                <p className="text-xs mt-0.5" style={{ color: "#B91C1C" }}>
                                  Equivalente a aprox. {fmtBRL(shortage * MILE_RATE)} no mercado.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Grid comparativo */}
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          {[
                            { label: "Necessário",    value: fmtNumber(needed)   + " mi" },
                            { label: "Suas milhas",   value: fmtNumber(userMiles)+ " mi" },
                            { label: sufficient ? "Sobra" : "Faltam",
                              value: fmtNumber(sufficient ? surplus : shortage) + " mi",
                              color: sufficient ? "#16A34A" : colors.danger },
                          ].map((col) => (
                            <div key={col.label} className="rounded-lg p-2"
                              style={{ backgroundColor: colors.surface }}>
                              <p style={{ color: colors.mutedLight }}>{col.label}</p>
                              <p className="font-semibold mt-0.5"
                                style={{ color: col.color ?? colors.ink }}>{col.value}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Taxa por voo */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm" style={{ color: colors.muted }}>
                        Taxa de emissão · 1 passageiro
                      </span>
                      <span className="font-semibold text-sm" style={{ color: colors.ink }}>
                        {fmtBRL(SERVICE_FEE)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resumo total */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
          className="rounded-2xl p-5 mb-4"
          style={{ backgroundColor: colors.brandLight, border: `1px solid ${colors.brandMid}` }}>
          <div className="flex items-center gap-2 mb-3">
            <RiInformationLine size={16} style={{ color: colors.brand }} aria-hidden="true" />
            <span className="text-sm font-semibold" style={{ color: colors.ink }}>Resumo do pedido</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: colors.ink3 }}>
                Taxa de emissão ({items.length} {items.length > 1 ? "passagens" : "passagem"})
              </span>
              <span style={{ color: colors.ink }}>{fmtBRL(totalFee)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.ink3 }}>Milhas necessárias</span>
              <span style={{ color: colors.ink }}>{fmtNumber(totalMilesNeeded)} mi</span>
            </div>
            {totalShortage > 0 && (
              <div className="flex justify-between">
                <span style={{ color: colors.danger }}>
                  Milhas em falta ({fmtNumber(totalShortage)} mi)
                </span>
                <span style={{ color: colors.danger }}>+ {fmtBRL(shortageAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-1">
              <span style={{ color: colors.ink }}>Total a pagar · por pessoa</span>
              <span style={{ color: colors.brand }}>{fmtBRL(grandTotal)}</span>
            </div>
          </div>
        </motion.div>

        {totalShortage > 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs mb-4 text-center" style={{ color: colors.muted }}>
            Você pode continuar mesmo sem milhas suficientes.
          </motion.p>
        )}

        <motion.button
          variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
          onClick={() => router.push("/login")}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-opacity hover:opacity-90 focus-visible:outline-none"
          style={{ backgroundColor: colors.brand, color: colors.white, cursor: "pointer" }}
        >
          Continuar
          <RiArrowRightLine size={18} aria-hidden="true" />
        </motion.button>

        <p className="text-center text-xs mt-4" style={{ color: colors.mutedLight }}>
          É necessário ter uma conta para finalizar a compra.
        </p>
      </div>
    </div>
  );
}
