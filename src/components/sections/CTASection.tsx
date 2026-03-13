"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton, SecondaryButton } from "../componentBoard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   CTA SECTION
   "Lights. Camera. Batsh*t creativity."
   ═══════════════════════════════════════════════════════ */

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-12) var(--space-3)",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255,95,31,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="cta-content"
        style={{
          textAlign: "center",
          maxWidth: 760,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Warning badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-1)",
            border: "1px solid var(--color-brand-orange)",
            padding: "var(--space-1) var(--space-2)",
            marginBottom: "var(--space-4)",
          }}
        >
          <span style={{ color: "var(--color-brand-orange)", fontSize: "1rem" }}>
            ⚠
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--color-brand-orange)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            System Alert
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-3)",
          }}
        >
          Lights. Camera.
          <br />
          <span style={{ color: "var(--color-brand-orange)" }}>
            Batsh*t creativity.
          </span>
        </h2>

        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-light-gray)",
            marginBottom: "var(--space-6)",
            lineHeight: 1.6,
          }}
        >
          Join us in the new era of content creation.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-2)",
            flexWrap: "wrap",
          }}
        >
          <PrimaryButton size="lg">Save Your Spot</PrimaryButton>
          <SecondaryButton size="lg">Book Demo</SecondaryButton>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "var(--color-dark-gray)",
            marginTop: "var(--space-4)",
            letterSpacing: "0.1em",
          }}
        >
          CTRL+SHIFT+CREATIVITY
        </p>
      </div>
    </section>
  );
}
