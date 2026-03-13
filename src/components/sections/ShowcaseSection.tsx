"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ticker } from "../componentBoard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   SHOWCASE SECTION
   "Product Showcase" — Horizontal scrolling categories
   using the Ticker component.
   ═══════════════════════════════════════════════════════ */

const SHOWCASE_ITEMS = [
  "Video Content",
  "Supplement Ad",
  "Health Benefits",
  "Travel Content",
  "Beauty Product",
  "Fitness Content",
  "Tech Review",
  "Gaming Content",
];

const SHOWCASE_CARDS = [
  {
    title: "Video Content",
    tag: "format::video",
    description:
      "Auto-generated short-form video scripts, visual breakdowns, and performance-ready AI storyboards.",
  },
  {
    title: "Supplement Ad",
    tag: "format::ad",
    description:
      "On-brand ad creatives engineered from real social insights — not guesswork.",
  },
  {
    title: "Tech Review",
    tag: "format::review",
    description:
      "Deep-dive product analyses cross-referenced with audience sentiment data.",
  },
  {
    title: "Social Pulse",
    tag: "format::analytics",
    description:
      "Real-time engagement metrics parsed into content recommendations with a single prompt.",
  },
  {
    title: "Brand Assets",
    tag: "format::design",
    description:
      "Logos, color systems, and typography generated to match your audience's visual language.",
  },
  {
    title: "Campaign Brief",
    tag: "format::strategy",
    description:
      "End-to-end campaign outlines built from competitor analysis and trending topics.",
  },
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-headline",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".showcase-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".showcase-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      style={{
        minHeight: "100vh",
        padding: "var(--space-12) 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 var(--space-3)",
        }}
      >
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
            Output Formats
          </span>
        </div>

        <h2
          className="showcase-headline"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-6)",
          }}
        >
          Product{" "}
          <span style={{ color: "var(--color-brand-orange)" }}>Showcase</span>
        </h2>
      </div>

      {/* Ticker — full-width infinite scroll */}
      <Ticker items={SHOWCASE_ITEMS} speed={25} />

      {/* Showcase cards grid */}
      <div
        className="showcase-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "var(--space-6) var(--space-3) 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-2)",
        }}
      >
        {SHOWCASE_CARDS.map((card, i) => (
          <div
            key={card.tag}
            className="showcase-card"
            style={{
              border: "1px solid var(--color-border-gray)",
              background: "rgba(0,0,0,0.7)",
              padding: "var(--space-3)",
              transition: "box-shadow 0.3s, border-color 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "var(--color-brand-orange)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "var(--color-border-gray)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-2)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--color-brand-orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {card.tag}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--color-dark-gray)",
                }}
              >
                [{String(i + 1).padStart(2, "0")}]
              </span>
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-foreground)",
                marginBottom: "var(--space-1)",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-light-gray)",
                lineHeight: 1.6,
              }}
            >
              {card.description}
            </p>
            <div
              style={{
                marginTop: "var(--space-2)",
                height: 1,
                background: "var(--color-border-gray)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
