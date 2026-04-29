import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AuroraButton } from "@/components/ui/aurora-button";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { MarketData } from "@/components/sections/MarketData";
import { DecentralizedMessage } from "@/components/sections/DecentralizedMessage";
import { NetworkArchitecture } from "@/components/sections/NetworkArchitecture";
import { NetworkMind } from "@/components/sections/NetworkMind";
import { EverythingConnects } from "@/components/sections/EverythingConnects";
import { SmartContracts } from "@/components/sections/SmartContracts";
import { NFTs } from "@/components/sections/NFTs";
import { CoinMining } from "@/components/sections/CoinMining";
import { Arbitrage } from "@/components/sections/Arbitrage";
import { UpcomingTech } from "@/components/sections/UpcomingTech";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CustomCursor />

      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <a href="#hero" className="group inline-flex items-center gap-2">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-aurora">
              <span className="absolute inset-[2px] rounded-full bg-background" />
              <Sparkles className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Nilu<span className="text-gradient-primary">Network</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {[
              { l: "Markets", h: "market" },
              { l: "Network", h: "smart-contracts" },
              { l: "Tech", h: "smart-contracts" },
            ].map((it) => (
              <a key={it.l} href={`#${it.h}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {it.l}
              </a>
            ))}
          </nav>
          <AuroraButton onClick={() => document.getElementById("market")?.scrollIntoView({ behavior: "smooth" })}>
            Launch
          </AuroraButton>
        </div>
      </header>

      <main>
        <Hero />
        <MarketData />
        <DecentralizedMessage />
        <NetworkArchitecture />
        <NetworkMind />
        <EverythingConnects />
        <SmartContracts />
        <NFTs />
        <CoinMining />
        <Arbitrage />
        <UpcomingTech />
      </main>

      <Footer />

      {/* page-level subtle vignette */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_60%,hsl(var(--background))_100%)]"
      />
    </div>
  );
};

export default Index;
