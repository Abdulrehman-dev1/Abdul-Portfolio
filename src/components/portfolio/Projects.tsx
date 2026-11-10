import { Link } from "@tanstack/react-router";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, Images } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { projects, type FeaturedProject } from "@/data/projects";

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.4 };

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, oklch(0.89 0.29 138 / 0.14), transparent 55%)`;

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <motion.article
        onMouseMove={(e) => {
          if (!window.matchMedia("(pointer: fine)").matches) return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rotateX.set((py - 0.5) * -8);
          rotateY.set((px - 0.5) * 8);
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
          <h3 className="text-xl font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-primary/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="relative mt-2 font-mono text-xs text-primary/80">{project.role}</p>

        <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.cardDescription}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-primary/10 pt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-primary/15 bg-surface-2/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/25"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_24px_oklch(0.89_0.29_138/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-primary/35 px-4 py-2 font-mono text-xs font-semibold text-primary transition-colors hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Live Site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-primary">
              <Images className="h-3.5 w-3.5" />
              Screenshots available
            </span>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-primary/10 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Featured Projects"
          subtitle="Production marketplaces, multi-subdomain storefronts, and fractional real estate systems."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
