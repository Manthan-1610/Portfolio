"use client";

import { useState } from "react";
import { Scroll, Map as MapIcon, Lock, Download, Mail, Compass, KeyRound, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

interface NavigationHeaderProps {
  isDossierMode: boolean;
  onToggleMode: () => void;
  onNavigateToRoom?: (id: string) => void;
  onSealMap: () => void;
  onOpenCommandPalette: () => void;
  onOpenSecrets: () => void;
}

export default function NavigationHeader({
  isDossierMode,
  onToggleMode,
  onNavigateToRoom,
  onSealMap,
  onOpenCommandPalette,
  onOpenSecrets,
}: NavigationHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigateToRoom) {
      onNavigateToRoom(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const navRooms = [
    { id: "great-hall", label: "Great Hall" },
    { id: "library", label: "Library" },
    { id: "corridors", label: "Corridors" },
    { id: "room-of-requirement", label: "Requirement" },
    { id: "trophy-room", label: "Trophies" },
    { id: "owlery", label: "Owlery" },
  ];

  return (
    <header className="sticky top-2 z-30 w-[96vw] max-w-7xl mx-auto mb-4">
      <div className="parchment-texture parchment-border rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
        {/* Main Bar */}
        <div className="flex items-center justify-between gap-2 lg:gap-3">
          {/* Brand / Logo */}
          <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
            <button
              onClick={() => scrollTo("great-hall")}
              className="text-left group cursor-pointer"
            >
              <span className="font-title text-sm sm:text-base md:text-lg font-bold text-[#24140D] tracking-wide block group-hover:text-[#8E712B] transition-colors leading-tight">
                Manthan Mehta
              </span>
              <span className="font-banner text-[9px] sm:text-[10px] tracking-wider text-[#704E37] uppercase block">
                The Marauder&apos;s Map
              </span>
            </button>

            {/* Quick Room Links (Desktop xl+) */}
            <nav className="hidden xl:flex items-center gap-0.5 border-l border-[#A88352]/40 pl-2.5">
              {navRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => scrollTo(room.id)}
                  className="font-banner text-[11px] px-2 py-1 text-[#4A2D1C] hover:text-[#24140D] hover:bg-[#FAF4E5]/80 rounded transition-all cursor-pointer whitespace-nowrap"
                >
                  {room.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Desktop & Laptop Navigation Controls (md+) */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0 pr-1">
            {/* Point Me Magical Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#8E712B]/70 bg-[#FAF4E5] text-[#24140D] hover:bg-[#F4EAD2] hover:border-[#8E712B] text-xs font-banner transition-all cursor-pointer shadow-xs group whitespace-nowrap"
              title="Cast 'Point Me' Command Palette (Cmd+K / Ctrl+K)"
            >
              <Compass className="w-3.5 h-3.5 text-[#8E712B] group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              <span className="font-bold">Point Me</span>
            </button>

            {/* Marauder's Secrets Easter Egg Trigger */}
            <button
              onClick={onOpenSecrets}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#8E712B]/70 bg-[#FAF4E5] text-[#24140D] hover:bg-[#F4EAD2] hover:border-[#8E712B] text-xs font-banner transition-all cursor-pointer shadow-xs group whitespace-nowrap"
              title="Unlock Marauder's Secrets Drawer (or type 'alohomora')"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#8E712B] group-hover:rotate-12 transition-transform duration-300 shrink-0" />
              <span className="font-bold">Secrets</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E1815] animate-pulse shrink-0" />
            </button>

            {/* Dual-Mode Toggle: Map vs Recruiter Dossier */}
            <button
              onClick={onToggleMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-banner transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                isDossierMode
                  ? "bg-[#24140D] text-[#F4EAD2] border-[#24140D]"
                  : "bg-[#FAF4E5] text-[#4A2D1C] border-[#8E712B] hover:bg-[#F4EAD2]"
              }`}
              title="Toggle between Interactive Map mode and High-Contrast Recruiter Dossier"
            >
              {isDossierMode ? (
                <>
                  <MapIcon className="w-3.5 h-3.5 text-[#F4D37A] shrink-0" />
                  <span>Map</span>
                </>
              ) : (
                <>
                  <Scroll className="w-3.5 h-3.5 text-[#8E712B] shrink-0" />
                  <span>Dossier</span>
                </>
              )}
            </button>

            {/* Resume PDF Download */}
            <a
              href="/api/download-resume"
              download="Manthan_Mehta_Resume.pdf"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg wax-seal text-[#FAF4E5] text-xs font-banner tracking-wide hover:scale-105 active:scale-95 transition-transform shadow-xs whitespace-nowrap shrink-0"
              title="Download Official PDF Resume"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Resume</span>
            </a>

            {/* Mischief Managed / Seal Map */}
            <button
              onClick={onSealMap}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#8E712B]/40 text-[#704E37] hover:text-[#24140D] hover:bg-[#FAF4E5] text-xs font-body italic transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Seal the map back with 'Mischief Managed'"
            >
              <Lock className="w-3.5 h-3.5 text-[#8E712B] shrink-0" />
              <span>Mischief Managed</span>
            </button>
          </div>

          {/* Mobile & Small Screen Action Bar (< md) */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Quick Mode Toggle */}
            <button
              onClick={onToggleMode}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-banner transition-all cursor-pointer shadow-xs ${
                isDossierMode
                  ? "bg-[#24140D] text-[#F4EAD2] border-[#24140D]"
                  : "bg-[#FAF4E5] text-[#4A2D1C] border-[#8E712B]"
              }`}
              title="Toggle Recruiter Dossier"
            >
              {isDossierMode ? (
                <>
                  <MapIcon className="w-3.5 h-3.5 text-[#F4D37A]" />
                  <span>Map</span>
                </>
              ) : (
                <>
                  <Scroll className="w-3.5 h-3.5 text-[#8E712B]" />
                  <span>Dossier</span>
                </>
              )}
            </button>

            {/* Quick Resume PDF */}
            <a
              href="/api/download-resume"
              download="Manthan_Mehta_Resume.pdf"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg wax-seal text-[#FAF4E5] text-xs font-banner tracking-wide shadow-xs active:scale-95"
              title="Download PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>

            {/* Mobile Hamburger / Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg border border-[#8E712B]/70 bg-[#FAF4E5] text-[#24140D] hover:bg-[#F4EAD2] transition-colors cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-[#7E1815]" />
              ) : (
                <Menu className="w-4 h-4 text-[#24140D]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Drawer (< md) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#8E712B]/35 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Spells & Action Shortcuts */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#8E712B]/70 bg-[#FAF4E5] text-[#24140D] text-xs font-banner font-bold shadow-xs active:scale-95"
              >
                <Compass className="w-3.5 h-3.5 text-[#8E712B]" />
                <span>Point Me</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSecrets();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#8E712B]/70 bg-[#FAF4E5] text-[#24140D] text-xs font-banner font-bold shadow-xs active:scale-95"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#8E712B]" />
                <span>Secrets</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7E1815] animate-pulse" />
              </button>
            </div>

            {/* Room Navigation Links */}
            <div className="bg-[#FAF4E5]/80 rounded-lg p-2 border border-[#8E712B]/30">
              <span className="text-[10px] font-banner uppercase tracking-wider text-[#704E37] font-semibold block px-2 mb-1.5">
                Navigate Castle Rooms
              </span>
              <div className="grid grid-cols-2 gap-1">
                {navRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => scrollTo(room.id)}
                    className="text-left font-banner text-xs py-1.5 px-2.5 text-[#4A2D1C] hover:text-[#24140D] hover:bg-[#F4EAD2] rounded transition-colors"
                  >
                    &bull; {room.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Row: Seal Map & Socials */}
            <div className="flex items-center justify-between pt-1 border-t border-[#8E712B]/20">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSealMap();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8E712B]/40 text-[#704E37] hover:text-[#24140D] text-xs font-body italic"
              >
                <Lock className="w-3.5 h-3.5 text-[#8E712B]" />
                <span>Mischief Managed</span>
              </button>

              <div className="flex items-center gap-1">
                <a
                  href="https://github.com/Manthan-1610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#4A2D1C] hover:text-[#24140D]"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/manthan-mehta-7a341622b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#4A2D1C] hover:text-[#24140D]"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:mmanthan780@gmail.com"
                  className="p-2 text-[#4A2D1C] hover:text-[#24140D]"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
