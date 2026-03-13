"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   PROBLEM SECTION
   "Marketing is chaos." — Floating creative fragments
   collapsing into structured blocks on scroll.
   ═══════════════════════════════════════════════════════ */

const CHAOS_ITEMS = [
  { label: "TRENDS", emoji: "📈", rotation: -12 },
  { label: "AUDIENCES", emoji: "👥", rotation: 8 },
  { label: "DEADLINES", emoji: "⏰", rotation: -5 },
  { label: "PLATFORMS", emoji: "📱", rotation: 15 },
  { label: "BUDGETS", emoji: "💸", rotation: -18 },
  { label: "CONTENT", emoji: "📝", rotation: 10 },
  { label: "ANALYTICS", emoji: "📊", rotation: -8 },
  { label: "APPROVALS", emoji: "✅", rotation: 6 },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Headline entrance */
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      /* Subtext */
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      /* Fragments: start floating/rotated, collapse into a grid */
      const cards = fragmentsRef.current?.querySelectorAll(".chaos-card");
      if (cards) {
        cards.forEach((card, i) => {
          const item = CHAOS_ITEMS[i];
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80 + Math.random() * 40,
              x: (Math.random() - 0.5) * 120,
              rotation: item.rotation,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotation: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.1 * i,
              ease: "power3.out",
              scrollTrigger: {
                trigger: fragmentsRef.current,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "var(--space-12) var(--space-3)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Tag line */}
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
            The Problem
          </span>
        </div>

        <h2
          ref={headlineRef}
          style={{
            fontSize: "clamp(40px, 6vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-3)",
          }}
        >
          Marketing is{" "}
          <span style={{ color: "var(--color-brand-orange)" }}>chaos.</span>
        </h2>

        <p
          ref={subtextRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            color: "var(--color-dark-gray)",
            maxWidth: 560,
            lineHeight: 1.6,
            marginBottom: "var(--space-8)",
          }}
        >
          Every team juggles platforms, briefs, trends, and a dozen
          stakeholder opinions — all at once. The result? Burnout and bland
          content.
        </p>

        {/* Chaos fragments grid */}
        <div
          ref={fragmentsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "var(--space-2)",
          }}
        >
          {CHAOS_ITEMS.map((item) => (
            <div
              key={item.label}
              className="chaos-card"
              style={{
                border: "1px solid var(--color-border-gray)",
                background: "rgba(10,10,10,0.8)",
                padding: "var(--space-3)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-brand-orange)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-gray)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-light-gray)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
