import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteGridProps {
  className?: string;
  cellSize?: number;
}

/**
 * Infinite animated grid background with cursor reveal.
 * Two diagonally-drifting grid layers + a radial mask that follows the cursor.
 */
export function TheInfiniteGrid({ className, cellSize = 56 }: InfiniteGridProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const gridStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(hsl(var(--foreground) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
    backgroundSize: `${cellSize}px ${cellSize}px`,
  };
  const accentGridStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(hsl(var(--primary) / 0.55) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-glow) / 0.55) 1px, transparent 1px)",
    backgroundSize: `${cellSize}px ${cellSize}px`,
  };

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* base drifting grid */}
      <motion.div
        className="absolute -inset-32"
        style={gridStyle}
        animate={{ backgroundPosition: ["0px 0px", `${cellSize}px ${cellSize}px`] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />
      {/* accent reveal grid masked by cursor */}
      <motion.div
        className="absolute -inset-32"
        style={{
          ...accentGridStyle,
          WebkitMaskImage: "radial-gradient(280px circle at var(--mx) var(--my), black 0%, transparent 70%)",
          maskImage: "radial-gradient(280px circle at var(--mx) var(--my), black 0%, transparent 70%)",
          // @ts-expect-error css vars
          "--mx": "50%",
          "--my": "50%",
        }}
        animate={{ backgroundPosition: [`0px 0px`, `-${cellSize}px -${cellSize}px`] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        ref={(el) => {
          if (!el) return;
          sx.on("change", (v) => el.style.setProperty("--mx", `${v * 100}%`));
          sy.on("change", (v) => el.style.setProperty("--my", `${v * 100}%`));
        }}
      />
      {/* fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_85%)]" />
    </div>
  );
}
