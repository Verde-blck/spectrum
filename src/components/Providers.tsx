"use client";

import { LazyMotion, MotionConfig, domMin } from "motion/react";

// domMin is the smallest feature set that still lets the lightweight "m"
// components follow scroll-linked values. The full "motion" components also
// carry drag, layout and gesture code that this site never uses.
// MotionConfig makes any animation prop added later honour the visitor's
// "reduce motion" setting without per-component checks.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMin} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
