"use client";

import { useEffect, useRef, useState } from "react";
import Room from "@/components/map/Room";
import { d } from "@/components/map/Rule";
import { shelves, type Book } from "@/content";

const LEATHER = ["#5a2219", "#2f3a27", "#3b2618", "#6b4721", "#24313d", "#4a1d2c", "#544228", "#3d1d14"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

function bookStyle(title: string, i: number): React.CSSProperties {
  const h = hash(title);
  const height = 150 + (h % 52);
  const width = Math.round(32 + Math.min(title.length, 15) * 1.15 + (h % 7));
  return {
    width: `calc(${width}px * var(--k))`,
    height: `calc(${height}px * var(--k))`,
    backgroundColor: LEATHER[(h + i) % LEATHER.length],
  };
}

type Selected = { book: Book; shelf: string };

export default function Library() {
  const [selected, setSelected] = useState<Selected>({ book: shelves[0].books[0], shelf: shelves[0].name });
  // Hover selects only once the pointer settles, so sweeping across a shelf
  // doesn't flicker the card through every book on the way.
  const hoverTimer = useRef<number | undefined>(undefined);
  const hoverSelect = (next: Selected) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setSelected(next), 90);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  return (
    <Room
      id="library"
      numeral="IV"
      name="The Library"
      decor={["windows"]}
      className="px-6 pb-16 pt-16 sm:px-10 md:px-14 md:pb-20 md:pt-20 lg:px-16"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
        <header>
          <h2 data-ink className="font-display text-[clamp(42px,5.4vw,70px)] font-normal leading-[0.95]">
            What I work with
          </h2>
          <p data-ink className="mt-3 max-w-[44ch] font-display text-[19px] italic leading-snug text-ink-soft" style={d(0.2)}>
            Every book here is a tool I&apos;ve used. Pull one off the shelf to see who borrowed it, meaning where I actually
            used it.
          </p>
        </header>
        <LibraryCard selected={selected} />
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-10 [--k:0.8] sm:[--k:0.92] xl:grid-cols-2 xl:[--k:1]">
        {shelves.map((shelf, s) => (
          <div key={shelf.name} data-ink className="min-w-0" style={d(0.1 * s)}>
            <ul className="m-0 flex list-none items-end gap-[3px] overflow-x-auto overflow-y-hidden px-3 pb-0 pt-5 [scrollbar-width:none]" aria-label={shelf.name}>
              {shelf.books.map((book, i) => {
                const active = selected.book.title === book.title;
                const lean = i === shelf.books.length - 1 && s % 2 === 0;
                return (
                  <li key={book.title} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-controls="library-card"
                    onMouseEnter={() => hoverSelect({ book, shelf: shelf.name })}
                    onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                    onFocus={() => setSelected({ book, shelf: shelf.name })}
                    onClick={() => setSelected({ book, shelf: shelf.name })}
                    className={`group relative block rounded-[2px_3px_1px_1px] transition-transform duration-300 ease-out focus-visible:outline-offset-2 ${
                      active ? "-translate-y-3" : "hover:-translate-y-2"
                    } ${lean ? "origin-bottom-right rotate-[5deg]" : ""}`}
                    style={{
                      ...bookStyle(book.title, i),
                      backgroundImage:
                        "linear-gradient(90deg, rgb(0 0 0/0.42) 0%, rgb(255 240 210/0.08) 16%, rgb(255 240 210/0.16) 38%, rgb(0 0 0/0.04) 70%, rgb(0 0 0/0.45) 100%)",
                      boxShadow: "inset 0 -2px 0 rgb(0 0 0/0.3), 1px 0 0 rgb(0 0 0/0.35)",
                    }}
                  >
                    <span aria-hidden="true" className="absolute inset-x-[3px] top-[10px] h-[5px] border-y border-[#c9a35a]/70" />
                    <span aria-hidden="true" className="absolute inset-x-[3px] bottom-[10px] h-[5px] border-y border-[#c9a35a]/70" />
                    <span
                      className="smallcaps absolute inset-x-0 bottom-[22px] top-[22px] flex items-center justify-center overflow-hidden text-[calc(13px*var(--k))] tracking-[0.06em] text-[#e9cf93] [text-shadow:0_1px_0_rgb(0_0_0/0.6)] [writing-mode:vertical-rl]"
                    >
                      {book.title}
                    </span>
                  </button>
                  </li>
                );
              })}
            </ul>
            {/* the shelf */}
            <div
              className="relative h-[13px] rounded-[1px]"
              style={{
                background: "linear-gradient(#7a5131, #5b3a21 60%, #43291a)",
                boxShadow: "0 9px 12px -6px rgb(43 27 16/0.55), inset 0 1px 0 rgb(255 220 170/0.25)",
              }}
            >
              <span className="smallcaps absolute left-1/2 top-[3px] -translate-x-1/2 whitespace-nowrap rounded-[1px] bg-[linear-gradient(#e2c27a,#b48d3f)] px-2 text-[8.5px] leading-[9px] tracking-[0.2em] text-[#3b2618] shadow-[0_1px_1px_rgb(0_0_0/0.4)]">
                {shelf.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Room>
  );
}

function LibraryCard({ selected }: { selected: Selected }) {
  const { book, shelf } = selected;
  return (
    <div
      data-ink
      className="relative -rotate-1 bg-[#f6ecd3] px-6 pb-5 pt-4 shadow-[3px_4px_0_rgb(43_27_16/0.14)] lg:mt-2"
      style={{
        backgroundImage: "repeating-linear-gradient(transparent 0 27px, rgb(87 64 45/0.16) 27px 28px)",
        backgroundPosition: "0 60px",
      }}
      id="library-card"
    >
      <div className="absolute inset-x-0 top-[52px] h-px bg-blood/50" aria-hidden="true" />
      <span className="absolute right-4 top-4 h-3 w-3 rounded-full bg-[#d8c296] shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)]" aria-hidden="true" />
      <p className="smallcaps m-0 text-[10.5px] text-ink-faint">Library of Manthan Mehta · borrowing card</p>
      <p className="m-0 mt-2 font-display text-[26px] leading-none">{book.title}</p>
      <p className="m-0 mt-4 font-display text-[14px] italic text-ink-faint">Shelved under {shelf}</p>
      <div className="mt-1 grid grid-cols-[1fr_auto] text-[11px]">
        <span className="smallcaps text-ink-faint">Borrowed by</span>
        <span className="smallcaps text-ink-faint">Year</span>
      </div>
      <ul key={book.title} className="m-0 min-h-[84px] list-none p-0">
        {book.uses?.length ? (
          book.uses.map((u, i) => (
            <li
              key={u.by}
              className="fade-up grid h-[28px] grid-cols-[1fr_auto] items-end font-hand text-[17px] leading-none"
              style={d(0.08 * i)}
            >
              <span>{u.by}</span>
              <span className="smallcaps -rotate-6 text-[12px] text-blood">{u.year}</span>
            </li>
          ))
        ) : (
          <li className="fade-up pt-1 font-hand text-[16px] leading-[28px] text-ink-soft">
            In the toolkit, but nothing on this map has borrowed it yet. Ask me about it.
          </li>
        )}
      </ul>
    </div>
  );
}
