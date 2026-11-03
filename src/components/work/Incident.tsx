import { Fragment } from "react";
import type { IncidentData } from "@/content/work";

// One incident report: what happened, why, the fix, and what I would do
// differently. The last part is set in italic because it looks forward.
export function Incident({ title, parts }: IncidentData) {
  return (
    <article className="border-t-2 border-rule pt-5">
      <h4 className="max-w-[28ch] font-display text-2xl font-bold leading-tight md:text-3xl">
        {title}
      </h4>
      <dl className="mt-6 grid gap-y-1 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-8 md:gap-y-5">
        {parts.map((part) => (
          <Fragment key={part.label}>
            <dt className="font-display text-base font-bold md:pt-[0.3em]">
              {part.label}
            </dt>
            <dd
              className={`longread pb-4 md:pb-0 ${part.reflective ? "italic" : ""}`}
            >
              {part.text}
            </dd>
          </Fragment>
        ))}
      </dl>
    </article>
  );
}
