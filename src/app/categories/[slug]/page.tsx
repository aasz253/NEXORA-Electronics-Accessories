import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { categoryBySlug } from "@/data/categories";
import { productsByCategory } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { categories } = await import("@/data/categories");
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Nexora Electronics`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const items = productsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <MotionWrapper from="up">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" /> All categories
        </Link>
        <div className="mt-6 max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-px w-6 bg-cyan-300/60" /> {category.short}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 text-mist">{category.description}</p>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.1} className="mt-12">
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/4 py-20 text-center">
            <p className="font-display text-xl font-bold text-white">
              This category is being restocked
            </p>
            <p className="mt-2 text-sm text-mist">
              Chat with us on WhatsApp to check availability.
            </p>
          </div>
        )}
      </MotionWrapper>
    </div>
  );
}
