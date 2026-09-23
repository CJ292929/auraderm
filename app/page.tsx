import { ScrollStage } from "@/components/scroll/ScrollStage";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/sections/Hero";

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
        {/* temporary scroll-test spacer — removed in P1-P4 */}
        <div id="stage-test" aria-hidden="true" className="h-[200vh]" />
      </main>
    </>
  );
}
