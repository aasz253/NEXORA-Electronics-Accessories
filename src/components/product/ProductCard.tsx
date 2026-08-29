"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { whatsappLink } from "@/lib/site";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function availabilityClass(a: Product["availability"]) {
  switch (a) {
    case "In stock":
      return "bg-emerald-400/15 text-emerald-300 border-emerald-400/20";
    case "Low stock":
      return "bg-amber-400/15 text-amber-300 border-amber-400/20";
    case "On order":
      return "bg-cyan-400/10 text-cyan-300 border-cyan-400/20";
    default:
      return "bg-white/8 text-mist border-white/10";
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const { openQuickView } = useUI();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    openCart();
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      whatsappLink(
        `Hello Nexora, I'd like to order: ${product.name}. Please share more details.`
      ),
      "_blank"
    );
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-gradient-to-b from-ink-800/80 to-ink-900/80 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] transition-colors hover:border-cyan-400/25"
    >
      {/* top glow on hover */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 bg-cyan-400/0 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/15" />

      {/* image */}
      <Link
        href={`/product/${product.id}`}
        onClick={(e) => {
          e.preventDefault();
          openQuickView(product);
        }}
        className="relative block aspect-[4/3] w-full overflow-hidden"
        aria-label={`View ${product.name}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#14241a_0%,#08100b_75%)]" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 25vw"
          className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
        />

        {/* floating subtle shadow */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-3 w-3/5 -translate-x-1/2 rounded-full bg-black/50 blur-md" />

        {/* tags */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {product.isNew && (
            <span className="rounded-full bg-cyan-400/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-950">
              New
            </span>
          )}
          {product.tag && (
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              {product.tag}
            </span>
          )}
        </div>

        {/* availability */}
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur",
            availabilityClass(product.availability)
          )}
        >
          {product.availability}
        </span>
      </Link>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">
              {product.type}
            </p>
            <Link
              href={`/product/${product.id}`}
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product);
              }}
              className="mt-1 block text-lg font-semibold leading-tight text-white transition group-hover:text-cyan-200"
            >
              {product.name}
            </Link>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-mist">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold text-white">
            {product.price ? (
              <>KSh {product.price}</>
            ) : (
              <span className="text-mist">Price on request</span>
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              aria-label={`Order ${product.name} on WhatsApp`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[#25D366] transition hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
            <button
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-[0_8px_24px_-8px_rgba(255,196,0,0.8)] transition active:scale-90"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
