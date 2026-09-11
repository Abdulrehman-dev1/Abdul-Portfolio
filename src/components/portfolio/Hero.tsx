import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "./primitives";
import { profile, stats } from "@/data/portfolio";

function TypewriterTitle({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[index] ?? "";
    const doneTyping = text === current;
    const doneDeleting = text.length === 0;

    let delay = deleting ? 36 : 78;
    if (doneTyping && !deleting) delay = 1600;
    if (doneDeleting && deleting) delay = 320;

    const timer = window.setTimeout(() => {
      if (!deleting && !doneTyping) {
        setText(current.slice(0, text.length + 1));
        return;
      }

      if (!deleting && doneTyping) {
        setDeleting(true);
        return;
      }

      if (deleting && !doneDeleting) {
        setText(current.slice(0, text.length - 1));
        return;
      }

      setDeleting(false);
      setIndex((i) => (i + 1) % titles.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, index, text, titles]);

  return (
    <span className="block text-primary glow-text" aria-live="polite">
      {text}
      <span
        className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-primary align-baseline"
        style={{ animation: "pulse-dot 1s steps(1) infinite" }}
      />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-bg" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.05]" />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-surface-1/70 px-4 py-1.5 backdrop-blur-md"
        >
          <span
            className="h-2 w-2 rounded-full bg-primary"
            style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
          />
          <span className="font-mono text-xs tracking-wide text-primary">
            Available for Full-Stack Opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {profile.name}
          <TypewriterTitle titles={profile.titles} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects">Explore Projects</MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            Get in Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-lg px-5 py-4 transition-shadow hover:shadow-[0_0_25px_oklch(0.89_0.29_138/0.18)]"
            >
              <p className="font-mono text-2xl font-bold text-primary glow-text">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-12 flex items-center gap-4"
        >
          {[
            { href: profile.github, Icon: Github, label: "GitHub" },
            { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="rounded-md border border-primary/20 bg-surface-1/60 p-3 text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#about"
            className="ml-auto hidden items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary sm:inline-flex"
          >
            scroll <ArrowDown className="h-3 w-3 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
