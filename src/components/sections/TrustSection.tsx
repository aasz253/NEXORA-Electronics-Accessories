"use client";

import { ShieldCheck, Truck, Headphones, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MotionStagger, MotionItem } from "@/components/ui/MotionWrapper";

const stats = [
  { icon: ShieldCheck, title: "Quality You Can Trust", desc: "Curated, checked products that perform day after day." },
  { icon: Truck, title: "Fast Local Delivery", desc: "Quick, reliable delivery within Nairobi and across Kenya." },
  { icon: Headphones, title: "Support That Answers", desc: "Reach us on WhatsApp — we're here to help before and after your order." },
];

export default function TrustSection() {
  return (
    <section className="relative border-y border-white/5 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,123,255,0.08),transparent_65%)]"
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

        {/* Reviews placeholder — replace with real customer feedback */}
        <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/4 p-6 text-center">
          <div className="mx-auto mb-3 flex w-fit items-center gap-1 text-amber-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-mist">
            “Customer reviews go here. Share feedback from real Nexora customers
            to build trust — replace this placeholder in the trust section.”
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-fog">
            Awaiting real customer testimonials
          </p>
        </div>
      </div>
    </section>
  );
}
