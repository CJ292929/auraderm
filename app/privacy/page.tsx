import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="flex flex-col gap-6">
        <DisplayHeading level="h1">Privacy policy</DisplayHeading>
        <p className="font-sans text-base text-cream">
          [CONTENT: privacy policy — owner to supply; must reflect the Philippines Data Privacy
          Act and the laws of every market sold in]
        </p>
      </Container>
    </main>
  );
}
