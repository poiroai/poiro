"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   POIRO OPERATING SYSTEM — Premium pipeline visualization
   4 stages: Context → Insights → Brandify → Omni-Focus
   Scroll-driven activation with animated data flow lines.
   ═══════════════════════════════════════════════════════ */

const PIPELINE = [
  {
    name: "Context",
    tag: "01",
    description: "Ingest audience, product, and market signals into a unified creative graph.",
    metrics: ["1.2M signals/day", "42 data sources"],
  },
  {
    name: "Insights",
    tag: "02",
    description: "Decode intent, timing, and performance patterns with predictive scoring.",
    metrics: ["94% accuracy", "< 200ms latency"],
  },
  {
    name: "Brandify",
    tag: "03",
    description: "Compile brand voice, visuals, and campaign logic into executable blueprints.",
    metrics: ["36 concept clusters", "Auto-compliance"],
  },
  {
    name: "Omni-Focus",
    tag: "04",
    description: "Ship channel-ready assets with decision confidence across every platform.",
    metrics: ["12 channels", "Real-time deploy"],
  },
];

export default function OperatingSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(-1);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Entrance animation — run once */
      if (!hasAnimated.current) {
        gsap.fromTo(
          ".os-header-reveal",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
        hasAnimated.current = true;
      }

      /* Pipeline stage progression driven by scroll */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 40%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            PIPELINE.length - 1,
            Math.floor(self.progress * (PIPELINE.length + 0.5))
          );
          setActiveStage(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operating-system"
      style={{
        position: "relative",
        padding: "clamp(80px, 12vw, 180px) var(--space-3)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(255,95,31,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
        {/* ── Header ── */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 96px)" }}>
          <p
            className="os-header-reveal"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--color-brand-orange)",
              marginBottom: "var(--space-2)",
            }}
          >
            System Architecture
          </p>
          <h2
            className="os-header-reveal"
            style={{
              fontSize: "clamp(36px, 5.5vw, 80px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Four modules.{" "}
            <span style={{ color: "var(--color-dark-gray)" }}>One creative operating system.</span>
          </h2>
          <p
            className="os-header-reveal"
            style={{
              marginTop: "var(--space-3)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--color-dark-gray)",
              maxWidth: 580,
              lineHeight: 1.7,
            }}
          >
            Poiro connects context, intelligence, brand logic, and distribution
            into a single autonomous pipeline.
          </p>
        </div>

        {/* ── Pipeline flow ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {PIPELINE.map((stage, idx) => {
            const isActive = idx <= activeStage;
            const isCurrent = idx === activeStage;

            return (
              <div key={stage.name}>
                {/* Stage card */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "var(--space-4)",
                    alignItems: "center",
                    padding: "clamp(24px, 3vw, 44px) clamp(20px, 3vw, 40px)",
                    border: "1px solid",
                    borderColor: isCurrent
                      ? "var(--color-brand-orange)"
                      : isActive
                      ? "rgba(255,95,31,0.25)"
                      : "var(--color-border-gray)",
                    background: isCurrent
                      ? "rgba(255,95,31,0.04)"
                      : "rgba(5,5,5,0.8)",
                    transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    marginTop: idx === 0 ? 0 : -1,
                  }}
                >
                  {/* Tag number */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700,
                      color: isActive
                        ? "var(--color-brand-orange)"
                        : "var(--color-border-gray)",
                      transition: "color 0.5s ease",
                      lineHeight: 1,
                      minWidth: "60px",
                    }}
                  >
                    {stage.tag}
                  </div>

                  {/* Name + description */}
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(20px, 2.5vw, 32px)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        color: isActive ? "#fff" : "var(--color-dark-gray)",
                        transition: "color 0.5s ease",
                        marginBottom: "6px",
                      }}
                    >
                      {stage.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: isActive
                          ? "var(--color-light-gray)"
                          : "var(--color-border-gray)",
                        transition: "color 0.5s ease",
                        maxWidth: 480,
                        lineHeight: 1.6,
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "flex-end",
                    }}
                  >
                    {stage.metrics.map((m) => (
                      <span
                        key={m}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          border: "1px solid",
                          borderColor: isActive
                            ? "rgba(255,95,31,0.3)"
                            : "var(--color-border-gray)",
                          color: isActive
                            ? "var(--color-brand-orange)"
                            : "var(--color-border-gray)",
                          background: isActive
                            ? "rgba(255,95,31,0.06)"
                            : "transparent",
                          transition: "all 0.5s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connector line between stages */}
                {idx < PIPELINE.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "1px",
                        height: "32px",
                        background: isActive
                          ? "var(--color-brand-orange)"
                          : "var(--color-border-gray)",
                        transition: "background 0.5s ease",
                      }}
                    />
                    {/* Dot at junction */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-3px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "7px",
                        height: "7px",
                        background: isActive
                          ? "var(--color-brand-orange)"
                          : "var(--color-border-gray)",
                        transition: "background 0.5s ease",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom status bar ── */}
        <div
          style={{
            marginTop: "clamp(40px, 5vw, 80px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-2) var(--space-3)",
            border: "1px solid var(--color-border-gray)",
            background: "rgba(5,5,5,0.9)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                background:
                  activeStage >= PIPELINE.length - 1
                    ? "#22c55e"
                    : "var(--color-brand-orange)",
                animation: activeStage >= 0 ? "pulse-glow 2s ease infinite" : "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-dark-gray)",
              }}
            >
              {activeStage >= PIPELINE.length - 1
                ? "Pipeline Active — All Modules Online"
                : activeStage >= 0
                ? `Processing — ${PIPELINE[activeStage].name} Module`
                : "Pipeline Standby"}
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--color-border-gray)",
              letterSpacing: "0.1em",
            }}
          >
            {activeStage + 1}/{PIPELINE.length} MODULES
          </span>
        </div>
      </div>
    </section>
  );
}
