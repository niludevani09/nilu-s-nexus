import { Box, Cpu, Database, Globe, Link as LinkIcon, Network, Shield, Server, Zap } from "lucide-react";
import { OrbitingSkills } from "@/components/ui/orbiting-skills";

export function NetworkArchitecture() {
  const nodes = [
    { label: "P2P", icon: <Network className="h-5 w-5" /> },
    { label: "PoW", icon: <Cpu className="h-5 w-5" /> },
    { label: "PoS", icon: <Zap className="h-5 w-5" /> },
    { label: "Hash", icon: <Shield className="h-5 w-5" /> },
    { label: "Block", icon: <Box className="h-5 w-5" /> },
    { label: "Node", icon: <Server className="h-5 w-5" /> },
    { label: "Data", icon: <Database className="h-5 w-5" /> },
    { label: "Web3", icon: <Globe className="h-5 w-5" /> },
    { label: "Chain", icon: <LinkIcon className="h-5 w-5" /> },
    { label: "Sec", icon: <Shield className="h-5 w-5" /> },
    { label: "API", icon: <Network className="h-5 w-5" /> },
    { label: "Sync", icon: <Zap className="h-5 w-5" /> },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 04 · architecture</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Crypto network <span className="text-gradient-primary">architecture</span> built on protocols & consensus
          </h2>
          <div className="gradient-border mt-8 p-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              A crypto network is a system where many independent computers work together to maintain the blockchain.
              No central server, no single owner — just a global mesh of nodes verifying every transaction in lockstep.
              Protocols define the rules, consensus enforces the truth, and cryptography keeps it all unbreakable.
            </p>
          </div>
        </div>
        <div className="relative">
          <OrbitingSkills centerLabel="NETWORK" items={nodes} />
        </div>
      </div>
    </section>
  );
}
