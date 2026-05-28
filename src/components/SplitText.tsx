"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Mode = "char" | "word" | "line";

interface SplitTextProps {
  children: string;
  mode?: Mode;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  /** Delay in seconds before stagger starts */
  delay?: number;
  /** Per-item stagger seconds */
  stagger?: number;
  /** Duration per item */
  duration?: number;
  /** Animation flavor */
  variant?: "rise" | "blur" | "mask" | "skew";
  /** Trigger once on view (default) or every time */
  once?: boolean;
}

const variantBuilder = (variant: NonNullable<SplitTextProps["variant"]>): Variants => {
  switch (variant) {
    case "blur":
      return {
        hidden: { opacity: 0, y: "40%", filter: "blur(14px)" },
        show: { opacity: 1, y: "0%", filter: "blur(0px)" },
      };
    case "mask":
      return {
        hidden: { y: "115%" },
        show: { y: "0%" },
      };
    case "skew":
      return {
        hidden: { opacity: 0, y: "60%", skewY: 6 },
        show: { opacity: 1, y: "0%", skewY: 0 },
      };
    case "rise":
    default:
      return {
        hidden: { opacity: 0, y: "60%" },
        show: { opacity: 1, y: "0%" },
      };
  }
};

export function SplitText({
  children,
  mode = "char",
  className,
  style,
  as = "span",
  delay = 0,
  stagger = 0.022,
  duration = 0.9,
  variant = "rise",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const tokens =
    mode === "word"
      ? children.split(/(\s+)/)
      : mode === "line"
      ? children.split("\n")
      : Array.from(children);

  const itemVariants = variantBuilder(variant);
  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref as React.Ref<HTMLSpanElement>} className={cn("inline-block align-baseline", className)} style={style}>
      <motion.span
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline-block"
        aria-label={children}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) {
            // Whitespace tokens must NOT be inline-block — that collapses the
            // space. `white-space: pre` preserves both single spaces and \n.
            return (
              <span key={i} aria-hidden style={{ whiteSpace: "pre" }}>
                {tok}
              </span>
            );
          }
          return (
            <span
              key={i}
              aria-hidden
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.08em", paddingTop: "0.02em" }}
            >
              <motion.span
                className="inline-block will-change-transform"
                variants={itemVariants}
                transition={{
                  duration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {tok}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
