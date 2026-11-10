import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs tracking-[0.3em] text-primary/80 uppercase">
        <span className="text-muted-foreground">{index}</span> // {title}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
        <span className="text-primary glow-text">.</span>
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function MagneticButton({
  children,
  href,
  variant = "solid",
  className,
  onClick,
  type = "button",
  external,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-mono text-sm font-semibold tracking-wide transition-colors duration-300",
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_35px_oklch(0.89_0.29_138/0.5)]"
      : "border border-primary/40 text-primary hover:bg-primary/10 hover:shadow-[0_0_25px_oklch(0.89_0.29_138/0.25)]",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  const handlers = {
    onMouseMove: (e: React.MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setOffset({
        x: (e.clientX - (r.left + r.width / 2)) * 0.25,
        y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      });
    },
    onMouseLeave: () => setOffset({ x: 0, y: 0 }),
  };

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={base}
        style={style}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        {...handlers}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      style={style}
      {...handlers}
    >
      {children}
    </button>
  );
}

export function GlowCursor() {
  const [enabled, setEnabled] = useState(false);
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 208);
      rawY.set(e.clientY - 208);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[26rem] w-[26rem] rounded-full opacity-60 blur-[90px]"
      style={{
        x,
        y,
        background: "radial-gradient(circle, oklch(0.89 0.29 138 / 0.16), transparent 65%)",
      }}
    />
  );
}
