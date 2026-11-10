import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProjectScreenshot } from "@/data/projects";

export function ScreenshotGallery({
  screenshots,
  projectTitle,
}: {
  screenshots: ProjectScreenshot[];
  projectTitle: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const count = screenshots.length;
  const activeShot = activeIndex !== null ? screenshots[activeIndex] : undefined;

  const close = useCallback(() => {
    setActiveIndex(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 0);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + count) % count));
  }, [count]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % count));
  }, [count]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  if (count === 0) return null;

  return (
    <section id="screenshots" className="mt-14 scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-primary/80 uppercase">
            Visual Walkthrough
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Platform Screenshots<span className="text-primary glow-text">.</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {count} screenshots · click any image to expand
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((shot, index) => (
          <button
            key={shot.filename}
            type="button"
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
            className="group glass flex flex-col overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_0_30px_oklch(0.89_0.29_138/0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-1">
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-background/85 px-2.5 py-1 font-mono text-[11px] text-primary opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="h-3 w-3" />
                Inspect
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-primary/10 px-4 py-3">
              <span className="text-sm font-medium text-foreground">{shot.caption}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeShot && activeIndex !== null && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${projectTitle} screenshot ${activeIndex + 1} of ${count}: ${activeShot.caption}`}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 p-4 backdrop-blur-md sm:p-6"
              onClick={close}
            >
              <div
                className="glass relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-primary/30 bg-surface-1 shadow-[0_0_50px_oklch(0.89_0.29_138/0.15)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-primary/15 px-4 py-3 sm:px-6">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                      {activeShot.caption}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {activeIndex + 1} / {count} · Esc to close · Arrow keys to navigate
                    </p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label="Close lightbox"
                    className="rounded-md border border-primary/25 p-2 text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/70 p-3 sm:p-6">
                  <img
                    src={activeShot.src}
                    alt={activeShot.alt}
                    className="max-h-[68vh] max-w-full rounded-lg object-contain"
                  />
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-primary/15 px-4 py-3 sm:px-6">
                  <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {activeShot.alt}
                  </p>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label="Previous screenshot"
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next screenshot"
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
