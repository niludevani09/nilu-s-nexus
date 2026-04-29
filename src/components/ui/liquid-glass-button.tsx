import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidGlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "glass" | "metal";
}

export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant = "glass", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold tracking-wide text-foreground",
          variant === "glass"
            ? "bg-glass border border-white/15 shadow-elegant"
            : "bg-metal border border-white/10 shadow-elegant",
          className,
        )}
        {...props}
      >
        {/* highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-[linear-gradient(180deg,hsl(0_0%_100%/0.18),transparent)]"
        />
        {/* moving liquid sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-110%] bg-[linear-gradient(110deg,transparent_30%,hsl(0_0%_100%/0.25)_50%,transparent_70%)] transition-transform duration-700 ease-smooth group-hover:translate-x-[110%]"
        />
        {/* bottom shadow line */}
        <span aria-hidden className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-white/10" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
LiquidGlassButton.displayName = "LiquidGlassButton";
