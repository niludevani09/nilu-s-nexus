import { Github, Twitter, Linkedin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-primary/20 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-aurora" />
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-aurora" />
              <span className="font-display text-lg font-semibold">Nilu<span className="text-gradient-primary">Network</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Trading, AI and crypto fused into one autonomous engine for the next decade of markets. Built in 2026.
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Product</div>
            <ul className="space-y-2 text-sm">
              {["Live Markets", "Smart Contracts", "NFTs", "Arbitrage Bot"].map((l) => (
                <li key={l}><a href="#" className="text-foreground/80 transition-colors hover:text-primary">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Company</div>
            <ul className="space-y-2 text-sm">
              {["About", "Manifesto", "Security", "Contact"].map((l) => (
                <li key={l}><a href="#" className="text-foreground/80 transition-colors hover:text-primary">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} NiluNetwork — decentralized by design.
          </p>
          <div className="flex items-center gap-2">
            {[Twitter, Linkedin, Github, Send].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-glass text-muted-foreground transition-all hover:text-primary hover:shadow-glow">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
