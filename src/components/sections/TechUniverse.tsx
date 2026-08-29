"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProducts } from "@/data/products";
import { useIsDesktop } from "@/hooks/useMediaQuery";

const ringItems = [
  { src: "/products/power-bank.jpeg", angle: 0, r: 46, s: 88 },
  { src: "/products/pro-earpods.jpeg", angle: 72, r: 60, s: 96 },
  { src: "/products/headphones.jpeg", angle: 144, r: 50, s: 92 },
  { src: "/products/oraimo-charger.jpeg", angle: 216, r: 62, s: 88 },
  { src: "/products/phones-1.jpeg", angle: 288, r: 56, s: 80 },
];

export default function TechUniverse() {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,139,255,0.10),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Universe"
          title="Your Tech Universe"
          subtitle="Everything you need. One place."
        />

        <div className="relative mt-10 flex h-[30rem] w-full items-center justify-center sm:h-[34rem]">
          {/* rotating ring of products (desktop) */}
          {isDesktop ? (
            <motion.div
              style={{ rotate }}
              className="absolute inset-0"
              aria-hidden
            >
              {ringItems.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const left = 50 + Math.cos(rad) * item.r;
                const top = 50 + Math.sin(rad) * item.r;
                return (
                  <motion.div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="floating relative h-0 w-0">
                      <div
                        className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                        style={{ width: item.s, height: item.s }}
                      >
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          sizes={`${item.s}px`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="absolute inset-0 grid grid-cols-3 gap-3 px-4" aria-hidden>
              {featuredProducts.slice(0, 6).map((p) => (
                <div key={p.id} className="floating relative h-28 overflow-hidden rounded-2xl border border-white/10">
                  <Image src={p.image} alt="" fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* center statement */}
          <motion.div
            style={{ y }}
            className="relative z-10 max-w-sm text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Discover · Choose · Order
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need.
              <br />
              <span className="text-gradient-cyan">One place.</span>
            </h3>
            <p className="mt-4 text-sm text-mist">
              Sound, power, workspace and everyday accessories — curated for
              how you live and work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
