import { motion } from "framer-motion";
import { Link as LinkIcon, Globe, Network, Atom, Bot, Shield } from "lucide-react";

const TECHS = [
  {
    icon: LinkIcon,
    title: "Blockchain",
    desc: "Blockchain technology is considered non-hackable because data is stored inside connected blocks, each cryptographically chained to the last — tampering with one breaks them all.",
  },
  {
    icon: Globe,
    title: "Metaverse",
    desc: "The metaverse is a powerful technology that allows people to experience the world digitally — persistent 3D spaces where work, play and identity converge.",
  },
  {
    icon: Network,
    title: "Web3",
    desc: "Web3 is the decentralized version of the internet where websites and applications are not controlled by a single company — users own their data, identity and value.",
  },
  {
    icon: Atom,
    title: "Quantum Computing",
    desc: "Quantum Computing uses Qubits, which can exist in multiple states at once — unlocking computation far beyond classical limits for crypto, simulation and AI.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "AI Agents are autonomous systems that can make decisions and complete tasks without constant human input — researching, transacting, and acting on your behalf.",
  },
  {
    icon: Shield,
    title: "Zero-Knowledge Proofs",
    desc: "ZK-proofs allow verification without revealing the underlying data — proving you know a secret, own an asset, or meet a condition, with full privacy.",
  },
];

export function UpcomingTech() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative z-10">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 11 · 2026 stack</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Upcoming <span className="text-gradient-primary">technologies</span> shaping tomorrow.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TECHS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="gradient-border group relative overflow-hidden p-6 transition-shadow hover:shadow-glow"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-aurora">
                <div className="flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-[calc(0.75rem-2px)] bg-card">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                / 0{i + 1} · 2026
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
