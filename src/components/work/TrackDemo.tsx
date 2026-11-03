"use client";

import { animate, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ORIGIN, sampleTrack } from "@/content/sampleTrack";
import { project, rawLengthKm, speedFilter } from "@/lib/geo";

type Mode = "raw" | "filtered";

// The drawing is 800 by 600 units, centred on the middle of the route.
const HALF_W = 400;
const HALF_H = 300;
const DEFAULT_CEILING = 40;
// In the raw picture, a jump faster than this is drawn as a stray fix.
const STRAY_MS = 40;
// Anything this far from the route is a stray fix, not part of the route.
const NEAR_KM = 100;

const points = sampleTrack.map((fix) => project(ORIGIN, fix));
const isNear = points.map((p) => Math.hypot(p.x, p.y) < NEAR_KM);
const RAW_KM = rawLengthKm(sampleTrack);
const STRAYS = isNear.filter((near) => !near).length;

const farthest = Math.max(...points.map((p) => Math.hypot(p.x, p.y)));
const routeX = Math.max(...points.filter((_, i) => isNear[i]).map((p) => Math.abs(p.x)));
const routeY = Math.max(...points.filter((_, i) => isNear[i]).map((p) => Math.abs(p.y)));
// Trigonometry can differ in the last binary digit between the server and the
// browser. Printed into the page, that is a hydration mismatch. Rounding to six
// significant figures makes both sides print exactly the same text.
const stable = (v: number) => Number(v.toPrecision(6));

// Pixels per kilometre: zoomed out to see every stray fix, and zoomed in on the route.
const S_OUT = stable((HALF_H - 30) / farthest);
const S_IN = stable(Math.min((HALF_W - 50) / routeX, (HALF_H - 50) / routeY));

const n = (v: number) => v.toFixed(3);
const dots = (idx: number[]) =>
  idx.map((i) => `M${n(points[i].x)} ${n(points[i].y)}h0`).join("");
const line = (idx: number[]) =>
  idx.map((i, k) => `${k ? "L" : "M"}${n(points[i].x)} ${n(points[i].y)}`).join("");

// The raw picture never changes, so build it once.
const rawGood: string[] = [];
const rawBad: string[] = [];
for (let i = 1; i < sampleTrack.length; i++) {
  const a = points[i - 1];
  const b = points[i];
  const seg = `M${n(a.x)} ${n(a.y)}L${n(b.x)} ${n(b.y)}`;
  const km = Math.hypot(b.x - a.x, b.y - a.y);
  const fast = (km * 1000) / (sampleTrack[i].t - sampleTrack[i - 1].t) > STRAY_MS;
  (fast ? rawBad : rawGood).push(seg);
}
const RAW_GOOD = rawGood.join("");
const RAW_BAD = rawBad.join("");
const NEAR_DOTS = dots(points.map((_, i) => i).filter((i) => isNear[i]));
const STRAY_DOTS = dots(points.map((_, i) => i).filter((i) => !isNear[i]));

const distanceFormat = (v: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: v < 100 ? 1 : 0 }).format(v);
const widthFormat = (km: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: km < 10 ? 1 : 0 }).format(
    km < 10 ? km : Number(km.toPrecision(3)),
  );
const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

export function TrackDemo() {
  const id = useId();
  const calm = useReducedMotion();
  const [mode, setMode] = useState<Mode>("raw");
  const [ceiling, setCeiling] = useState(DEFAULT_CEILING);

  const filtered = useMemo(() => speedFilter(sampleTrack, ceiling), [ceiling]);
  const keptIdx = useMemo(
    () => filtered.kept.map((k, i) => (k ? i : -1)).filter((i) => i >= 0),
    [filtered],
  );
  const lostReal = useMemo(
    () => filtered.kept.filter((k, i) => !k && isNear[i]).length,
    [filtered],
  );

  const world = useRef<SVGGElement>(null);
  const rawLayer = useRef<SVGGElement>(null);
  const keptLayer = useRef<SVGGElement>(null);
  const marks = useRef<SVGGElement>(null);
  const centre = useRef<HTMLParagraphElement>(null);
  const width = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const zoom = useRef(0);
  const shown = useRef(RAW_KM);

  const draw = useCallback((t: number) => {
    const s = Math.exp(Math.log(S_OUT) + (Math.log(S_IN) - Math.log(S_OUT)) * t);
    world.current?.setAttribute("transform", `scale(${s})`);
    if (rawLayer.current) {
      rawLayer.current.style.opacity = String(1 - smooth(0.1, 0.5, t));
      rawLayer.current.style.display = t > 0.6 ? "none" : "";
    }
    if (centre.current) centre.current.style.opacity = String(1 - smooth(0.05, 0.3, t));
    if (keptLayer.current) keptLayer.current.style.opacity = String(smooth(0.55, 0.95, t));
    if (marks.current) marks.current.style.opacity = String(smooth(0.92, 1, t));
    if (width.current) width.current.textContent = widthFormat((2 * HALF_W) / s);
  }, []);

  // Zoom between the whole world of stray fixes and the route itself.
  useEffect(() => {
    const target = mode === "filtered" ? 1 : 0;
    if (zoom.current === target) return;
    const controls = animate(zoom.current, target, {
      duration: calm ? 0 : 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        zoom.current = v;
        draw(v);
      },
    });
    return () => controls.stop();
  }, [mode, calm, draw]);

  // Count the distance up or down to its new value.
  const distance = mode === "raw" ? RAW_KM : filtered.lengthKm;
  useEffect(() => {
    if (shown.current === distance) return;
    const controls = animate(shown.current, distance, {
      duration: calm ? 0 : 0.8,
      ease: "easeOut",
      onUpdate: (v) => {
        shown.current = v;
        if (number.current) number.current.textContent = distanceFormat(v);
      },
    });
    return () => controls.stop();
  }, [distance, calm]);

  const marksPath = useMemo(
    () =>
      points
        .map((p, i) => ({ p, i }))
        .filter(({ i }) => isNear[i] && !filtered.kept[i])
        .map(({ p }) => {
          const x = p.x * S_IN;
          const y = p.y * S_IN;
          return `M${n(x - 5)} ${n(y - 5)}L${n(x + 5)} ${n(y + 5)}M${n(x - 5)} ${n(y + 5)}L${n(x + 5)} ${n(y - 5)}`;
        })
        .join(""),
    [filtered],
  );

  const kmh = Math.round(ceiling * 3.6);
  const status =
    mode === "raw"
      ? `Raw track: ${distanceFormat(RAW_KM)} kilometres from ${sampleTrack.length} fixes.`
      : `Filtered track: ${distanceFormat(filtered.lengthKm)} kilometres. ${filtered.rejected} of ${sampleTrack.length} fixes dropped.`;

  let help = "Switch to Filtered to use the ceiling.";
  if (mode === "filtered") {
    help =
      lostReal > 0
        ? `Too strict. ${lostReal} real fixes were dropped along with the ${STRAYS} stray ones, so the route comes out shorter than it is.`
        : `All ${STRAYS} stray fixes are dropped and every real fix is kept.`;
  }

  return (
    <figure
      aria-labelledby={`${id}-title`}
      className="border-2 border-rule bg-raised"
    >
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:p-6">
        <div>
          <p id={`${id}-title`} className="font-display text-xl font-bold">
            Try it on sample data
          </p>
          <p className="mt-2 max-w-[52ch]">
            These {sampleTrack.length} fixes are made up to reproduce the
            problem. They are not E5 data. Switch between the raw track and the
            filtered one, then move the ceiling to see what a stricter or looser
            rule keeps.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">View</legend>
          <div className="inline-flex border-2 border-ink font-display text-lg font-bold">
            {(["raw", "filtered"] as const).map((m) => (
              <label key={m} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-mode`}
                  value={m}
                  checked={mode === m}
                  onChange={() => setMode(m)}
                  className="peer sr-only"
                />
                <span className="block px-5 py-2.5 peer-checked:bg-ink peer-checked:text-ground peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-verde">
                  {m === "raw" ? "Raw fixes" : "Filtered"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border-y-2 border-rule bg-ground">
        <div className="relative">
        <svg
          viewBox={`${-HALF_W} ${-HALF_H} ${2 * HALF_W} ${2 * HALF_H}`}
          role="img"
          aria-label="A map of the sample track. Raw, it is a small route with stray fixes shooting out thousands of kilometres. Filtered, only the route remains."
          className="mx-auto block h-auto max-h-[min(34rem,72svh)] w-full"
        >
          <g aria-hidden="true">
            <path
              d={`M${-HALF_W} 0H${HALF_W}M0 ${-HALF_H}V${HALF_H}`}
              className="fill-none stroke-rule/40"
              strokeWidth={1}
            />
            <g ref={world} transform={`scale(${S_OUT})`}>
              <g ref={rawLayer} style={{ opacity: 1 }}>
                <path d={RAW_BAD} className="fill-none stroke-fault" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                <path d={RAW_GOOD} className="fill-none stroke-verde" strokeWidth={2} vectorEffect="non-scaling-stroke" />
                <path d={STRAY_DOTS} className="fill-none stroke-fault" strokeWidth={9} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d={NEAR_DOTS} className="fill-none stroke-verde" strokeWidth={6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </g>
              <g ref={keptLayer} style={{ opacity: 0 }}>
                <path d={line(keptIdx)} className="fill-none stroke-verde" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <path d={dots(keptIdx)} className="fill-none stroke-verde" strokeWidth={6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </g>
            </g>
            <g ref={marks} style={{ opacity: 0 }}>
              <path d={marksPath} className="fill-none stroke-fault" strokeWidth={2.5} />
            </g>
          </g>
        </svg>
          <p
            ref={centre}
            style={{ opacity: 1 }}
            className="pointer-events-none absolute left-1/2 top-1/2 ml-3 mt-2 max-w-[14ch] font-display text-sm font-bold leading-tight"
          >
            The real route is the dot at the centre
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t-2 border-rule bg-raised px-4 py-2 font-display text-sm font-bold">
          <ul role="list" className="flex gap-x-5">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 bg-verde" />
              Kept
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 bg-fault" />
              Stray or dropped
            </li>
          </ul>
          <p className="text-muted">
            View width <span ref={width}>{widthFormat((2 * HALF_W) / S_OUT)}</span> km
          </p>
        </div>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-12 md:p-6">
        <div>
          <p
            className={`numeral pb-[0.12em] text-[clamp(3.5rem,9vw,6.5rem)] ${
              mode === "raw" ? "text-fault" : "text-verde"
            }`}
          >
            <span ref={number}>{distanceFormat(RAW_KM)}</span>
            <span className="ml-[0.05em] text-[max(0.2em,0.875rem)] text-ink">km</span>
          </p>
          <p className="mt-1 font-display text-base font-bold text-muted">
            {mode === "raw" ? "Raw distance" : "Distance after filtering"}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <label htmlFor={`${id}-ceiling`} className="whitespace-nowrap font-display text-lg font-bold">
              Speed ceiling
            </label>
            <output htmlFor={`${id}-ceiling`} className="whitespace-nowrap font-display text-lg font-bold">
              {ceiling} m/s ({kmh} km/h)
            </output>
          </div>
          <input
            id={`${id}-ceiling`}
            type="range"
            min={4}
            max={120}
            step={1}
            value={ceiling}
            disabled={mode === "raw"}
            aria-valuetext={`${ceiling} metres per second, ${kmh} kilometres per hour`}
            aria-describedby={`${id}-help`}
            onChange={(e) => setCeiling(Number(e.target.value))}
            className="slider mt-2"
          />
          <p id={`${id}-help`} className="mt-2 max-w-[52ch] text-base">
            {help}
          </p>
        </div>
      </div>

      <p role="status" className="sr-only">
        {status}
      </p>
    </figure>
  );
}
