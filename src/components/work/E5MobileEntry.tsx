import Image from "next/image";
import { e5Mobile } from "@/content/work";
import { Incident } from "./Incident";
import { Problems } from "./Problems";

// The E5 tablet app, written up like Irin Ajo: what it is, screenshots, the
// problem that taught me the most, then the smaller fixes.
export function E5MobileEntry() {
  return (
    <article
      id="e5-mobile"
      aria-labelledby="e5-mobile-title"
      className="mt-28 md:mt-40"
    >
      <p className="font-display text-base font-bold text-muted">
        <time dateTime={e5Mobile.date.iso}>{e5Mobile.date.text}</time>
      </p>
      <h3
        id="e5-mobile-title"
        className="mt-2 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
      >
        {e5Mobile.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {e5Mobile.role}
      </p>
      <p className="mt-1 italic text-muted">{e5Mobile.stack}</p>

      <div className="longread mt-8">
        {e5Mobile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 font-display font-bold [overflow-wrap:anywhere]">
        <a href={e5Mobile.link.href} className="link" rel="noreferrer">
          {e5Mobile.link.label}
        </a>
      </p>

      {/* Three across, like Irin Ajo's contact sheet. */}
      <ul role="list" className="mt-12 grid max-w-3xl grid-cols-3 gap-3 md:gap-6">
        {e5Mobile.screens.map((screen) => (
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

      <div className="mt-14 grid gap-14">
        <Incident {...e5Mobile.featured} />
        <Problems
          id="e5-mobile-problems"
          title={e5Mobile.problemsTitle}
          items={e5Mobile.problems}
        />
      </div>
    </article>
  );
}
