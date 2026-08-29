"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/site";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeItem } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const orderMessage =
    lines.length > 0
      ? "Hello Nexora, I'd like to order:\n" +
        lines
          .map((l) => `• ${l.qty} × ${l.product.name}`)
          .join("\n")
      : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] bg-ink-950/80 backdrop-blur-md"
          onClick={closeCart}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
              <h2 className="font-display text-xl font-bold text-white">
                Your Cart{" "}
                {lines.length > 0 && (
                  <span className="text-sm font-normal text-mist">
                    ({lines.length})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-white/15 text-fog">
                  <ShoppingBagIcon />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Your cart is waiting.
                </h3>
                <p className="text-sm text-mist">
                  Discover something worth taking home.
                </p>
                <Button href="/shop" onClick={closeCart}>
                  Explore Products
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {lines.map((l) => (
                    <motion.div
                      key={l.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={l.product.image}
                          alt={l.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-semibold text-white">
                            {l.product.name}
                          </p>
                          <button
                            onClick={() => removeItem(l.product.id)}
                            aria-label={`Remove ${l.product.name}`}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-fog transition hover:bg-white/8 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-fog">{l.product.type}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-white/10">
                            <button
                              onClick={() =>
                                setQty(l.product.id, l.qty - 1)
                              }
                              aria-label="Decrease"
                              className="grid h-7 w-7 place-items-center text-mist hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-white">
                              {l.qty}
                            </span>
                            <button
                              onClick={() =>
                                setQty(l.product.id, l.qty + 1)
                              }
                              aria-label="Increase"
                              className="grid h-7 w-7 place-items-center text-mist hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs text-mist">
                            {l.product.price ? (
                              <>KSh {l.product.price}</>
                            ) : (
                              "On request"
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/8 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-mist">Subtotal</span>
                    <span className="text-base font-semibold text-white">
                      Confirm on WhatsApp
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="whatsapp"
                      fullWidth
                      href={whatsappLink(orderMessage)}
                    >
                      <MessageCircle className="h-4 w-4" /> Checkout on WhatsApp
                    </Button>
                    <Button
                      variant="secondary"
                      fullWidth
                      href="/shop"
                      onClick={closeCart}
                    >
                      Continue shopping
                    </Button>
                  </div>
                  <p className="text-center text-[11px] text-fog">
                    Checkout currently routes to WhatsApp. Online payments
                    (M-Pesa) coming soon.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 7h12l1 13H5L6 7z" strokeLinejoin="round" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    </svg>
  );
}
