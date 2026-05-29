"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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
