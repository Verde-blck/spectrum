"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useRef } from "react";

// Where the line starts, from the top of the list. Matches top-3 below.
const LINE_TOP = 12;

// The surviving route. A dim line runs the full length of the list and a
// green line draws down it as the visitor scrolls. The head of the green
// line sits 60% of the way down the screen. Each square lights when the
// head reaches it.
export function Route({ children }: { children: React.ReactNode }) {
  const list = useRef<HTMLOListElement>(null);
  const spots = useRef<{ el: HTMLElement; y: number }[]>([]);
  const height = useRef(0);

  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 60%", "end 60%"],
  });

  const light = useCallback((progress: number) => {
    const head = LINE_TOP + progress * (height.current - LINE_TOP);
    for (const spot of spots.current) {
      spot.el.dataset.lit = String(spot.y <= head + 0.5);
    }
  }, []);

  // Measure where each square sits. Positions are relative to the list, so
  // they do not change as the page scrolls, only when the layout does.
  useEffect(() => {
    const el = list.current;
    if (!el) return;

    const measure = () => {
      const base = el.getBoundingClientRect().top;
      height.current = el.offsetHeight;
      spots.current = [...el.querySelectorAll<HTMLElement>(".route-node")].map(
        (node) => {
          const box = node.getBoundingClientRect();
          return { el: node, y: box.top - base + box.height / 2 };
        },
      );
      light(scrollYProgress.get());
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [light, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", light);

  return (
    <ol ref={list} role="list" className="relative">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-3 top-3 w-0.5 -translate-x-1/2 bg-rule/45 md:left-[11.75rem]"
      />
      <m.span
        aria-hidden="true"
        className="route-lit absolute bottom-0 left-3 top-3 w-0.5 origin-top -translate-x-1/2 bg-verde md:left-[11.75rem]"
        style={{ scaleY: scrollYProgress }}
      />
      {children}
    </ol>
  );
}
