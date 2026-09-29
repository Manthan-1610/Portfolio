"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  X,
  Compass,
  ArrowRight,
  RotateCcw,
  Zap,
  Sun,
  Feather,
} from "lucide-react";

interface MaraudersSecretsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSpell: "lumos" | "leviosa" | null;
  onCastSpell: (spell: "lumos" | "leviosa" | "finite") => void;
}

export default function MaraudersSecretsDrawer({
  isOpen,
  onClose,
  activeSpell,
  onCastSpell,
}: MaraudersSecretsDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleTriggerSpell = (spell: "lumos" | "leviosa" | "finite") => {
    if (spell !== "finite" && activeSpell === spell) {
      onClose();
      return;
    }
    if (spell === "finite" && !activeSpell) {
      onClose();
      return;
    }
    onCastSpell(spell);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end overscroll-contain">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Slide-out Parchment Folio */}
        <motion.div
          className="relative w-full max-w-lg bg-[#F4EAD2] parchment-texture border-l-4 border-[#8E712B] h-full shadow-2xl flex flex-col z-10 overflow-hidden overscroll-contain"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
        >
          {/* Header Banner */}
          <div className="p-5 sm:p-6 border-b border-[#8E712B]/40 bg-[#FAF4E5]/80 shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full wax-seal text-[#FAF4E5] font-banner text-[10px] tracking-wider uppercase mb-1">
                  <Wand2 className="w-3 h-3 text-[#F4D37A]" />
                  <span>The Marauder&apos;s Secrets</span>
                </span>
                <h2 className="font-title text-xl sm:text-2xl font-bold text-[#24140D] tracking-wide">
                  The Spellcaster Console
                </h2>
                <p className="font-body text-xs sm:text-[13px] text-[#4A2D1C] font-medium mt-1">
                  Cast live enchantments that alter the physics, lighting, and atmosphere of the portfolio.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF4E5] border border-[#8E712B]/50 text-[#4A2D1C] flex items-center justify-center hover:bg-[#F4EAD2] transition-colors cursor-pointer shrink-0"
                aria-label="Close Spellcaster Console"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Spell Status Pill */}
            {activeSpell ? (
              <div className="mt-4 p-2.5 rounded-lg bg-[#7E1815]/10 border border-[#7E1815]/30 flex items-center justify-between text-xs font-banner text-[#7E1815] font-bold">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#7E1815] animate-pulse" />
                  <span>Active Incantation: {activeSpell === "lumos" ? "Lumos Maxima" : "Wingardium Leviosa"}</span>
                </span>
                <button
                  onClick={() => handleTriggerSpell("finite")}
                  className="text-[11px] underline hover:text-[#24140D] cursor-pointer"
                >
                  Dispel
                </button>
              </div>
            ) : (
              <div className="mt-4 p-2 rounded-lg bg-[#24140D]/5 border border-[#8E712B]/25 text-xs font-body text-[#4A2D1C] flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#8E712B]" />
                <span>No enchantments currently active on the parchment map.</span>
              </div>
            )}
          </div>

          {/* Drawer Body (Spells) */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-4 overscroll-contain">
            {/* Lumos Maxima */}
            <div className="p-5 rounded-xl border border-[#8E712B]/60 bg-[#FAF4E5] hover:border-[#8E712B] transition-all flex flex-col justify-between gap-3.5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-title text-base font-bold text-[#24140D] flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#8E712B]" />
                    <span>Lumos Maxima</span>
                  </span>
                  <span className="text-[11px] font-banner font-semibold px-2 py-0.5 rounded bg-[#FAF4E5] border border-[#8E712B]/35 text-[#3F2516]">
                    Radiant Illumination
                  </span>
                </div>
                <p className="font-body text-xs sm:text-[13px] text-[#361F12] mt-2 leading-relaxed">
                  Bathes the parchment in warm, radiant golden candlelight, causing the hidden castle blueprints and gilded borders to glow brightly.
                </p>
              </div>
              <button
                disabled={activeSpell === "lumos"}
                onClick={() => handleTriggerSpell("lumos")}
                className={`w-full py-2.5 rounded-lg font-banner text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                  activeSpell === "lumos"
                    ? "bg-[#24140D] text-[#F4D37A] border border-[#24140D] shadow-md opacity-85 cursor-default"
                    : "bg-[#24140D]/10 hover:bg-[#24140D] hover:text-[#FAF4E5] text-[#24140D] border border-[#8E712B]/40 cursor-pointer"
                }`}
              >
                <span>{activeSpell === "lumos" ? "Lumos Maxima (Currently Active)" : "Cast Lumos Maxima"}</span>
                {activeSpell === "lumos" ? (
                  <span className="w-2 h-2 rounded-full bg-[#F4D37A] animate-pulse" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Wingardium Leviosa */}
            <div className="p-5 rounded-xl border border-[#8E712B]/60 bg-[#FAF4E5] hover:border-[#8E712B] transition-all flex flex-col justify-between gap-3.5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-title text-base font-bold text-[#24140D] flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#8E712B]" />
                    <span>Wingardium Leviosa</span>
                  </span>
                  <span className="text-[11px] font-banner font-semibold px-2 py-0.5 rounded bg-[#FAF4E5] border border-[#8E712B]/35 text-[#3F2516]">
                    Zero-G Physics
                  </span>
                </div>
                <p className="font-body text-xs sm:text-[13px] text-[#361F12] mt-2 leading-relaxed">
                  Imbues all experience, project, and grimoire parchment cards with gentle, slow-floating levitation physics.
                </p>
              </div>
              <button
                disabled={activeSpell === "leviosa"}
                onClick={() => handleTriggerSpell("leviosa")}
                className={`w-full py-2.5 rounded-lg font-banner text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                  activeSpell === "leviosa"
                    ? "bg-[#24140D] text-[#F4D37A] border border-[#24140D] shadow-md opacity-85 cursor-default"
                    : "bg-[#24140D]/10 hover:bg-[#24140D] hover:text-[#FAF4E5] text-[#24140D] border border-[#8E712B]/40 cursor-pointer"
                }`}
              >
                <span>{activeSpell === "leviosa" ? "Wingardium Leviosa (Currently Active)" : "Cast Wingardium Leviosa"}</span>
                {activeSpell === "leviosa" ? (
                  <span className="w-2 h-2 rounded-full bg-[#90E0EF] animate-pulse" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Finite Incantatem (Reset) */}
            <button
              disabled={!activeSpell}
              onClick={() => handleTriggerSpell("finite")}
              className={`w-full py-3 rounded-lg border font-banner text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors mt-2 ${
                !activeSpell
                  ? "border-[#8E712B]/20 text-[#8E712B]/40 cursor-not-allowed bg-transparent"
                  : "border-[#8E712B]/40 text-[#4A2D1C] hover:text-[#24140D] hover:bg-[#FAF4E5] cursor-pointer"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Finite Incantatem (Dispel All Enchantments)</span>
            </button>
          </div>

          {/* Drawer Footer with Footprints & Close Reminder */}
          <div className="p-3.5 bg-[#FAF4E5]/95 border-t border-[#8E712B]/40 flex items-center justify-between text-xs font-body text-[#4A2D1C] shrink-0">
            <div className="flex items-center gap-1.5 italic">
              <Compass className="w-3.5 h-3.5 text-[#8E712B]" />
              <span>Tip: Type &ldquo;alohomora&rdquo; anywhere to open anytime</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#24140D]/10 font-mono text-[10px] text-[#24140D] border border-[#8E712B]/30">
              ESC to close
            </kbd>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
