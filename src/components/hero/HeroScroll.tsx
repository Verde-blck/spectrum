"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { FIRST, range, valueAt } from "./timeline";

const format = new Intl.NumberFormat("en-GB");
const START_TEXT = format.format(FIRST);

type Shared = {
  text: MotionValue<string>;
  strike: MotionValue<number>;
  grow: MotionValue<number>;
  intro: MotionValue<number>;
  working: MotionValue<number>;
  done: MotionValue<number>;
};

/*
  One face of the stage. It is drawn twice with identical layout: once on
  the bottle ground (orange figure, struck through) and once on the green
  block (dark figure). The green copy rises over the first, so the figure
  changes colour exactly at the moving edge and orange never sits on green.
*/
function Face({ tone, shared }: { tone: "ground" | "signal"; shared: Shared }) {
  const onGround = tone === "ground";

  // Each copy of the figure writes its own digits as the value changes.
  // React never re-renders them.
  const figure = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(shared.text, "change", (value) => {
    if (figure.current) figure.current.textContent = value;
  });

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between px-gutter pb-6 pt-6 md:pb-10 md:pt-10 ${
        onGround ? "graticule text-ink" : "on-signal bg-signal text-on-signal"
      }`}
    >
      <p
        data-measure="title"
        className="max-w-[22ch] font-display text-xl font-bold leading-tight md:text-2xl"
      >
        {site.name}, {site.role.toLowerCase()} in Lagos
      </p>

      <div className="fit">
        <m.p
          data-measure="figure"
          className={`numeral grow pb-[0.14em] ${
            onGround ? "text-fault" : "text-on-signal"
          }`}
          style={
            {
              "--fit": 32,
              "--fit-max": "52cqh",
              "--g": shared.grow,
            } as React.CSSProperties
          }
        >
          <span className="relative inline-block">
            {onGround && (
              // Invisible. Measures how wide the final figure is at rest.
              <span
                data-measure="thirteen"
                className="invisible absolute left-0 top-0 whitespace-nowrap"
              >
                13<span className="ml-[0.05em] text-[0.2em]">km</span>
              </span>
            )}
            <span data-figure="" ref={figure}>
              {START_TEXT}
            </span>
            <span className="ml-[0.05em] text-[0.2em]">km</span>
            {onGround && (
              <m.span
                className="absolute inset-x-[-1.5%] top-[48%] h-[0.055em] origin-left bg-ink"
                style={{ scaleX: shared.strike, rotate: -0.8 }}
              />
            )}
          </span>
        </m.p>
      </div>

      <div data-measure="caption" className="relative h-28 md:h-24">
        <m.p
          className="absolute inset-x-0 bottom-0 max-w-[48ch] text-lg leading-snug md:text-xl"
          style={{ opacity: shared.intro }}
        >
          The backend reported this route as 197,313 km. Scroll to run the
          filter.
        </m.p>
        <m.p
          className="absolute inset-x-0 bottom-0 max-w-[48ch] text-lg leading-snug md:text-xl"
          style={{ opacity: shared.working }}
        >
          Rejecting corrupt GPS fixes. Only the first and last figures are
          real. The ones in between are illustrative.
        </m.p>
        <m.p
          className="absolute inset-x-0 bottom-0 max-w-[48ch] text-lg leading-snug md:text-xl"
          style={{ opacity: shared.done }}
        >
          The real distance was 13 km. Corrupt GPS fixes made up the gap, and I
          wrote the filter that closed it.
        </m.p>
      </div>
    </div>
  );
}

export function HeroScroll() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Work out how far the last figure can grow before it meets the title
  // above it or the caption below it, on this screen. Re-measured on resize.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const measure = () => {
      const get = (k: string) =>
        el.querySelector<HTMLElement>(`[data-measure="${k}"]`);
      const title = get("title");
      const figure = get("figure");
      const caption = get("caption");
      const thirteen = get("thirteen");
      const face = title?.parentElement;
      if (!title || !figure || !caption || !thirteen || !face) return;

      const css = getComputedStyle(face);
      const padY = parseFloat(css.paddingTop) + parseFloat(css.paddingBottom);
      const padX = parseFloat(css.paddingLeft) + parseFloat(css.paddingRight);
      const room = el.clientHeight - padY - title.offsetHeight - caption.offsetHeight - 32;
      const byHeight = room / figure.offsetHeight;
      const byWidth = ((el.clientWidth - padX) / thirteen.offsetWidth) * 0.98;
      const grow = Math.max(1, Math.min(byHeight, byWidth, 3));
      el.style.setProperty("--grow", grow.toFixed(3));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    // The widths depend on the web font, which may arrive after first paint.
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  // 48px is the sticky header height. Progress starts when the track
  // reaches the bottom edge of the header and ends when the stage lets go.
  const { scrollYProgress: p } = useScroll({
    target: track,
    offset: ["start 48px", "end end"],
  });

  const shared: Shared = {
    text: useTransform(p, (v) => format.format(Math.round(valueAt(v)))),
    strike: useTransform(p, range.strike, [0, 1]),
    grow: useTransform(p, range.grow, [0, 1]),
    intro: useTransform(p, [0, 0.09, 0.13], [1, 1, 0]),
    working: useTransform(p, [0.13, 0.17, 0.57, 0.63], [0, 1, 1, 0]),
    done: useTransform(p, [0.82, 0.9], [0, 1]),
  };

  // The green window rises while its contents move down by the same amount,
  // so the figure stays put and only the colour changes. Transforms only.
  const rise = useTransform(p, range.wipe, ["100%", "0%"]);
  const counter = useTransform(p, range.wipe, ["-100%", "0%"]);

  return (
    <div
      ref={track}
      className="hero-scroll relative h-[360svh]"
      aria-hidden="true"
    >
      <div
        ref={stage}
        className="sticky top-[var(--header-h)] h-[calc(100svh-var(--header-h))] overflow-hidden border-b-2 border-rule bg-ground [container-type:size]"
      >
        <Face tone="ground" shared={shared} />
        <m.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: rise }}
        >
          <m.div className="absolute inset-0" style={{ y: counter }}>
            <Face tone="signal" shared={shared} />
          </m.div>
        </m.div>
      </div>
    </div>
  );
}
