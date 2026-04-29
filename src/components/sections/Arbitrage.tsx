import { motion } from "framer-motion";
import { Bot, TrendingUp } from "lucide-react";

export function Arbitrage() {
  // simulated divergent price lines
  const a = [50, 52, 49, 54, 56, 53, 58, 60, 57, 62, 65, 63, 68, 66, 70];
  const b = [50, 51, 50, 53, 54, 55, 56, 56, 58, 60, 60, 62, 64, 65, 67];
  const max = Math.max(...a, ...b);

  const path = (arr: number[]) =>
    arr.map((v, i) => `${(i / (arr.length - 1)) * 300},${120 - (v / max) * 100}`).join(" ");

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.1),transparent_60%)]" />
      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-secondary">// section 10 · alpha</p>
          <h2 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
            ARBI<span className="text-gradient-primary">TRAGE</span>
          </h2>
          <blockquote className="gradient-border mt-8 p-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            "While markets move at lightning speed, our algorithms move <span className="text-gradient-primary font-semibold">faster</span>.
            The robot monitors cross-exchange price differences and executes precision trades — no emotion, only logic."
          </blockquote>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-glass px-4 py-2 font-mono text-xs">
              <Bot className="h-3 w-3 text-primary" /> Autonomous
            </div>
            <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-glass px-4 py-2 font-mono text-xs">
              <TrendingUp className="h-3 w-3 text-secondary" /> +0.42% / cycle
            </div>
          </div>
        </div>

        <div className="gradient-border p-6">
          <div className="mb-4 flex items-center justify-between font-mono text-xs">
            <span className="text-muted-foreground">Cross-exchange spread</span>
            <span className="text-primary">live</span>
          </div>
          <svg viewBox="0 0 300 130" className="h-56 w-full">
            <motion.polyline
              points={path(a)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            <motion.polyline
              points={path(b)}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </svg>
          <div className="mt-3 flex justify-between font-mono text-[10px]">
            <span className="flex items-center gap-1 text-primary"><span className="h-2 w-2 rounded-full bg-primary"/> Exchange A</span>
            <span className="flex items-center gap-1 text-secondary"><span className="h-2 w-2 rounded-full bg-secondary"/> Exchange B</span>
          </div>
        </div>
      </div>
    </section>
  );
}
