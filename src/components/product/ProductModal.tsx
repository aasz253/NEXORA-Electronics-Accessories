"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, MessageCircle, ShoppingBag } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ProductModal() {
  const { quickView, closeQuickView } = useUI();
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQty(1);
  }, [quickView?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (quickView) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [quickView, closeQuickView]);

  return (
    <AnimatePresence>
      {quickView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-950/80 backdrop-blur-md sm:items-center sm:p-4"
          onClick={closeQuickView}
          role="dialog"
          aria-modal="true"
          aria-label={quickView.name}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-t-3xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl sm:rounded-3xl"
          >
            <button
              onClick={closeQuickView}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* image */}
              <div className="relative aspect-square md:aspect-auto md:min-h-[28rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#14241a_0%,#08100b_75%)]" />
                <Image
                  src={quickView.image}
                  alt={quickView.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
                <span
                  className={cn(
                    "absolute left-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur",
                    quickView.availability === "In stock"
                      ? "border-emerald-400/20 bg-emerald-400/15 text-emerald-300"
                      : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                  )}
                >
                  {quickView.availability}
                </span>
              </div>

              {/* details */}
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                  {quickView.type}
                </p>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {quickView.name}
                </h3>
                <p className="text-sm leading-relaxed text-mist">
                  {quickView.description}
                </p>

                <div className="mt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-fog">
                    Specifications
                  </p>
                  <ul className="mt-2 grid gap-1.5">
                    {quickView.specifications.slice(0, 5).map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-mist"
                      >
                        <span className="h-1 w-1 rounded-full bg-cyan-300" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white">
                    {quickView.price ? (
                      <>KSh {quickView.price}</>
                    ) : (
                      <span className="text-base font-medium text-mist">
                        Price on request
                      </span>
                    )}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-10 w-10 place-items-center text-mist hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-white">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="grid h-10 w-10 place-items-center text-mist hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    size="md"
                    className="flex-1"
                    onClick={() => {
                      addItem(quickView.id, qty);
                      closeQuickView();
                      openCart();
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </Button>
                </div>

                <Button
                  variant="whatsapp"
                  size="sm"
                  fullWidth
                  href={whatsappLink(
                    `Hello Nexora, I'd like to order: ${quickView.name} (qty ${qty}).`
                  )}
                >
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
