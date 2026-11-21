import Image from "next/image";
import { iranti } from "@/content/work";
import { Incident } from "./Incident";
import { Problems } from "./Problems";

// Written up like Ìwé Ọjà, with the icon set in place of screenshots until
// the app has been tested on a real phone.
export function IrantiEntry() {
  return (
    <article
      id="iranti"
      aria-labelledby="iranti-title"
      className="mt-28 md:mt-40"
    >
      <p className="font-display text-base font-bold text-muted">
        <time dateTime={iranti.date.iso}>{iranti.date.text}</time>
      </p>
      <h3
        id="iranti-title"
        className="mt-2 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
      >
        {iranti.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {iranti.role}
      </p>
      <p className="mt-1 italic text-muted">{iranti.stack}</p>

      <div className="longread mt-8">
        {iranti.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <figure className="mt-12 max-w-3xl">
        <div className="lift overflow-hidden border-2 border-rule">
          <Image
            src={iranti.icons.image}
            alt={iranti.icons.alt}
            placeholder="blur"
            sizes="(min-width: 48rem) 48rem, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-2 font-display text-sm font-bold text-muted md:text-base">
          {iranti.icons.caption}
        </figcaption>
      </figure>

      <div className="mt-14 grid gap-14">
        <Incident {...iranti.featured} />
        <Problems
          id="iranti-problems"
          title={iranti.problemsTitle}
          items={iranti.problems}
        />
      </div>
    </article>
  );
}
