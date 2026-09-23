"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Item = { title: string; body: string };

let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealCallbacks.get(entry.target)?.();
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
  }
  return sharedObserver;
}

function subscribeToMotionPreference(callback: () => void) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", callback);
  return () => motionQuery.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot() {
  return true;
}

export function GivesBackGrid({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);

  const disableMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  useEffect(() => {
    if (disableMotion) return;
    const node = ref.current;
    if (!node) return;

    revealCallbacks.set(node, () => setIntersected(true));
    const observer = getSharedObserver();
    observer.observe(node);

    return () => {
      observer.unobserve(node);
      revealCallbacks.delete(node);
    };
  }, [disableMotion]);

  const shown = disableMotion || intersected;

  return (
    <div ref={ref} data-testid="gives-back-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.title}
          data-reveal
          data-visible={shown ? "true" : "false"}
          className="flex flex-col gap-2 transition-opacity duration-300 ease-out"
          style={{
            opacity: shown ? 1 : 0,
            transitionDelay: disableMotion ? "0ms" : `${index * 80}ms`,
          }}
        >
          <span className="font-display text-lg text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-base text-cream">{item.title}</p>
          <p className="font-sans text-sm text-sage-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
