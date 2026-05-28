"use client";

import { FrameSequence } from "@/components/FrameSequence";
import { SplitText } from "@/components/SplitText";
import { Scrambler } from "@/components/Scrambler";
import { motion } from "framer-motion";

/**
 * Opening section.
 *
 * - The first frame is visible immediately as a CSS poster on the section
 *   (so there is no white flash while the canvas loads).
 * - As the user scrolls, the FrameSequence drives the exploded-view animation
 *   of the Lexus GX550 from frame 1 (intact) → frame 121 (fully exploded).
 * - Subtle scroll-progress captions sit on top of the frame.
 * - Near the end of the scroll (progress >= 0.85), the monumental title
 *   "GX550 · 2026" emerges with a mask-clip reveal — the handoff into the
 *   rest of the site.
 */
export function Opening() {
  return (
    <section
      id="top"
      className="relative bg-ink"
      style={{
        // Poster background so the first frame is visible before canvas paints
        backgroundImage: "url(/frames/frame-001.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FrameSequence
        total={121}
        pathPrefix="/frames/frame-"
        ext="jpg"
        scrollLength={4}
      >
        {(p) => (
          <>
            {/* Progress hairline — top */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-px bg-paper/15">
              <div
                className="h-full bg-paper"
                style={{ width: `${p * 100}%` }}
              />
            </div>

            {/* Top-left: subtle model label */}
            <div className="pointer-events-none absolute left-6 top-24 z-20 font-mono text-[10px] tracking-[0.3em] text-paper/80 md:left-10 md:top-28">
              <Scrambler text="LEXUS · GX550 · 2026" />
            </div>

            {/* Top-right: live frame counter */}
            <div className="pointer-events-none absolute right-6 top-24 z-20 font-mono text-[10px] tracking-[0.3em] text-paper/80 md:right-10 md:top-28">
              FRAME {String(Math.round(p * 120) + 1).padStart(3, "0")} / 121
            </div>

            {/* Bottom-left intro tag — only at the very start */}
            <motion.div
              initial={false}
              animate={{ opacity: p < 0.05 ? 1 : 0, y: p < 0.05 ? 0 : 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-10 left-6 z-20 max-w-xs text-paper/85 md:bottom-14 md:left-10"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-paper/60">
                — SCROLL TO EXPLORE
              </div>
              <p className="mt-3 text-[14px] leading-[1.35] tracking-tight">
                Watch the GX550 come apart. Piece by piece, system by system.
              </p>
            </motion.div>

            {/* Mid-scroll labels — disassembly stages */}
            <Stage active={p >= 0.05 && p < 0.25} label="01 · BODY OPENS" />
            <Stage active={p >= 0.25 && p < 0.5} label="02 · CABIN REVEALED" />
            <Stage active={p >= 0.5 && p < 0.75} label="03 · CHASSIS EXPOSED" />
            <Stage active={p >= 0.75 && p < 0.92} label="04 · POWERTRAIN OUT" />

            {/* Final reveal: monumental title over the fully exploded car */}
            <motion.div
              initial={false}
              animate={{
                opacity: p >= 0.88 ? 1 : 0,
                y: p >= 0.88 ? 0 : 30,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-16 md:px-10 md:pb-24"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-paper/70">
                {p >= 0.9 && <SplitText mode="char" stagger={0.018} duration={0.6}>05 · OVERTRAIL · OVERBUILT</SplitText>}
              </div>
              <h1 className="display display-tight mt-3 text-[18vw] leading-[0.88] text-paper md:text-[14vw]">
                {p >= 0.9 && (
                  <>
                    <span className="block">
                      <SplitText mode="char" variant="mask" duration={1.0} stagger={0.022}>
                        GX550
                      </SplitText>
                    </span>
                    <span className="block text-paper/40">
                      <SplitText mode="char" variant="mask" duration={1.0} stagger={0.022} delay={0.25}>
                        2026
                      </SplitText>
                    </span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Bottom-right: continue cue (appears after sequence ends) */}
            <motion.div
              initial={false}
              animate={{ opacity: p >= 0.95 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-6 right-6 z-20 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-paper/70 md:bottom-10 md:right-10"
            >
              <span>CONTINUE</span>
              <motion.span
                aria-hidden
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </motion.div>
          </>
        )}
      </FrameSequence>
    </section>
  );
}

function Stage({ active, label }: { active: boolean; label: string }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 12,
        filter: active ? "blur(0px)" : "blur(6px)",
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute bottom-10 left-6 z-20 font-mono text-[10px] tracking-[0.3em] text-paper/80 md:bottom-14 md:left-10"
    >
      {label}
    </motion.div>
  );
}
