"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const KEY = "theme";
const query = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia(query).matches ? "dark" : "light";
}

// The server cannot know the theme, so the first render is neutral.
function getServerSnapshot(): Theme | null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* Storage can be blocked. The choice then lasts for this visit only. */
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      className="group inline-flex items-center gap-3 py-2 font-display text-base font-bold"
    >
      <span className="sr-only sm:not-sr-only">Dark mode</span>
      <span
        aria-hidden="true"
        className="relative block h-5 w-9 border-2 border-ink sm:h-6 sm:w-11"
      >
        <span
          className={`absolute inset-y-0.5 left-0.5 w-2.5 bg-verde transition-transform duration-150 ease-out sm:w-4 ${
            isDark ? "translate-x-3.5 sm:translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
