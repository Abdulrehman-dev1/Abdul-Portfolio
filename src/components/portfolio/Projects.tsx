import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, Clock, Images } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import {
  projectFilterTabs,
  projects,
  type FeaturedProject,
  type ProjectFilterTab,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const tiltSpring = { stiffness: 220, damping: 22, mass: 0.4 };

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, oklch(0.89 0.29 138 / 0.14), transparent 55%)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2), ease: [0.22, 1, 0.36, 1] }}
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
        <span className="shrink-0 font-mono text-xs text-primary/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-2 flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs text-primary/80">{project.role}</p>
        {project.status ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-300">
            <Clock className="h-3 w-3" />
            {project.status}
          </span>
        ) : null}
      </div>

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
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectFilterTab>("All");

  const filteredProjects = useMemo(
    () =>
      activeTab === "All" ? projects : projects.filter((project) => project.company === activeTab),
    [activeTab],
  );

  return (
    <section id="projects" className="relative border-t border-primary/10 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Featured Projects"
          subtitle="Production marketplaces, multi-subdomain storefronts, scheduling systems, custom CMS platforms, and B2B portals shipped across XpertBid and Acusync Technologies."
        />

        <Reveal>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by company"
          >
            {projectFilterTabs.map((tab) => {
              const isSelected = activeTab === tab;
              const count =
                tab === "All"
                  ? projects.length
                  : projects.filter((project) => project.company === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative rounded-md px-4 py-2 font-mono text-xs transition-colors",
                    isSelected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="project-filter-tab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  ) : null}
                  <span className="relative inline-flex items-center gap-2">
                    <span>{tab}</span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px]",
                        isSelected
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-primary/10 text-primary/80",
                      )}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
