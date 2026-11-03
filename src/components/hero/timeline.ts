// The scroll story, in one place. Every value is a fraction of the
// pinned scroll distance, from 0 (hero reaches the top) to 1 (hero lets go).
export const FIRST = 197_313;
export const LAST = 13;

// How many batches of corrupt fixes the figure drops through.
const STEPS = 7;

export const range = {
  /** The strike-through draws across the first figure. */
  strike: [0.03, 0.11],
  /** The figure falls from FIRST to LAST. */
  decay: [0.13, 0.78],
  /** The green block rises and takes over the stage. */
  wipe: [0.64, 0.86],
  /** The final figure grows to fill the space. */
  grow: [0.8, 0.95],
} satisfies Record<string, number[]>;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Staircase on a log scale: hold, drop, hold, drop. Each drop divides the
 * figure by about four, which reads as one batch of bad fixes being thrown
 * out. Only FIRST and LAST are real; the figures between are illustrative.
 */
export function valueAt(progress: number): number {
  const [from, to] = range.decay;
  const t = clamp01((progress - from) / (to - from));
  const x = t * STEPS;
  const step = Math.min(Math.floor(x), STEPS);
  const drop = step >= STEPS ? 0 : smooth(clamp01((x - step - 0.4) / 0.6));
  const along = step >= STEPS ? 1 : (step + drop) / STEPS;
  return FIRST * Math.pow(LAST / FIRST, along);
}
