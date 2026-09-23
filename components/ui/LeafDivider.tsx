type LeafDividerProps = {
  className?: string;
};

export function LeafDivider({ className }: LeafDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`} aria-hidden="true">
      <span className="h-px flex-1 bg-glass-border" />
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 1C10 1 18 3.5 18 8C18 11 14.5 13 10 13C5.5 13 2 11 2 8C2 3.5 10 1 10 1Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-sage-muted"
        />
        <path d="M10 1V13" stroke="currentColor" strokeWidth="1" className="text-sage-muted" />
      </svg>
      <span className="h-px flex-1 bg-glass-border" />
    </div>
  );
}
