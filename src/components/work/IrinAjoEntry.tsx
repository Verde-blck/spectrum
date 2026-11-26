import Image from "next/image";
import Link from "next/link";
import { irinAjo } from "@/content/work";
import { Incident } from "./Incident";
import { Problems } from "./Problems";
import { TrimDemo } from "./TrimDemo";

// Written up like Ìwé Ọjà: what it is, screenshots, the problem that taught me
// the most, a demo, then the smaller fixes.
export function IrinAjoEntry() {
  return (
    <article
      id="irin-ajo"
      aria-labelledby="irin-ajo-title"
      className="mt-28 md:mt-40"
    >
      <p className="font-display text-base font-bold text-muted">
        <time dateTime={irinAjo.date.iso}>{irinAjo.date.text}</time>
      </p>
      <h3
        id="irin-ajo-title"
        className="mt-2 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
      >
        {irinAjo.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {irinAjo.role}
      </p>
      <p className="mt-1 italic text-muted">{irinAjo.stack}</p>

      <div className="longread mt-8">
        {irinAjo.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 font-display font-bold [overflow-wrap:anywhere]">
        <a href={irinAjo.link.href} className="link" rel="noreferrer">
          {irinAjo.link.label}
        </a>
      </p>
      <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-display text-sm font-bold">
        {irinAjo.policies.map((item) => (
          <Link key={item.href} href={item.href} className="link">
            {item.label}
          </Link>
        ))}
      </p>

      {/* Three across, like Ìwé Ọjà's contact sheet. */}
      <ul role="list" className="mt-12 grid max-w-3xl grid-cols-3 gap-3 md:gap-6">
        {irinAjo.screens.map((screen) => (
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
        <Incident {...irinAjo.featured} />
        <TrimDemo />
        <Problems
          id="irin-ajo-problems"
          title={irinAjo.problemsTitle}
          items={irinAjo.problems}
        />
      </div>
    </article>
  );
}
