import { Container } from "@/components/ui/Container";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GivesBackGrid } from "@/components/sections/GivesBackGrid";
import type { SustainabilityItem } from "@/content/site";

type GivesBackProps = {
  headline: string;
  items: SustainabilityItem[] | null;
};

export function GivesBack({ headline, items }: GivesBackProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="gives-back" data-testid="gives-back" className="py-24">
      <Container>
        <GlassPanel className="flex flex-col gap-10 p-8 lg:flex-row lg:items-start lg:gap-10 lg:p-12">
          <div className="lg:w-2/5">
            <DisplayHeading level="h2" className="whitespace-pre-line">
              {headline}
            </DisplayHeading>
          </div>
          <div className="lg:w-3/5">
            <GivesBackGrid items={items} />
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}
