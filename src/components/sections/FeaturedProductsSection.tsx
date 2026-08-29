"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { featuredProducts } from "@/data/products";

export default function FeaturedProductsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Featured"
          title="Featured Tech"
          subtitle="Handpicked favourites from the Nexora collection — the products our customers reach for most."
        />
        <MotionWrapper from="right" className="shrink-0">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/5"
          >
            View all products
            <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
          </Link>
        </MotionWrapper>
      </div>

      <MotionWrapper delay={0.1} className="mt-12">
        <ProductGrid products={featuredProducts} />
      </MotionWrapper>
    </section>
  );
}
