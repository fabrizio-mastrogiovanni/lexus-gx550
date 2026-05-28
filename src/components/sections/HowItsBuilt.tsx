"use client";

import { FadeUp } from "@/components/FadeUp";
import { SplitText } from "@/components/SplitText";
import { Scrambler } from "@/components/Scrambler";

const techniques = [
  {
    n: "01",
    title: "Scroll-driven canvas",
    body: "121 JPEG frames extracted at 4K from a single MP4 with ffmpeg. A canvas element redraws on every scroll tick — no <video>, no jank.",
    stack: "canvas · requestAnimationFrame · scroll",
  },
  {
    n: "02",
    title: "Lenis smooth scroll",
    body: "Native scroll is replaced by a Lenis instance with a quartic ease-out curve. Every section inherits the same buttery feel.",
    stack: "lenis · raf loop",
  },
  {
    n: "03",
    title: "Framer Motion text reveals",
    body: "Headlines split into characters or words, each animated through a mask-clipped wrapper with cubic-bezier(0.22,1,0.36,1).",
    stack: "framer-motion · variants · stagger",
  },
  {
    n: "04",
    title: "Type-only design system",
    body: "Helvetica Neue Bold. Three sizes: monumental, body, mono. The system is the typography — no decorations, no UI noise.",
    stack: "tailwind · helvetica · tracking",
  },
  {
    n: "05",
    title: "Progressive preload",
    body: "First 8 frames load in parallel for instant feel. The rest stream in background chunks of 8 — scroll stays smooth before the cache fills.",
    stack: "Image() · async chunks",
  },
  {
    n: "06",
    title: "Mix-blend-difference nav",
    body: "A single fixed header inverts itself against whatever it scrolls over. One element, two visual modes, zero JavaScript.",
    stack: "mix-blend-mode · css",
  },
];

export function HowItsBuilt() {
  return (
    <section id="built" className="bg-ink text-paper">
      <div className="px-6 py-32 md:px-10 md:py-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-paper/60">
              <FadeUp>
                <Scrambler text="04 · HOW IT'S BUILT" />
              </FadeUp>
            </div>
          </div>
          <h2 className="col-span-12 display text-[12vw] leading-[0.88] md:col-span-8 md:text-[7vw]">
            <SplitText mode="word" variant="mask" duration={1.0} stagger={0.06}>
              {"Six techniques.\nOne web page."}
            </SplitText>
          </h2>
        </div>

        <div className="mt-24 divide-y divide-paper/15 border-y border-paper/15">
          {techniques.map((t, i) => (
            <FadeUp
              key={t.n}
              delay={i * 0.08}
              className="group grid grid-cols-12 items-start gap-6 py-10 transition-colors duration-500 hover:bg-paper/5 md:py-14"
            >
              <div className="col-span-2 font-mono text-[10px] tracking-[0.3em] text-paper/60 md:col-span-1">
                {t.n}
              </div>
              <div className="col-span-10 md:col-span-6">
                <h3 className="display text-[7vw] leading-[0.92] md:text-[3.5vw]">
                  {t.title}
                </h3>
              </div>
              <p className="col-span-12 text-[14px] leading-[1.5] tracking-tight text-paper/70 md:col-span-4">
                {t.body}
              </p>
              <div className="col-span-12 font-mono text-[10px] tracking-[0.3em] text-paper/40 md:col-span-1 md:text-right">
                {t.stack.split(" · ").map((s, j) => (
                  <div key={j}>{s}</div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
