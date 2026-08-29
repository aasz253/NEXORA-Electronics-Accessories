"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** enable cursor-based 3D tilt */
  tilt?: boolean;
  /** show a specular highlight that follows the cursor */
  glare?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

/**
 * A premium glass surface with optional cursor tilt + moving highlight.
 */
export default function GlassCard({
  children,
  className,
  tilt = true,
  glare = true,
  style,
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(120,190,255,0.18), transparent 55%)`;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (tilt) {
      ry.set((px - 0.5) * 10);
      rx.set((0.5 - py) * 8);
    }
    gx.set(px * 100);
    gy.set(py * 100);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
      }}
      style={{
        ...style,
        rotateX: tilt ? rx : 0,
        rotateY: tilt ? ry : 0,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      className={cn(
        "glass relative overflow-hidden rounded-[var(--radius-card)]",
        className
      )}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
