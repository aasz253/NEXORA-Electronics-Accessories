"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, AudioLines, BatteryCharging, HardDrive, Laptop, Smartphone, PlugZap, Lightbulb, Monitor, Cpu, Video } from "lucide-react";
import type { Category } from "@/lib/types";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AudioLines,
  BatteryCharging,
  HardDrive,
  Laptop,
  Smartphone,
  PlugZap,
  Lightbulb,
  Monitor,
  Cpu,
  Video,
};

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] ?? Cpu;
  const sample = products.find((p) => p.category === category.slug);

  return (
    <motion.div whileHover={{ y: -6 }} className="h-full">
      <Link
        href={`/categories/${category.slug}`}
        className="group relative block h-full overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-6 transition-colors hover:border-cyan-400/30"
      >
        {/* animated gradient */}
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-45 group-hover:scale-125",
            category.accent
          )}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 transition group-hover:opacity-100" />

        {/* product visual */}
        <div className="relative mb-5 flex h-32 items-center justify-center">
          {sample ? (
            <motion.div
              className="floating relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Image
                src={sample.image}
                alt={sample.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <Icon className="h-10 w-10 text-cyan-300" />
            </div>
          )}
          {/* halo */}
          <div className="pointer-events-none absolute bottom-2 h-3 w-20 rounded-full bg-black/60 blur-md" />
        </div>

        <div className="relative flex items-start justify-between">
          <div>
            <div className="mb-1 inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-cyan-300" />
              <h3 className="font-display text-xl font-bold text-white">
                {category.name}
              </h3>
            </div>
            <p className="text-sm text-mist">{category.short}</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-mist transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
