import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { projectFilters, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const layoutSpring = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.8 };
const tiltSpring = { stiffness: 220, damping: 22, mass: 0.4 };

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, oklch(0.89 0.29 138 / 0.14), transparent 55%)`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -12,
        scale: 0.97,
        transition: { duration: 0.22, ease: easeOut },
      }}
      transition={{
        layout: layoutSpring,
        opacity: { duration: 0.4, delay: index * 0.05, ease: easeOut },
        y: { ...layoutSpring, delay: index * 0.05 },
        scale: { ...layoutSpring, delay: index * 0.05 },
      }}
      className="h-full"
    >
      <motion.article
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rotateX.set((py - 0.5) * -10);
          rotateY.set((px - 0.5) * 10);
          glareX.set(px * 100);
          glareY.set(py * 100);
        }}
        onMouseLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
          glareX.set(50);
          glareY.set(50);
        }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-xl p-6 hover:border-primary/45 hover:shadow-[0_0_35px_oklch(0.89_0.29_138/0.15)]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.name}
          </h3>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.name}`}
            className="rounded-md border border-primary/20 p-2 text-primary transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_0_18px_oklch(0.89_0.29_138/0.3)]"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <p className="relative mt-2 font-mono text-xs text-primary/80">{project.role}</p>
        {project.status ? (
          <span className="relative mt-3 inline-flex w-fit rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-primary uppercase">
            {project.status}
          </span>
        ) : null}

        <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.details}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-primary/10 pt-4">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-primary/15 bg-surface-2/70 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/25"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <section id="projects" className="relative border-t border-primary/10 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Featured Projects"
          subtitle="Marketplaces, auction engines, subscription systems, and eCommerce platforms shipped to production."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-300",
                    active
                      ? "border-primary text-primary"
                      : "border-primary/15 text-muted-foreground hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 shadow-[0_0_18px_oklch(0.89_0.29_138/0.25)]"
                      transition={layoutSpring}
                    />
                  ) : null}
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout transition={layoutSpring} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
