"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
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
    <div
      ref={ref}
      data-reveal
      data-visible={shown ? "true" : "false"}
      className={`transition-opacity duration-400 ease-out ${shown ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
