"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  reverse?: boolean;
  separator?: string;
}

export function Marquee({
  items,
  className,
  itemClassName,
  speed = 40,
  reverse = false,
  separator = "·",
}: MarqueeProps) {
  const loop = [...items, ...items, ...items];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-12 text-[10vw] leading-none tracking-tightest",
              itemClassName,
            )}
          >
            {item}
            <span className="text-rule">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
