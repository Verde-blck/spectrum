"use client";

import { useId, useState } from "react";

type Mode = "full" | "hidden";
type Point = readonly [number, number];

// A 2.4 km evening loop that starts and ends at the walker's door, drawn 800 by
// 360. The cut points are measured along the drawn line, so the 200 m at each
// end is to scale.
const ROUTE: readonly Point[] = [
  [150, 296], [150, 214], [262, 196], [418, 142], [598, 92], [702, 168],
  [664, 288], [482, 322], [302, 324], [178, 312], [150, 296],
];
const ROUTE_M = 2400;
const HIDDEN_M = 200;

const segments = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]));
const TOTAL_PX = segments.reduce((a, b) => a + b, 0);
const CUT_PX = (HIDDEN_M / ROUTE_M) * TOTAL_PX;

/** The stretch of the route between two distances along it, in drawing units. */
function stretch(from: number, to: number): Point[] {
  const out: Point[] = [];
  let walked = 0;
  for (let i = 0; i < segments.length; i += 1) {
    const [a, b] = [ROUTE[i], ROUTE[i + 1]];
    const at = (d: number): Point => {
      const f = (d - walked) / segments[i];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    };
    const end = walked + segments[i];
    if (end >= from && walked <= to) {
      if (!out.length) out.push(from > walked ? at(from) : a);
      out.push(to < end ? at(to) : b);
    }
    walked = end;
  }
  return out;
}

const path = (points: Point[]) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

const FULL = path([...ROUTE]);
const MIDDLE = stretch(CUT_PX, TOTAL_PX - CUT_PX);
const SHOWN = path(MIDDLE);
const DOOR = ROUTE[0];

const VIEWS = {
  full: {
    label: "Full route",
    starts: "At the front door",
    learns: "Where the walker lives",
    note: "Shared as it is, the walk starts and ends at the same spot. Anyone who sees it on a WhatsApp Status can tell which house the walker came out of.",
  },
  hidden: {
    label: "Ends hidden",
    starts: "200 m away, round the corner",
    learns: "Roughly which streets they walk",
    note: "With the first and last 200 m left out, the route starts and ends away from the house, and the image says so. The walk itself is untouched: distance and steps still count every metre.",
  },
} satisfies Record<Mode, { label: string; starts: string; learns: string; note: string }>;

export function TrimDemo() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("full");
  const view = VIEWS[mode];
  const hidden = mode === "hidden";
  const first = hidden ? MIDDLE[0] : DOOR;
  const last = hidden ? MIDDLE[MIDDLE.length - 1] : DOOR;

  return (
    <figure aria-labelledby={`${id}-title`} className="border-2 border-rule bg-raised">
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:p-6">
        <div>
          <p id={`${id}-title`} className="font-display text-xl font-bold">
            Why shared routes leave out 200 m
          </p>
          <p className="mt-2 max-w-[52ch]">
            A 2.4 km evening loop, starting and ending at home. Switch between
            sharing the whole route and hiding its ends, as Irin Ajo does by
            default.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Share the route with</legend>
          <div className="inline-flex border-2 border-ink font-display text-lg font-bold">
            {(Object.keys(VIEWS) as Mode[]).map((m) => (
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
                  {VIEWS[m].label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border-t-2 border-rule bg-ground p-5 md:p-6">
        <svg
          viewBox="0 0 800 360"
          role="img"
          aria-label={hidden ? "The route with its first and last 200 metres removed, starting and ending away from the house." : "The whole route, starting and ending at the house."}
          className="block h-auto w-full max-w-2xl"
        >
          {hidden && (
            <path d={FULL} fill="none" strokeWidth={3} strokeDasharray="6 8" strokeLinecap="round" className="stroke-muted" />
          )}
          <path
            d={hidden ? SHOWN : FULL}
            fill="none"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-verde"
          />
          {/* The house the walk starts from. */}
          <g transform={`translate(${DOOR[0] - 16} ${DOOR[1] + 10})`} className="fill-ink">
            <path d="M16 0 L32 13 L28 13 L28 30 L4 30 L4 13 L0 13 Z" />
            <rect x={12} y={18} width={8} height={12} className="fill-ground" />
          </g>
          <circle cx={first[0]} cy={first[1]} r={9} strokeWidth={3} className="fill-ground stroke-ink" />
          <circle cx={last[0]} cy={last[1]} r={6} className="fill-ink" />
        </svg>

        <dl className="mt-5 grid gap-y-1 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-8 md:gap-y-3">
          <dt className="font-display font-bold">Shared route starts</dt>
          <dd className="pb-3 md:pb-0">{view.starts}</dd>
          <dt className="font-display font-bold">What a stranger learns</dt>
          <dd
            aria-live="polite"
            className={`font-display text-xl font-bold ${hidden ? "text-verde" : "text-fault"}`}
          >
            {view.learns}
          </dd>
        </dl>
        <p className="mt-5 max-w-[60ch]">{view.note}</p>
      </div>
    </figure>
  );
}
