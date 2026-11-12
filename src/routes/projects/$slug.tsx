import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Images,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { GlowCursor } from "@/components/portfolio/primitives";
import { ScreenshotGallery } from "@/components/portfolio/ScreenshotGallery";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
  type FeaturedProject,
} from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      const title = "Project Not Found | Abdulrehman Majid";
      const description = "The requested portfolio project could not be found.";
      return {
        meta: [
          { title },
          { name: "description", content: description },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
        ],
      };
    }

    const title = `${project.title} | Abdulrehman Majid`;
    const description = project.cardDescription;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectNotFound({ slug }: { slug: string }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <GlowCursor />
      <Navbar />
      <main className="relative z-10 flex flex-1 items-center justify-center px-5 pt-28 pb-20">
        <div className="glass max-w-xl rounded-2xl p-8 text-center sm:p-10">
          <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase">
            404 // Project
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Project not found<span className="text-primary glow-text">.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            No project matched <code className="font-mono text-primary">"{slug}"</code>. Explore one
            of the featured projects below or return to the portfolio overview.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {projects.map((item) => (
              <Link
                key={item.slug}
                to="/projects/$slug"
                params={{ slug: item.slug }}
                className="rounded-md border border-primary/25 bg-surface-2/60 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_24px_oklch(0.89_0.29_138/0.45)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CaseStudyBlock({ project }: { project: FeaturedProject }) {
  const { caseStudy } = project;
  if (!caseStudy) return null;

  if (caseStudy.kind === "full") {
    return (
      <section id={caseStudy.id} className="mt-14 scroll-mt-24">
        <div className="glass rounded-2xl border border-primary/25 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
            Architecture Case Study
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {caseStudy.title}
            <span className="text-primary glow-text">.</span>
          </h2>

          <div className="mt-8 space-y-7">
            {caseStudy.sections.map((section) => (
              <div
                key={section.heading}
                className="border-t border-primary/10 pt-6 first:border-t-0 first:pt-0"
              >
                <h3 className="font-mono text-sm font-semibold tracking-wide text-primary">
                  {section.heading}
                </h3>
                {section.paragraph ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.paragraph}
                  </p>
                ) : null}
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (caseStudy.kind === "bullets") {
    return (
      <section id={caseStudy.id} className="mt-14 scroll-mt-24">
        <div className="glass rounded-2xl border border-primary/25 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
            Engineering Case Study
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {caseStudy.title}
            <span className="text-primary glow-text">.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {caseStudy.intro}
          </p>
          <ul className="mt-5 space-y-3">
            {caseStudy.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14">
      <div className="glass rounded-2xl border border-primary/25 p-6 sm:p-8">
        <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
          Related Case Study
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {caseStudy.title}
          <span className="text-primary glow-text">.</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {caseStudy.summary}
        </p>
        <div className="mt-5">
          <Link
            to="/projects/$slug"
            params={{ slug: caseStudy.targetSlug }}
            hash={caseStudy.targetHash}
            className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-4 py-2 font-mono text-xs font-semibold text-primary transition-colors hover:border-primary/75 hover:bg-primary/10"
          >
            {caseStudy.linkLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <ProjectNotFound slug={slug} />;
  }

  const { previous, next } = getAdjacentProjects(project.slug);
  let sectionNumber = 1;
  const nextSectionIndex = () => String(sectionNumber++).padStart(2, "0");

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <GlowCursor />
      <Navbar />

      <main className="relative z-10 flex-1 pt-28 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-96 mesh-bg opacity-70"
        />

        <div className="relative mx-auto max-w-4xl px-5">
          <div>
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Projects
            </Link>
          </div>

          <header className="mt-8 border-b border-primary/15 pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                {project.company}
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
                {project.role}
              </span>
              {project.status ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-medium text-amber-300">
                  <Clock className="h-3 w-3" />
                  {project.status}
                </span>
              ) : null}
              {project.liveLabel ? (
                <span className="font-mono text-xs text-muted-foreground">{project.liveLabel}</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-surface-2/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  <Images className="h-3 w-3 text-primary" />
                  Private Deployment · Screenshots below
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {project.title}
              <span className="text-primary glow-text">.</span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-primary/20 bg-surface-2/70 px-3 py-1 font-mono text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.integrations.length > 0 || project.accessControl ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.integrations.length > 0 ? (
                  <div className="glass rounded-lg px-4 py-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                      Integrations
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.integrations.join(" · ")}
                    </p>
                  </div>
                ) : null}
                {project.accessControl ? (
                  <div className="glass rounded-lg px-4 py-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                      Access Control
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{project.accessControl}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_oklch(0.89_0.29_138/0.45)]"
                >
                  Live Site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href="#screenshots"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_oklch(0.89_0.29_138/0.45)]"
                >
                  <Images className="h-4 w-4" />
                  View Screenshots
                </a>
              )}
            </div>
          </header>

          {/* 1. Overview */}
          <section className="mt-12">
            <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
              <span className="text-muted-foreground">{nextSectionIndex()}</span> // Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Overview<span className="text-primary glow-text">.</span>
            </h2>
            <div className="glass mt-5 rounded-xl p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.overview}
              </p>
            </div>
          </section>

          {/* 2. Core modules / features */}
          <section className="mt-14">
            <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
              <span className="text-muted-foreground">{nextSectionIndex()}</span> // Architecture &
              Modules
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Core Modules & Features<span className="text-primary glow-text">.</span>
            </h2>

            <div className="mt-6 space-y-6">
              {project.featureSections.map((section) => (
                <div key={section.heading} className="glass rounded-xl p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <Layers className="h-4 w-4 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {section.heading}
                    </h3>
                  </div>

                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.groups && section.groups.length > 0 ? (
                    <div className="mt-5 grid gap-5">
                      {section.groups.map((group) => (
                        <div
                          key={group.title}
                          className="rounded-lg border border-primary/12 bg-surface-1/50 p-4 sm:p-5"
                        >
                          <h4 className="font-mono text-sm font-semibold text-primary">
                            {group.title}
                          </h4>
                          {group.bullets.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                              {group.bullets.map((bullet) => (
                                <li
                                  key={bullet}
                                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Highlights */}
          {project.highlights.length > 0 ? (
            <section className="mt-14">
              <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
                <span className="text-muted-foreground">{nextSectionIndex()}</span> // Highlights
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Highlights<span className="text-primary glow-text">.</span>
              </h2>
              <div className="glass mt-5 rounded-xl p-6 sm:p-7">
                <ul className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {/* 4. Case Study */}
          <CaseStudyBlock project={project} />

          {/* 5. Screenshots (Tokenization) */}
          {project.screenshots && project.screenshots.length > 0 ? (
            <ScreenshotGallery screenshots={project.screenshots} projectTitle={project.title} />
          ) : null}

          {/* Bottom Navigation */}
          <nav aria-label="Project navigation" className="mt-16 border-t border-primary/15 pt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  to="/projects/$slug"
                  params={{ slug: previous.slug }}
                  className="glass group flex flex-col justify-between rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/45"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous Project
                  </span>
                  <span className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
                    {previous.title}
                  </span>
                </Link>
              ) : null}

              {next ? (
                <Link
                  to="/projects/$slug"
                  params={{ slug: next.slug }}
                  className="glass group flex flex-col justify-between rounded-xl p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/45 sm:text-right"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary sm:justify-end">
                    Next Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/"
                hash="projects"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to all featured projects
              </Link>
            </div>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
