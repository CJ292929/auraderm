import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={`rounded-panel border border-glass-border bg-glass-solid md:bg-glass ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
