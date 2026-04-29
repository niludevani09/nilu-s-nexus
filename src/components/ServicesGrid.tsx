import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { tag: "01", title: "Brand Architecture", desc: "Foundational identity systems engineered for scale and soul." },
  { tag: "02", title: "Story Direction", desc: "Long-form narratives that turn audiences into devotees." },
  { tag: "03", title: "Content Universes", desc: "Multi-platform content engines built around your voice." },
  { tag: "04", title: "Visual Worldbuilding", desc: "Moodboards, motion, and 3D worlds that feel inevitable." },
  { tag: "05", title: "Community Design", desc: "Rituals and spaces where your people actually show up." },
  { tag: "06", title: "Launch Choreography", desc: "Drops, films, and moments designed for cultural impact." },
];

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <article
          key={s.tag}
          data-card
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-glass p-7 shadow-elegant transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
        >
          <span className="font-mono text-xs text-muted-foreground">{s.tag}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-aurora opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60" />
        </article>
      ))}
    </div>
  );
}
