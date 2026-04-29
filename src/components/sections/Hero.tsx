import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { HeroBoxes } from "@/components/ui/3d-hero-section-boxes";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { AuroraButton } from "@/components/ui/aurora-button";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { useLivePrices } from "@/hooks/use-live-prices";

export function Hero() {
  const { tickers } = useLivePrices(20000);
  const cryptoTicker = tickers.filter((t) => t.type === "crypto").slice(0, 8);
  // Duplicate for seamless marquee
  const tickerLoop = [...cryptoTicker, ...cryptoTicker];

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      <HeroBoxes />

      <div className="container relative z-10 grid items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-glass px-4 py-1.5 text-xs"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono uppercase tracking-widest text-muted-foreground">
            Trading · AI · Crypto · Live 2026
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <VerticalCutReveal as="span" containerClassName="block" splitBy="words" staggerDuration={0.04}>
            where advance autopilot systems
          </VerticalCutReveal>
          <span className="block text-gradient-primary">
            <VerticalCutReveal as="span" splitBy="words" staggerDuration={0.05} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
              sync you with real-time markets
            </VerticalCutReveal>
          </span>
          <VerticalCutReveal as="span" containerClassName="block" splitBy="words" staggerDuration={0.04}>
            and pro traders.
          </VerticalCutReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Trading, AI agents and crypto rails — fused into a single, autonomous engine for the next decade of markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <AuroraButton onClick={() => document.getElementById("market")?.scrollIntoView({ behavior: "smooth" })}>
            Launch live dashboard <ArrowUpRight className="h-4 w-4" />
          </AuroraButton>
          <LiquidGlassButton onClick={() => document.getElementById("smart-contracts")?.scrollIntoView({ behavior: "smooth" })}>
            How it works
          </LiquidGlassButton>
        </motion.div>
      </div>

      {/* Live ticker marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-y border-primary/20 bg-background/70 backdrop-blur-md">
        <div className="overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap py-3"
            style={{ animation: "ticker-scroll 50s linear infinite" }}
          >
            {tickerLoop.length === 0 && (
              <div className="px-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Connecting to live markets…
              </div>
            )}
            {tickerLoop.map((t, i) => {
              const up = t.changePct >= 0;
              return (
                <div key={i} className="flex items-center gap-2 px-3 font-mono text-xs">
                  <span className="font-semibold text-foreground">{t.symbol.replace("USDT", "/USDT")}</span>
                  <span className="text-muted-foreground">${t.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  <span className={up ? "flex items-center gap-0.5 text-[hsl(var(--success))]" : "flex items-center gap-0.5 text-destructive"}>
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {t.changePct.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
