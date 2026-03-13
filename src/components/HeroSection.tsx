"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import { useLenis } from "./SmoothScroll";
import { FRAME_SEGMENTS, PERCENT_PER_FRAME } from "@/../lib/frameSegments";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   HERO SECTION — Cinematic Frame-Sequence Controller
   Phase 1: Auto-play frames start→introEnd (~3s, scroll locked)
   Phase 2: Scroll-driven frames introEnd→end via ScrollTrigger
   ═══════════════════════════════════════════════════════ */

const HERO = FRAME_SEGMENTS.HERO;
const SCROLL_FRAMES = HERO.end - HERO.introEnd;
const SCROLL_DISTANCE = `+=${Math.round(SCROLL_FRAMES * PERCENT_PER_FRAME)}%`;

interface HeroSectionProps {
  onFrameChange?: (frameIndex: number) => void;
}

export default function HeroSection({ onFrameChange }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef<number>(HERO.start);
  const canvasFrameRef = useRef<number>(HERO.start);
  const introCompleteRef = useRef(false);
  const framesLoadedRef = useRef(false);
  const { stopScroll, startScroll } = useLenis();

  const setFrameIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(HERO.start, Math.min(HERO.end, Math.floor(idx)));
      frameIndexRef.current = clamped;
      canvasFrameRef.current = clamped;
      onFrameChange?.(clamped);
    },
    [onFrameChange]
  );

  /* ── Phase 1: Auto-intro after frames are loaded ── */
  const handleFramesLoaded = useCallback(() => {
    framesLoadedRef.current = true;

    stopScroll();
    document.documentElement.classList.add("scroll-locked");

    const introProgress = { value: HERO.start as number };
    gsap.to(introProgress, {
      value: HERO.introEnd,
      duration: HERO.introDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        setFrameIndex(introProgress.value);
      },
      onComplete: () => {
        introCompleteRef.current = true;
        document.documentElement.classList.remove("scroll-locked");
        startScroll();

        /* ── Phase 2: Scroll-driven ── */
        if (!sectionRef.current) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: SCROLL_DISTANCE,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const idx =
              HERO.introEnd +
              Math.floor(self.progress * SCROLL_FRAMES);
            setFrameIndex(idx);
          },
        });

        ScrollTrigger.refresh();
      },
    });
  }, [setFrameIndex, stopScroll, startScroll]);

  /* ── Cleanup ── */
  useEffect(() => {
    const el = sectionRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      document.documentElement.classList.remove("scroll-locked");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <FrameDriver
        canvasFrameRef={canvasFrameRef}
        onFramesLoaded={handleFramesLoaded}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME DRIVER
   Thin rAF-driven wrapper that reads from a ref and
   passes the frameIndex to HeroCanvas without causing
   React re-renders on the parent.
   ═══════════════════════════════════════════════════════ */

interface FrameDriverProps {
  canvasFrameRef: React.RefObject<number>;
  onFramesLoaded: () => void;
}

function FrameDriver({ canvasFrameRef, onFramesLoaded }: FrameDriverProps) {
  const [displayFrame, setDisplayFrame] = useState<number>(HERO.start);
  const lastRef = useRef(-1);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const current = canvasFrameRef.current ?? HERO.start;
      if (current !== lastRef.current) {
        lastRef.current = current;
        setDisplayFrame(current);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      running = false;
    };
  }, [canvasFrameRef]);

  return <HeroCanvas frameIndex={displayFrame} onFramesLoaded={onFramesLoaded} />;
}
