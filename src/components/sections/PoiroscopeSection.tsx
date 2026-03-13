"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PipelineTracker } from "../componentBoard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   POIROSCOPE SECTION
   "Meet Poiroscope" — Pipeline scrolling through
   Context → Insights → Brandify → Omni-focus
   ═══════════════════════════════════════════════════════ */

const PIPELINE_STAGES = [
  {
    name: "Context",
    description: "Ingests your brand DNA, audience signals, and competitive landscape",
  },
  {
    name: "Insights",
    description: "AI-driven analysis of social trends, sentiment, and engagement patterns",
  },
  {
    name: "Brandify",
    description: "Transforms raw insights into on-brand creative assets at scale",
  },
  {
    name: "Omni-focus",
    description: "Distributes optimized content across every channel simultaneously",
  },
];

export default function PoiroscopeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Headline entrance */
      gsap.fromTo(
        ".poiroscope-headline",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      /* Pipeline stages advance as user scrolls through this section */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 40%",
        end: "bottom 40%",
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * PIPELINE_STAGES.length);
          setActiveStage(Math.min(idx, PIPELINE_STAGES.length - 1));
        },
      });

      /* Stage description cards stagger in */
      gsap.fromTo(
        ".stage-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stage-cards-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
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
            The Solution
          </span>
        </div>

        {/* Headline */}
        <h2
          className="poiroscope-headline"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-2)",
          }}
        >
          Meet{" "}
          <span style={{ color: "var(--color-brand-orange)" }}>Poiroscope</span>
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-light-gray)",
            marginBottom: "var(--space-6)",
          }}
        >
          Social Insights{" "}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-brand-orange)",
            }}
          >
            →
          </span>{" "}
          On-brand AI Assets
        </p>

        {/* Pipeline tracker */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <PipelineTracker
            stages={PIPELINE_STAGES}
            activeIndex={activeStage}
          />
        </div>

        {/* Stage detail cards */}
        <div
          className="stage-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--space-2)",
            marginTop: "var(--space-6)",
          }}
        >
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.name}
              className="stage-card"
              style={{
                border: `1px solid ${
                  i <= activeStage
                    ? "var(--color-brand-orange)"
                    : "var(--color-border-gray)"
                }`,
                background:
                  i <= activeStage
                    ? "rgba(255, 95, 31, 0.05)"
                    : "rgba(10,10,10,0.8)",
                padding: "var(--space-3)",
                transition: "all 0.5s",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--color-brand-orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-1)",
                }}
              >
                STAGE {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color:
                    i <= activeStage
                      ? "var(--color-brand-orange)"
                      : "var(--color-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "var(--space-1)",
                  transition: "color 0.5s",
                }}
              >
                {stage.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-dark-gray)",
                  lineHeight: 1.5,
                }}
              >
                {stage.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
