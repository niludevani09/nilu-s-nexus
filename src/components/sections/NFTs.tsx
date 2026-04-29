import { motion } from "framer-motion";

const NFTS = [
  { title: "Genesis Drop", id: "#0001", img: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=600&q=80" },
  { title: "Quantum Echo", id: "#0042", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80" },
  { title: "Neon Bloom", id: "#0108", img: "https://images.unsplash.com/photo-1633101585272-9e0b0c3d9bdc?w=600&q=80" },
  { title: "Cyber Mirage", id: "#0256", img: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=600&q=80" },
];

export function NFTs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative z-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">// section 08 · ownership</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Non-Fungible Tokens <span className="text-gradient-primary">— digital ownership</span> on blockchain
          </h2>
          <p className="mt-4 text-muted-foreground">
            Non-Fungible Tokens, or NFTs, are unique digital assets. Each one is verifiably one-of-a-kind, owned by a single wallet,
            and tradable across global marketplaces — art, identity, music, in-game items, even real-world rights, all tokenized.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {NFTS.map((nft, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 6, rotateY: -4 }}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-glass shadow-elegant"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={nft.img}
                  alt={nft.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
                <div className="font-display text-sm font-semibold">{nft.title}</div>
                <div className="font-mono text-xs text-muted-foreground">{nft.id}</div>
              </div>
              <div className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
                NFT
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
