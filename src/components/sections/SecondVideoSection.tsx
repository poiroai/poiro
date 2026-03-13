"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_SEGMENTS, PERCENT_PER_FRAME } from "@/../lib/frameSegments";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   SECOND VIDEO SECTION — Scroll-driven frame sequence
   Frames 481→661, pinned and scrubbed like the hero.
   Scroll distance is percentage-based (matching the hero's
   PERCENT_PER_FRAME) so playback feels identical at ~60fps.
   ═══════════════════════════════════════════════════════ */

const SEGMENT = FRAME_SEGMENTS.SECOND_VIDEO;
const FRAME_COUNT = SEGMENT.end - SEGMENT.start;
const SCROLL_DISTANCE = `+=${Math.round(FRAME_COUNT * PERCENT_PER_FRAME)}%`;

function framePath(index: number): string {
  return `/frames/frame_${String(index).padStart(5, "0")}.webp`;
}

export default function SecondVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasFrameRef = useRef<number>(SEGMENT.start);

  const handleScrollUpdate = useCallback((self: ScrollTrigger) => {
    const idx = SEGMENT.start + Math.floor(self.progress * FRAME_COUNT);
    canvasFrameRef.current = Math.max(SEGMENT.start, Math.min(SEGMENT.end, idx));
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: SCROLL_DISTANCE,
      pin: true,
      scrub: 1,
      onUpdate: handleScrollUpdate,
    });

    return () => {
      trigger.kill();
    };
  }, [handleScrollUpdate]);

  return (
    <section
      ref={sectionRef}
      id="second-video"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <SecondFrameDriver canvasFrameRef={canvasFrameRef} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECOND FRAME DRIVER
   rAF-driven wrapper that reads the ref and passes
   the frame index to the canvas without React re-renders
   on the parent — same pattern as the hero FrameDriver.
   ═══════════════════════════════════════════════════════ */

interface SecondFrameDriverProps {
  canvasFrameRef: React.RefObject<number>;
}

function SecondFrameDriver({ canvasFrameRef }: SecondFrameDriverProps) {
  const [displayFrame, setDisplayFrame] = useState<number>(SEGMENT.start);
  const lastRef = useRef(-1);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const current = canvasFrameRef.current ?? SEGMENT.start;
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

  return <SecondVideoCanvas frameIndex={displayFrame} />;
}

/* ═══════════════════════════════════════════════════════
   SECOND VIDEO CANVAS
   Loads and renders frames 481→661 on a <canvas>.
   Same cover-fit + draw logic as HeroCanvas.
   ═══════════════════════════════════════════════════════ */

interface SecondVideoCanvasProps {
  frameIndex: number;
}

function SecondVideoCanvas({ frameIndex }: SecondVideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);
  const lastDrawnRef = useRef(-1);
  const rafRef = useRef(0);

  /* ── Preload frames 481→661 ── */
  useEffect(() => {
    if (loadedRef.current) return;

    const total = FRAME_COUNT + 1;
    const images: HTMLImageElement[] = new Array(total);

    const loading = Array.from({ length: total }, (_, offset) => {
      const absoluteFrame = SEGMENT.start + offset;
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = framePath(absoluteFrame);
        img.onload = () => {
          images[offset] = img;
          resolve();
        };
        img.onerror = () => {
          images[offset] = img;
          resolve();
        };
      });
    });

    Promise.all(loading).then(() => {
      framesRef.current = images;
      loadedRef.current = true;
    });
  }, []);

  /* ── Draw frame on canvas ── */
  const drawFrame = useCallback((absoluteFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(SEGMENT.start, Math.min(SEGMENT.end, absoluteFrame));
    const localIndex = clamped - SEGMENT.start;
    const img = framesRef.current[localIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    /* Cover-fit: scale to fill, centre-crop */
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  /* ── Render loop — only redraws when frame changes ── */
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      if (loadedRef.current && lastDrawnRef.current !== frameIndex) {
        drawFrame(frameIndex);
        lastDrawnRef.current = frameIndex;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [frameIndex, drawFrame]);

  /* ── Handle resize ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      lastDrawnRef.current = -1;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#000",
      }}
    />
  );
}
