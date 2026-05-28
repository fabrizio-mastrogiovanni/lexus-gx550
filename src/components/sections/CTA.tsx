"use client";

import { SplitText } from "@/components/SplitText";
import { Marquee } from "@/components/Marquee";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="cta" className="relative bg-paper">
      <div className="border-y border-rule py-6">
        <Marquee
          items={["RESERVE 2026", "OVERTRAIL EDITION", "AVAILABLE Q1", "PRECISION DELIVERED"]}
          speed={45}
          reverse
          itemClassName="font-bold"
        />
      </div>

      <div className="grid min-h-[80vh] grid-cols-12 gap-6 px-6 py-32 md:px-10 md:py-48">
        <div className="col-span-12 md:col-span-7">
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted">
            05 · NEXT
          </div>
          <h2 className="display mt-6 text-[14vw] leading-[0.88] md:text-[9vw]">
            <SplitText mode="char" variant="mask" duration={1.0} stagger={0.022}>
              Step in.
            </SplitText>
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-[1.5] tracking-tight text-muted">
            <SplitText mode="word" variant="rise" duration={0.8} stagger={0.04}>
              Reservations open in the first wave. Configure yours, lock the build sheet, and we’ll keep the rest quiet.
            </SplitText>
          </p>
        </div>
        <div className="col-span-12 flex items-end justify-end md:col-span-5">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-10 py-6 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink hover:ring-1 hover:ring-ink"
          >
            <span className="font-bold tracking-tight">Reserve GX550</span>
            <motion.span
              aria-hidden
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
