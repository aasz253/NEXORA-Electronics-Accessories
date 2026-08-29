"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";
export type PriceBand = "all" | "on-request" | "under-2k" | "2k-5k" | "over-5k";

export interface FilterState {
  categories: string[];
  availability: string;
  price: PriceBand;
  sort: SortKey;
  query: string;
}

const defaultFilters: FilterState = {
  categories: [],
  availability: "all",
  price: "all",
  sort: "featured",
  query: "",
};

const priceValue = (p: Product) => {
  const n = p.price ? parseInt(p.price.replace(/[^0-9]/g, ""), 10) : NaN;
  return isNaN(n) ? -1 : n;
};

export function filterProducts(
  all: Product[],
  f: FilterState
): { result: Product[]; total: number } {
  let r = all;
  if (f.categories.length > 0) {
    r = r.filter((p) => f.categories.includes(p.category));
  }
  if (f.availability !== "all") {
    r = r.filter((p) =>
      f.availability === "available"
        ? p.availability === "In stock"
        : p.availability === f.availability
    );
  }
  if (f.price !== "all") {
    if (f.price === "on-request") {
      r = r.filter((p) => p.priceOnRequest);
    } else {
      r = r.filter((p) => {
        const v = priceValue(p);
        if (v < 0) return f.price === "under-2k" ? v === -1 : false;
        if (f.price === "under-2k") return v < 2000;
        if (f.price === "2k-5k") return v >= 2000 && v <= 5000;
        return v > 5000;
      });
    }
  }
  if (f.query.trim()) {
    const q = f.query.toLowerCase();
    r = r.filter((p) =>
      `${p.name} ${p.type} ${p.category} ${p.description}`
        .toLowerCase()
        .includes(q)
    );
  }
  switch (f.sort) {
    case "price-asc":
      r = [...r].sort((a, b) => priceValue(a) - priceValue(b));
      break;
    case "price-desc":
      r = [...r].sort((a, b) => priceValue(b) - priceValue(a));
      break;
    case "newest":
      r = [...r].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      break;
    default:
      r = [...r].sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured)
      );
  }
  return { result: r, total: all.length };
}

export default function FilterBar({
  onApply,
}: {
  onApply: (f: FilterState) => void;
}) {
  const [f, setF] = useState<FilterState>(defaultFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of products) {
      c[p.category] = (c[p.category] ?? 0) + 1;
    }
    return c;
  }, []);
  const activeCount =
    f.categories.length +
    (f.availability !== "all" ? 1 : 0) +
    (f.price !== "all" ? 1 : 0);

  const emit = (next: FilterState) => {
    setF(next);
    onApply(next);
  };

  const controls = (
    <>
      {/* Category multi-select */}
      <div>
        <p className="section-label">Category</p>
        <div className="max-h-44 space-y-1 overflow-auto pr-1">
          {categories.map((c) => {
            const on = f.categories.includes(c.slug);
            return (
              <button
                key={c.slug}
                onClick={() =>
                  emit({
                    ...f,
                    categories: on
                      ? f.categories.filter((x) => x !== c.slug)
                      : [...f.categories, c.slug],
                  })
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                  on ? "bg-electric-500/15 text-cyan-200" : "text-mist hover:bg-white/5"
                )}
              >
                <span>{c.name}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-fog">{counts[c.slug] ?? 0}</span>
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded border transition",
                      on
                        ? "border-cyan-400 bg-cyan-400 text-ink-950"
                        : "border-white/20"
                    )}
                  >
                    {on && <Check className="h-3 w-3" />}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="section-label">Availability</p>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "all", label: "All" },
            { v: "available", label: "In stock" },
            { v: "On order", label: "On order" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => emit({ ...f, availability: o.v })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                f.availability === o.v
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/4 text-mist hover:text-white"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="section-label">Price</p>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "all", label: "All" },
            { v: "on-request", label: "On request" },
            { v: "under-2k", label: "Under KSh 2,000" },
            { v: "2k-5k", label: "KSh 2–5k" },
            { v: "over-5k", label: "Over KSh 5,000" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => emit({ ...f, price: o.v as PriceBand })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                f.price === o.v
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/4 text-mist hover:text-white"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="section-label">Sort by</p>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "featured", label: "Featured" },
            { v: "newest", label: "Newest" },
            { v: "price-asc", label: "Price: Low → High" },
            { v: "price-desc", label: "Price: High → Low" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => emit({ ...f, sort: o.v as SortKey })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                f.sort === o.v
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/4 text-mist hover:text-white"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-28 space-y-6 rounded-3xl border border-white/8 bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-6">
          {controls}
        </div>
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {activeCount > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-400 text-[11px] font-bold text-ink-950">
              {activeCount}
            </span>
          )}
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-[95] flex items-end bg-ink-950/80 backdrop-blur-sm lg:hidden">
            <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink-900 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close filters"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-6">
                {controls}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-500 py-3 font-semibold text-white"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function FilterResetBtn({
  onReset,
  hasActive,
}: {
  onReset: () => void;
  hasActive: boolean;
}) {
  if (!hasActive) return null;
  return (
    <button
      onClick={onReset}
      className="inline-flex items-center gap-1.5 text-sm text-mist transition hover:text-white"
    >
      <X className="h-4 w-4" /> Reset filters
    </button>
  );
}
