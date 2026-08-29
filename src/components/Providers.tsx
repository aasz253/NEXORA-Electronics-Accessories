"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <UIProvider>{children}</UIProvider>
    </CartProvider>
  );
}
