"use client";

import { SplitText } from "@/components/SplitText";
import { FadeUp } from "@/components/FadeUp";

export function Editorial() {
  return (
    <section id="editorial" className="relative bg-paper">
      {/* Eyebrow row */}
      <div className="grid grid-cols-12 gap-6 border-b border-rule px-6 py-10 md:px-10">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
            <FadeUp>03 · DESIGN PHILOSOPHY</FadeUp>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 font-mono text-[10px] tracking-[0.3em] text-muted">
          <FadeUp delay={0.1}>— A LINE BEGINS AT THE WHEEL ARCH</FadeUp>
        </div>
      </div>

      {/* Monumental statement */}
      <div className="px-6 py-32 md:px-10 md:py-48">
        <h2 className="display text-[13vw] leading-[0.88] md:text-[8.5vw]">
          <SplitText mode="word" variant="mask" duration={1.0} stagger={0.06}>
            Drawn with intent.
          </SplitText>
          <br />
          <span className="text-rule">
            <SplitText
              mode="word"
              variant="mask"
              duration={1.0}
              stagger={0.06}
              delay={0.25}
            >
              Built without compromise.
            </SplitText>
          </span>
        </h2>
      </div>

      {/* Three-column editorial copy */}
      <div className="grid grid-cols-12 gap-6 border-t border-rule px-6 py-20 md:px-10 md:py-32">
        <div className="col-span-12 md:col-span-4">
          <FadeUp>
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
              I · PROPORTION
            </div>
            <p className="mt-6 text-[15px] leading-[1.5] tracking-tight text-ink">
              Every line begins at the wheel arch — a deliberate gesture that
              proportions weight to capability. The body cantilevers forward,
              tools first, with the silhouette of a vehicle that finishes its
              sentences with action.
            </p>
          </FadeUp>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FadeUp delay={0.15}>
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
              II · INTERIOR
            </div>
            <p className="mt-6 text-[15px] leading-[1.5] tracking-tight text-ink">
              Inside, the geometry reverses. Spaces expand. Materials soften.
              The cabin becomes a chamber for everything the trail couldn’t
              prepare you for.
            </p>
          </FadeUp>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FadeUp delay={0.3}>
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
              III · INTENT
            </div>
            <p className="mt-6 text-[15px] leading-[1.5] tracking-tight text-ink">
              Nothing is decorative. Every contour answers a question of weight,
              airflow, or signal. Design here is the residue of a thousand small
              engineering decisions made out loud.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Closing quote */}
      <div className="border-t border-rule px-6 py-32 md:px-10 md:py-48">
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
          <FadeUp>— PRINCIPLE</FadeUp>
        </div>
        <p className="display mt-8 max-w-[18ch] text-[10vw] leading-[0.95] md:text-[6vw]">
          <SplitText mode="word" variant="blur" duration={1.0} stagger={0.05}>
            Engineered to outlast the road that hasn’t been built yet.
          </SplitText>
        </p>
      </div>
    </section>
  );
}
