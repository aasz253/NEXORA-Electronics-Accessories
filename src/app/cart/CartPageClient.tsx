"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/site";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CartPage() {
  const { lines, setQty, removeItem, clear } = useCart();

  const orderMessage =
    lines.length > 0
      ? "Hello Nexora, I'd like to order:\n" +
        lines.map((l) => `• ${l.qty} × ${l.product.name}`).join("\n")
      : undefined;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-24 pt-28 text-center sm:px-8">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-dashed border-white/15 text-fog">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 7h12l1 13H5L6 7z" strokeLinejoin="round" />
            <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">
          Your cart is waiting.
        </h1>
        <p className="mt-3 text-mist">
          Discover something worth taking home from the Nexora collection.
        </p>
        <div className="mt-8">
          <Button href="/shop">Explore Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-28 sm:px-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>

      <SectionHeading
        align="left"
        eyebrow="Cart"
        title="Your Selection"
        className="mt-6"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {lines.map((l) => (
            <div
              key={l.product.id}
              className="flex gap-4 rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-4"
            >
              <Link
                href={`/product/${l.product.id}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white/5"
              >
                <Image
                  src={l.product.image}
                  alt={l.product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-cyan-300">
                      {l.product.type}
                    </p>
                    <Link
                      href={`/product/${l.product.id}`}
                      className="font-semibold text-white hover:text-cyan-200"
                    >
                      {l.product.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeItem(l.product.id)}
                    aria-label={`Remove ${l.product.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full text-fog transition hover:bg-white/8 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-white/10">
                    <button
                      onClick={() => setQty(l.product.id, l.qty - 1)}
                      aria-label="Decrease"
                      className="grid h-8 w-8 place-items-center text-mist hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {l.qty}
                    </span>
                    <button
                      onClick={() => setQty(l.product.id, l.qty + 1)}
                      aria-label="Increase"
                      className="grid h-8 w-8 place-items-center text-mist hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm text-mist">
                    {l.product.price ? `KSh ${l.product.price}` : "On request"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/60 p-6 lg:sticky lg:top-28">
          <h3 className="font-display text-lg font-bold text-white">Order summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-mist">
              <span>Items</span>
              <span className="text-white">{lines.length}</span>
            </div>
            <div className="flex justify-between text-mist">
              <span>Subtotal</span>
              <span className="text-white">Confirm on WhatsApp</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Button
              variant="whatsapp"
              fullWidth
              href={whatsappLink(orderMessage)}
            >
              <MessageCircle className="h-4 w-4" /> Checkout on WhatsApp
            </Button>
            <button
              onClick={clear}
              className="w-full rounded-full py-2 text-center text-sm text-fog transition hover:text-white"
            >
              Clear cart
            </button>
          </div>
          <p className="mt-4 text-center text-[11px] text-fog">
            Checkout routes to WhatsApp. Online payments (M-Pesa) coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
