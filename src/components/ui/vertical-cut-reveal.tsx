import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "characters" | "words";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  transition?: object;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Vertical cut reveal — each character/word slides up into view from below a clipping mask.
 */
export function VerticalCutReveal({
  children,
  splitBy = "characters",
  staggerDuration = 0.04,
  staggerFrom = "first",
  reverse = false,
  containerClassName,
  wordLevelClassName,
  elementLevelClassName,
  transition = { type: "spring", stiffness: 200, damping: 22 },
  as = "span",
}: VerticalCutRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = children.split(" ");

  const getDelay = (i: number, total: number) => {
    if (staggerFrom === "last") return (total - 1 - i) * staggerDuration;
    if (staggerFrom === "center") return Math.abs(i - (total - 1) / 2) * staggerDuration;
    return i * staggerDuration;
  };

  const Tag = as as any;

  return (
    <Tag ref={ref as any} className={cn("inline-block", containerClassName)}>
      {words.map((word, wi) => {
        const items = splitBy === "characters" ? word.split("") : [word];
        return (
          <span key={wi} className={cn("inline-flex whitespace-nowrap", wordLevelClassName)}>
            {items.map((char, ci) => {
              const globalIndex =
                splitBy === "characters"
                  ? words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + ci
                  : wi;
              const total =
                splitBy === "characters"
                  ? words.reduce((acc, w) => acc + w.length, 0)
                  : words.length;
              return (
                <span key={ci} className="relative inline-block overflow-hidden align-bottom leading-[1.05]">
                  <motion.span
                    className={cn("inline-block", elementLevelClassName)}
                    initial={{ y: reverse ? "-100%" : "100%" }}
                    animate={inView ? { y: "0%" } : undefined}
                    transition={{ ...transition, delay: getDelay(globalIndex, total) }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              );
            })}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}
