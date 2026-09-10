import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  const field =
    "w-full rounded-md border border-primary/20 bg-surface-1/80 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:shadow-[0_0_22px_oklch(0.89_0.29_138/0.18)]";

  return (
    <section id="contact" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          title="Contact"
          subtitle="Have a system to build or scale? Send a message and I'll get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="glass rounded-xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2 border-b border-primary/10 pb-4 font-mono text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
                <span className="ml-2">~/contact — new-message</span>
              </div>

              <div className="grid gap-4">
                <input
                  required
                  className={field}
                  placeholder="your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  className={field}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  required
                  rows={5}
                  className={field}
                  placeholder="tell me about your project…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <div className="mt-6">
                <MagneticButton type="submit">
                  Send Message <Send className="h-4 w-4" />
                </MagneticButton>
              </div>
            </form>
          </Reveal>

          <div className="grid content-start gap-4">
            {[
              { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              { Icon: MapPin, label: "Location", value: profile.location },
            ].map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href ?? "#contact"}
                  className="glass flex items-center gap-4 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <span className="rounded-md border border-primary/25 bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                      {label}
                    </p>
                    <p className="truncate text-sm text-foreground">{value}</p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
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
        </div>
      </div>
    </section>
  );
}
