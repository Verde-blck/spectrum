import Image from "next/image";
import { ledger } from "@/content/work";
import { Incident } from "./Incident";
import { KoboDemo } from "./KoboDemo";
import { Problems } from "./Problems";

// The one project written up in full. It comes after the route because it is
// something I built rather than a job, but it follows the E5 pattern: what it
// is, screenshots, the problem it was built around, a demo, then the smaller
// fixes.
export function LedgerEntry() {
  return (
    <article
      id="iwe-oja"
      aria-labelledby="ledger-title"
      className="mt-28 md:mt-40"
    >
      <p className="font-display text-base font-bold text-muted">
        <time dateTime={ledger.date.iso}>{ledger.date.text}</time>
      </p>
      <h3
        id="ledger-title"
        className="mt-2 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
      >
        {ledger.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {ledger.role}
      </p>
      <p className="mt-1 italic text-muted">{ledger.stack}</p>

      <div className="longread mt-8">
        {ledger.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 font-display font-bold [overflow-wrap:anywhere]">
        <a href={ledger.link.href} className="link" rel="noreferrer">
          {ledger.link.label}
        </a>
      </p>

      {/* Phone screenshots, shown in their own colours because they are the
          product. Three across on every screen size, like a contact sheet. */}
      <ul role="list" className="mt-12 grid max-w-3xl grid-cols-3 gap-3 md:gap-6">
        {ledger.screens.map((screen) => (
          <li key={screen.caption}>
            <figure>
              <div className="lift overflow-hidden border-2 border-rule">
                <Image
                  src={screen.image}
                  alt={screen.alt}
                  placeholder="blur"
                  sizes="(min-width: 48rem) 15rem, 30vw"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 font-display text-sm font-bold text-muted md:text-base">
                {screen.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <figure className="mt-10 max-w-3xl">
        <div className="lift overflow-hidden border-2 border-rule">
          <Image
            src={ledger.dashboard.image}
            alt={ledger.dashboard.alt}
            placeholder="blur"
            sizes="(min-width: 48rem) 48rem, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-2 font-display text-sm font-bold text-muted md:text-base">
          {ledger.dashboard.caption}
        </figcaption>
      </figure>

      <div className="mt-14 grid gap-14">
        <Incident {...ledger.featured} />
        <KoboDemo />
        <Problems
          id="ledger-problems"
          title={ledger.problemsTitle}
          items={ledger.problems}
        />
      </div>
    </article>
  );
}
