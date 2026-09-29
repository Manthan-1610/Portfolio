"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function WandCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("wand-cursor-active");

    let nextId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trailing sparkles occasionally
      if (Math.random() > 0.65) {
        const newSparkle: Sparkle = {
          id: nextId++,
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          size: Math.random() * 4 + 2,
          opacity: 0.9,
        };

        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Fade out sparkles over time
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.08, size: s.size * 0.94 }))
          .filter((s) => s.opacity > 0)
      );
    }, 40);

    return () => {
      document.body.classList.remove("wand-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Sparkles trailing behind the wand */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: "#F4D37A",
            boxShadow: `0 0 ${s.size * 2}px #F4D37A, 0 0 ${s.size * 4}px #C5A55A`,
            opacity: s.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Wand cursor representation */}
      <div
        className="absolute pointer-events-none transition-transform duration-75"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(0px, 0px) rotate(${isClicking ? "-25deg" : "-15deg"}) scale(${
            isClicking ? 0.95 : 1
          })`,
          transformOrigin: "0 0",
        }}
      >
        {/* Glowing Lumos Tip */}
        <div
          className="absolute w-3 h-3 rounded-full -left-1.5 -top-1.5 animate-pulse"
          style={{
            background: "radial-gradient(circle, #FFFFFF 20%, #F4D37A 60%, transparent 100%)",
            boxShadow: isClicking
              ? "0 0 16px 6px #F4D37A, 0 0 30px 10px #C5A55A"
              : "0 0 10px 3px rgba(244, 211, 122, 0.7)",
          }}
        />

        {/* Slender Wood Wand Shaft (Coded SVG, sleek and elegant) */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="overflow-visible">
          {/* Wand shaft */}
          <line
            x1="1"
            y1="1"
            x2="32"
            y2="32"
            stroke="#3D2314"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Wand handle grip rings */}
          <line
            x1="22"
            y1="22"
            x2="32"
            y2="32"
            stroke="#1C110A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="24"
            y1="24"
            x2="26"
            y2="26"
            stroke="#C5A55A"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
