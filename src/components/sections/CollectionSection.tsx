"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";
import { productsByCategory } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/lib/types";

interface CollectionSectionProps {
  slug: CategorySlug;
  eyebrow: string;
  heading: string;
  subtitle: string;
  heroImage?: string;
  /** CSS for the ambient backdrop */
  backdrop?: string;
  reverse?: boolean;
}

export function CollectionSection({
  slug,
  eyebrow,
  heading,
  subtitle,
  heroImage,
  backdrop,
  reverse,
}: CollectionSectionProps) {
  const items = productsByCategory(slug).slice(0, 4);
  const category = categoryBySlug(slug);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {backdrop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 60% at ${reverse ? "85%" : "15%"} 50%, ${backdrop}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]",
            reverse && "lg:[direction:rtl]"
          )}
        >
          {/* Heading + hero visual */}
          <div className="lg:[direction:ltr]">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <span className="h-px w-6 bg-cyan-300/60" /> {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-md text-mist">{subtitle}</p>

            {heroImage && (
              <div className="relative mt-8 h-48 w-64 overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-56 sm:w-72">
                <Image
                  src={heroImage}
                  alt={`${category?.name ?? "Nexora"} collection`}
                  fill
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {category?.name}
                </span>
              </div>
            )}

            <Link
              href={`/categories/${slug}`}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
            >
              View all {category?.name ?? "products"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Product cards */}
          <div className="lg:[direction:ltr]">
            <MotionStagger
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              gap={0.08}
            >
              {items.map((p) => (
                <MotionItem key={p.id}>
                  <ProductCard product={p} />
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Sound-wave decorative element for the audio section */
export function Waveform() {
  const bars = Array.from({ length: 40 });
  return (
    <div
      aria-hidden
      className="wave-mask pointer-events-none absolute inset-x-0 bottom-0 flex h-48 items-end justify-center gap-1.5 opacity-25"
    >
      {bars.map((_, i) => {
        const h = 24 + Math.abs(Math.sin(i * 1.7)) * 86;
        const d = 1.6 + Math.abs(Math.cos(i * 0.9)) * 1.8;
        const dl = Math.abs(Math.sin(i * 0.33)) * 1.4;
        return (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-cyan-400 to-electric-500"
            animate={{ height: [10, h, 10] }}
            transition={{
              duration: d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dl,
            }}
          />
        );
      })}
    </div>
  );
}

export default CollectionSection;
