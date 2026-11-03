import { e5 } from "@/content/work";
import { Incident } from "./Incident";
import { Problems } from "./Problems";
import { TrackDemo } from "./TrackDemo";
import { Stop } from "./Stop";

export function E5Entry() {
  return (
    <Stop date={e5.date}>
      <h3 className="font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight">
        {e5.title}
      </h3>
      <p className="mt-2 font-display text-lg font-bold text-muted">
        {e5.role}
      </p>

      <div className="longread mt-8">
        {e5.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-14 grid gap-14">
        <Incident {...e5.featured} />
        <TrackDemo />
        <Problems title={e5.problemsTitle} items={e5.problems} />
      </div>
    </Stop>
  );
}
