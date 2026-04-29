import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBoxesProps {
  className?: string;
  rows?: number;
  cols?: number;
}

/**
 * 3D perspective grid of glowing boxes — pure CSS, tilted with perspective.
 * Lightweight alternative to a real Three.js scene for hero backgrounds.
 */
export function HeroBoxes({ className, rows = 12, cols = 18 }: HeroBoxesProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
      style={{ perspective: "1000px" }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: "translate(-50%, -50%) rotateX(60deg) rotateZ(-10deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 56px)`,
            gridTemplateRows: `repeat(${rows}, 56px)`,
            gap: 2,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const distFromCenter =
              Math.abs(r - rows / 2) / (rows / 2) + Math.abs(c - cols / 2) / (cols / 2);
            const isAccent = (r * 7 + c * 3) % 17 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isAccent ? [0.25, 0.9, 0.25] : Math.max(0.04, 0.3 - distFromCenter * 0.15),
                }}
                transition={{
                  duration: isAccent ? 2 + (i % 5) * 0.4 : 0.8,
                  repeat: isAccent ? Infinity : 0,
                  delay: (i % 11) * 0.05,
                  ease: "easeInOut",
                }}
                className={cn(
                  "h-14 w-14 rounded-sm border",
                  isAccent
                    ? "border-primary/60 bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
                    : "border-white/5 bg-white/[0.02]",
                )}
              />
            );
          })}
        </div>
      </div>

      {/* fade overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}
