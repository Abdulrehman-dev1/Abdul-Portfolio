import { Briefcase, GraduationCap, History, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { experience, profile } from "@/data/portfolio";

const focusAreas = [
  {
    label: "Marketplaces & Portals",
    detail: "Live bidding, multi-role property platforms, and custom CMS builds",
  },
  {
    label: "Payments & Subscriptions",
    detail: "Stripe webhooks, PayFast, Google Pay, subscriptions, and wallet ledgers",
  },
  {
    label: "Auth & Architecture",
    detail: "Cross-domain SSO, RBAC permissions, real-time Firestore, and REST APIs",
  },
];

export function About() {
  const infoCards = [
    ...experience.map((item) => ({
      Icon: item.current ? Briefcase : History,
      label: item.current ? "Current Role" : "Previous Role",
      value: `${item.role} · ${item.company}`,
      meta: item.details ? `${item.period} · ${item.details}` : item.period,
    })),
    {
      Icon: GraduationCap,
      label: "Education",
      value: profile.education,
      meta: undefined,
    },
    {
      Icon: MapPin,
      label: "Based in",
      value: profile.location,
      meta: undefined,
    },
  ];

  return (
    <section id="about" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="01" title="About" />
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <article className="glass flex h-full flex-col justify-between gap-6 rounded-xl p-7">
              <div>
                <p className="font-mono text-xs text-primary">~/whoami</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {profile.bio}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  I focus on backend architecture that holds up under load and frontends that feel
                  instant — auctions, subscriptions, checkout flows, and the APIs that tie them
                  together.
                </p>
              </div>

              <div className="border-t border-primary/15 pt-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                  Core Focus
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {focusAreas.map((area) => (
                    <div
                      key={area.label}
                      className="rounded-lg border border-primary/15 bg-surface-1/50 p-3.5"
                    >
                      <p className="font-mono text-xs font-semibold text-foreground">
                        {area.label}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {area.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col justify-between gap-4">
            {infoCards.map(({ Icon, label, value, meta }, i) => (
              <Reveal key={`${label}-${value}`} delay={i * 0.08}>
                <div className="glass flex gap-4 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-primary/40">
                  <span className="mt-0.5 h-fit rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{value}</p>
                    {meta ? (
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{meta}</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
