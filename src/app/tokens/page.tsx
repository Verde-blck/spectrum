import type { Metadata } from "next";

// A working reference for the palette and type. Delete this folder
// before launch, or keep it unlisted for your own use.
export const metadata: Metadata = {
  title: "Tokens",
  robots: { index: false, follow: false },
};

const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const roles = [
  { name: "ground", use: "Page background" },
  { name: "raised", use: "Footer and raised areas" },
  { name: "ink", use: "Body text and strong rules" },
  { name: "muted", use: "Secondary text" },
  { name: "rule", use: "Borders and grid lines" },
  { name: "verde", use: "Links, focus rings, small green text" },
  { name: "signal", use: "Filled green blocks, with on-signal text" },
  { name: "fault", use: "Corrupt data only, never on signal" },
] as const;

export default function Tokens() {
  return (
    <div className="px-gutter py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        Tokens
      </h1>

      <h2 className="mt-12 font-display text-2xl font-bold">Roles</h2>
      <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r) => (
          <li key={r.name}>
            <div
              aria-hidden="true"
              className="h-24 border-2 border-rule"
              style={{ background: `var(--${r.name})` }}
            />
            <p className="mt-2 font-display text-lg font-extrabold">{r.name}</p>
            <p className="text-base text-muted">{r.use}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-2xl font-bold">Green scale</h2>
      <ul className="mt-4 grid grid-cols-11 border-2 border-rule">
        {scale.map((step) => (
          <li key={step}>
            <div
              aria-hidden="true"
              className="h-32"
              style={{ background: `var(--leaf-${step})` }}
            />
            <p className="p-1 font-display text-xs font-bold sm:p-2 sm:text-sm">
              {step}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-2xl font-bold">Long-read setting</h2>
      <div className="longread mt-4">
        <p>
          A set of coordinates is a claim, not a fact. The helmet reported where
          it believed it was, 1,200 times an hour, and some of those beliefs
          were wrong by thousands of kilometres.
        </p>
        <p>
          The second paragraph is indented, as in print, and the line length
          stays under seventy characters so the eye can find the next line
          without effort. Figures like 197,313 and 13 sit at the height of the
          lower-case letters.
        </p>
      </div>
    </div>
  );
}
