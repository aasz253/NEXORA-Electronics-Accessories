"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { Bolt, BatteryMedium, Package, Luggage } from "lucide-react";

const features = [
  { icon: Bolt, title: "Fast Charging", desc: "Get back to full power quickly with rapid output." },
  { icon: BatteryMedium, title: "High Capacity", desc: "Enough juice for a full day of devices." },
  { icon: Package, title: "Compact Design", desc: "Slim enough to slip into a pocket or bag." },
  { icon: Luggage, title: "Travel Ready", desc: "Built for the road, the office and everywhere between." },
];

export default function ProductSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.12]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/5 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,196,0,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* product visual */}
        <div className="relative order-2 mx-auto h-[26rem] w-full max-w-md lg:order-1">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 rounded-full bg-cyan-400/15 blur-3xl"
            aria-hidden
          />
          <motion.div
            style={{ rotateY, scale }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <div className="floating relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <Image
                src="/products/power-bank.jpeg"
                alt="Nexora high-capacity power bank"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          {/* floating spec chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -left-2 bottom-10 rounded-2xl border border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur sm:left-0"
          >
            <p className="text-[11px] uppercase tracking-widest text-fog">Capacity</p>
            <p className="font-display text-2xl font-bold text-white">20000<span className="text-sm text-mist"> mAh</span></p>
          </motion.div>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-px w-6 bg-cyan-300/60" /> Spotlight
          </span>
          <motion.h2
            style={{ opacity }}
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Power That
            <br />
            Goes Further.
          </motion.h2>
          <motion.p
            style={{ opacity }}
            className="mt-4 max-w-md text-mist"
          >
            Keep every device charged from morning to night with the Nexora
            high-capacity power bank — fast output, honest capacity, and built
            for the way you actually use your week.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-4"
              >
                <f.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-2 font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-sm text-mist">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button href="/product/power-power-bank">View this product</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
