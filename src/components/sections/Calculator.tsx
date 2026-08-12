"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { Select } from "@/components/shared/Select";
import { Input } from "@/components/shared/Input";
import { destinations } from "@/lib/data/destinations";
import { fadeUp } from "@/lib/animations";
import { colors } from "@/lib/colors";
import { fmtNumber } from "@/lib/utils";

const programOptions = [
  { value: "livelo",   label: "Livelo"     },
  { value: "smiles",   label: "Smiles"     },
  { value: "tudoazul", label: "TudoAzul"   },
  { value: "nubank",   label: "Nubank"     },
  { value: "itau",     label: "Itaú"       },
  { value: "bradesco", label: "Bradesco"   },
  { value: "c6",       label: "C6 Bank"    },
  { value: "latam",    label: "LATAM Pass" },
];

export function Calculator() {
  const [miles,   setMiles]   = useState("");
  const [program, setProgram] = useState("");
  const shouldReduce = useReducedMotion();

  const milesNum = parseInt(miles.replace(/\D/g, ""), 10) || 0;
  const available = useMemo(
    () => destinations.filter((d) => d.miles <= milesNum),
    [milesNum]
  );

  const formatMiles = (val: string) => {
    const digits = val.replace(/\D/g, "");
    return digits ? fmtNumber(parseInt(digits, 10)) : "";
  };

  return (
    <section id="calculadora" className="py-28 bg-[#F9F7F4]" aria-labelledby="calc-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div className="lg:sticky lg:top-32">
            <h2 id="calc-title" className="font-display font-bold text-4xl md:text-5xl text-[#111111] leading-tight mb-6">
              <AnimatedText text="Descubra para onde" className="block" />
              <AnimatedText text="você pode voar" className="text-[#FF6B35] block" delay={0.1} />
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: colors.ink4 }}>
              Informe quantas milhas você tem e veja instantaneamente todos os
              destinos disponíveis com seu saldo atual.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Todos os programas de milhas aceitos",
                "Resposta em até 30 minutos",
                "Sem taxa para consultar",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: colors.ink2 }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.brandLight, border: `1px solid ${colors.brandMid}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.brand }} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            <div className="card bg-white p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Select
                  id="calc-program"
                  label="Programa de milhas"
                  value={program}
                  onChange={setProgram}
                  options={programOptions}
                  placeholder="Selecione o programa"
                />
                <Input
                  id="calc-miles"
                  label="Quantas milhas você tem?"
                  value={miles}
                  onChange={(val) => setMiles(formatMiles(val))}
                  placeholder="Ex: 50.000"
                  inputMode="numeric"
                />
              </div>

              {/* Results */}
              {milesNum > 0 && (
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  aria-live="polite"
                  aria-label="Destinos disponíveis"
                >
                  <div className="rounded-xl p-4" style={{ backgroundColor: colors.surface }}>
                    {available.length > 0 ? (
                      <p className="text-xs font-semibold mb-3" style={{ color: colors.muted }}>
                        {available.length} destino{available.length > 1 ? "s" : ""} com {fmtNumber(milesNum)} milhas
                      </p>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: colors.muted }}>
                        Nenhum destino com esse saldo, tente mais milhas.
                      </p>
                    )}
                    {available.length > 0 && (
                      <ul className="grid grid-cols-2 gap-2" role="list">
                        {available.slice(0, 6).map((d) => (
                          <li key={d.id}>
                            <div className="flex items-center gap-2.5 rounded-lg p-2.5"
                              style={{ backgroundColor: colors.white, border: `1px solid ${colors.border}` }}>
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: colors.brandLight }}>
                                <Plane size={13} style={{ color: colors.brand }} aria-hidden="true" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-xs truncate" style={{ color: colors.ink }}>{d.city}</p>
                                <p className="text-xs truncate" style={{ color: colors.muted }}>
                                  {fmtNumber(d.miles)} mi
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
