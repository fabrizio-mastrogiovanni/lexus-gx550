"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#@%&*";

interface ScramblerProps {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "view" | "hover" | "mount";
}

export function Scrambler({
  text,
  className,
  duration = 1200,
  trigger = "view",
}: ScramblerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [output, setOutput] = useState(text);
  const rafRef = useRef<number | null>(null);

  const run = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOutput(next);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") run();
    if (trigger === "view" && inView) run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span
      ref={ref}
      className={cn("inline-block font-mono", className)}
      onMouseEnter={trigger === "hover" ? run : undefined}
      aria-label={text}
    >
      {output}
    </span>
  );
}
