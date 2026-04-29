import { motion } from "framer-motion";

const items = [
  { name: "Aarav S.", role: "Founder, Lumen Labs", quote: "Working with Nilu felt like plugging my brand into the future." },
  { name: "Priya K.", role: "Creative Director", quote: "Every frame, every word — intentional. Nilu is a true storyteller." },
  { name: "Rohan M.", role: "Indie Musician", quote: "My audience tripled. The way Nilu shapes a narrative is unreal." },
  { name: "Saanvi P.", role: "Wellness Coach", quote: "Hatke energy, dhasu execution. 10/10." },
  { name: "Kabir D.", role: "Filmmaker", quote: "She turned my chaos into a cinematic identity." },
  { name: "Mira J.", role: "Product Lead", quote: "A rare blend of strategy, soul, and aesthetics." },
];

export function TestimonialsMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <article
            key={i}
            className="bg-glass border border-white/10 rounded-2xl p-6 w-[340px] shrink-0 shadow-elegant"
          >
            <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-aurora" />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
}
