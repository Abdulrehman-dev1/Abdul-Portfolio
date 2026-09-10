import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="01" title="About" />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <article className="glass rounded-xl p-7">
              <p className="font-mono text-xs text-primary">~/whoami</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{profile.bio}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I focus on backend architecture that holds up under load and frontends that feel
                instant — auctions, subscriptions, checkout flows, and the APIs that tie them
                together.
              </p>
            </article>
          </Reveal>

          <div className="grid gap-4">
            {[
              { Icon: Briefcase, label: "Current Role", value: `Full Stack Developer · ${profile.company}` },
              { Icon: GraduationCap, label: "Education", value: profile.education },
              { Icon: MapPin, label: "Based in", value: profile.location },
            ].map(({ Icon, label, value }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div className="glass flex gap-4 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-primary/40">
                  <span className="mt-0.5 rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{value}</p>
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
