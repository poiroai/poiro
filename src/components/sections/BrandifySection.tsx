"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   BRANDIFY SECTION
   "Brandify™ Assets" — Grid of generated marketing
   creatives with stagger reveal on scroll.
   ═══════════════════════════════════════════════════════ */

const ASSET_ITEMS = [
  { label: "Social Story", tag: "INSTAGRAM", color: "#FF5F1F" },
  { label: "Product Hero", tag: "E-COMMERCE", color: "#FF5F1F" },
  { label: "Video Thumbnail", tag: "YOUTUBE", color: "#FF5F1F" },
  { label: "Banner Ad", tag: "DISPLAY", color: "#FF5F1F" },
  { label: "Email Header", tag: "CRM", color: "#FF5F1F" },
  { label: "Carousel Post", tag: "LINKEDIN", color: "#FF5F1F" },
];

export default function BrandifySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Headline */
      gsap.fromTo(
        ".brandify-headline",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Cards stagger reveal */
      gsap.fromTo(
        ".brandify-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".brandify-grid", start: "top 80%" },
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
            Output
          </span>
        </div>

        <h2
          className="brandify-headline"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-2)",
          }}
        >
          Brandify<span style={{ color: "var(--color-brand-orange)" }}>™</span>{" "}
          Assets
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
          {/* Production-ready creatives generated from your brand guidelines and
          social intelligence. */}
          Production-ready creatives generated from your brand guidelines and
          social intelligence.
        </p>

        {/* Asset grid */}
        <div
          className="brandify-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--space-2)",
          }}
        >
          {ASSET_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="brandify-card"
              style={{
                border: "1px solid var(--color-border-gray)",
                background: "rgba(10,10,10,0.8)",
                overflow: "hidden",
                transition: "box-shadow 0.3s, border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-brand-orange)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-gray)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Visual placeholder — gradient canvas */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(${135 + i * 30}deg, rgba(255,95,31,${0.08 + i * 0.03}) 0%, rgba(0,0,0,0.9) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid var(--color-border-gray)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative grid lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(255,95,31,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,95,31,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-dark-gray)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  [ PREVIEW ]
                </span>
              </div>

              {/* Info bar */}
              <div
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-foreground)",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--color-dark-gray)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-dark-gray)",
                  }}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
