"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Feather, RotateCcw, Sparkles } from "lucide-react";

export type SpellType = "lumos" | "leviosa" | "finite";

interface MagicalSpellcastOverlayProps {
  activeSpell: "lumos" | "leviosa" | null;
  lastCastSpell: SpellType | null;
  onCastSpell: (spell: SpellType) => void;
}

// Gentle Web Audio API synthesizer for authentic magical spell sounds
export const playMagicalSpellSound = (spell: SpellType) => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    if (spell === "lumos") {
      // Lumos: Rising celestial wand whoosh + brilliant harmonic chime (C5 - E5 - G5 - C6)
      // Wand whoosh
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.4);

      // Celestial Chimes
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.08);

        gain.gain.setValueAtTime(0, now + 0.15 + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.15 + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15 + idx * 0.08 + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + 0.15 + idx * 0.08);
        osc.stop(now + 0.15 + idx * 0.08 + 1.5);
      });
    } else if (spell === "leviosa") {
      // Wingardium Leviosa: "Swish & Flick" whoosh + rising ethereal glissando
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";

      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.65);
      osc.frequency.exponentialRampToValueAtTime(1396.91, now + 0.9);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.4);
    } else if (spell === "finite") {
      // Finite Incantatem: Wand slash snap + descending counter-spell resolve
      const freqs = [987.77, 783.99, 659.25, 523.25, 392.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 1.1);
      });
    }
  } catch {
    // Graceful fallback
  }
};

export default function MagicalSpellcastOverlay({
  activeSpell,
  lastCastSpell,
  onCastSpell,
}: MagicalSpellcastOverlayProps) {
  const [animatingSpell, setAnimatingSpell] = useState<SpellType | null>(null);

  useEffect(() => {
    if (!lastCastSpell) return;
    setAnimatingSpell(lastCastSpell);

    // Keep animatic stage active for 2.2 seconds before dissolving
    const timer = setTimeout(() => {
      setAnimatingSpell(null);
    }, 2200);

    return () => clearTimeout(timer);
  }, [lastCastSpell]);

  return (
    <>
      {/* Cinematic Fullscreen Spell-Casting Stage */}
      <AnimatePresence>
        {animatingSpell && (
          <motion.div
            key={`spell-stage-${animatingSpell}`}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            {/* Atmospheric Vignette Backdrop */}
            <div className="absolute inset-0 bg-[#0E0703]/75 backdrop-blur-[3px] transition-opacity" />

            {/* Glowing Golden Arcane Sigil Ring (Hogwarts Runes) */}
            <motion.div
              className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none opacity-40"
              initial={{ scale: 0.5, rotate: -40, opacity: 0 }}
              animate={{
                scale: [0.5, 1.15, 1],
                rotate: 180,
                opacity: [0, 0.7, 0.3],
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#F4D37A] fill-none">
                <circle cx="200" cy="200" r="185" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx="200" cy="200" r="165" strokeWidth="2" />
                <circle cx="200" cy="200" r="135" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="200,35 342,280 58,280" strokeWidth="1" opacity="0.6" />
                <polygon points="200,365 58,120 342,120" strokeWidth="1" opacity="0.6" />
                {/* 4 Compass Points */}
                <line x1="200" y1="10" x2="200" y2="45" strokeWidth="2" />
                <line x1="200" y1="355" x2="200" y2="390" strokeWidth="2" />
                <line x1="10" y1="200" x2="45" y2="200" strokeWidth="2" />
                <line x1="355" y1="200" x2="390" y2="200" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Expansive Energy Shockwave Rings */}
            <motion.div
              className={`absolute rounded-full border-2 pointer-events-none ${
                animatingSpell === "lumos"
                  ? "border-[#F4D37A] shadow-[0_0_80px_#F4D37A]"
                  : animatingSpell === "leviosa"
                  ? "border-[#90E0EF] shadow-[0_0_80px_#90E0EF]"
                  : "border-[#9E221E] shadow-[0_0_80px_#9E221E]"
              }`}
              initial={{ width: 40, height: 40, opacity: 1, scale: 0.2 }}
              animate={{
                width: 900,
                height: 900,
                opacity: 0,
                scale: 2.2,
              }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            />

            {/* Wand Gesture & Spell Incantation Center Container */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl">
              {/* Animated Wand & Tip Glow Container */}
              <div className="relative w-48 h-40 flex items-center justify-center">
                <motion.div
                  className="relative w-[130px] h-[130px] flex items-center justify-center"
                  style={{ transformOrigin: "24px 106px" }}
                  initial={
                    animatingSpell === "lumos"
                      ? { rotate: -35, x: -30, y: 30, scale: 0.8 }
                      : animatingSpell === "leviosa"
                      ? { rotate: -65, x: -50, y: 15, scale: 0.85 }
                      : { rotate: 20, x: -20, y: -20, scale: 0.85 }
                  }
                  animate={
                    animatingSpell === "lumos"
                      ? {
                          rotate: [-35, -5, -22],
                          x: [-30, 15, 0],
                          y: [30, -15, 0],
                          scale: [0.8, 1.1, 1],
                        }
                      : animatingSpell === "leviosa"
                      ? {
                          // The Iconic "Swish and Flick": Swoop left, arc down, whip up!
                          rotate: [-65, -30, 25, -15],
                          x: [-50, -10, 30, 10],
                          y: [15, 35, -30, -10],
                          scale: [0.85, 1, 1.2, 1],
                        }
                      : {
                          // Finite Counter-Spell: Sharp diagonal slash!
                          rotate: [20, -55],
                          x: [-20, 35],
                          y: [-20, 25],
                          scale: [0.85, 1.15, 1],
                        }
                  }
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* SVG Elder Wood Wand */}
                  <svg
                    width="130"
                    height="130"
                    viewBox="0 0 130 130"
                    fill="none"
                    className="overflow-visible drop-shadow-2xl"
                  >
                    {/* Wand Shaft (Fine wood grain gradient) */}
                    <defs>
                      <linearGradient id="wandWood" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4A2D1C" />
                        <stop offset="50%" stopColor="#2E1A0F" />
                        <stop offset="100%" stopColor="#1A0D07" />
                      </linearGradient>
                      <linearGradient id="wandGrip" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C5A55A" />
                        <stop offset="100%" stopColor="#8E712B" />
                      </linearGradient>
                    </defs>

                    {/* Main Wand Shaft */}
                    <line
                      x1="12"
                      y1="118"
                      x2="118"
                      y2="12"
                      stroke="url(#wandWood)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                    {/* Handle grip carving */}
                    <line
                      x1="12"
                      y1="118"
                      x2="48"
                      y2="82"
                      stroke="#140A05"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    {/* Gold Filigree Rings */}
                    <circle cx="28" cy="102" r="3.5" fill="url(#wandGrip)" />
                    <circle cx="44" cy="86" r="3.5" fill="url(#wandGrip)" />
                    {/* Luminous Core Tip */}
                    <circle cx="118" cy="12" r="4.5" fill="#FFFDF8" stroke="#F4D37A" strokeWidth="2" />
                  </svg>

                  {/* Wand Tip Core Flare / Spell Orb - FIRMLY ANCHORED AT WAND TIP (cx=118, cy=12) */}
                  <motion.div
                    className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: "118px",
                      top: "12px",
                      width: animatingSpell === "lumos" ? "64px" : "52px",
                      height: animatingSpell === "lumos" ? "64px" : "52px",
                      background:
                        animatingSpell === "lumos"
                          ? "radial-gradient(circle, #FFFFFF 20%, #FFF2A3 50%, #F4D37A 80%, transparent 100%)"
                          : animatingSpell === "leviosa"
                          ? "radial-gradient(circle, #FFFFFF 20%, #90E0EF 60%, transparent 100%)"
                          : "radial-gradient(circle, #FFFFFF 25%, #FF4D4D 50%, #DC2626 75%, transparent 100%)",
                      boxShadow:
                        animatingSpell === "lumos"
                          ? "0 0 60px 25px rgba(244, 211, 122, 0.9), 0 0 100px 50px rgba(197, 165, 90, 0.6)"
                          : animatingSpell === "leviosa"
                          ? "0 0 40px 15px rgba(144, 224, 239, 0.7)"
                          : "0 0 50px 20px rgba(220, 38, 38, 0.9), 0 0 90px 40px rgba(185, 28, 28, 0.6)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: animatingSpell === "lumos" ? [0, 2.5, 3.5, 2] : [0, 2.2, 1.4],
                      opacity: [0, 1, 0.95, 0.6],
                    }}
                    transition={{ duration: 1.1, delay: 0.1 }}
                  />
                </motion.div>
              </div>

              {/* Leviosa Floating Animated Feathers */}
              {animatingSpell === "leviosa" && (
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3].map((f) => (
                    <motion.div
                      key={f}
                      className="absolute"
                      initial={{
                        x: (f - 1.5) * 60,
                        y: 40,
                        opacity: 0,
                        rotate: 0,
                        scale: 0.6,
                      }}
                      animate={{
                        x: (f - 1.5) * 85 + Math.sin(f) * 30,
                        y: -140 - f * 25,
                        opacity: [0, 1, 0.8, 0],
                        rotate: [0, 25 * (f % 2 === 0 ? 1 : -1), 45],
                        scale: 1,
                      }}
                      transition={{ duration: 1.6, delay: 0.2 + f * 0.15, ease: "easeOut" }}
                    >
                      <Feather className="w-8 h-8 text-[#FAF4E5] drop-shadow-[0_0_12px_#90E0EF]" />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* The Cinematic Harry Potter Incantation Seal */}
              <motion.div
                className="mt-4 bg-[#FAF4E5]/95 parchment-texture parchment-border rounded-2xl px-6 sm:px-10 py-4 sm:py-5 shadow-2xl border-2 border-[#8E712B]"
                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1 text-[#8E712B]">
                  <Sparkles className="w-4 h-4 text-[#C5A55A] animate-spin" style={{ animationDuration: "6s" }} />
                  <span className="font-banner text-[11px] sm:text-xs tracking-widest uppercase text-[#704E37] font-semibold">
                    ~ Hogwarts Incantation Cast ~
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C5A55A] animate-spin" style={{ animationDuration: "6s" }} />
                </div>

                <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24140D] tracking-wider my-1 drop-shadow-sm">
                  {animatingSpell === "lumos" && "LUMOS MAXIMA!"}
                  {animatingSpell === "leviosa" && "WINGARDIUM LEVIOSA!"}
                  {animatingSpell === "finite" && "FINITE INCANTATEM!"}
                </h2>

                <p className="font-body italic text-xs sm:text-sm text-[#4A2D1C] font-semibold max-w-sm mx-auto leading-relaxed mt-1">
                  {animatingSpell === "lumos" &&
                    "Radiant golden candlelight sweeps through the castle blueprint corridors."}
                  {animatingSpell === "leviosa" &&
                    "Swish and flick! The parchment project cards float in enchanted anti-gravity."}
                  {animatingSpell === "finite" &&
                    "The counter-curse settles upon the parchment, returning all magic to rest."}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Spell Controller Badge on the Map */}
      <AnimatePresence>
        {activeSpell && (
          <motion.div
            key="active-spell-badge"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="parchment-texture parchment-border rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-3 bg-[#FAF4E5] border border-[#8E712B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E6B47] animate-ping" />
                <span className="font-banner text-xs font-bold text-[#24140D] flex items-center gap-1.5">
                  {activeSpell === "lumos" ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#8E712B]" />
                      <span>Lumos Active</span>
                    </>
                  ) : (
                    <>
                      <Feather className="w-3.5 h-3.5 text-[#8E712B]" />
                      <span>Levitation Active</span>
                    </>
                  )}
                </span>
              </div>

              {/* Instant Dispel Button */}
              <button
                onClick={() => onCastSpell("finite")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#24140D]/10 hover:bg-[#7E1815] text-[#24140D] hover:text-[#FAF4E5] text-[11px] font-banner font-semibold transition-all cursor-pointer shadow-2xs"
                title="Dispel enchantment (Finite Incantatem)"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Dispel</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
