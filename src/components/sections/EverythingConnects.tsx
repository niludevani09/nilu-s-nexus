import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight";

export function EverythingConnects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <Spotlight className="left-0 top-0 md:top-10" fill="hsl(187 100% 50%)" />
      {/* floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-secondary"
            style={{ left: `${(i * 71) % 100}%`, top: `${(i * 43) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <motion.div style={{ y }} className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 06 · convergence</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Where everything <span className="text-gradient-primary">connects.</span>
          </h2>
        </div>

        <div className="gradient-border group mx-auto mt-12 max-w-4xl p-8 transition-shadow hover:shadow-glow md:p-12">
          <p className="text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            Tomorrow's digital security takes shape here. This system doesn't just protect data — it isolates threats before they even emerge.
            Self-healing networks, zero-trust meshes, autonomous defense agents and cryptographic proofs all converge into one living perimeter.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
