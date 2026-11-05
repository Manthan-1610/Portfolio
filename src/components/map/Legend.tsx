"use client";

import { useEffect, useRef, useState } from "react";
import { profile, rooms } from "@/content";

export default function Legend() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(rooms[0].id);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rooms.map((r) => document.getElementById(r.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = rooms.find((r) => r.id === active) ?? rooms[0];

  return (
    <div ref={boxRef} className="no-print fixed right-3 top-3 z-[60] flex items-start gap-2 sm:right-6 sm:top-5">
      <a
        href={profile.resume}
        download="Manthan_Mehta_Resume.pdf"
        className="paper flex items-center gap-2 border border-ink/50 px-3 py-1.5 font-display text-[15px] italic text-ink shadow-[2px_3px_0_rgb(43_27_16/0.12)] transition-transform hover:-translate-y-0.5 hover:text-blood"
      >
        Résumé
        <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
          <path d="M5 1v8M1.5 6 5 9.5 8.5 6M1 11.2h8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </a>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="legend-panel"
          className="paper flex items-center gap-2 border border-ink/50 px-3 py-1.5 text-ink shadow-[2px_3px_0_rgb(43_27_16/0.12)] transition-transform hover:-translate-y-0.5"
        >
          <span className="smallcaps text-[12px]">Legend</span>
          <span className="hidden font-display text-[14px] italic text-ink-soft sm:inline">· {current.numeral}</span>
        </button>

        {open && (
          <nav
            id="legend-panel"
            aria-label="Rooms"
            className="paper fade-up absolute right-0 mt-2 w-[290px] border border-ink/60 p-1 shadow-[4px_6px_0_rgb(43_27_16/0.12)]"
          >
            <div className="border border-ink/30 px-5 pb-4 pt-3">
              <p className="smallcaps border-b border-ink/25 pb-2 text-center text-[12px] text-ink-soft">Legend of the map</p>
              <a
                href="#plan"
                onClick={() => setOpen(false)}
                className="group mt-2 grid grid-cols-[2.2rem_1fr] items-baseline border-b border-dashed border-ink/25 pb-2 text-ink"
              >
                <span className="font-display text-[15px] italic opacity-70">⌂</span>
                <span>
                  <span className="font-display text-[18px] leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    The whole plan
                  </span>
                  <span className="block font-body text-[13px] italic text-ink-faint">Every room at once</span>
                </span>
              </a>
              <ol className="mt-2 space-y-0.5">
                {rooms.map((r) => (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      onClick={() => setOpen(false)}
                      className={`group grid grid-cols-[2.2rem_1fr] items-baseline py-1 ${r.id === active ? "text-blood" : "text-ink"}`}
                    >
                      <span className="font-display text-[15px] italic opacity-70">{r.numeral}.</span>
                      <span>
                        <span className="font-display text-[18px] leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                          {r.name}
                        </span>
                        <span className="block font-body text-[13px] italic text-ink-faint">
                          {r.plain}
                          {r.id === active && " — you are here"}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
