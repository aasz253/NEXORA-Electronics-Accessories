"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { prefersReducedMotion } from "@/lib/utils";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const t = setTimeout(() => setReady(true), reduced ? 150 : 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader ready={ready} />
      {children}
    </>
  );
}
