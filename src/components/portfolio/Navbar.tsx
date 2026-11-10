import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { hash: "about", label: "About" },
  { hash: "stack", label: "Stack" },
  { hash: "projects", label: "Projects" },
  { hash: "contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-primary/15" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-mono text-sm"
        >
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-semibold tracking-tight">
            abdulrehman<span className="text-primary glow-text">.dev</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="relative font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            className="rounded-md border border-primary/40 px-4 py-2 font-mono text-xs font-semibold text-primary transition-shadow hover:shadow-[0_0_22px_oklch(0.89_0.29_138/0.3)]"
          >
            Hire Me
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
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
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
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
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-primary/25 p-2 text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-10 flex flex-col gap-6">
                {links.map((l, i) => (
                  <Link
                    key={l.hash}
                    to="/"
                    hash={l.hash}
                    onClick={() => setOpen(false)}
                    className="font-mono text-lg text-foreground transition-colors hover:text-primary"
                  >
                    <span className="mr-2 text-sm text-primary/60">0{i + 1}.</span>
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/"
                  hash="contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-4 py-2.5 font-mono text-sm font-semibold text-primary"
                >
                  Hire Me
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
