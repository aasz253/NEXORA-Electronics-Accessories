"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, MessageCircle, Check } from "lucide-react";
import { productById, products } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/site";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const product = productById(productId);
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-40 text-center">
        <h1 className="font-display text-3xl font-bold text-white">
          Product not found
        </h1>
        <p className="mt-3 text-mist">
          This item may have been removed or is no longer available.
        </p>
        <div className="mt-8">
          <Button href="/shop">Back to Shop</Button>
        </div>
      </div>
    );
  }

  const category = categoryBySlug(product.category);
  const gallery = product.gallery?.length
    ? product.gallery
    : [product.image];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-fog" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-cyan-300">Home</Link>
        <span>/</span>
        <Link href={`/categories/${product.category}`} className="transition hover:text-cyan-300">
          {category?.name}
        </Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#14241a_0%,#08100b_78%)]">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={gallery[activeImg]}
                alt={product.name}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-contain p-10"
                priority
              />
            </motion.div>
            <span
              className={cn(
                "absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur",
                product.availability === "In stock"
                  ? "border-emerald-400/20 bg-emerald-400/15 text-emerald-300"
                  : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
              )}
            >
              {product.availability}
            </span>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-xl border transition",
                    activeImg === i
                      ? "border-cyan-400"
                      : "border-white/10 hover:border-white/30"
                  )}
                >
                  <Image src={g} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              {category?.name} · {product.type}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <p className="text-lg font-semibold text-white">
            {product.price ? (
              <>KSh {product.price}</>
            ) : (
              <span className="font-normal text-mist">Price on request</span>
            )}
          </p>

          <p className="leading-relaxed text-mist">{product.description}</p>

          <div>
            <p className="text-sm font-semibold text-white">Specifications</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.specifications.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-sm text-mist"
                >
                  <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-11 w-11 place-items-center text-mist hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold text-white">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-11 w-11 place-items-center text-mist hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                addItem(product.id, qty);
                openCart();
              }}
            >
              <ShoppingBag className="h-5 w-5" /> Add to cart
            </Button>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            href={whatsappLink(
              `Hello Nexora, I'd like to order: ${product.name} (qty ${qty}).`
            )}
          >
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </Button>

          <p className="text-xs text-fog">
            Order by WhatsApp for the fastest response. Online payments (M-Pesa)
            coming soon.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold text-white">
            You may also like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
