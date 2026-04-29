import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrbitingSkillsProps {
  centerLabel?: string;
  className?: string;
  items: Array<{ label: string; icon?: React.ReactNode }>;
}

/**
 * 3 orbiting rings with icons rotating around a central glowing core.
 * Pure CSS/Framer for performance.
 */
export function OrbitingSkills({ centerLabel = "BLOCKCHAIN", className, items }: OrbitingSkillsProps) {
  // Distribute items across 3 rings
  const rings = [
    { radius: 90, count: 3, duration: 18, reverse: false },
    { radius: 150, count: 4, duration: 26, reverse: true },
    { radius: 220, count: 5, duration: 34, reverse: false },
  ];

  let idx = 0;
  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center",
        className,
      )}
      aria-hidden
    >
      {/* glowing center */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-aurora shadow-glow"
      >
        <div className="absolute inset-[3px] rounded-full bg-card" />
        <span className="relative font-mono text-[10px] font-bold tracking-widest text-gradient-primary">
          {centerLabel}
        </span>
      </motion.div>

      {/* rings */}
      {rings.map((ring, ri) => {
        const ringItems = items.slice(idx, idx + ring.count);
        idx += ring.count;
        return (
          <React.Fragment key={ri}>
            {/* ring outline */}
            <div
              className="absolute rounded-full border border-primary/15"
              style={{ width: ring.radius * 2, height: ring.radius * 2 }}
            />
            <motion.div
              className="absolute"
              style={{ width: ring.radius * 2, height: ring.radius * 2 }}
              animate={{ rotate: ring.reverse ? -360 : 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              {ringItems.map((it, i) => {
                const angle = (i / ring.count) * 2 * Math.PI;
                const x = Math.cos(angle) * ring.radius + ring.radius;
                const y = Math.sin(angle) * ring.radius + ring.radius;
                return (
                  <motion.div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                    animate={{ rotate: ring.reverse ? 360 : -360 }}
                    transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-glass text-primary shadow-glow backdrop-blur-md">
                      {it.icon ?? <span className="text-[10px] font-bold">{it.label.slice(0, 2)}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
