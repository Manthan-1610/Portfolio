"use client";

import { useEffect, useRef, useState } from "react";

const SPELLS: Record<string, string> = {
  lumos: "Lumos",
  nox: "Nox",
  mischiefmanaged: "Mischief managed",
};

/**
 * The visitor's wand: tracks the pointer into --mx/--my (used by the warm
 * light and by invisible ink), and listens for spells typed on the keyboard.
 */
export default function Wand() {
  const [toast, setToast] = useState<{ word: string; key: number } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let x = -9999;
    let y = -9999;

    // Only a handful of elements read the wand's position. Writing it on
    // <html> would make every element on the page re-resolve its styles on
    // each pointer move (custom properties inherit), so write it on them
    // directly. Both collections are live, so nothing needs re-querying.
    const light = document.getElementsByClassName("wand-light");
    const ink = document.getElementsByClassName("invisible-ink");
    const paint = () => {
      frame = 0;
      for (const list of [light, ink]) {
        for (let i = 0; i < list.length; i++) {
          const s = (list[i] as HTMLElement).style;
          s.setProperty("--mx", `${x}px`);
          s.setProperty("--my", `${y}px`);
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      x = -9999;
      y = -9999;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    let buffer = "";
    const cast = (spell: string) => {
      if (spell === "lumos") root.classList.add("lumos");
      if (spell === "nox") root.classList.remove("lumos");
      if (spell === "mischiefmanaged") {
        root.classList.remove("lumos");
        window.dispatchEvent(new CustomEvent("mischief-managed", { detail: { x: innerWidth / 2, y: innerHeight / 2 } }));
      }
      setToast({ word: SPELLS[spell], key: Date.now() });
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2200);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key.toLowerCase()).replace(/[^a-z]/g, "").slice(-20);
      for (const spell of Object.keys(SPELLS)) {
        if (buffer.endsWith(spell)) {
          buffer = "";
          cast(spell);
          break;
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <>
      <div className="wand-light" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-10 z-[85] flex justify-center">
        {toast && (
          <span key={toast.key} className="fade-up font-script text-6xl text-blood drop-shadow-[0_1px_0_rgb(255_240_210/0.8)]">
            {toast.word}
          </span>
        )}
      </div>
    </>
  );
}
