import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Ticker {
  symbol: string;
  price: number;
  changePct: number;
  type: "crypto" | "forex" | "metal";
}

interface Response {
  tickers: Ticker[];
  updatedAt: string;
}

/**
 * Polls the live-prices edge function on an interval.
 * Crypto from Binance, forex+metals from exchangerate.host.
 */
export function useLivePrices(intervalMs = 15000) {
  const [data, setData] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data: res, error } = await supabase.functions.invoke<Response>("live-prices");
        if (error) throw error;
        if (!cancelled && res?.tickers) {
          setData(res.tickers);
          setUpdatedAt(res.updatedAt);
        }
      } catch (e) {
        console.error("live-prices error", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    timerRef.current = setInterval(load, intervalMs);
    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs]);

  return { tickers: data, loading, updatedAt };
}
