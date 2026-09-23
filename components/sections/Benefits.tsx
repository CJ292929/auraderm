import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

function LeafIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="text-gold"
    >
      <path
        d="M14 4C14 4 23 8 23 15C23 20 18.5 24 14 24C9.5 24 5 20 5 15C5 8 14 4 14 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14 4V24" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Benefits() {
  const { benefits } = site;

  return (
    <section id="benefits" className="py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6">
            {benefits.map((benefit, index) => (
              <GlassPanel key={benefit.title} className="flex flex-col gap-4 p-8">
                <LeafIcon />
                <span className="font-sans text-xs uppercase tracking-[0.18em] text-sage-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <DisplayHeading level="h3">{benefit.title}</DisplayHeading>
                <p className="font-sans text-sm text-cream">{benefit.body}</p>
                <a
                  href={benefit.href}
                  className="mt-auto inline-flex items-center gap-2 font-sans text-sm text-cream underline-offset-4 hover:underline"
                >
                  {benefit.linkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </GlassPanel>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
