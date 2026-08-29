"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-[0_10px_40px_-10px_rgba(255,196,0,0.5)] hover:shadow-[0_14px_50px_-8px_rgba(255,196,0,0.7)]",
  secondary:
    "glass text-white hover:bg-white/10 border-white/15",
  ghost: "bg-transparent text-mist hover:text-white hover:bg-white/5",
  whatsapp:
    "bg-[#25D366] text-[#032413] shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(37,211,102,0.75)]",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function inner(
  v: string,
  s: string,
  fullWidth: boolean,
  className?: string
) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300",
    "active:scale-[0.97] will-change-transform",
    variants[v],
    sizes[s],
    fullWidth && "w-full",
    className
  );
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  onClick,
  type,
  ariaLabel,
}: BaseProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const attrs = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    className: inner(variant, size, fullWidth, className),
    "aria-label": ariaLabel,
    onClick:
      onClick ??
      (() => {
        /* noop */
      }),
  };

  if (href) {
    return (
      <motion.div style={{ x: sx, y: sy }} className="inline-block">
        <Link ref={ref} href={href} {...attrs}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className={fullWidth ? "block" : "inline-block w-fit"}>
      <button
        ref={ref as never}
        type={type ?? "button"}
        {...attrs}
        className={inner(variant, size, fullWidth, className)}
      >
        {children}
      </button>
    </motion.div>
  );
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  onClick,
  type,
}: BaseProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = inner(variant, size, fullWidth, className);
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={cls}
    >
      {children}
    </button>
  );
}
