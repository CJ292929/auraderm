import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="flex flex-col gap-6">
        <Eyebrow withRule>{site.brand}</Eyebrow>
        <DisplayHeading level="h1" accent={site.hero.accentWord}>
          {`${site.hero.headlineLine1} ${site.hero.headlineLine2}`}
        </DisplayHeading>
      </Container>
    </main>
  );
}
