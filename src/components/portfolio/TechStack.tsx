import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./primitives";
import { techStack } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ALL_CATEGORIES = "All";

export function TechStack() {
  const [active, setActive] = useState<string>(ALL_CATEGORIES);
  const categories = [ALL_CATEGORIES, ...techStack.map((group) => group.category)];
  const visibleGroups =
    active === ALL_CATEGORIES ? techStack : techStack.filter((group) => group.category === active);

  return (
    <section id="stack" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Core Tech Stack"
          subtitle="The tools I reach for when shipping production systems."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tech stack">
            {categories.map((category) => {
              const isSelected = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActive(category)}
                  className={cn(
                    "relative rounded-md px-4 py-2 font-mono text-xs transition-colors",
                    isSelected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="stack-tab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  ) : null}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleGroups.map((group) => (
            <div
              key={group.category}
              className="glass rounded-xl p-6 transition-colors hover:border-primary/35"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-primary/85 uppercase">
                {group.category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-primary/20 bg-surface-2/60 px-3.5 py-2 font-mono text-xs text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_18px_oklch(0.89_0.29_138/0.2)] sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
