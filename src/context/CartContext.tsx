"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productById } from "@/data/products";
import type { Product } from "@/lib/types";

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (id: string, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  /** Resolved lines with full product data for rendering */
  lines: { product: Product; qty: number }[];
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === id);
      if (existing) {
        return prev.map((i) =>
          i.productId === id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId: id, qty }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== id)
        : prev.map((i) => (i.productId === id ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const product = productById(i.productId);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((l): l is { product: Product; qty: number } => l !== null),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      count,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQty,
      clear,
      lines,
    }),
    [
      items,
      isOpen,
      count,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQty,
      clear,
      lines,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
