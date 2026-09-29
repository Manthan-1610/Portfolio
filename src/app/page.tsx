"use client";

import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import WandCursor from "@/components/WandCursor";
import MarauderCanvas from "@/components/MarauderCanvas";
import GatefoldCover from "@/components/GatefoldCover";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementGallery from "@/components/AchievementGallery";
import ContactFooter from "@/components/ContactFooter";
import RecruiterDossier from "@/components/RecruiterDossier";
import CommandPalette from "@/components/CommandPalette";
import MaraudersSecretsDrawer from "@/components/MaraudersSecretsDrawer";
import MagicalSpellcastOverlay, {
  playMagicalSpellSound,
  type SpellType,
} from "@/components/MagicalSpellcastOverlay";

export default function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDossierMode, setIsDossierMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSecretsDrawerOpen, setIsSecretsDrawerOpen] = useState(false);
  const [activeSpell, setActiveSpell] = useState<"lumos" | "leviosa" | null>(null);
  const [lastCastSpell, setLastCastSpell] = useState<SpellType | null>(null);

  // Alohomora Secret Easter Egg Keyboard Listener
  useEffect(() => {
    let keyBuffer = "";
    const handleKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) {
        keyBuffer = keyBuffer.slice(-20);
      }
      if (keyBuffer.endsWith("alohomora")) {
        if (!isMapOpen) setIsMapOpen(true);
        setIsSecretsDrawerOpen(true);
        keyBuffer = "";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMapOpen]);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleSealMap = () => {
    setIsMapOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleMode = () => {
    setIsDossierMode((prev) => {
      const nextMode = !prev;
      // Reset scroll position to top so new view opens cleanly at the top
      window.scrollTo({ top: 0, behavior: "instant" });
      return nextMode;
    });
  };

  const handleNavigateToRoom = (roomId: string) => {
    if (isDossierMode) {
      setIsDossierMode(false);
      setTimeout(() => {
        const el = document.getElementById(roomId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      const el = document.getElementById(roomId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleOpenCommandPalette = () => {
    if (!isMapOpen) {
      setIsMapOpen(true);
    }
    setIsCommandPaletteOpen(true);
  };

  const handleOpenSecrets = () => {
    if (!isMapOpen) {
      setIsMapOpen(true);
    }
    setIsSecretsDrawerOpen(true);
  };

  const handleCastSpell = (spell: "lumos" | "leviosa" | "finite") => {
    // Prevent re-triggering sound and animation if the spell is already active
    if (spell !== "finite" && activeSpell === spell) {
      return;
    }

    // Prevent dispelling if no spell is currently active
    if (spell === "finite" && !activeSpell) {
      return;
    }

    // 1. Play authentic Harry Potter spell sound effect via Web Audio
    playMagicalSpellSound(spell);

    // 2. Trigger incantation and animatic wand gesture sequence
    setLastCastSpell(spell);

    // 3. Update the active parchment physics/lighting state
    if (spell === "finite") {
      setActiveSpell(null);
    } else {
      setActiveSpell(spell);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#140D07] text-[#2A1810]">
      {/* SVG Ink Bleed Filter Definition */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="ink-bleed-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="paperNoise" />
            <feDisplacementMap in="SourceGraphic" in2="paperNoise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="displacedInk" />
            <feGaussianBlur in="displacedInk" stdDeviation="0.25" result="blurredInk" />
            <feComponentTransfer in="blurredInk" result="crispInk">
              <feFuncA type="linear" slope="1.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="crispInk" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Screen Reader & ATS Hidden Plain-Text Resume */}
      <div className="sr-only" aria-label="Full Plain Resume for ATS Systems">
        <h1>Manthan Mehta</h1>
        <p>Full-Stack &amp; AI Software Engineer</p>
        <p>Phone: +1 (480) 809-7588 | Email: mmanthan780@gmail.com | Tempe, AZ | LinkedIn: linkedin.com/in/manthan-mehta-7a341622b/</p>
        <h2>Education</h2>
        <p>Arizona State University — Master of Science in Computer Software Engineering — Expected May 2027</p>
        <p>Ganpat University — Bachelor of Technology in Information Technology (Gold Medalist) — Aug 2021 – Jun 2025</p>
        <h2>Technical Skills</h2>
        <p>Languages &amp; Core CS: Python, JavaScript, C/C++, HTML/CSS, Data Structures &amp; Algorithms, OOP</p>
        <p>Frameworks &amp; Libraries: React.js, Flask, Django, FastAPI, LangChain, TensorFlow Lite, RESTful APIs, Cypress, Bazel, Unity, Meta Quest SDK</p>
        <p>AI &amp; Machine Learning: Gemini APIs, Generative AI, Embedding Models, HuggingFace, DB-GPT, Tesseract OCR, JetSki Agents, Computer Vision, Temporal Convolutional Networks (TCN)</p>
        <p>Cloud &amp; DevOps: Google Cloud Platform (GCP), AWS, Azure, Docker, GitHub Actions (CI/CD), Firebase, Git/GitHub</p>
        <h2>Professional Experience</h2>
        <p>ASU MeshLabs — AI Integration Engineer (Aug 2026 – Present)</p>
        <p>Developed a VR-based conduit bending learning experience, achieving 94% gesture classification accuracy by engineering a hybrid physical action recognition system combining Temporal Convolutional Networks (TCN) and rule-based heuristics. Engineered dynamic behavioral AI for virtual instructors, driving a 35% reduction in trainee error rates by integrating real-time player tracking data with contextual dialogue and scoring systems in Unity. Built custom data pipeline automation tools, yielding a 50% decrease in model training lifecycle times by scripting Python workflows to parse raw GoPro reference videos.</p>
        <p>Intrinsic (An AI Robotics Company at Google) — Software Engineer Intern (May 2026 – Aug 2026)</p>
        <p>Delivered 92% reduction in triage time (under 5 minutes) by engineering an Agentic AI CLI using Gemini LLMs and Chain-of-Thought prompting. Saved 2 hours daily oncall by building an automated Postsubmit Failure Analysis system parsing 100+ workflow runs. Reclaimed 4 hours per release cycle via autonomous Buganizer and PR automation pipeline.</p>
        <p>Prama — Software Engineer Intern (Jan 2025 – Jun 2025)</p>
        <p>Recorded 35% increase in conversational flow reliability &amp; response accuracy across multiple AI chatbots. Scaled backend handling 10,000+ daily requests with 99.9% uptime using Python, Flask, FastAPI REST endpoints. Reduced bounce rates by 25% with mobile-first React.js web components.</p>
        <h2>Technical Projects</h2>
        <p>HealthSync: Full-Stack Healthcare Platform — Python, Gemini AI, Tesseract OCR, Flask. 60% boost in medication adherence, 90%+ extraction accuracy.</p>
        <p>Smart Attendance &amp; Analytics System — Python, Neural Networks, REST APIs, DB-GPT. 1st Place Gateway Group Hackathon (defeating 50+ teams), 40% speed boost, 25% accuracy gain.</p>
        <p>Rabbit Robot: Autonomous Sensing System — C++, TensorFlow Lite, ESP32, PID Control, LiDAR. All India Rank 9 (Top 6% of 150+ teams) at DD Robocon, 85% target hit rate, 95% anomaly detection accuracy.</p>
        <h2>Achievements</h2>
        <p>Bachelor of Technology in Information Technology Gold Medalist — Ganpat University</p>
        <p>1st Place Winner at Gateway Group Hackathon (Defeated 50+ teams)</p>
        <p>All India Rank 9 (Top 6% among 150+ teams) in DD Robocon National Championship Finals</p>
        <p>Side Quest Winner at Major League Hacking (MLH)</p>
        <p>1st Place at Tech Innovation Hackathon</p>
      </div>

      {/* 3D Gatefold Parchment Cover ("I solemnly swear that I am up to no good") */}
      <GatefoldCover isOpen={isMapOpen} onOpen={handleOpenMap} />

      {/* Procedural Canvas Background (Castle Blueprints & Wandering Footprints) */}
      <MarauderCanvas />

      {/* Fixed Overlays (Placed outside filtered/transformed content container to ensure true viewport fixed positioning) */}
      {/* "Point Me" Magical Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onOpen={handleOpenCommandPalette}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleDossierMode={handleToggleMode}
        onNavigateToRoom={handleNavigateToRoom}
        isDossierMode={isDossierMode}
        onSealMap={handleSealMap}
        onOpenSecrets={handleOpenSecrets}
        onCastSpell={handleCastSpell}
      />

      {/* Floating Marauder's Secrets Ribbon (Pinned to Right Edge on Desktop) */}
      <button
        onClick={handleOpenSecrets}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center gap-2 py-3 px-2 bg-[#FAF4E5] parchment-border rounded-l-xl shadow-xl text-[#24140D] hover:bg-[#F4EAD2] transition-all cursor-pointer group"
        title="Open Marauder's Secrets (or type 'alohomora')"
      >
        <KeyRound className="w-3.5 h-3.5 text-[#8E712B] group-hover:rotate-45 transition-transform" />
        <span className="font-banner text-[11px] uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 font-bold">
          Marauder&apos;s Secrets
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7E1815] animate-pulse" />
      </button>

      {/* Interactive Secret Easter Egg Drawer ("Marauder's Secrets") */}
      <MaraudersSecretsDrawer
        isOpen={isSecretsDrawerOpen}
        onClose={() => setIsSecretsDrawerOpen(false)}
        activeSpell={activeSpell}
        onCastSpell={handleCastSpell}
      />

      {/* Magical Incantation Flash, Chimes, and Active Spell Floating Controller */}
      <MagicalSpellcastOverlay
        activeSpell={activeSpell}
        lastCastSpell={lastCastSpell}
        onCastSpell={handleCastSpell}
      />

      {/* Main Unfolded Content Container */}
      <div
        className={`relative z-20 transition-all duration-700 ${
          isMapOpen ? "opacity-100" : "opacity-10 pointer-events-none"
        } ${activeSpell === "lumos" ? "lumos-active" : ""} ${
          activeSpell === "leviosa" ? "levitate-active" : ""
        }`}
      >
        {/* Floating Top Navigation Header */}
        <NavigationHeader
          isDossierMode={isDossierMode}
          onToggleMode={handleToggleMode}
          onNavigateToRoom={handleNavigateToRoom}
          onSealMap={handleSealMap}
          onOpenCommandPalette={handleOpenCommandPalette}
          onOpenSecrets={handleOpenSecrets}
        />

        {/* View Mode Switch */}
        {isDossierMode ? (
          /* High-Contrast Recruiter Dossier */
          <RecruiterDossier />
        ) : (
          /* Full Interactive Marauder's Map Experience */
          <div className="w-[96vw] max-w-6xl mx-auto space-y-8 px-2 sm:px-4">
            <HeroSection />
            <TechStackSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementGallery />
            <ContactFooter />
          </div>
        )}
      </div>

      {/* Interactive Wand Cursor with Lumos Glow (Rendered on top-most layer) */}
      <WandCursor />
    </main>
  );
}
