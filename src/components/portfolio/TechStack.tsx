import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./primitives";
import { techStack } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function TechStack() {
  const [active, setActive] = useState<string>(techStack[0]!.category);
  const current = techStack.find((t) => t.category === active) ?? techStack[0]!;

  return (
    <section id="stack" className="relative border-t border-primary/10 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Core Tech Stack"
          subtitle="The tools I reach for when shipping production systems."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2">
            {techStack.map((group) => (
              <button
                key={group.category}
                onClick={() => setActive(group.category)}
                className={cn(
                  "relative rounded-md px-4 py-2 font-mono text-xs transition-colors",
                  active === group.category
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {active === group.category ? (
                  <motion.span
                    layoutId="stack-tab"
                    className="absolute inset-0 rounded-md bg-primary"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
                <span className="relative">{group.category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            key={current.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {current.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border border-primary/20 bg-surface-2/60 px-4 py-2.5 font-mono text-sm text-foreground backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_22px_oklch(0.89_0.29_138/0.25)]"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
