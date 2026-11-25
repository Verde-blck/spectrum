import Image from "next/image";
import { sabi } from "@/content/work";
import { Incident } from "./Incident";
import { Problems } from "./Problems";

// Written up like Ìwé Ọjà: what it is, real screenshots from my phone, the
// problem that changed the design, then the smaller fixes. The code is on
// GitHub without NAFDAC's product list, which stays private until NAFDAC agrees.
export function SabiEntry() {
  return (
    <article
      id="sabi-scan"
      aria-labelledby="sabi-title"
      className="mt-28 md:mt-40"
    >
      <p className="font-display text-base font-bold text-muted">
        <time dateTime={sabi.date.iso}>{sabi.date.text}</time>
      </p>
      <h3
        id="sabi-title"
        className="mt-2 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
      >
        {sabi.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {sabi.role}
      </p>
      <p className="mt-1 italic text-muted">{sabi.stack}</p>

      <div className="longread mt-8">
        {sabi.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 font-display font-bold [overflow-wrap:anywhere]">
        <a href={sabi.link.href} className="link" rel="noreferrer">
          {sabi.link.label}
        </a>
      </p>

      {/* Phone screenshots, three across like Ìwé Ọjà's contact sheet. */}
      <ul role="list" className="mt-12 grid max-w-3xl grid-cols-3 gap-3 md:gap-6">
        {sabi.screens.map((screen) => (
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

      {/* The story and the smaller fixes appear once they are written. */}
      {sabi.featured || sabi.problems?.length ? (
        <div className="mt-14 grid gap-14">
          {sabi.featured ? <Incident {...sabi.featured} /> : null}
          {sabi.problems?.length ? (
            <Problems
              id="sabi-problems"
              title={sabi.problemsTitle ?? "Problems and how they were fixed"}
              items={sabi.problems}
            />
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
