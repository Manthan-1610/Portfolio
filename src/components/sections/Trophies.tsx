"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Room from "@/components/map/Room";
import { d } from "@/components/map/Rule";
import { trophies, type Trophy } from "@/content";

const layout: Record<string, { cell: string; tilt: string; mount: "tape" | "corners" }> = {
  gateway: { cell: "lg:col-span-5", tilt: "-rotate-[2deg]", mount: "corners" },
  robocon: { cell: "lg:col-span-3 lg:mt-14", tilt: "rotate-[1.8deg]", mount: "tape" },
  mlh: { cell: "lg:col-span-4 lg:mt-4", tilt: "-rotate-[1deg]", mount: "corners" },
  "tech-innovation": { cell: "lg:col-span-7 lg:col-start-5 lg:-mt-6", tilt: "rotate-[1.2deg]", mount: "tape" },
};

function Mount({ kind }: { kind: "tape" | "corners" }) {
  if (kind === "tape") {
    return (
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-3 bg-[rgb(238_226_196/0.72)] shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
        style={{ clipPath: "polygon(2% 8%, 98% 0, 100% 92%, 0 100%)" }}
      />
    );
  }
  const corner = "absolute z-10 h-6 w-6 bg-[#2b1b10]/85";
  return (
    <>
      <span aria-hidden="true" className={`${corner} left-1 top-1`} style={{ clipPath: "polygon(0 0,100% 0,0 100%)" }} />
      <span aria-hidden="true" className={`${corner} right-1 top-1`} style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }} />
      <span aria-hidden="true" className={`${corner} bottom-1 left-1`} style={{ clipPath: "polygon(0 0,100% 100%,0 100%)" }} />
      <span aria-hidden="true" className={`${corner} bottom-1 right-1`} style={{ clipPath: "polygon(100% 0,100% 100%,0 100%)" }} />
    </>
  );
}

function Medal() {
  return (
    <svg viewBox="0 0 120 170" className="w-[96px] shrink-0 drop-shadow-[2px_3px_0_rgb(43_27_16/0.15)]" aria-hidden="true">
      <defs>
        <radialGradient id="gold" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#f6dc93" />
          <stop offset="0.55" stopColor="#c99a3e" />
          <stop offset="1" stopColor="#7e5a1c" />
        </radialGradient>
      </defs>
      <path d="M34 0 L60 70 L44 76 L18 6 Z" fill="#7d2316" />
      <path d="M86 0 L60 70 L76 76 L102 6 Z" fill="#5c1a10" />
      <path d="M34 0 L44 0 L62 52 L57 60 Z" fill="#c9a35a" opacity="0.7" />
      <circle cx="60" cy="112" r="46" fill="url(#gold)" stroke="#5e4214" strokeWidth="1.5" />
      <circle cx="60" cy="112" r="37" fill="none" stroke="#7e5a1c" strokeWidth="1" strokeDasharray="1.5 3" />
      <g fill="none" stroke="#6b4b17" strokeWidth="1.3" strokeLinecap="round">
        <path d="M38 124 C 34 110, 38 98, 48 90" />
        <path d="M82 124 C 86 110, 82 98, 72 90" />
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <path d={`M${39 + k * 1.6} ${120 - k * 8} q -7 -2 -8 -8`} />
            <path d={`M${81 - k * 1.6} ${120 - k * 8} q 7 -2 8 -8`} />
          </g>
        ))}
      </g>
      <text x="60" y="121" textAnchor="middle" fill="#4f3810" style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>
        I
      </text>
    </svg>
  );
}

export default function Trophies() {
  const [open, setOpen] = useState<Trophy | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  return (
    <Room
      id="trophy-room"
      numeral="V"
      name="The Trophy Room"
      decor={["hearth"]}
      className="px-6 pb-16 pt-16 sm:px-10 md:px-14 md:pb-20 md:pt-20 lg:px-16"
    >
      <header className="mb-14 max-w-2xl">
        <h2 data-ink className="font-display text-[clamp(42px,5.4vw,70px)] font-normal leading-[0.95]">
          What I&apos;ve won
        </h2>
        <p data-ink className="mt-3 font-display text-[19px] italic text-ink-soft" style={d(0.2)}>
          Wizard photographs. Look at one long enough and it starts to move.
        </p>
      </header>

      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
        {trophies.map((t, i) => {
          const l = layout[t.id];
          return (
            <figure key={t.id} data-ink className={`m-0 ${l.cell}`} style={d(0.12 * i)}>
              <button
                type="button"
                onClick={() => setOpen(t)}
                className={`wizard-photo relative block w-full bg-[#f6eedb] p-2.5 pb-3 shadow-[2px_5px_12px_rgb(43_27_16/0.28)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.015] ${l.tilt}`}
                aria-label={`${t.title}: ${t.caption}. Open the photograph.`}
              >
                <Mount kind={l.mount} />
                <span className="relative block overflow-hidden" style={{ aspectRatio: `${t.w} / ${t.h}` }}>
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 520px"
                    className="object-cover"
                  />
                </span>
              </button>
              <figcaption className="mt-4 px-1">
                <span className="block font-display text-[21px] leading-tight">{t.title}</span>
                <span className="block font-hand text-[17px] leading-snug text-blood">{t.caption}</span>
              </figcaption>
            </figure>
          );
        })}

        <div data-ink className="flex items-center gap-6 sm:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:-mt-2" style={d(0.4)}>
          <Medal />
          <div>
            <p className="m-0 font-display text-[30px] leading-none">Gold Medalist</p>
            <p className="m-0 mt-2 font-display text-[17px] italic leading-snug text-ink-soft">
              B.Tech in Information Technology, Ganpat University, 2021–25
            </p>
            <p className="invisible-ink m-0 mt-3 font-hand text-[16px] leading-snug">
              Mr. Padfoot would like it noted that he never received a medal for anything.
            </p>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="paper m-auto max-h-[92vh] w-[min(980px,94vw)] border border-ink/60 p-0 text-ink shadow-2xl backdrop:bg-[rgb(30_18_10/0.72)]"
      >
        {open && (
          <div className="p-3 sm:p-5">
            <div className="relative h-[min(64vh,640px)] w-full bg-[#1d130c]">
              <Image src={open.src} alt={open.alt} fill sizes="(max-width: 1000px) 94vw, 960px" className="object-contain" />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-4 px-1 pt-4">
              <div className="max-w-[60ch]">
                <p className="m-0 font-display text-[26px] leading-tight">{open.title}</p>
                <p className="m-0 font-hand text-[18px] text-blood">{open.caption}</p>
                <p className="m-0 mt-2 text-[17px] leading-relaxed text-ink-soft">{open.detail}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="smallcaps border border-ink/50 px-3 py-1.5 text-[12px] hover:text-blood"
                autoFocus
              >
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </Room>
  );
}
