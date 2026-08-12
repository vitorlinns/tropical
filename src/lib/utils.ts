import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata um valor em Real brasileiro. Ex.: 1234.5 → "R$ 1.234,50". */
export function fmtBRL(value: number) {
  return Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

/** Formata um número inteiro com separador de milhar pt-BR. Ex.: 12000 → "12.000". */
export function fmtNumber(value: number) {
  return Intl.NumberFormat("pt-BR").format(value);
}
