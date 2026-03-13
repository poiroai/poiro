# Poiro "Engineering Creativity" — Interactive Marketing Website

Build an Awwwards-level cinematic scroll-driven website for Poiro using Next.js App Router, TailwindCSS v4, GSAP + ScrollTrigger, Lenis smooth scroll, and canvas-based frame-sequence rendering.

## User Review Required

> [!IMPORTANT]
> **Frame Sequence Assets**: The hero requires 300 `.webp` frame images (`/frames/frame_0001.webp` to `frame_0300.webp`). Since these don't exist yet, the implementation will use a **procedural canvas-rendered animation** (particles assembling into a geometric structure) that runs identically to a frame sequence — driven by scroll progress. When real frames are ready, swapping them in will be a one-line change.

> [!WARNING]
> **Framer Motion → GSAP Migration**: The existing [page.tsx](file:///d:/GIT/poiro/src/app/page.tsx) uses Framer Motion for animations. This plan replaces those with GSAP ScrollTrigger for full scroll control. Framer Motion remains installed for any micro-interaction use, but scroll-driven animations will be GSAP.

> [!IMPORTANT]
> **3D Scene Change**: The current R3F icosahedron scene will be replaced by the procedural canvas hero. The [Scene.tsx](file:///d:/GIT/poiro/src/components/Scene.tsx) R3F component will be removed from the layout.

---

## Proposed Changes

### Phase 1 — Dependencies & Foundation

#### [MODIFY] [package.json](file:///d:/GIT/poiro/package.json)
- Install `gsap` (with ScrollTrigger plugin)
- Install `@gsap/react` for React hooks integration

#### [MODIFY] [globals.css](file:///d:/GIT/poiro/src/app/globals.css)
- Add Poppins font import
- Add full CSS variable system (colors, spacing on 8px grid, shadows, glows)
- Add `prefers-reduced-motion` media query for all animations
- Add utility classes for brutalist design (pixel shadows, glow effects)
- Add custom scrollbar styling

#### [MODIFY] [SmoothScroll.tsx](file:///d:/GIT/poiro/src/components/SmoothScroll.tsx)
- Integrate GSAP ScrollTrigger with Lenis via `scrollerProxy`
- Export the Lenis instance via React context so sections can control it (e.g., lock scroll during hero intro)

---

### Phase 2 — Component Board

#### [NEW] [componentBoard.tsx](file:///d:/GIT/poiro/src/components/componentBoard.tsx)
All reusable UI components in a single file, matching the brutalist design system:

| Component | Purpose |
|---|---|
| **Nav** | Fixed top navbar with logo, links, CTA button |
| **PrimaryButton** | Orange filled button with pixel shadow |
| **SecondaryButton** | Outlined button with orange pixel shadow |
| **Ticker** | Infinite horizontal scrolling text/label bar |
| **StatBlock** | Stat card with number + label + optional icon |
| **ControlPanel** | Brutalist panel container with header bar |
| **ImageCanvas** | Image display with brutalist border + label overlay |
| **TerminalConsole** | Terminal-style code/text display block |
| **PipelineTracker** | Animated pipeline stage indicator (Context → Insights → Brandify → Omni-focus) |
| **ToggleSwitch** | Brutalist on/off toggle element |

---

### Phase 3 — Hero Section

#### [NEW] [HeroCanvas.tsx](file:///d:/GIT/poiro/src/components/HeroCanvas.tsx)
- Full-viewport `<canvas>` element
- Procedural particle animation: orange particles assembling into a geometric structure
- Accepts a `progress` prop (0-1) that drives the animation frame
- Respects `prefers-reduced-motion`

#### [NEW] [HeroSection.tsx](file:///d:/GIT/poiro/src/components/HeroSection.tsx)
- On page load: disable scroll, auto-animate from frame 0 → 120 over ~2.5s
- At frame 120: reveal "ENGINEERING CREATIVITY" title with fade + scale + orange glow
- Enable scroll: scroll progress maps to frames 120 → 300
- Title fades away as user scrolls
- At frame 300: smooth transition into next section
- Uses GSAP ScrollTrigger `pin` for the scroll-driven phase

---

### Phase 4 — Storytelling Sections

#### [NEW] [ProblemSection.tsx](file:///d:/GIT/poiro/src/components/sections/ProblemSection.tsx)
- Headline: "Marketing is chaos."
- Visual: floating creative fragments collapsing into structured blocks
- GSAP scroll-triggered entrance animations

#### [NEW] [PoiroscopeSection.tsx](file:///d:/GIT/poiro/src/components/sections/PoiroscopeSection.tsx)
- Headline: "Meet Poiroscope"
- Subheadline: "Social Insights → On-brand AI Assets"
- Visual: PipelineTracker component animating as user scrolls (Context → Insights → Brandify → Omni-focus)

#### [NEW] [BrandifySection.tsx](file:///d:/GIT/poiro/src/components/sections/BrandifySection.tsx)
- Headline: "Brandify™ Assets"
- Grid of ImageCanvas components showing generated marketing creatives
- GSAP stagger reveal on scroll

#### [NEW] [ShowcaseSection.tsx](file:///d:/GIT/poiro/src/components/sections/ShowcaseSection.tsx)
- Headline: "Product Showcase"
- Horizontal scrolling categories using Ticker component
- Items: Video Content, Supplement Ad, Health Benefits, Travel Content, Beauty Product, Fitness Content, Tech Review, Gaming Content

#### [NEW] [EngineSection.tsx](file:///d:/GIT/poiro/src/components/sections/EngineSection.tsx)
- Headline: "Stop prompting. Start producing."
- Visual: system diagram — inputs feeding into a glowing orange engine, outputs emerging
- Uses ControlPanel, TerminalConsole, StatBlock components

---

### Phase 5 — CTA & Footer

#### [NEW] [CTASection.tsx](file:///d:/GIT/poiro/src/components/sections/CTASection.tsx)
- Headline: "Lights. Camera. Batsh*t creativity."
- Subtext: "Join us in the new era of content creation."
- PrimaryButton ("Save Your Spot") + SecondaryButton ("Book Demo")

#### [NEW] [Footer.tsx](file:///d:/GIT/poiro/src/components/Footer.tsx)
- Poiro logo + "Engineering Creativity" tagline
- Warning banner: "Side effects may include dangerously good content."
- Navigation links + copyright

---

### Phase 6 — Assembly

#### [MODIFY] [page.tsx](file:///d:/GIT/poiro/src/app/page.tsx)
- Complete rewrite: import and compose all sections in order
- Hero → Problem → Poiroscope → Brandify → Showcase → Engine → CTA → Footer

#### [MODIFY] [layout.tsx](file:///d:/GIT/poiro/src/app/layout.tsx)
- Switch from Inter to Poppins font
- Remove R3F `<Scene />` component from layout
- Keep SmoothScroll provider (now with GSAP integration)

#### [DELETE] [Scene.tsx](file:///d:/GIT/poiro/src/components/Scene.tsx)
- Replaced by the procedural HeroCanvas

---

## Verification Plan

### Automated Tests
- `npm run build` — validate the production build compiles without errors

### Browser Verification
Using the browser tool to verify:
1. **Hero section**: Auto-scroll plays on load → title reveals → scroll-driven animation works
2. **Scroll continuity**: All sections render in order, transitions are smooth
3. **Component board**: Nav appears, buttons are styled correctly, Ticker scrolls
4. **Responsive**: Check layout at different viewport widths
5. **Performance**: No visible jank during scroll

### Manual Verification
- The user should scroll through the full page to verify the cinematic feel, micro-interactions, and overall premium quality
