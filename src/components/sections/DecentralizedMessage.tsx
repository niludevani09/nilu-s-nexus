import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { motion } from "framer-motion";

export function DecentralizedMessage() {
  return (
    <section className="relative py-32 md:py-40">
      {/* particle backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%` }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.6, 1] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />

      <div className="container relative z-10 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">// section 03 · manifesto</p>
        <h2 className="mx-auto max-w-5xl font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
          <VerticalCutReveal as="span" containerClassName="block" splitBy="words" staggerDuration={0.04}>
            entering decentralized civilization
          </VerticalCutReveal>
          <span className="block text-gradient-primary">
            <VerticalCutReveal as="span" splitBy="words" staggerDuration={0.05}>
              where control ends and code begins
            </VerticalCutReveal>
          </span>
          <VerticalCutReveal as="span" containerClassName="block text-2xl md:text-3xl text-muted-foreground font-normal mt-6" splitBy="words" staggerDuration={0.04}>
            not just crypto — this is the new network.
          </VerticalCutReveal>
        </h2>
      </div>
    </section>
  );
}
