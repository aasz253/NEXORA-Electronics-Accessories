"use client";

import ProductCard from "@/components/product/ProductCard";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-mist">
        No products match your filters. Try adjusting them.
      </p>
    );
  }
  return (
    <MotionStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <MotionItem key={p.id}>
          <ProductCard product={p} />
        </MotionItem>
      ))}
    </MotionStagger>
  );
}
