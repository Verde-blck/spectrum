import type { Problem } from "@/content/work";

// A list of problems, each with its fix. Set as a definition list so a
// screen reader announces every problem with its fix. The column labels
// are for sighted readers on wide screens only.
export function Problems({
  title,
  items,
}: {
  title: string;
  items: readonly Problem[];
}) {
  return (
    <section aria-labelledby="e5-problems" className="border-t-2 border-rule pt-5">
      <h4
        id="e5-problems"
        className="max-w-[28ch] font-display text-2xl font-bold leading-tight md:text-3xl"
      >
        {title}
      </h4>

      <div
        aria-hidden="true"
        className="mt-6 hidden gap-x-8 pb-3 font-display text-base font-bold text-muted md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <span>Problem</span>
        <span>Fix</span>
      </div>

      <dl className="mt-6 md:mt-0">
        {items.map((item) => (
          <div
            key={item.problem}
            className="grid gap-y-1 border-t-2 border-rule py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8"
          >
            <dt className="font-display text-lg font-bold leading-snug">
              {item.problem}
            </dt>
            <dd className="longread">{item.fix}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
