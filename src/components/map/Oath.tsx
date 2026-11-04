"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Returning visitors (within 30 days) skip the oath: the boot script in
// layout.tsx marks <html> with `sworn-init` before first paint.
function subscribeToRootClass(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
const readSwornInit = () => document.documentElement.classList.contains("sworn-init");
const serverSwornInit = () => false;

const AUTO_REVEAL_MS = 5600;
const IGNORED_KEYS = new Set(["Tab", "Shift", "Control", "Alt", "Meta", "CapsLock"]);

type Phase = "sealed" | "revealing" | "open" | "closing-start" | "closing" | "managed";

/**
 * The blank parchment that greets visitors. Tapping it spreads ink out from the
 * point of contact and reveals the map; "Mischief managed" runs it in reverse.
 */
export default function Oath() {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [round, setRound] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  // Click, key and wheel can all fire in the same tick; reveal only once.
  const started = useRef(false);
  const swornInit = useSyncExternalStore(subscribeToRootClass, readSwornInit, serverSwornInit);
  // A returning visitor's map is already open, even though `phase` starts sealed.
  const isOpen = phase === "open" || (phase === "sealed" && swornInit);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    if (!readSwornInit()) buttonRef.current?.focus({ preventScroll: true });
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reveal = useCallback(
    (x: number, y: number) => {
      if (phase !== "sealed" || started.current || readSwornInit()) return;
      started.current = true;
      const root = document.documentElement;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOrigin({ x, y });
      setPhase("revealing");
      root.classList.remove("sealed");
      later(() => root.classList.add("sworn"), reduce ? 0 : 320);
      later(() => {
        setPhase("open");
        try {
          localStorage.setItem("sworn", String(Date.now()));
        } catch {}
      }, reduce ? 50 : 1950);
    },
    [phase],
  );

  // "Mischief managed" — from the footer button or the typed spell.
  useEffect(() => {
    const onManaged = (e: Event) => {
      if (!isOpen) return;
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const root = document.documentElement;
      root.classList.remove("sworn-init");
      setOrigin({ x, y });
      setPhase("closing-start");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("closing")));
      later(() => {
        setPhase("managed");
        root.classList.remove("sworn", "sworn-init", "lumos");
        root.classList.add("sealed");
        try {
          localStorage.removeItem("sworn");
        } catch {}
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 1550);
      later(() => {
        started.current = false;
        setRound((r) => r + 1);
        setPhase("sealed");
        buttonRef.current?.focus({ preventScroll: true });
      }, 4400);
    };
    window.addEventListener("mischief-managed", onManaged);
    return () => window.removeEventListener("mischief-managed", onManaged);
  }, [isOpen]);

  // While sealed, the map underneath must not be reachable by keyboard or
  // screen reader.
  useEffect(() => {
    if (isOpen) return;
    const self = rootRef.current;
    const others = Array.from(document.body.children).filter(
      (el) => self && el !== self && !el.contains(self) && el.tagName !== "SCRIPT",
    );
    others.forEach((el) => el.setAttribute("inert", ""));
    return () => others.forEach((el) => el.removeAttribute("inert"));
  }, [isOpen]);

  // Any attempt to get at the map opens it: a key, a scroll, a swipe. On the
  // first visit it also opens by itself, so no one is stuck at the door.
  useEffect(() => {
    if (phase !== "sealed" || swornInit) return;
    const center = () => reveal(innerWidth / 2, innerHeight / 2);
    const onKey = (e: KeyboardEvent) => {
      if (IGNORED_KEYS.has(e.key) || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      center();
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) center();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) reveal(t.clientX, t.clientY);
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const auto = round === 0 && !reduce ? window.setTimeout(center, AUTO_REVEAL_MS) : undefined;
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.clearTimeout(auto);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [phase, swornInit, reveal, round]);

  if (isOpen) return null;

  const showOath = phase === "sealed" || phase === "revealing";

  return (
    <div
      ref={rootRef}
      className="oath paper no-print"
      data-phase={phase}
      style={{ "--x": `${origin.x}px`, "--y": `${origin.y}px` } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label="The Map of Manthan Mehta"
    >
      <button
        ref={buttonRef}
        type="button"
        className="absolute inset-0 h-full w-full outline-none"
        aria-label="Reveal the map"
        onClick={(e) => reveal(e.detail === 0 ? innerWidth / 2 : e.clientX, e.detail === 0 ? innerHeight / 2 : e.clientY)}
        tabIndex={showOath ? 0 : -1}
      />

      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center px-6 text-center">
        {showOath ? (
          <div key={`oath-${round}`} className="flex flex-col items-center">
            <p className="fade-up smallcaps text-[11px] text-ink-faint sm:text-xs" style={{ "--d": "0.05s" } as React.CSSProperties}>
              The portfolio of Manthan Mehta · software engineer
            </p>

            <p className="mt-10 font-script leading-[1.05] text-ink">
              <span
                className="write block text-[clamp(52px,9vw,112px)]"
                style={{ "--d": "0.25s", "--dur": "1.15s" } as React.CSSProperties}
              >
                I solemnly swear
              </span>
              <span
                className="write -mt-2 block text-[clamp(44px,7.4vw,96px)] sm:pl-[1.2em]"
                style={{ "--d": "1.2s", "--dur": "1.3s" } as React.CSSProperties}
              >
                that I am up to no good.
              </span>
            </p>

            <svg
              viewBox="0 0 300 24"
              className="fade-up mt-4 w-[min(300px,70vw)] text-ink/60"
              style={{ "--d": "2.3s" } as React.CSSProperties}
              aria-hidden="true"
            >
              <path
                d="M4 14 C 60 4, 110 22, 150 12 S 240 6, 296 14 M138 12 c 6 -10 18 -10 24 0 c -6 10 -18 10 -24 0 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                filter="url(#wobble)"
              />
            </svg>

            <p className="fade-up mt-6 font-display text-lg italic text-ink-soft sm:text-xl" style={{ "--d": "2.5s" } as React.CSSProperties}>
              <span className="only-hover">Touch your wand to the parchment</span>
              <span className="only-touch">Tap the parchment with your wand</span>
            </p>
            <p className="fade-up only-hover smallcaps mt-2 text-[11px] text-ink-faint" style={{ "--d": "2.7s" } as React.CSSProperties}>
              or simply scroll
            </p>
          </div>
        ) : phase === "managed" ? (
          <p className="font-script text-[clamp(52px,9vw,110px)] leading-none text-ink">
            <span className="write block" style={{ "--d": "0.1s", "--dur": "1.6s" } as React.CSSProperties}>
              Mischief managed.
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
