import { motion } from "framer-motion";
import { Pickaxe, Cpu, Coins } from "lucide-react";

export function CoinMining() {
  // Mock difficulty data
  const points = [10, 18, 14, 26, 22, 36, 30, 48, 42, 58, 54, 72];
  const max = Math.max(...points);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 09 · mining</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Coin Mining — from <span className="text-gradient-primary">transaction</span> to reward
          </h2>
          <p className="mt-4 text-muted-foreground">
            Miners bundle <span className="text-foreground font-semibold">transactions</span> into blocks, race to solve a
            cryptographic puzzle, and the first to crack it broadcasts proof to the network. The chain grows, the network secures itself,
            and the miner earns the <span className="text-gradient-primary font-semibold">block reward</span>.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { icon: Pickaxe, label: "Verify" },
              { icon: Cpu, label: "Solve" },
              { icon: Coins, label: "Reward" },
            ].map((s, i) => (
              <div key={i} className="gradient-border flex flex-col items-center gap-2 p-5 text-center">
                <s.icon className="h-6 w-6 text-primary" />
                <div className="font-mono text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Rotating loop arrow */}
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute -right-8 -top-8 h-32 w-32 text-primary/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          </motion.svg>

          {/* Difficulty trend */}
          <div className="gradient-border p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Mining difficulty trend</div>
              <div className="font-mono text-xs text-[hsl(var(--success))]">+612%</div>
            </div>
            <svg viewBox="0 0 240 100" className="h-40 w-full">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = points.map((v, i) => `${(i / (points.length - 1)) * 240},${100 - (v / max) * 90}`).join(" ");
                return (
                  <>
                    <motion.polygon
                      points={`0,100 ${pts} 240,100`}
                      fill="url(#fillGrad)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                    <motion.polyline
                      points={pts}
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </>
                );
              })()}
            </svg>
            <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
