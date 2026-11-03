"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

// Page transition. When the visitor moves to another page, a green panel
// covers the screen at once and lifts away to reveal the new page. It never
// runs on the first load or on a change that only moves to an anchor. Under
// "reduce motion" the global rule shortens the lift to nothing, so the
// panel is gone before it can be seen.
export function RouteCurtain() {
  const pathname = usePathname();
  const [seen, setSeen] = useState(pathname);
  const [runs, setRuns] = useState(0);

  // Noticing the new path while rendering puts the panel on screen in the
  // same frame as the new page, so the swap is never visible.
  if (pathname !== seen) {
    setSeen(pathname);
    setRuns(runs + 1);
  }

  if (runs === 0) return null;

  return (
    <div
      key={runs}
      aria-hidden="true"
      className="curtain pointer-events-none fixed inset-0 z-[70] border-b-4 border-ink bg-signal"
    />
  );
}
