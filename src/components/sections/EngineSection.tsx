"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ControlPanel,
  TerminalConsole,
  StatBlock,
} from "../componentBoard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   ENGINE SECTION
   "Stop prompting. Start producing." — System diagram
   with inputs → engine → outputs.
   ═══════════════════════════════════════════════════════ */

const TERMINAL_LINES = [
  { prefix: "$", text: 'poiro engine --mode="production"' },
  { prefix: ">", text: "Loading brand model... ✓" },
  { prefix: ">", text: "Parsing social feed (2.4M signals)..." },
  { prefix: ">", text: "Generating creative variants..." },
  { prefix: ">", text: "Quality gate passed — 98.2% brand compliance" },
  { prefix: "✓", text: "12 assets ready. 4 channels targeted." },
];

const STATS = [
  { value: "98.2%", label: "Brand Compliance", icon: "✓" },
  { value: "12x", label: "Faster Than Manual", icon: "⚡" },
  { value: "2.4M", label: "Signals Processed", icon: "📡" },
  { value: "47", label: "Formats Supported", icon: "📦" },
];

const INPUT_SIGNALS = [
  "Social Feeds",
  "Brand Guidelines",
  "Competitor Data",
  "Audience Segments",
  "Trend Analysis",
];

const OUTPUT_ASSETS = [
  "Video Scripts",
  "Ad Creatives",
  "Social Posts",
  "Email Templates",
  "Landing Pages",
];

export default function EngineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Headline */
      gsap.fromTo(
        ".engine-headline",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Panels stagger */
      gsap.fromTo(
        ".engine-panel",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".engine-diagram", start: "top 80%" },
        }
      );

      /* Stats */
      gsap.fromTo(
        ".engine-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".engine-stats", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engine"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "var(--space-12) var(--space-3)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-3)",
          }}
        >
          <span
            style={{
              width: 32,
              height: 1,
              background: "var(--color-brand-orange)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--color-brand-orange)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Under The Hood
          </span>
        </div>

        <h2
          className="engine-headline"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-2)",
          }}
        >
          Stop prompting.
          <br />
          <span style={{ color: "var(--color-brand-orange)" }}>
            Start producing.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            color: "var(--color-dark-gray)",
            maxWidth: 480,
            lineHeight: 1.6,
            marginBottom: "var(--space-8)",
          }}
        >
          The Poiro engine ingests signals, applies your brand model, and
          outputs production-ready assets — zero prompt engineering required.
        </p>

        {/* System diagram: Inputs → Engine → Outputs */}
        <div
          className="engine-diagram"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "var(--space-3)",
            alignItems: "start",
            marginBottom: "var(--space-6)",
          }}
        >
          {/* Inputs panel */}
          <ControlPanel title="Inputs" className="engine-panel">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {INPUT_SIGNALS.map((sig) => (
                <div
                  key={sig}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-light-gray)",
                  }}
                >
                  <span style={{ color: "var(--color-brand-orange)" }}>→</span>
                  {sig}
                </div>
              ))}
            </div>
          </ControlPanel>

          {/* Center — Engine glow */}
          <div
            className="engine-panel"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-4) var(--space-3)",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                border: "2px solid var(--color-brand-orange)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--glow-orange-strong)",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--color-brand-orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                ENGINE
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-dark-gray)",
                marginTop: "var(--space-1)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              POIRO CORE v2.0
            </span>
          </div>

          {/* Outputs panel */}
          <ControlPanel title="Outputs" className="engine-panel">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {OUTPUT_ASSETS.map((asset) => (
                <div
                  key={asset}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-light-gray)",
                  }}
                >
                  <span style={{ color: "var(--color-brand-orange)" }}>←</span>
                  {asset}
                </div>
              ))}
            </div>
          </ControlPanel>
        </div>

        {/* Terminal console */}
        <div className="engine-panel" style={{ marginBottom: "var(--space-6)" }}>
          <TerminalConsole
            title="poiro@engine ~/production"
            lines={TERMINAL_LINES}
          />
        </div>

        {/* Stats grid */}
        <div
          className="engine-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "var(--space-2)",
          }}
        >
          {STATS.map((stat) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              className="engine-stat"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
