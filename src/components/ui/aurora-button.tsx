import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AuroraButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "outline";
  glowClassName?: string;
}

export const AuroraButton = React.forwardRef<HTMLButtonElement, AuroraButtonProps>(
  ({ className, variant = "default", glowClassName, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-colors",
          variant === "default" ? "text-primary-foreground" : "text-foreground",
          className,
        )}
        {...props}
      >
        {/* aurora ring */}
        <span
          aria-hidden
          className={cn(
            "absolute -inset-[2px] rounded-full opacity-90 blur-md transition-opacity duration-500 group-hover:opacity-100",
            "bg-aurora",
            glowClassName,
          )}
        />
        {/* inner surface */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-[2px] rounded-full",
            variant === "default" ? "bg-aurora" : "bg-background",
          )}
        />
        {/* sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(110deg,transparent_25%,hsl(0_0%_100%/0.35)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
AuroraButton.displayName = "AuroraButton";
