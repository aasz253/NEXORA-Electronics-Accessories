"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "@/components/categories/CategoryCard";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";
import { homepageCategories } from "@/data/categories";

export default function CategoriesSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Collections"
        title="Explore the Nexora Collection"
        subtitle="From earbuds and power banks to laptop stands and cables — everything in one place, ready to order."
      />
      <MotionStagger
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.07}
      >
        {homepageCategories.map((c) => (
          <MotionItem key={c.slug}>
            <CategoryCard category={c} />
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  );
}
