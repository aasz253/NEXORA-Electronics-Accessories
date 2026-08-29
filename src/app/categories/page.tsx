import type { Metadata } from "next";
import CategoryCard from "@/components/categories/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories | Nexora Electronics & Accessories",
  description:
    "Browse Nexora categories — audio, power, storage, laptop & mobile accessories, connectivity, lighting and more.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <SectionHeading
        eyebrow="Collections"
        title="Shop by Category"
        subtitle="Find exactly what you need across the full Nexora range."
      />
      <MotionStagger
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.06}
      >
        {categories.map((c) => (
          <MotionItem key={c.slug}>
            <CategoryCard category={c} />
          </MotionItem>
        ))}
      </MotionStagger>
    </div>
  );
}
