import { projects } from "@/content/work";

// Projects, as ruled rows. They are things I built, not a sequence,
// so there are no numbers.
export function AlsoBuilt() {
  return (
    <div className="mt-28 md:mt-40">
      <h3 className="font-display text-[clamp(1.875rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-tight">
        Also built
      </h3>
      <ul role="list" className="mt-8 border-b-2 border-rule">
        {projects.map((project) => (
          <li
            key={project.name}
            className="grid gap-x-10 gap-y-2 border-t-2 border-rule py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]"
          >
            <div>
              <h4 className="font-display text-2xl font-bold leading-tight">
                {project.name}
              </h4>
              <p className="mt-1 italic text-muted">{project.stack}</p>
            </div>
            <p className="max-w-[44ch]">{project.text}</p>
            <p className="font-display font-bold [overflow-wrap:anywhere] md:text-right">
              <a href={project.link.href} className="link" rel="noreferrer">
                {project.link.label}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
