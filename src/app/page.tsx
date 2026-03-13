"use client";

import { useRef, useCallback, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Explosion } from "@/../components/Explosion";
import OperatingSystemSection from "@/components/sections/OperatingSystemSection";
import SecondVideoSection from "@/components/sections/SecondVideoSection";
import FooterCTASection from "@/components/sections/FooterCTASection";
import PagePreloader from "@/../components/PagePreloader";
import { Nav } from "@/components/componentBoard";
import { FRAME_SEGMENTS } from "@/../lib/frameSegments";

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   Hero (frame 0→481 + explosion) →
   Operating System →
   Second Video (frame 481→661) →
   Footer CTA
   ═══════════════════════════════════════════════════════ */

const HERO = FRAME_SEGMENTS.HERO;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function Home() {
  const frameRef = useRef(0);
  const [explosionProgress, setExplosionProgress] = useState(0);

  const handleFrameChange = useCallback((frameIndex: number) => {
    frameRef.current = frameIndex;

    const ep = clamp(
      (frameIndex - HERO.explosionStart) /
        (HERO.explosionEnd - HERO.explosionStart),
      0,
      1
    );
    setExplosionProgress(ep);
  }, []);

  return (
    <>
      <PagePreloader />
      <Nav />
      <Explosion explosionProgress={explosionProgress} />
      <HeroSection onFrameChange={handleFrameChange} />
      <OperatingSystemSection />
      <SecondVideoSection />
      <FooterCTASection />
    </>
  );
}
