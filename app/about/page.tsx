import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export default function AboutPage() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="flex flex-col gap-6">
        <DisplayHeading level="h1">Our story</DisplayHeading>
        <p className="font-sans text-base text-cream">[CONTENT: brand story]</p>
      </Container>
    </main>
  );
}
