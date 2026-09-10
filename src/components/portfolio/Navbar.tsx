import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-primary/15" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-semibold tracking-tight">
            abdulrehman<span className="text-primary glow-text">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md border border-primary/40 px-4 py-2 font-mono text-xs font-semibold text-primary transition-shadow hover:shadow-[0_0_22px_oklch(0.89_0.29_138/0.3)]"
          >
            Hire Me
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-md border border-primary/25 p-2 text-primary md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 border-l border-primary/20 bg-surface-1 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase">
                  Menu
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-primary/25 p-2 text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-10 flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                    className="font-mono text-lg text-foreground transition-colors hover:text-primary"
                  >
                    <span className="mr-2 text-primary/60 text-sm">0{i + 1}.</span>
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
