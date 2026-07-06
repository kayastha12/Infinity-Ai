"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, // Smoothness
      wheelMultiplier: 1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
