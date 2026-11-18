import Image from "next/image";
import { Fragment } from "react";
import { about } from "@/content/about";

// Where the wall starts a new row, after the photo at that position. The
// first row always holds two photos. On a phone (under 30rem wide) the rest
// split into two rows of two. On anything wider they sit together in one row
// of four.
const ROW_BREAKS: Record<number, string> = {
  1: "",
  3: "min-[30rem]:hidden",
};

// Sits in the same three-column frame as the route below it, so the text
// starts exactly where the E5 entry starts. The photo wall goes below the text
// so it can be large, and beside it only on very wide screens (1536px and up).
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="px-gutter pt-20 md:pt-32"
    >
      <div className="grid md:grid-cols-[11rem_1.5rem_minmax(0,1fr)]">
        <div className="grid gap-12 md:col-start-3 md:pl-8 2xl:grid-cols-[minmax(0,30rem)_minmax(0,40rem)] 2xl:items-start 2xl:gap-x-20">
          <div>
            <h2
              id="about-title"
              className="font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight"
            >
              {about.title}
            </h2>
            <div className="longread mt-6">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/*
            Photos are laid out in rows. Each one grows in proportion to its own
            shape and keeps that shape, so every photo in a row ends up the same
            height and none is cropped. All the styling is here, so the wall
            does not depend on anything in globals.css.
          */}
          <div className="max-w-160">
            <ul role="list" className="-mb-2.5 flex flex-wrap items-start gap-x-2.5">
              {about.photos.map((photo, i) => {
                const shape = photo.image.width / photo.image.height;
                return (
                  <Fragment key={photo.alt}>
                    <li
                      style={{ flexGrow: shape, flexBasis: 0, aspectRatio: shape }}
                      className="lift lift-zoom relative isolate mb-2.5 min-w-0 overflow-hidden border border-rule bg-leaf-900"
                    >
                      <Image
                        src={photo.image}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 30rem) 24rem, 55vw"
                        className="object-cover grayscale contrast-105 brightness-110"
                      />
                      {/* A duotone: shadows become deep forest, highlights pale sage. */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-leaf-200 mix-blend-multiply"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-leaf-900 mix-blend-lighten"
                      />
                    </li>
                    {i in ROW_BREAKS && (
                      <li
                        aria-hidden="true"
                        className={`h-0 basis-full ${ROW_BREAKS[i]}`}
                      />
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
