# Lexus GX550 · 2026 — Weblove Demo

Apple-style scroll-driven product showcase. Built as a teaching reference for the Weblove community.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's in here

- `src/app/page.tsx` — all sections wired together
- `src/components/FrameSequence.tsx` — the canvas scroll-driven player (the centerpiece)
- `src/components/SplitText.tsx` — char/word/line text reveals (mask, rise, blur, skew)
- `src/components/sections/` — Hero, Cinema, Specs, Editorial, HowItsBuilt, CTA
- `public/frames/` — 121 JPEG frames at 4K, extracted from `video Lexus.mp4`

## The frames

Extracted with ffmpeg:

```bash
ffmpeg -i "video Lexus.mp4" -vf "scale=3840:-2:flags=lanczos" -q:v 2 \
  -start_number 1 "frame-%03d.jpg"
```

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind · Framer Motion · GSAP · Lenis

## Design system

- Background `#FFFFFF`, ink `#0A0A0A`, mist `#F2F2F2`
- Helvetica Neue Bold (system font on macOS, falls back on others)
- Mono labels at 10px tracking 0.3em
- Easing `cubic-bezier(0.22, 1, 0.36, 1)` everywhere
