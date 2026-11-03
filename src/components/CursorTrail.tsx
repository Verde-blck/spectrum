"use client";

import { useEffect, useRef } from "react";

// Each fix the pointer drops lives this long, in milliseconds.
const LIFE = 1500;
// A corrupt fix is struck out and gone within this time.
const STRAY_LIFE = 950;
// How far the pointer travels between fixes, in pixels.
const GAP = 28;
const MAX_FIXES = 26;

type Fix = { x: number; y: number; born: number };
type Stray = { x: number; y: number; dx: number; dy: number; born: number };

// Canvas cannot read CSS variables that hold light-dark(), so resolve each
// colour through a hidden element and read what the browser computed.
function readPalette() {
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
  document.body.append(probe);
  const read = (name: string) => {
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color;
  };
  const palette = {
    verde: read("--verde"),
    fault: read("--fault"),
    ink: read("--ink"),
    ground: read("--ground"),
  };
  probe.remove();
  return palette;
}

function start(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let w = 0;
  let h = 0;
  let frame = 0;
  let fixes: Fix[] = [];
  let strays: Stray[] = [];
  let last: { x: number; y: number } | null = null;
  let travelled = 0;
  let count = 0;
  let nextStray = 8 + Math.floor(Math.random() * 8);
  let palette = readPalette();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  const paint = (now: number) => {
    frame = 0;
    fixes = fixes.filter((f) => now - f.born < LIFE);
    strays = strays.filter((s) => now - s.born < STRAY_LIFE);
    ctx.clearRect(0, 0, w, h);

    // The route through the fixes still alive: a dark edge under a green line.
    for (let i = 1; i < fixes.length; i++) {
      const a = fixes[i - 1];
      const b = fixes[i];
      ctx.globalAlpha = Math.max(0, 1 - (now - b.born) / LIFE);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = palette.ground;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.strokeStyle = palette.verde;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    for (const f of fixes) {
      ctx.globalAlpha = Math.max(0, 1 - (now - f.born) / LIFE);
      ctx.fillStyle = palette.verde;
      ctx.strokeStyle = palette.ground;
      ctx.lineWidth = 2;
      ctx.strokeRect(f.x - 3, f.y - 3, 6, 6);
      ctx.fillRect(f.x - 3, f.y - 3, 6, 6);
    }

    // A corrupt fix: the line shoots off screen, then gets struck out.
    for (const s of strays) {
      const age = now - s.born;
      const reach = 1 - Math.pow(1 - Math.min(1, age / 180), 3);
      ctx.globalAlpha = age < 520 ? 1 : Math.max(0, (STRAY_LIFE - age) / (STRAY_LIFE - 520));
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.dx * reach, s.y + s.dy * reach);
      ctx.strokeStyle = palette.ground;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.strokeStyle = palette.fault;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (age > 330) {
        const len = Math.hypot(s.dx, s.dy);
        const ux = s.dx / len;
        const uy = s.dy / len;
        const mx = s.x + ux * 110;
        const my = s.y + uy * 110;
        const grow = Math.min(1, (age - 330) / 90);
        ctx.beginPath();
        ctx.moveTo(mx - uy * 12 * grow, my + ux * 12 * grow);
        ctx.lineTo(mx + uy * 12 * grow, my - ux * 12 * grow);
        ctx.strokeStyle = palette.ink;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    if (fixes.length || strays.length) wake();
  };

  const drop = (x: number, y: number) => {
    const now = performance.now();
    fixes.push({ x, y, born: now });
    if (fixes.length > MAX_FIXES) fixes.shift();
    count += 1;
    if (count >= nextStray) {
      count = 0;
      nextStray = 8 + Math.floor(Math.random() * 10);
      const angle = Math.random() * Math.PI * 2;
      const reach = Math.hypot(w, h) * 1.2;
      strays.push({ x, y, dx: Math.cos(angle) * reach, dy: Math.sin(angle) * reach, born: now });
    }
    wake();
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const here = { x: e.clientX, y: e.clientY };
    if (last) travelled += Math.hypot(here.x - last.x, here.y - last.y);
    last = here;
    if (travelled >= GAP) {
      travelled = 0;
      drop(here.x, here.y);
    }
  };
  const onLeave = () => {
    last = null;
  };

  const theme = new MutationObserver(() => {
    palette = readPalette();
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  const onScheme = () => {
    palette = readPalette();
  };
  scheme.addEventListener("change", onScheme);

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    scheme.removeEventListener("change", onScheme);
    theme.disconnect();
    canvas.width = 0;
    canvas.height = 0;
  };
}

// Breadcrumbs for the pointer: a GPS fix every few pixels, joined into a
// route that fades. Now and then one fix goes wrong and is struck out. It
// only runs with a mouse or pen, and never when the visitor asks for less
// motion. Touch screens and keyboards get nothing and lose nothing.
export function CursorTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;

    const sync = () => {
      stop?.();
      stop = fine.matches && !calm.matches ? start(el) : undefined;
    };
    // Nothing needs to be ready before the first pointer move.
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(sync)
      : window.setTimeout(sync, 200);
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop?.();
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}
