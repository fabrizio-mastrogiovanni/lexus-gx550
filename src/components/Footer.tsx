"use client";

import { Marquee } from "@/components/Marquee";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Marquee
        items={["LEXUS · GX550", "2026 · OVERTRAIL", "BUILT BY WEBLOVE", "DEMO REEL"]}
        speed={60}
        className="border-y border-paper/15 py-8"
        itemClassName="text-paper"
      />
      <div className="grid grid-cols-12 gap-6 px-6 py-16 text-[11px] tracking-[0.3em] md:px-10">
        <div className="col-span-6 md:col-span-3">
          <div className="text-paper/40">ORIGIN</div>
          <div className="mt-2">Weblove · 3D web design</div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-paper/40">SUBJECT</div>
          <div className="mt-2">Lexus GX550 · 2026</div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-paper/40">STACK</div>
          <div className="mt-2">Next 14 · Framer · Lenis</div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-paper/40">FRAMES</div>
          <div className="mt-2">121 · 4K · JPEG</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-paper/15 px-6 py-6 font-mono text-[10px] tracking-[0.3em] text-paper/40 md:px-10">
        <span>© 2026 — DEMO / EDUCATIONAL USE</span>
        <span>v0.1</span>
      </div>
    </footer>
  );
}
