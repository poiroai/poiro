"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Context for child access ── */
interface LenisContextValue {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
}
const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
});
export const useLenis = () => useContext(LenisContext);

/* ── Provider ── */
interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.06,
      duration: 1.4,
      smoothWheel: true,
    });

    /* ── Sync Lenis with GSAP ScrollTrigger ── */
    instance.on("scroll", ScrollTrigger.update);

    const tickHandler = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    /* Defer state update to avoid synchronous setState in effect */
    queueMicrotask(() => setLenis(instance));

    return () => {
      instance.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, stopScroll, startScroll }}>
      {children}
    </LenisContext.Provider>
  );
}
