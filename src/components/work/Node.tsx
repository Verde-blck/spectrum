// The square on the route for one stop. Route switches its data-lit
// attribute as the green line reaches it, and back off as the line
// retracts when the visitor scrolls up.
export function Node() {
  return (
    <span
      aria-hidden="true"
      data-lit="false"
      className="route-node absolute left-1/2 top-[0.4rem] block size-3.5 -translate-x-1/2 border-2 border-rule bg-ground transition-colors duration-150 data-[lit=true]:border-verde data-[lit=true]:bg-verde"
    />
  );
}
