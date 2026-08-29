"use client";

import { BadgeCheck, Wallet, Layers, ShieldCheck, HeartHandshake, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Quality Products",
    desc: "Every item is checked so you get genuine, dependable tech that lasts.",
  },
  {
    icon: Wallet,
    title: "Affordable Tech",
    desc: "Premium products at prices that make sense for everyday life.",
  },
  {
    icon: Layers,
    title: "Wide Selection",
    desc: "Audio, power, storage and workspace gear — all in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    desc: "Friendly support that helps you find exactly what you need.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    desc: "We put your needs first and make ordering simple and honest.",
  },
  {
    icon: MessageCircle,
    title: "Convenient Ordering",
    desc: "Order in seconds over WhatsApp and get sorted fast.",
  },
];

export default function WhyNexora() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Why Nexora"
        title="Why Choose Nexora?"
        subtitle="More than a shop — a tech partner built around you in Kenya."
      />
      <MotionStagger
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.07}
      >
        {reasons.map((r) => (
          <MotionItem key={r.title}>
            <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-6 transition-colors hover:border-cyan-400/25">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/10 blur-2xl transition group-hover:bg-cyan-400/20" />
              <div className="relative">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-electric-500/20 to-cyan-500/10">
                  <r.icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {r.desc}
                </p>
              </div>
            </div>
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  );
}
