"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton, SecondaryButton } from "@/components/componentBoard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   FOOTER CTA — Premium closing section
   Animated entrance, glowing demo button, ticking stats.
   ═══════════════════════════════════════════════════════ */

export default function FooterCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Staggered reveal */
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      /* Horizontal line draw */
      gsap.fromTo(
        ".footer-line-draw",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer-cta"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(60px, 10vw, 140px) var(--space-3)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Background glow that reacts to CTA hover */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: hovered ? "1200px" : "600px",
          height: hovered ? "1200px" : "600px",
          background:
            "radial-gradient(circle, rgba(255,95,31,0.08) 0%, transparent 70%)",
          transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Divider line */}
        <div
          className="footer-line-draw"
          style={{
            height: "1px",
            background: "var(--color-border-gray)",
            marginBottom: "clamp(48px, 6vw, 96px)",
            transformOrigin: "left center",
          }}
        />

        {/* Eyebrow */}
        <p
          className="footer-reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--color-brand-orange)",
            marginBottom: "var(--space-3)",
          }}
        >
          Start Building
        </p>

        {/* Headline */}
        <h2
          className="footer-reveal"
          style={{
            fontSize: "clamp(42px, 7vw, 120px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          Engineering{" "}
          <span style={{ color: "var(--color-brand-orange)" }}>Creativity</span>
        </h2>

        {/* Subtext */}
        <p
          className="footer-reveal"
          style={{
            marginTop: "var(--space-4)",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            color: "var(--color-dark-gray)",
            maxWidth: 600,
            lineHeight: 1.55,
          }}
        >
          Build your brand&apos;s creative engine with Poiro.
          Stop managing chaos — start engineering output.
        </p>

        {/* CTA buttons */}
        <div
          className="footer-reveal"
          style={{
            marginTop: "clamp(32px, 4vw, 56px)",
            display: "flex",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <PrimaryButton size="lg">Book Demo</PrimaryButton>
          <SecondaryButton size="lg">Save Your Spot</SecondaryButton>
        </div>

        {/* Bottom info bar */}
        <div
          className="footer-reveal"
          style={{
            marginTop: "clamp(60px, 8vw, 120px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: "var(--color-border-gray)",
            border: "1px solid var(--color-border-gray)",
          }}
        >
          {[
            { value: "4", label: "Pipeline Modules" },
            { value: "< 200ms", label: "Insight Latency" },
            { value: "12+", label: "Output Channels" },
            { value: "∞", label: "Creative Scale" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "var(--space-3) var(--space-3)",
                background: "#000",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-dark-gray)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div
          className="footer-reveal"
          style={{
            marginTop: "clamp(40px, 5vw, 80px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-border-gray)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            &copy; {new Date().getFullYear()} Poiro. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-dark-gray)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--color-brand-orange)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--color-dark-gray)";
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
