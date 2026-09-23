"use client";

import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";

type ScrollStageProps = {
  hero1280Src: string;
  hero720Src: string;
  heroBlurSrc: string;
  posterSrc: string;
  posterBlurSrc: string;
};

const DESKTOP_BREAKPOINT = 768;
const STAGE_P_VIEWPORT_MULTIPLIER = 1.2;

function logPlayRejection() {
  console.debug("[ScrollStage] video play() rejected — leaving poster visible");
}

function subscribeToViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

function getViewportServerSnapshot() {
  return false;
}

function subscribeToMotionPreference(callback: () => void) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", callback);
  return () => motionQuery.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
    true;
  return reducedMotion || saveData;
}

function getMotionServerSnapshot() {
  return true;
}

export function ScrollStage({
  hero1280Src,
  hero720Src,
  heroBlurSrc,
  posterSrc,
  posterBlurSrc,
}: ScrollStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);

  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getViewportServerSnapshot,
  );
  const disableMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  useEffect(() => {
    if (disableMotion) return;
    const stage = stageRef.current;
    if (!stage) return;
    const heroVideo = heroVideoRef.current;
    const blurVideo = blurVideoRef.current;

    // The `muted` attribute only seeds the native `muted` property when an
    // element is parsed from HTML. Layer A/B videos can instead be created
    // by React on the client (e.g. swapped in for the poster <img> after
    // the reduced-motion check resolves post-hydration), so autoplay
    // policies see `muted` as false unless we set the property explicitly.
    if (heroVideo) heroVideo.muted = true;
    if (blurVideo) blurVideo.muted = true;

    let ticking = false;

    const applyStageP = () => {
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / (STAGE_P_VIEWPORT_MULTIPLIER * window.innerHeight)),
      );
      stage.style.setProperty("--stage-p", String(p));

      if (heroVideo) {
        if (p >= 1) heroVideo.pause();
        else heroVideo.play().catch(logPlayRejection);
      }

      if (blurVideo) {
        if (p <= 0) blurVideo.pause();
        else blurVideo.play().catch(logPlayRejection);
      }
    };

    // Autoplay can start asynchronously after applyStageP already decided to
    // pause a video (e.g. the browser's own autoplay resolves mid-scroll) —
    // re-enforce the pause rule whenever a stage video starts playing.
    const enforceHeroPauseRule = () => {
      const p = parseFloat(stage.style.getPropertyValue("--stage-p")) || 0;
      if (p >= 1) heroVideo?.pause();
    };
    const enforceBlurPauseRule = () => {
      const p = parseFloat(stage.style.getPropertyValue("--stage-p")) || 0;
      if (p <= 0) blurVideo?.pause();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyStageP();
      });
    };

    const onVisibility = () => {
      if (document.hidden) {
        heroVideo?.pause();
        blurVideo?.pause();
      } else {
        applyStageP();
      }
    };

    // Some browsers/webviews silently ignore the native `loop` attribute
    // (observed under low-power/battery-saver modes), leaving the video
    // paused on its final frame after one cycle. Force a restart on `ended`
    // as a fallback so playback never stalls.
    const restartOnEnded = (video: HTMLVideoElement) => {
      video.currentTime = 0;
      video.play().catch(logPlayRejection);
    };
    const onHeroEnded = () => restartOnEnded(heroVideo!);
    const onBlurEnded = () => restartOnEnded(blurVideo!);

    applyStageP();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    heroVideo?.addEventListener("play", enforceHeroPauseRule);
    blurVideo?.addEventListener("play", enforceBlurPauseRule);
    heroVideo?.addEventListener("ended", onHeroEnded);
    blurVideo?.addEventListener("ended", onBlurEnded);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      heroVideo?.removeEventListener("play", enforceHeroPauseRule);
      blurVideo?.removeEventListener("play", enforceBlurPauseRule);
      heroVideo?.removeEventListener("ended", onHeroEnded);
      blurVideo?.removeEventListener("ended", onBlurEnded);
    };
  }, [disableMotion, isDesktop]);

  const showLayerBVideo = !disableMotion && isDesktop;

  return (
    <div
      ref={stageRef}
      data-testid="scroll-stage"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ "--stage-p": 0 } as CSSProperties}
    >
      <div data-testid="stage-layer-a" className="absolute inset-0">
        {disableMotion ? (
          <img
            data-testid="stage-poster"
            src={posterSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={heroVideoRef}
            data-testid="stage-video-a"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            poster={posterSrc}
            className="h-full w-full object-cover"
          >
            <source src={isDesktop ? hero1280Src : hero720Src} type="video/mp4" />
          </video>
        )}
      </div>

      <div
        data-testid="stage-layer-b"
        className="absolute inset-0"
        style={{ opacity: "var(--stage-p)" }}
      >
        {showLayerBVideo ? (
          <video
            ref={blurVideoRef}
            data-testid="stage-video-b"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            poster={posterBlurSrc}
            className="h-full w-full object-cover"
          >
            <source src={heroBlurSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            data-testid="stage-poster-blur"
            src={posterBlurSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
