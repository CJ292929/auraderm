type HeadingLevel = "h1" | "h2" | "h3";

type DisplayHeadingProps = {
  children: string;
  accent?: string;
  level: HeadingLevel;
  className?: string;
};

const sizeClasses: Record<HeadingLevel, string> = {
  h1: "text-[clamp(2.25rem,5vw,4rem)]",
  h2: "text-[clamp(1.75rem,3.2vw,2.75rem)]",
  h3: "text-[clamp(1.25rem,2vw,1.625rem)]",
};

function renderWithAccent(text: string, accent?: string) {
  if (!accent) return text;
  const index = text.indexOf(accent);
  if (index === -1) return text;
  const before = text.slice(0, index);
  const after = text.slice(index + accent.length);
  return (
    <>
      {before}
      <span className="text-gold">{accent}</span>
      {after}
    </>
  );
}

export function DisplayHeading({ children, accent, level, className }: DisplayHeadingProps) {
  const Tag = level;
  return (
    <Tag
      className={`font-display font-medium leading-tight text-cream ${sizeClasses[level]} ${className ?? ""}`}
    >
      {renderWithAccent(children, accent)}
    </Tag>
  );
}
