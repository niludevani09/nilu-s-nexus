import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Message launched into the multiverse ✨");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-glass border border-white/10 rounded-3xl p-6 md:p-10 shadow-elegant max-w-2xl mx-auto"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@future.co" required />
      </div>
      <div className="mt-5">
        <Field label="Subject" name="subject" placeholder="Let's build something hatke" />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me about your vision..."
          className="w-full rounded-xl border border-white/10 bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
        />
      </div>
      <div className="mt-7 flex justify-end">
        <LiquidGlassButton type="submit" variant="metal" disabled={loading}>
          {loading ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
        </LiquidGlassButton>
      </div>
    </motion.form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
      />
    </label>
  );
}
