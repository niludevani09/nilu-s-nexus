import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Github, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { AuroraButton } from "@/components/ui/aurora-button";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/splite";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { CursorGlow } from "@/components/CursorGlow";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { ContactForm } from "@/components/ContactForm";
import { ServicesGrid } from "@/components/ServicesGrid";
import niluPortrait from "@/assets/nilu-portrait.jpg";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CursorGlow />

      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="group inline-flex items-center gap-2">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-aurora">
              <span className="absolute inset-[2px] rounded-full bg-background" />
              <Sparkles className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">connect<span className="text-gradient-aurora">withnilu</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["About", "Work", "Voices", "Connect"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuroraButton className="hidden md:inline-flex" onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}>
              Let's talk
            </AuroraButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center pt-24">
        <TheInfiniteGrid />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="hsl(280 95% 65%)" />

        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-glass px-4 py-1.5 text-xs"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="font-mono uppercase tracking-widest text-muted-foreground">Open for 2026 collabs</span>
            </motion.div>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
              <VerticalCutReveal as="span" containerClassName="block" splitBy="characters" staggerDuration={0.025}>
                Connect with
              </VerticalCutReveal>
              <span className="block text-gradient-aurora">
                <VerticalCutReveal as="span" splitBy="characters" staggerDuration={0.04} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
                  Nilu
                </VerticalCutReveal>
              </span>
              <VerticalCutReveal as="span" containerClassName="block text-2xl md:text-3xl text-muted-foreground font-normal mt-4" splitBy="words" staggerDuration={0.06}>
                Storyteller. Brand architect. Future-native.
              </VerticalCutReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Building cinematic personal brands and content universes that don't just exist on the internet — they shape it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <AuroraButton onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}>
                Start a project <ArrowRight className="h-4 w-4" />
              </AuroraButton>
              <LiquidGlassButton onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
                See the work
              </LiquidGlassButton>
            </motion.div>
          </div>

          {/* Spline + portrait stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full max-w-xl mx-auto"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-aurora opacity-30 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-glass shadow-elegant">
              <img
                src={niluPortrait}
                alt="Portrait of Nilu, futurist creator and brand architect"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0">
                <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">v.2026</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">live · interactive</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          ↓ scroll the universe
        </motion.div>
      </section>

      {/* ABOUT - Container Scroll */}
      <section id="about" className="relative">
        <ContainerScroll
          titleComponent={
            <>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">// about</p>
              <h2 className="font-display text-4xl font-semibold md:text-6xl">
                Not just a creator. <br />
                <span className="text-gradient-aurora">A whole universe.</span>
              </h2>
            </>
          }
        >
          <div className="relative h-full w-full bg-aurora">
            <div className="absolute inset-0 grid place-items-center bg-background/30 backdrop-blur-sm">
              <div className="max-w-2xl px-8 text-center">
                <p className="font-display text-2xl leading-snug md:text-4xl">
                  "I help people build brands that feel less like marketing and more like <span className="text-gradient-aurora">memory</span>."
                </p>
                <p className="mt-6 text-sm text-muted-foreground">— Nilu, somewhere between Bombay and the metaverse.</p>
                <div className="mt-10 flex justify-center">
                  <LiquidGlassButton>Read the manifesto</LiquidGlassButton>
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* SERVICES / WORK */}
      <section id="work" className="relative py-32">
        <TheInfiniteGrid cellSize={64} />
        <div className="container relative z-10">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">// services</p>
            <h2 className="font-display text-4xl font-semibold md:text-6xl">
              Six ways we <span className="text-gradient-aurora">build worlds</span> together.
            </h2>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="voices" className="relative py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">// voices</p>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              People saying <span className="text-gradient-aurora">dhasu</span> things.
            </h2>
          </div>
        </div>
        <TestimonialsMarquee />
      </section>

      {/* CONTACT */}
      <section id="connect" className="relative py-32">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">// connect</p>
            <h2 className="font-display text-4xl font-semibold md:text-6xl">
              Let's build something <br />
              <span className="text-gradient-aurora">hatke.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell me what's brewing. I read every message — usually with chai.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-sm text-muted-foreground">
            © {new Date().getFullYear()} Connect With Nilu — crafted in the future.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Github, label: "GitHub" },
            ].map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-glass text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
