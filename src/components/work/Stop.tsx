import { Node } from "./Node";

// One stop on the route. The date sits left of the line on wide screens
// and above the title on narrow ones.
export function Stop({
  date,
  children,
}: {
  date: { iso: string; text: string };
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] pb-20 last:pb-0 md:grid-cols-[11rem_1.5rem_minmax(0,1fr)] md:pb-28">
      <p className="hidden pr-6 pt-0.5 text-right font-display text-lg font-bold md:block">
        <time dateTime={date.iso}>{date.text}</time>
      </p>
      <div className="relative">
        <Node />
      </div>
      <div className="pl-4 md:pl-8">
        <p className="mb-2 font-display text-base font-bold text-muted md:hidden">
          <time dateTime={date.iso}>{date.text}</time>
        </p>
        {children}
      </div>
    </li>
  );
}
