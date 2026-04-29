import { motion } from "framer-motion";
import { ArrowRight, FileCode2, CheckCircle2, Lock } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";

export function SmartContracts() {
  const steps = [
    { icon: FileCode2, label: "Contract deployed" },
    { icon: ArrowRight, label: "Conditions met" },
    { icon: Lock, label: "Auto-executed" },
    { icon: CheckCircle2, label: "Settled on-chain" },
  ];

  return (
    <section id="smart-contracts" className="relative py-24 md:py-32">
      <div className="container relative z-10">
        <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-primary">// section 07 · execution</p>
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight md:text-5xl lg:text-7xl">
          THE SYSTEM'S <span className="text-gradient-primary">HEARTBEAT</span>
        </h2>
        <p className="mt-2 text-center font-mono text-sm uppercase tracking-widest text-muted-foreground md:text-base">
          # Smart Contract
        </p>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Smart Contracts are self-executing digital agreements built on blockchain technology. No middlemen,
              no paperwork, no waiting — only deterministic code that runs the moment its conditions are met.
              They're the invisible engine behind DeFi, NFTs, DAOs and every autonomous economy emerging now.
            </p>

            {/* Flow */}
            <div className="mt-10 space-y-3">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="gradient-border flex items-center gap-4 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aurora">
                    <div className="flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full bg-card">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <span className="font-mono text-sm">{s.label}</span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    step 0{i + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-primary/20 bg-glass shadow-elegant">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
