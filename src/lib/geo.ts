import type { Fix } from "@/content/sampleTrack";

const EARTH_KM = 6371;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance between two fixes, in kilometres. */
export function distanceKm(a: Fix, b: Fix): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

/** Length of a track that visits every fix, in kilometres. */
export function rawLengthKm(track: readonly Fix[]): number {
  let km = 0;
  for (let i = 1; i < track.length; i++) km += distanceKm(track[i - 1], track[i]);
  return km;
}

export type Filtered = {
  /** True where the fix was kept. */
  kept: boolean[];
  lengthKm: number;
  rejected: number;
};

/**
 * The speed filter. Each fix is compared with the last fix that was kept.
 * If getting there would need a speed above the ceiling, the fix is dropped.
 */
export function speedFilter(track: readonly Fix[], ceilingMs: number): Filtered {
  const kept = track.map(() => false);
  let last = 0;
  let lengthKm = 0;
  kept[0] = true;
  for (let i = 1; i < track.length; i++) {
    const km = distanceKm(track[last], track[i]);
    const seconds = track[i].t - track[last].t;
    if ((km * 1000) / seconds <= ceilingMs) {
      kept[i] = true;
      lengthKm += km;
      last = i;
    }
  }
  return { kept, lengthKm, rejected: kept.filter((k) => !k).length };
}

/**
 * Flat map position of a fix, in kilometres east and south of the origin.
 * Distances from the origin are exact, which is what this picture needs.
 */
export function project(origin: { lat: number; lon: number }, p: Fix) {
  const o: Fix = { t: 0, lat: origin.lat, lon: origin.lon };
  const rho = distanceKm(o, p);
  const dLon = rad(p.lon - origin.lon);
  const y = Math.sin(dLon) * Math.cos(rad(p.lat));
  const x =
    Math.cos(rad(origin.lat)) * Math.sin(rad(p.lat)) -
    Math.sin(rad(origin.lat)) * Math.cos(rad(p.lat)) * Math.cos(dLon);
  const bearing = Math.atan2(y, x);
  return { x: rho * Math.sin(bearing), y: -rho * Math.cos(bearing) };
}
