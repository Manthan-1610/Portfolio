"use client";

import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Wand2, Compass } from "lucide-react";

interface GatefoldCoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function GatefoldCover({ isOpen, onOpen }: GatefoldCoverProps) {
  const handleReveal = () => {
    // Golden sparks burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#F4D37A", "#C5A55A", "#8E712B", "#FAF4E5"],
        shapes: ["circle"],
        ticks: 150,
      });
    } catch {
      // fallback if confetti fails
    }
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#120A05]/95 gatefold-perspective overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.6 } }}
        >
          {/* Outer Gatefold Map Wrapper (Centered Parchment Folder) */}
          <div className="relative w-[92vw] max-w-5xl h-[88vh] max-h-[820px] preserve-3d flex shadow-2xl rounded-sm overflow-hidden">
            {/* Left Folding Flap */}
            <motion.div
              className="relative w-1/2 h-full parchment-texture border-r border-[#6E4826]/40 flex flex-col justify-between p-6 md:p-12 select-none"
              style={{
                transformOrigin: "left center",
                boxShadow: "inset -15px 0 25px rgba(50, 25, 10, 0.25)",
              }}
              exit={{
                rotateY: -115,
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {/* Left Castle Turret Architectural Line Art */}
              <div className="absolute inset-0 pointer-events-none opacity-25 p-8 flex items-center justify-center">
                <svg viewBox="0 0 300 600" className="w-full h-full stroke-[#4A2D1C] fill-none stroke-[1.2]">
                  {/* Left Gothic Tower Blueprint */}
                  <path d="M 60 550 L 60 180 L 120 120 L 180 180 L 180 550" />
                  <path d="M 40 220 L 200 220" />
                  <path d="M 50 320 L 190 320" />
                  <path d="M 60 420 L 180 420" />
                  {/* Turret Spire */}
                  <path d="M 120 120 L 120 40 L 125 40 L 120 120" strokeWidth="2" />
                  {/* Arch Window */}
                  <path d="M 100 250 A 20 20 0 0 1 140 250 L 140 290 L 100 290 Z" />
                  <path d="M 100 350 A 20 20 0 0 1 140 350 L 140 390 L 100 390 Z" />
                  {/* Medieval Hatching */}
                  <line x1="65" y1="200" x2="85" y2="220" />
                  <line x1="85" y1="200" x2="105" y2="220" />
                  <line x1="135" y1="200" x2="155" y2="220" />
                  <line x1="155" y1="200" x2="175" y2="220" />
                </svg>
              </div>

              {/* Top Left Dedication */}
              <div className="relative z-10 text-left">
                <p className="font-banner text-xs md:text-sm tracking-widest text-[#4A2D1C] font-semibold uppercase">
                  Messrs. Mehta & Co.
                </p>
                <p className="font-body italic text-xs md:text-sm text-[#3F2516] font-medium mt-1">
                  Purveyors of Aids to Magical Engineers
                </p>
              </div>

              {/* Left Corridor Blueprint Details */}
              <div className="relative z-10 text-left pl-2">
                <p className="font-title text-sm tracking-widest text-[#8E712B] uppercase font-bold">
                  Hogwarts Castle
                </p>
                <p className="font-banner text-xs text-[#4A2D1C] font-semibold tracking-wider mt-0.5">
                  Seven Floors &bull; Secret Passageways
                </p>
              </div>

              {/* Bottom Left Latin Crest */}
              <div className="relative z-10 text-left">
                <p className="font-body text-[12px] md:text-xs text-[#4A2D1C] italic font-medium">
                  &ldquo;Draco Dormiens Nunquam Titillandus&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right Folding Flap */}
            <motion.div
              className="relative w-1/2 h-full parchment-texture border-l border-[#6E4826]/40 flex flex-col justify-between p-6 md:p-12 select-none"
              style={{
                transformOrigin: "right center",
                boxShadow: "inset 15px 0 25px rgba(50, 25, 10, 0.25)",
              }}
              exit={{
                rotateY: 115,
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {/* Right Castle Turret Architectural Line Art */}
              <div className="absolute inset-0 pointer-events-none opacity-25 p-8 flex items-center justify-center">
                <svg viewBox="0 0 300 600" className="w-full h-full stroke-[#4A2D1C] fill-none stroke-[1.2]">
                  {/* Right Gothic Tower Blueprint */}
                  <path d="M 120 550 L 120 180 L 180 120 L 240 180 L 240 550" />
                  <path d="M 100 220 L 260 220" />
                  <path d="M 110 320 L 250 320" />
                  <path d="M 120 420 L 240 420" />
                  {/* Turret Spire */}
                  <path d="M 180 120 L 180 40 L 185 40 L 180 120" strokeWidth="2" />
                  {/* Arch Window */}
                  <path d="M 160 250 A 20 20 0 0 1 200 250 L 200 290 L 160 290 Z" />
                  <path d="M 160 350 A 20 20 0 0 1 200 350 L 200 390 L 160 390 Z" />
                  {/* Medieval Hatching */}
                  <line x1="125" y1="200" x2="145" y2="220" />
                  <line x1="145" y1="200" x2="165" y2="220" />
                  <line x1="195" y1="200" x2="215" y2="220" />
                  <line x1="215" y1="200" x2="235" y2="220" />
                </svg>
              </div>

              {/* Top Right Subtitle */}
              <div className="relative z-10 text-right">
                <p className="font-banner text-xs md:text-sm tracking-widest text-[#4A2D1C] font-semibold uppercase">
                  Are Proud to Present
                </p>
                <p className="font-body italic text-xs md:text-sm text-[#3F2516] font-medium mt-1">
                  The Complete Technical Dossier
                </p>
              </div>

              {/* Right Grimoire Dedication */}
              <div className="relative z-10 text-right pr-2">
                <p className="font-title text-sm tracking-widest text-[#8E712B] uppercase font-bold">
                  Architectural Grimoire
                </p>
                <p className="font-banner text-xs text-[#4A2D1C] font-semibold tracking-wider mt-0.5">
                  Full-Stack &bull; Generative AI
                </p>
              </div>

              {/* Bottom Right ASU Emblem */}
              <div className="relative z-10 text-right">
                <p className="font-body text-[12px] md:text-xs text-[#4A2D1C] italic font-medium">
                  ASU MS CSE &bull; New Grad 2027
                </p>
              </div>
            </motion.div>

            {/* Central Parchment Wax Oath Seal (Positioned over the seam) */}
            <motion.div
              className="absolute inset-0 m-auto w-[92%] max-w-lg h-auto z-30 flex flex-col items-center justify-center p-6 text-center"
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.5 },
              }}
            >
              {/* Parchment Ribbon Badge */}
              <div className="w-full bg-[#FAF4E5] border-2 border-[#8E712B] rounded-lg shadow-2xl p-6 sm:p-8 relative">
                {/* Vintage Corner Brackets */}
                <span className="absolute top-1 left-2 text-[#8E712B] text-xs font-serif">&#10019;</span>
                <span className="absolute top-1 right-2 text-[#8E712B] text-xs font-serif">&#10019;</span>
                <span className="absolute bottom-1 left-2 text-[#8E712B] text-xs font-serif">&#10019;</span>
                <span className="absolute bottom-1 right-2 text-[#8E712B] text-xs font-serif">&#10019;</span>

                <div className="flex items-center justify-center gap-2 mb-1 text-[#8E712B]">
                  <Compass className="w-3.5 h-3.5 text-[#8E712B]" />
                  <span className="font-banner text-xs uppercase tracking-widest text-[#704E37]">
                    Tap with Wand to Unlock
                  </span>
                  <Wand2 className="w-3.5 h-3.5 text-[#8E712B]" />
                </div>

                <h1 className="font-title text-2xl sm:text-3xl md:text-4xl text-[#24140D] font-extrabold tracking-wide mt-1 mb-0.5">
                  THE MARAUDER&apos;S MAP
                </h1>
                <p className="font-banner text-[11px] uppercase tracking-widest text-[#7E1815] font-semibold mb-2">
                  Hogwarts Software Archives
                </p>

                <p className="font-handwriting text-2xl md:text-3xl text-[#24140D] font-bold leading-snug py-1">
                  &ldquo;I solemnly swear that I am up to no good.&rdquo;
                </p>

                <p className="font-body italic text-xs text-[#704E37] mb-4">
                  Revealing the engineering projects, Google AI robotics internship, and achievements of Manthan Mehta
                </p>

                {/* Primary Magical Action Button */}
                <button
                  onClick={handleReveal}
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full wax-seal text-[#FAF4E5] font-banner text-sm tracking-wide transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                >
                  <Wand2 className="w-4 h-4 text-[#F4D37A] transition-transform group-hover:-rotate-12 group-hover:scale-110" />
                  <span>Reveal Map</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
