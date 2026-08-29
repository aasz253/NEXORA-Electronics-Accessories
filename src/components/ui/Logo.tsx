import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
}

/** NEXORA brand mark — clean, premium, type-driven. */
export default function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-baseline gap-0.5", className)}>
      <span className="font-display text-xl font-extrabold tracking-[0.08em] text-white">
        NEX
      </span>
      <span className="relative inline-block h-3.5 w-1 rounded-full bg-gradient-to-b from-cyan-300 to-electric-500" />
      <span className="font-display text-xl font-extrabold tracking-[0.08em] text-white">
        RA
      </span>
    </span>
  );
  return (
    <Link href={href} aria-label="NEXORA home" className="group inline-flex">
      {content}
    </Link>
  );
}
