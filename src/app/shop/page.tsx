"use client";

import { useMemo, useState } from "react";
import FilterBar, {
  filterProducts,
  type FilterState,
} from "@/components/product/FilterBar";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { products as allProducts } from "@/data/products";

const defaultFilters: FilterState = {
  categories: [],
  availability: "all",
  price: "all",
  sort: "featured",
  query: "",
};

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const { result, total } = useMemo(
    () => filterProducts(allProducts, filters),
    [filters]
  );
  const hasActive =
    filters.categories.length > 0 ||
    filters.availability !== "all" ||
    filters.price !== "all";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <SectionHeading
        align="left"
        eyebrow="Shop"
        title="Browse the Collection"
        subtitle={`${total} products across every category — filter to find yours.`}
      />

      <div className="mt-12 flex gap-8">
        <FilterBar
          onApply={(f) =>
            setFilters((prev) => ({ ...prev, ...f, query: prev.query }))
          }
        />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-mist">
              Showing <span className="font-semibold text-white">{result.length}</span> of {total}
            </p>
            {hasActive && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-sm text-mist transition hover:text-white"
              >
                Reset filters
              </button>
            )}
          </div>
          <ProductGrid products={result} />
        </div>
      </div>
    </div>
  );
}
