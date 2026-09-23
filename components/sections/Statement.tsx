import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Statement() {
  const { statement } = site;

  return (
    <section className="flex min-h-[40vh] items-center justify-center py-24">
      <Reveal>
        <Container className="flex flex-col items-center gap-6 text-center">
          <DisplayHeading
            level="h2"
            accent={statement.accentWord}
            className="whitespace-pre-line"
          >
            {`${statement.line1}\n${statement.line2}`}
          </DisplayHeading>
          <p className="max-w-[56ch] font-sans text-base text-cream">{statement.subcopy}</p>
        </Container>
      </Reveal>
    </section>
  );
}
