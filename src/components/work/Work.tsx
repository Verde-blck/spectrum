import { stops } from "@/content/work";
import { AlsoBuilt } from "./AlsoBuilt";
import { E5Entry } from "./E5Entry";
import { LedgerEntry } from "./LedgerEntry";
import { Route } from "./Route";
import { Stop } from "./Stop";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-gutter pb-28 pt-20 md:pb-40 md:pt-32"
    >
      <h2 id="work-title" className="headline text-[clamp(4.5rem,15vw,13rem)]">
        Work
      </h2>
      <p className="longread mt-6 md:mt-8">
        Newest first. The first stop has a full write-up and the others are
        shorter. Projects I built come after the route, starting with Ìwé Ọjà,
        which also has a full write-up.
      </p>

      <div className="mt-16 md:mt-24">
        <Route>
          <E5Entry />
          {stops.map((stop) => (
            <Stop key={stop.id} date={stop.date}>
              <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                {stop.title}
              </h3>
              <p className="mt-1 font-display text-lg font-bold text-muted">
                {stop.role}
              </p>
              <p className="longread mt-4">{stop.text}</p>
              {"link" in stop && (
                <p className="mt-3 font-display font-bold">
                  <a href={stop.link.href} className="link" rel="noreferrer">
                    {stop.link.label}
                  </a>
                </p>
              )}
            </Stop>
          ))}
        </Route>
      </div>

      <LedgerEntry />
      <AlsoBuilt />
    </section>
  );
}
