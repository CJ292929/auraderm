import { ScrollStage } from "@/components/scroll/ScrollStage";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Ingredients } from "@/components/sections/Ingredients";
import { Benefits } from "@/components/sections/Benefits";
import { LeafDivider } from "@/components/ui/LeafDivider";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <ScrollStage
        hero1280Src="/stage/hero-1280.mp4"
        hero720Src="/stage/hero-720.mp4"
        heroBlurSrc="/stage/hero-blur.mp4"
        posterSrc="/stage/poster.webp"
        posterBlurSrc="/stage/poster-blur.webp"
      />
      <Nav />
      <main className="relative">
        <Hero />
        <Statement />
        <Ingredients />
        <Container>
          <LeafDivider />
        </Container>
        <Benefits />
      </main>
    </>
  );
}
