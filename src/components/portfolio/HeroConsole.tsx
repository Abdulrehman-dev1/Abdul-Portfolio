import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Cpu, GitBranch, Layers, Lock, ShieldCheck, Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type ConsoleTab = "stack" | "sso" | "shipped";

const consoleTabs: { id: ConsoleTab; label: string; icon: typeof Terminal }[] = [
  { id: "stack", label: "stack.ts", icon: Terminal },
  { id: "sso", label: "sso.mesh", icon: GitBranch },
  { id: "shipped", label: "shipped.log", icon: Layers },
];

const ssoNodes = [
  { domain: "xpertbid.com", role: "Marketplace & Auctions", tag: "PRIMARY" },
  { domain: "property.xpertbid.com", role: "Property Portal", tag: "SYNCED" },
  { domain: "build.xpertbid.com", role: "Renovation & Builders", tag: "SYNCED" },
];

const featuredTelemetry = [
  { slug: "xpertbid", name: "XpertBid", detail: "Auctions + B2B + SSO" },
  { slug: "tokenization", name: "Tokenization", detail: "Stripe + Atomic Escrow" },
  { slug: "al-salama-training", name: "Al Salama", detail: "Firestore Realtime" },
  { slug: "mr-barni", name: "Mr. Barni", detail: "Multi-Role Portal + 2FA" },
  { slug: "smart-renovation", name: "Smart Renovation", detail: "Custom CMS + SEO" },
];

const orbitChips = ["Laravel 13", "Next.js 15", "React 19", "MySQL", "Redis", "Stripe"];

export function HeroConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>("stack");
  const [isPaused, setIsPaused] = useState(false);

  const tiltSpring = { stiffness: 200, damping: 22, mass: 0.5 };
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const glareX = useSpring(50, tiltSpring);
  const glareY = useSpring(50, tiltSpring);
  const pulseStep = useMotionValue(0);

  const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, oklch(0.89 0.29 138 / 0.16), transparent 60%)`;

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveTab((prev) => {
        if (prev === "stack") return "sso";
        if (prev === "sso") return "shipped";
        return "stack";
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        rotateX.set(0);
        rotateY.set(0);
        glareX.set(50);
        glareY.set(50);
      }}
      onMouseMove={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateX.set((py - 0.5) * -9);
        rotateY.set((px - 0.5) * 9);
        glareX.set(px * 100);
        glareY.set(py * 100);
        pulseStep.set(px);
      }}
    >
      {/* Ambient emerald halo behind console */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_55%_45%,oklch(0.89_0.29_138/0.22),transparent_68%)] blur-2xl"
      />

      {/* Corner radar brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-2.5 -left-2.5 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-primary/55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2.5 -bottom-2.5 h-6 w-6 rounded-br-lg border-r-2 border-b-2 border-primary/55"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1100,
          transformStyle: "preserve-3d",
        }}
        className="glass relative overflow-hidden rounded-2xl border border-primary/30 bg-surface-1/85 shadow-[0_0_50px_oklch(0.89_0.29_138/0.14)]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glare }}
        />

        {/* Subtle animated scan line */}
        <motion.div
          aria-hidden
          animate={{ y: ["-10%", "115%"] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent"
        />

        {/* Window Chrome */}
        <div className="relative flex items-center justify-between border-b border-primary/15 bg-black/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary/85 shadow-[0_0_8px_oklch(0.89_0.29_138/0.8)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/20" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              abdulrehman@prod:~
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
            />
            {projects.length} SHIPPED
          </div>
        </div>

        {/* Interactive Console Tabs */}
        <div
          className="relative flex items-center gap-1 border-b border-primary/10 bg-surface-1/60 px-3 py-2"
          role="tablist"
          aria-label="Interactive developer telemetry tabs"
        >
          {consoleTabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setIsPaused(true);
                  setActiveTab(id);
                }}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors",
                  active
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="hero-console-tab"
                    className="absolute inset-0 rounded-md bg-primary"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
                <Icon className="relative h-3 w-3" />
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Console Body */}
        <div className="relative min-h-[275px] p-5 font-mono text-xs">
          {activeTab === "stack" ? (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 leading-relaxed"
            >
              <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
                <span>// production-architecture.ts</span>
                <span className="inline-flex items-center gap-1 text-primary">
                  <Cpu className="h-3 w-3" /> FULL STACK
                </span>
              </div>
              <pre className="overflow-x-auto rounded-lg border border-primary/15 bg-black/55 p-4 text-[11.5px] leading-6 text-muted-foreground">
                <code>
                  <span className="text-primary">export const</span>{" "}
                  <span className="text-foreground">engineer</span> = {"{\n"}
                  {"  "}name: <span className="text-primary">&quot;Abdulrehman Majid&quot;</span>,
                  {"\n"}
                  {"  "}focus: [<span className="text-foreground">&quot;Laravel&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Next.js&quot;</span>,{" "}
                  <span className="text-foreground">&quot;React&quot;</span>],{"\n"}
                  {"  "}data: [<span className="text-foreground">&quot;MySQL&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Redis&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Firestore&quot;</span>],{"\n"}
                  {"  "}payments: [<span className="text-foreground">&quot;Stripe&quot;</span>,{" "}
                  <span className="text-foreground">&quot;PayFast&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Google Pay&quot;</span>],{"\n"}
                  {"  "}architecture:{" "}
                  <span className="text-primary">&quot;SSO · RBAC · Queues&quot;</span>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-primary/90">
                  <ShieldCheck className="h-3.5 w-3.5" /> Transaction-safe &amp; role-guarded
                </span>
                <span>Karachi · Remote ready</span>
              </div>
            </motion.div>
          ) : null}

          {activeTab === "sso" ? (
            <motion.div
              key="sso"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>// Multi-Site Identity Mesh</span>
                <span className="inline-flex items-center gap-1 text-primary">
                  <Lock className="h-3 w-3" /> HMAC-SHA256
                </span>
              </div>

              <div className="space-y-2.5">
                {ssoNodes.map((node, idx) => (
                  <div
                    key={node.domain}
                    className="relative flex items-center justify-between rounded-lg border border-primary/20 bg-black/55 px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                        transition={{ duration: 1.8, delay: idx * 0.35, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_oklch(0.89_0.29_138)]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{node.domain}</p>
                        <p className="text-[10px] text-muted-foreground">{node.role}</p>
                      </div>
                    </div>
                    <span className="rounded border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {node.tag}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/projects/$slug"
                params={{ slug: "xpertbid" }}
                hash="one-login-across-three-sites"
                className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline"
              >
                Read &quot;One Login Across Three Sites&quot; case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ) : null}

          {activeTab === "shipped" ? (
            <motion.div
              key="shipped"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>// Click any build to inspect</span>
                <span className="text-primary">{projects.length} projects indexed</span>
              </div>

              <div className="space-y-2">
                {featuredTelemetry.map((item, idx) => (
                  <Link
                    key={item.slug}
                    to="/projects/$slug"
                    params={{ slug: item.slug }}
                    className="group flex items-center justify-between rounded-lg border border-primary/15 bg-black/55 px-3 py-2 transition-colors hover:border-primary/45 hover:bg-primary/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] text-primary/70">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-foreground group-hover:text-primary">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-[10px] text-muted-foreground sm:inline">
                        {item.detail}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>

        {/* Bottom Live Tech Strip */}
        <div className="relative flex flex-wrap items-center gap-1.5 border-t border-primary/15 bg-black/45 px-4 py-3">
          {orbitChips.map((chip) => (
            <span
              key={chip}
              className="rounded border border-primary/20 bg-surface-2/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
