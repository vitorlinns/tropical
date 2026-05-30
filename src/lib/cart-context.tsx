"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Flight } from "@/lib/data/flights";

export type CartItem = {
  id: string;        // flight.id
  flight: Flight;
  addedAt: number;   // timestamp
};

type CartContextValue = {
  items: CartItem[];
  addItem:    (flight: Flight) => void;
  removeItem: (id: string)    => void;
  clear:      ()              => void;
  isInCart:   (id: string)    => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Chave usada para guardar a sacola no navegador do usuário. */
const STORAGE_KEY = "tropical-milhas:cart";

/**
 * Valida um item vindo do storage. Protege contra dados antigos/corrompidos
 * (de versões anteriores do app), que quebrariam telas que leem `item.flight`.
 */
function isValidCartItem(x: unknown): x is CartItem {
  if (!x || typeof x !== "object") return false;
  const item = x as Record<string, unknown>;
  const flight = item.flight as Record<string, unknown> | undefined;
  return (
    typeof item.id === "string" &&
    typeof item.addedAt === "number" &&
    !!flight &&
    typeof flight === "object" &&
    typeof flight.id === "string" &&
    typeof flight.miles === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Só persistimos depois de ler o que já estava salvo, para não
  // sobrescrever a sacola com o estado inicial vazio.
  const [hydrated, setHydrated] = useState(false);

  // Carrega a sacola salva quando monta (lado do cliente).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Mantém apenas itens no formato atual; descarta lixo/legado.
        if (Array.isArray(parsed)) setItems(parsed.filter(isValidCartItem));
      }
    } catch {
      // Ignora dados corrompidos ou storage indisponível.
    }
    setHydrated(true);
  }, []);

  // Salva no navegador sempre que a sacola muda.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage cheio/indisponível (ex.: navegação privada) — segue sem persistir.
    }
  }, [items, hydrated]);

  const addItem = useCallback((flight: Flight) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === flight.id)) return prev;
      return [...prev, { id: flight.id, flight, addedAt: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return (
    <CartContext value={{ items, addItem, removeItem, clear, isInCart }}>
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
