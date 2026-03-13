"use client";

import { useRef, useEffect, useCallback } from "react";
import { FRAME_SEGMENTS } from "@/../lib/frameSegments";

/* ═══════════════════════════════════════════════════════
   FRAME-SEQUENCE HERO CANVAS
   Preloads hero frames and draws the current frame
   on a <canvas> using drawImage. Driven by `frameIndex`.
   Fires propheus:load-progress / propheus:load-complete
   events for integration with the PagePreloader.
   ═══════════════════════════════════════════════════════ */

const HERO = FRAME_SEGMENTS.HERO;
const TOTAL_FRAMES = HERO.end - HERO.start + 1;

function framePath(index: number): string {
  return `/frames/frame_${String(index).padStart(5, "0")}.webp`;
}

interface HeroCanvasProps {
  frameIndex: number;
  onFramesLoaded?: () => void;
}

export default function HeroCanvas({ frameIndex, onFramesLoaded }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnRef = useRef(-1);
  const loadedRef = useRef(false);
  const rafRef = useRef(0);

  /* ── Preload all frames ── */
  useEffect(() => {
    if (loadedRef.current) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = framePath(HERO.start + i);
        img.onload = () => {
          images[i] = img;
          loaded++;
          const pct = Math.floor((loaded / TOTAL_FRAMES) * 100);
          window.dispatchEvent(
            new CustomEvent("propheus:load-progress", {
              detail: { value: Math.min(pct, 99) },
            })
          );
          resolve();
        };
        img.onerror = () => {
          images[i] = img;
          loaded++;
          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      framesRef.current = images;
      loadedRef.current = true;
      window.dispatchEvent(new CustomEvent("propheus:load-complete"));
      onFramesLoaded?.();
    });
  }, [onFramesLoaded]);

  /* ── Draw frame on canvas ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;
    const localIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index - HERO.start));
    const img = frames[localIndex];
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
      if (lastDrawnRef.current !== frameIndex && loadedRef.current) {
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
