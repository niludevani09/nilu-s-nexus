// Live prices edge function
// Crypto: Binance public API (no key required)
// Forex + Metals (XAU, XAG): exchangerate.host (free, no key)
import { corsHeaders } from "@supabase/supabase-js/cors";

const CRYPTO_SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT",
  "ADAUSDT", "DOGEUSDT", "DOTUSDT", "TRXUSDT", "MATICUSDT",
];

// Forex pairs we want to expose
const FOREX_PAIRS = [
  "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
  "USDJPY", "USDCHF", "USDCAD", "EURGBP",
];

// Metals priced in USD per ounce
const METALS = ["XAU", "XAG"]; // XAUUSD, XAGUSD

interface Ticker {
  symbol: string;
  price: number;
  changePct: number; // 24h % change
  type: "crypto" | "forex" | "metal";
}

async function fetchCrypto(): Promise<Ticker[]> {
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(CRYPTO_SYMBOLS))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance ${res.status}`);
  const data = await res.json() as Array<{ symbol: string; lastPrice: string; priceChangePercent: string }>;
  return data.map((d) => ({
    symbol: d.symbol,
    price: parseFloat(d.lastPrice),
    changePct: parseFloat(d.priceChangePercent),
    type: "crypto" as const,
  }));
}

// exchangerate.host: free, no key. Returns USD-base rates.
async function fetchForexAndMetals(): Promise<Ticker[]> {
  // Get USD-base rates for everything we need
  const symbols = ["EUR","GBP","AUD","NZD","JPY","CHF","CAD","XAU","XAG"];
  const latestUrl = `https://api.exchangerate.host/latest?base=USD&symbols=${symbols.join(",")}`;
  const yesterday = new Date(Date.now() - 24*60*60*1000).toISOString().slice(0,10);
  const histUrl = `https://api.exchangerate.host/${yesterday}?base=USD&symbols=${symbols.join(",")}`;

  const [latestRes, histRes] = await Promise.all([fetch(latestUrl), fetch(histUrl)]);
  if (!latestRes.ok || !histRes.ok) throw new Error("forex api error");
  const latest = await latestRes.json();
  const hist = await histRes.json();
  const r = latest.rates ?? {};
  const h = hist.rates ?? {};

  const usdPerUnit = (sym: string, rates: Record<string, number>) => {
    // rate is "1 USD = X SYM" → 1 SYM = 1/X USD
    const v = rates[sym];
    return v ? 1 / v : null;
  };

  const out: Ticker[] = [];

  // Forex pairs
  for (const pair of FOREX_PAIRS) {
    const base = pair.slice(0, 3);
    const quote = pair.slice(3, 6);
    let p: number | null = null;
    let pPrev: number | null = null;
    if (base === "USD") {
      p = r[quote] ?? null;
      pPrev = h[quote] ?? null;
    } else if (quote === "USD") {
      p = r[base] ? 1 / r[base] : null;
      pPrev = h[base] ? 1 / h[base] : null;
    } else {
      // cross: BASE/QUOTE = (USD/QUOTE) / (USD/BASE)
      if (r[base] && r[quote]) p = r[quote] / r[base];
      if (h[base] && h[quote]) pPrev = h[quote] / h[base];
    }
    if (p && pPrev) {
      out.push({
        symbol: pair,
        price: p,
        changePct: ((p - pPrev) / pPrev) * 100,
        type: "forex",
      });
    }
  }

  // Metals (XAUUSD, XAGUSD) — price = USD per ounce
  for (const m of METALS) {
    const p = usdPerUnit(m, r);
    const pPrev = usdPerUnit(m, h);
    if (p && pPrev) {
      out.push({
        symbol: `${m}USD`,
        price: p,
        changePct: ((p - pPrev) / pPrev) * 100,
        type: "metal",
      });
    }
  }

  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const [crypto, forex] = await Promise.all([
      fetchCrypto().catch((e) => { console.error("crypto err", e); return [] as Ticker[]; }),
      fetchForexAndMetals().catch((e) => { console.error("forex err", e); return [] as Ticker[]; }),
    ]);
    const tickers = [...crypto, ...forex];
    return new Response(
      JSON.stringify({ tickers, updatedAt: new Date().toISOString() }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=15",
        },
      },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return new Response(JSON.stringify({ error: msg, tickers: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
