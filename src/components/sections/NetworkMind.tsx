import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export function NetworkMind() {
  return (
    <section className="relative">
      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 05 · the mind</p>
            <h2 className="font-display text-4xl font-semibold md:text-6xl">
              The Network Mind <br />
              <span className="text-gradient-primary">Consensus & Protocol Rules</span>
            </h2>
          </>
        }
      >
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
          {/* Nodes verifying data animation */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const cx = 400 + Math.cos(angle) * 180;
              const cy = 250 + Math.sin(angle) * 130;
              return (
                <g key={i}>
                  <motion.line
                    x1="400" y1="250" x2={cx} y2={cy}
                    stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                  <motion.circle
                    cx={cx} cy={cy} r="10"
                    fill="hsl(var(--primary))"
                    animate={{ opacity: [0.3, 1, 0.3], r: [8, 12, 8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                </g>
              );
            })}
            <motion.circle
              cx="400" cy="250" r="40"
              fill="url(#coreGrad)"
              animate={{ r: [38, 46, 38] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <defs>
              <radialGradient id="coreGrad">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </radialGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <div className="max-w-2xl px-8 text-center">
              <p className="font-display text-xl leading-snug md:text-3xl">
                Consensus and protocol rules make the blockchain system <span className="text-gradient-primary">unchangeable</span> and independent — every node verifies, every block locks the truth.
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
