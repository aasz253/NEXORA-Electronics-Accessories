"use client";

import { ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";

const stats = [
  { icon: ShieldCheck, title: "Quality You Can Trust", desc: "Handpicked, checked products that perform day after day." },
  { icon: Truck, title: "We Deliver Everywhere", desc: "Quick, reliable delivery to all 47 counties — anywhere in Kenya." },
  { icon: Headphones, title: "Support That Answers", desc: "Reach us on WhatsApp — we're here to help before and after your order." },
];

export default function TrustSection() {
  return (
    <section className="relative border-y border-white/5 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,196,0,0.08),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Trust"
          title="Technology You Can Count On"
          subtitle="We keep it simple: genuine products, honest prices and service that has your back."
        />

        <MotionStagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
          gap={0.08}
        >
          {stats.map((s) => (
            <MotionItem key={s.title}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-white/8 bg-white/4 p-8 text-center">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/10">
                  <s.icon className="h-7 w-7 text-cyan-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-mist">{s.desc}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Honest early-days note */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/4 to-transparent p-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-electric-500/20 to-cyan-500/10">
            <Sparkles className="h-6 w-6 text-cyan-300" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            Early days — and honest about it
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-mist">
            We&apos;re a fresh shop and genuine reviews are still trickling in.
            Before you buy, ask us on WhatsApp for extra photos or a quick
            video of the product — we&apos;d rather show you exactly what
            you&apos;re getting than oversell it.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-fog">
            No fake reviews. Ever.
          </p>
        </div>
      </div>
    </section>
  );
}
