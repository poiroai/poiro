"use client";

/* ═══════════════════════════════════════════════════════
   FOOTER
   Poiro logo + tagline, warning banner, nav links, copyright
   ═══════════════════════════════════════════════════════ */

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-gray)",
        padding: "var(--space-8) var(--space-3)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Warning banner */}
        <div
          style={{
            border: "1px solid var(--color-brand-orange)",
            background: "rgba(255, 95, 31, 0.04)",
            padding: "var(--space-3)",
            marginBottom: "var(--space-6)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <span style={{ color: "var(--color-brand-orange)", fontSize: "1.25rem" }}>
            ⚠
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-light-gray)",
            }}
          >
            Side effects may include{" "}
            <span style={{ color: "var(--color-brand-orange)", fontWeight: 700 }}>
              dangerously good
            </span>{" "}
            content.
          </span>
        </div>

        {/* Footer grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "var(--space-6)",
            alignItems: "start",
          }}
        >
          {/* Left — Branding */}
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "var(--space-1)",
              }}
            >
              POIRO
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-dark-gray)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Engineering Creativity
            </p>
          </div>

          {/* Right — Links */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
            }}
          >
            {["Product", "Showcase", "Engine", "About", "Contact"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-dark-gray)",
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-brand-orange)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark-gray)")
                  }
                >
                  {label}
                </a>
              )
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-gray)",
            marginTop: "var(--space-6)",
            paddingTop: "var(--space-3)",
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
              fontSize: "0.625rem",
              color: "var(--color-dark-gray)",
              letterSpacing: "0.1em",
            }}
          >
            © 2026 POIRO. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--color-dark-gray)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Engineering Creativity
          </span>
        </div>
      </div>
    </footer>
  );
}
