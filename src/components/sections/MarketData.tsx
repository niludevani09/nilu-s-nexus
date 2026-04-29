import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";
import { useLivePrices, type Ticker } from "@/hooks/use-live-prices";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";

function PriceCard({ t }: { t: Ticker }) {
  const up = t.changePct >= 0;
  const decimals = t.type === "crypto"
    ? (t.price > 100 ? 2 : t.price > 1 ? 4 : 6)
    : t.type === "metal" ? 2 : 4;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="gradient-border group relative overflow-hidden p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.type}
          </span>
        </div>
        <div className={up ? "flex items-center gap-1 rounded-full bg-[hsl(var(--success))]/10 px-2 py-0.5 text-xs text-[hsl(var(--success))]" : "flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive"}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {t.changePct.toFixed(2)}%
        </div>
      </div>
      <div className="mt-3 font-display text-xl font-semibold tracking-tight">
        {t.symbol}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={t.price}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-1 font-mono text-2xl font-semibold text-gradient-primary"
        >
          ${t.price.toLocaleString(undefined, { maximumFractionDigits: decimals })}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={up ? "h-full bg-[hsl(var(--success))]" : "h-full bg-destructive"}
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(Math.abs(t.changePct) * 8, 100)}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

export function MarketData() {
  const { tickers, loading, updatedAt } = useLivePrices(15000);
  const crypto = tickers.filter((t) => t.type === "crypto");
  const forex = tickers.filter((t) => t.type !== "crypto");

  return (
    <section id="market" className="relative py-24 md:py-32">
      <TheInfiniteGrid cellSize={64} />
      <div className="container relative z-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 02 · live</p>
            <h2 className="font-display text-4xl font-semibold md:text-6xl">
              Live <span className="text-gradient-primary">market signals</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real prices streamed from public exchanges. Crypto via Binance, forex & metals via open FX feeds. Auto-refresh every 15s.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-glass px-4 py-2 font-mono text-xs">
            <Activity className="h-3 w-3 animate-pulse text-primary" />
            <span className="text-muted-foreground">
              {loading && !updatedAt ? "connecting…" : updatedAt ? `updated ${new Date(updatedAt).toLocaleTimeString()}` : "offline"}
            </span>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">// crypto</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {crypto.length === 0 && Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl border border-border bg-muted/30" />
            ))}
            {crypto.map((t) => <PriceCard key={t.symbol} t={t} />)}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">// forex & metals</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {forex.length === 0 && Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl border border-border bg-muted/30" />
            ))}
            {forex.map((t) => <PriceCard key={t.symbol} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
