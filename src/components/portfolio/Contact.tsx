import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";
import { profile } from "@/data/portfolio";

export function Contact() {
  const contactItems = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      Icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { Icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          title="Contact"
          subtitle="Have a system to build or scale? Reach out directly — I'll get back to you."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactItems.map(({ Icon, label, value, href }, i) => {
            const content = (
              <>
                <span className="rounded-md border border-primary/25 bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                    {label}
                  </p>
                  <p className="truncate text-sm text-foreground">{value}</p>
                </div>
              </>
            );

            return (
              <Reveal key={label} delay={i * 0.08}>
                {href ? (
                  <a
                    href={href}
                    className="glass flex h-full items-center gap-4 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-primary/40"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="glass flex h-full items-center gap-4 rounded-xl p-5">
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.28} className="mt-6">
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={profile.github} variant="outline" external>
              <Github className="h-4 w-4" /> GitHub
            </MagneticButton>
            <MagneticButton href={profile.linkedin} variant="outline" external>
              <Linkedin className="h-4 w-4" /> LinkedIn
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
