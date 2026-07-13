# HomerunAI — Image & Video Generation Prompt Pack

Everything here is tuned to the site's design language: **light & clean, flat 2D pastel,
grassroots-sports warmth.** Paste the **STYLE BLOCK** into (almost) every image prompt so
assets come back on-brand and consistent.

## Recommended tools
- **Flat vector illustrations (best match):** [Recraft](https://recraft.ai) — supports a locked
  brand palette + **SVG export**, ideal for this flat style. Alternatives: Midjourney v7 (`--style raw`),
  Adobe Firefly, DALL·E 3.
- **Icons:** Recraft (icon mode) or Iconify for consistency.
- **Motion / animation (on-brand flat):** Do it as **vector motion**, not AI video — After Effects → **Lottie**,
  or **Rive** / **Jitter**. AI video rarely holds a flat pastel style frame-to-frame.
- **Real-footage demo video:** Runway Gen-3, Google Veo 3, Kling, Luma, or Sora.

---

## ⭐ STYLE BLOCK (paste into every image prompt)

```
Flat 2D vector illustration, modern minimalist editorial style. Clean geometric shapes
with soft rounded corners, subtle flat long-shadows, thin consistent outlines, generous
negative space, warm and friendly grassroots-sports mood. Matte flat colors only — no
photorealism, no 3D, no glossy highlights, no gradient mesh.

STRICT palette (use only these):
- cream background #FBFAF4
- field greens #EAF4E4, #CFE7C4, #A9D69C, #8EC48A, #5E9A5E, deep green #3C5A3E
- infield clay / mud #F0D8C4, #E4B896, #D69A6E, #B87748
- sky blue #B7DCEC / #7FBBD6
- coral accent #F2A488
- sun yellow #F6E2A0
- ink text #2C3A2E

Centered, balanced composition, crisp edges, high readability.
```

**Universal NEGATIVE prompt:**
```
photorealistic, 3D render, glossy, neon, dark background, gritty, cluttered, busy,
realistic human faces, heavy drop shadows, gradient mesh, text, letters, watermark,
logo, low contrast, muddy colors
```

**Aspect-ratio cheat sheet:** Hero art `4:3`; step/feature spots `1:1`; sport tiles `16:10`;
OG/social `1200×630`; app mockups `16:10` (desktop) / `9:19.5` (phone).

---

# A. IMAGES

### A1 — Hero illustration (primary) · 4:3 · transparent or cream bg
> Purpose: replaces the current hero SVG. The core story in one frame.
```
[STYLE BLOCK]
A wide flat-vector scene on a soft pastel soccer pitch with faint mowed stripes
(#A9D69C on #CFE7C4). Three smartphones on small tripods placed around the field edges,
each framed like a camera, thin dotted signal lines flowing from all three toward a single
open laptop in the lower-center. The laptop screen shows a 2x2 multiview grid of four camera
tiles (green, sky-blue, clay, green); one tile is highlighted with a coral #F2A488 border and
a small coral LIVE dot. A rounded coral "LIVE" pill floats above the laptop. To the right, a
small rounded speech bubble with a coral microphone icon and two green text lines represents
AI commentary. Balanced, airy, no text. Cream #FBFAF4 background.
```

### A2 — Hero, phone-app angle (optional alt) · 4:3
```
[STYLE BLOCK]
A single hand-held smartphone (flat, no realistic hand — just a simple rounded clay-colored
shape) filming a pastel sports field; on the phone screen a big rounded coral "GO LIVE" button
and a small framed field. Dotted signal waves rise from the top of the phone. Minimal, friendly.
```

### A3 — OG / social share card · 1200×630 · cream bg
```
[STYLE BLOCK]
Horizontal banner. Left third empty for headline text (leave clean negative space, NO text).
Right two-thirds: the hero scene — phones on tripods around a pastel pitch streaming dotted
lines into a laptop multiview with one coral-highlighted LIVE tile. Wide margins, centered vertically.
```

---

## How-it-works step spots (square, 1:1, cream or #EAF4E4 rounded-square bg)

### A4 — Step 1 · "Phones become cameras"
```
[STYLE BLOCK]
Square icon-illustration. Two smartphones on mini tripods side by side, angled slightly outward,
each screen showing a tiny pastel field. Small dotted Wi-Fi waves emitting from the top corners.
Green #8EC48A phone bodies with deep-green outlines on a pale #EAF4E4 rounded-square background.
Simple, centered, lots of padding.
```

### A5 — Step 2 · "The AI watches every feed"
```
[STYLE BLOCK]
Square icon-illustration. An open laptop showing a 2x2 multiview grid of four camera tiles in
green / sky-blue / clay / green. A friendly flat "AI" motif hovering above the screen — a simple
rounded eye or soft brain glyph made of green shapes with a coral scanning dot tracking a tiny
white ball. Pale #EAF4E4 rounded-square background, centered.
```

### A6 — Step 3 · "It cuts to the best shot"
```
[STYLE BLOCK]
Square icon-illustration. Three small camera-feed tiles fanned like cards; the center one is
larger, pulled forward, and outlined with a coral #F2A488 border and a coral LIVE dot — clearly
"selected." Two flat directional switch-arrows (green) curve toward it. Conveys automatic cutting
to the best angle. Pale #EAF4E4 rounded-square background, centered.
```

---

## Sport field tiles (16:10, top-down, flat)
> Purpose: the "One director. Four sports." cards. Match the existing baseball logo look.

### A7 — Soccer pitch
```
[STYLE BLOCK]
Top-down flat pastel soccer pitch. Mowed vertical stripes alternating #A9D69C and #8EC48A,
crisp white lines (#FBFAF4): outer boundary, halfway line, center circle, two penalty boxes.
Clean, symmetric, no players, no text.
```

### A8 — Baseball diamond  (matches current logo)
```
[STYLE BLOCK]
Top-down flat pastel baseball field. Green outfield (#5E9A5E and #8EC48A wedge stripes), clay
#E4B896 infield diamond, white bases and home plate, small pitcher's mound dot. Diagonal
light-green outfield gradient stripes in one corner. Clean, symmetric, no text.
```

### A9 — American football field
```
[STYLE BLOCK]
Top-down flat pastel American football field. Green #8EC48A turf with white yard lines every
few units, two clay #D69A6E end zones, small white hash marks down the middle. Clean, symmetric,
no text, no logos.
```

### A10 — Basketball court
```
[STYLE BLOCK]
Top-down flat pastel basketball court on warm tan wood #E7C79B with a subtle #EDB07C tint.
White lines: boundary, center line and circle, two key/paint rectangles, two three-point arcs.
Clean, symmetric, no text.
```

---

## Problem-section illustrations (both ~4:3)

### A11 — "Big leagues" (intentionally muted / grey-green)
```
[STYLE BLOCK, but desaturate greens toward grey #C9CFC7 / #AEB6AB / #7C877D]
Flat vector scene of an expensive pro broadcast setup: a broadcast truck with a satellite dish,
two large tripod TV cameras with operators (operators as simple faceless rounded silhouettes),
a stack of equipment cases, and dollar-sign coins. Muted grey-green palette to feel costly and
out of reach. Cream background. No text.
```

### A12 — "Grassroots" (vibrant, on-palette)
```
[STYLE BLOCK]
Flat vector scene of a friendly local sports field with two phones on simple tripods and one
open laptop on a folding table auto-cutting the feed (laptop shows a coral-highlighted LIVE
tile). Bright pastel greens, coral accents, sunny #F6E2A0 highlights. Feels easy, cheerful,
accessible. Cream background. No text.
```

---

## Feature spots (1:1 small icons, pale green rounded-square bg #EAF4E4)
> Keep each ultra-simple — one clear motif, thin outlines, 1–2 colors + coral accent.

### A13 — Real sports vision
```
[STYLE BLOCK] Square. A soft green eye/brain glyph with a coral scanning reticle locking onto a
tiny white ball. Pale #EAF4E4 bg.
```
### A14 — Smooth auto-cutting
```
[STYLE BLOCK] Square. Two curved green switch-arrows swapping between two small camera tiles, one
tile edged in coral. Pale #EAF4E4 bg.
```
### A15 — AI commentary
```
[STYLE BLOCK] Square. A coral #F2A488 microphone with a small green sound waveform beside it and
a tiny "AI" spark. Pale #EAF4E4 bg.
```
### A16 — Any phone is a camera
```
[STYLE BLOCK] Square. A single green smartphone with a small upload arrow and dotted Wi-Fi waves.
Pale #EAF4E4 bg.
```
### A17 — Smooth 30fps
```
[STYLE BLOCK] Square. A sun-yellow #F6E2A0 lightning bolt over a small filmstrip / play triangle.
Pale #EAF4E4 bg.
```
### A18 — Runs on your Wi-Fi
```
[STYLE BLOCK] Square. Sky-blue #7FBBD6 concentric Wi-Fi arcs over a small laptop, a soft shield
behind it (privacy / local). Pale #EAF4E4 bg.
```

---

## Product mockups

### A19 — Director desktop app (macOS window) · 16:10
```
[STYLE BLOCK, slightly higher fidelity flat-UI]
A clean flat mockup of a macOS desktop app window titled area (three window dots), showing a
sports "director" console: a large LIVE program view on the left playing a pastel pitch, a
vertical strip of 4 smaller camera thumbnails on the right (one edged coral = live), a bottom
bar with a coral LIVE indicator and simple confidence meters. Cream UI, green accents, flat,
no real text (use placeholder line shapes). Soft rounded window with subtle shadow.
```

### A20 — Camera phone app (iOS screen) · 9:19.5
```
[STYLE BLOCK, flat-UI]
A flat mockup of an iPhone screen for a camera app: full-bleed pastel field camera preview, a
large rounded coral "GO LIVE" button at the bottom, small top pills for "720p/1080p" and a
camera-flip icon, a tiny "cam2" tag. Landscape-lock hint. Green + coral, cream chrome, no real text.
```

---

# B. VIDEO / ANIMATION

> For the **hero loop** and **explainer**, stay in flat vector motion (After Effects → Lottie,
> or Rive) to keep the exact palette. The prompts below double as **motion briefs** for a designer
> AND as text prompts for AI video tools when you want a quick draft.

### V1 — Hero background loop (6–10s, seamless, transparent/cream) — *motion brief*
```
Animate the A1 hero scene. Loop:
1) Dotted signal lines flow (marching ants) from each of the 3 phones into the laptop, continuously.
2) The highlighted LIVE tile on the laptop switches every ~2.5s from one camera tile to another,
   the coral border + LIVE dot hopping to the new tile (with a soft ease, tiny scale-pop).
3) The commentary bubble's waveform gently pulses.
4) Everything bobs subtly (2–4px float). Calm, premium, 30fps, seamless loop.
Palette + flat style per STYLE BLOCK. Export as Lottie JSON + MP4/WebM with alpha.
```

### V2 — AI-video draft of the hero (if using Runway/Veo/Kling) · 5s · 16:9
```
Flat 2D animated illustration, pastel grassroots soccer pitch seen slightly from above.
Three simple phones on tripods around the field stream glowing green dotted lines into a laptop
in the center; the laptop's 4-tile multiview switches which tile is highlighted with a coral
border; a small LIVE pill pulses. Limited pastel palette (cream, pastel greens, clay, coral).
Minimal, clean, matte flat colors, gentle looping motion, no camera shake, no text.
Negative: photoreal, 3D, neon, dark, clutter, faces, text.
```

### V3 — 45–60s product demo (real footage concept) · Veo 3 / Runway / real shoot
```
Documentary-style short: a youth/amateur soccer match on a local field. Shots:
(0–8s) Two coaches prop up 2–3 phones on cheap tripods around the pitch, tap "GO LIVE".
(8–25s) Cutaway to a laptop on a folding table: the HomerunAI director UI auto-switching between
the phone feeds as play moves; on-screen coral LIVE badge; overlay a friendly AI commentary
waveform + subtitle line.
(25–45s) Split screen: raw single phone vs. HomerunAI's auto-directed broadcast (clearly better).
(45–60s) End card on cream background, negative space for logo + tagline "Broadcast your game.
No crew required." Warm, sunny, hopeful tone; light acoustic music.
Color-grade warm and bright to echo the pastel brand.
```

### V4 — How-it-works micro-animations (3× ~4s Lottie loops) — *motion brief*
```
Three tiny looping Lottie animations matching A4/A5/A6:
1) Step 1: Wi-Fi waves pulse off two phones.
2) Step 2: a coral scan reticle sweeps the multiview and locks onto the ball.
3) Step 3: the "selected" feed card slides forward and the coral LIVE border snaps on.
Flat, palette-locked, seamless, 30fps, transparent bg.
```

### V5 — Sport-switch loop (optional, 4s) — *motion brief*
```
The four sport field tiles (soccer, baseball, football, basketball) cross-fade/slide in sequence
on a cream background, each with its ball rolling in from the side. Flat, palette-locked, seamless.
```

---

## Suggested file names / drop-in map
| Asset | File | Used in |
|---|---|---|
| A1/V1 | `hero.(svg\|json\|webm)` | Hero |
| A4–A6 | `step-1.svg`,`step-2.svg`,`step-3.svg` | How it works |
| A7–A10 | `field-soccer.svg` … `field-basketball.svg` | Sports cards |
| A11/A12 | `problem-big.svg`,`problem-grassroots.svg` | Problem section |
| A13–A18 | `feat-*.svg` | Features grid |
| A19/A20 | `mockup-director.png`,`mockup-camera.png` | Download / product |
| A3 | `og.png` (1200×630) | `<meta og:image>` |

> Tip: generate illustrations as **SVG** (Recraft) when possible — they scale crisply, stay tiny,
> and you can hand them to me to drop straight into the React components.
