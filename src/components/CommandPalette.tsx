"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Search,
  KeyRound,
  MapPin,
  Briefcase,
  FolderGit2,
  Trophy,
  Code2,
  Download,
  Scroll,
  Map as MapIcon,
  Lock,
  Mail,
  X,
  ArrowRight,
  Cpu,
  Terminal,
  Sun,
  Feather,
  RotateCcw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Locations & Rooms" | "Work Experience" | "Projects & Artifacts" | "Skills & Grimoire" | "Actions & Spells";
  icon: any;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggleDossierMode: () => void;
  onNavigateToRoom?: (id: string) => void;
  isDossierMode: boolean;
  onSealMap: () => void;
  onOpenSecrets: () => void;
  onCastSpell?: (spell: "lumos" | "leviosa" | "finite") => void;
}

export default function CommandPalette({
  isOpen,
  onOpen,
  onClose,
  onToggleDossierMode,
  onNavigateToRoom,
  isDossierMode,
  onSealMap,
  onOpenSecrets,
  onCastSpell,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Helper to scroll to section smoothly
  const navigateTo = (elementId: string) => {
    onClose();
    if (onNavigateToRoom) {
      onNavigateToRoom(elementId);
    } else {
      if (isDossierMode) {
        onToggleDossierMode(); // Switch back to map mode to view the section in 3D
      }
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  // Commands Pool
  const allCommands: CommandItem[] = useMemo(() => [
    // --- Actions & Spells ---
    {
      id: "action-alohomora",
      title: "Cast Alohomora: Open Marauder's Secrets Drawer",
      subtitle: "Spellcaster console with interactive portfolio enchantments (Lumos & Leviosa)",
      category: "Actions & Spells",
      icon: KeyRound,
      action: () => {
        onClose();
        onOpenSecrets();
      },
      keywords: ["alohomora", "secrets", "easter egg", "drawer", "spells", "spellcaster", "lumos", "leviosa", "mischief"],
    },
    {
      id: "action-lumos",
      title: "Cast Lumos Maxima: Radiant Castle Illumination",
      subtitle: "Bathes parchment map in warm golden candlelight and illuminates castle blueprints",
      category: "Actions & Spells",
      icon: Sun,
      action: () => {
        onClose();
        if (onCastSpell) onCastSpell("lumos");
      },
      keywords: ["lumos", "maxima", "light", "candle", "glow", "spell", "illuminate"],
    },
    {
      id: "action-leviosa",
      title: "Cast Wingardium Leviosa: Zero-G Card Levitation",
      subtitle: "Swish and flick! Imbues all parchment project and experience cards with floating physics",
      category: "Actions & Spells",
      icon: Feather,
      action: () => {
        onClose();
        if (onCastSpell) onCastSpell("leviosa");
      },
      keywords: ["leviosa", "wingardium", "float", "levitate", "zero-g", "spell", "physics"],
    },
    {
      id: "action-finite",
      title: "Cast Finite Incantatem: Dispel All Enchantments",
      subtitle: "Resets all active enchantments, lighting effects, and zero-G physics back to neutral",
      category: "Actions & Spells",
      icon: RotateCcw,
      action: () => {
        onClose();
        if (onCastSpell) onCastSpell("finite");
      },
      keywords: ["finite", "incantatem", "dispel", "reset", "clear", "neutral", "stop"],
    },
    {
      id: "action-dossier",
      title: isDossierMode ? "Cast Lumos: Return to Interactive Map" : "Recruiter Dossier Mode (30-Sec Scan)",
      subtitle: isDossierMode ? "Return to the interactive 3D parchment map" : "High-contrast candidate brief with print support",
      category: "Actions & Spells",
      icon: isDossierMode ? MapIcon : Scroll,
      action: () => {
        onToggleDossierMode();
        onClose();
      },
      keywords: ["dossier", "resume", "print", "recruiter", "scan", "mode", "switch"],
    },
    {
      id: "action-resume",
      title: "Download Official Resume PDF",
      subtitle: "Updated September 2026 version (Manthan_Mehta_Resume.pdf)",
      category: "Actions & Spells",
      icon: Download,
      action: () => {
        const link = document.createElement("a");
        link.href = "/api/download-resume";
        link.download = "Manthan_Mehta_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
      keywords: ["resume", "pdf", "download", "cv", "curriculum vitae"],
    },
    {
      id: "action-seal",
      title: "Mischief Managed (Seal The Map)",
      subtitle: "Fold the parchment back into the 3D gatefold cover",
      category: "Actions & Spells",
      icon: Lock,
      action: () => {
        onClose();
        onSealMap();
      },
      keywords: ["seal", "close", "lock", "mischief managed", "gatefold"],
    },
    {
      id: "action-email",
      title: "Send Owl (Email Manthan)",
      subtitle: "mmanthan780@gmail.com",
      category: "Actions & Spells",
      icon: Mail,
      action: () => {
        window.location.href = "mailto:mmanthan780@gmail.com";
        onClose();
      },
      keywords: ["email", "contact", "mail", "owl", "reach out", "hire"],
    },
    {
      id: "action-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/manthan-mehta-7a341622b",
      category: "Actions & Spells",
      icon: LinkedinIcon,
      action: () => {
        window.open("https://linkedin.com/in/manthan-mehta-7a341622b/", "_blank");
        onClose();
      },
      keywords: ["linkedin", "social", "connect", "profile"],
    },
    {
      id: "action-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/Manthan-1610 (Repositories & open-source builds)",
      category: "Actions & Spells",
      icon: GithubIcon,
      action: () => {
        window.open("https://github.com/Manthan-1610", "_blank");
        onClose();
      },
      keywords: ["github", "code", "repos", "open source", "manthan-1610"],
    },

    // --- Locations & Rooms ---
    {
      id: "loc-great-hall",
      title: "The Great Hall (Hero & Logistics)",
      subtitle: "Arizona State University • MS CSE • New Grad May 2027",
      category: "Locations & Rooms",
      icon: MapPin,
      action: () => navigateTo("great-hall"),
      keywords: ["hero", "intro", "asu", "arizona state", "education", "grad", "great hall"],
    },
    {
      id: "loc-library",
      title: "The Library (Grimoire of Skills)",
      subtitle: "Categorized competencies with zero skill progress bars",
      category: "Locations & Rooms",
      icon: Code2,
      action: () => navigateTo("library"),
      keywords: ["library", "skills", "tech stack", "languages", "tools"],
    },
    {
      id: "loc-corridors",
      title: "The Corridors (Professional Experience)",
      subtitle: "ASU MeshLabs, Google Intrinsic & Prama timelines",
      category: "Locations & Rooms",
      icon: Briefcase,
      action: () => navigateTo("corridors"),
      keywords: ["corridors", "experience", "jobs", "internships", "work", "history"],
    },
    {
      id: "loc-requirement",
      title: "The Room of Requirement (Featured Projects)",
      subtitle: "HealthSync, Smart Attendance & Rabbit Robot",
      category: "Locations & Rooms",
      icon: FolderGit2,
      action: () => navigateTo("room-of-requirement"),
      keywords: ["projects", "requirement", "builds", "software", "apps"],
    },
    {
      id: "loc-trophy-room",
      title: "The Trophy Room (Honors & Accolades)",
      subtitle: "Photographic proof: $70k Hackathon, AIR 9 Robocon, Gold Medalist",
      category: "Locations & Rooms",
      icon: Trophy,
      action: () => navigateTo("trophy-room"),
      keywords: ["trophies", "honors", "awards", "hackathon", "robocon", "photos"],
    },
    {
      id: "loc-owlery",
      title: "The Owlery (Dispatch & Contact)",
      subtitle: "Direct message, phone, location & email dispatch",
      category: "Locations & Rooms",
      icon: Mail,
      action: () => navigateTo("owlery"),
      keywords: ["owlery", "contact", "footer", "message", "tempe"],
    },

    // --- Work Experience ---
    {
      id: "exp-meshlabs",
      title: "ASU MeshLabs — AI Integration Engineer",
      subtitle: "Spatial AI, VR conduit bending, 94% TCN gesture accuracy, Unity AI",
      category: "Work Experience",
      icon: Cpu,
      action: () => navigateTo("corridors"),
      keywords: ["meshlabs", "asu", "vr", "virtual reality", "unity", "tcn", "gesture", "spatial ai"],
    },
    {
      id: "exp-intrinsic",
      title: "Intrinsic (An AI Robotics Company at Google)",
      subtitle: "Software Engineer Intern • Agentic AI CLI, 92% triage reduction, Gemini LLMs",
      category: "Work Experience",
      icon: Terminal,
      action: () => navigateTo("corridors"),
      keywords: ["intrinsic", "google", "alphabet", "robotics", "gemini", "agentic", "cot", "llm"],
    },
    {
      id: "exp-prama",
      title: "Prama — Software Engineer Intern",
      subtitle: "Chatbot flow reliability (+35%), FastAPI backend (10k+ req/day), React.js",
      category: "Work Experience",
      icon: Briefcase,
      action: () => navigateTo("corridors"),
      keywords: ["prama", "chatbot", "fastapi", "flask", "react", "testing"],
    },

    // --- Projects & Artifacts ---
    {
      id: "proj-healthsync",
      title: "HealthSync: Full-Stack Healthcare Platform",
      subtitle: "Google Gemini AI, Tesseract OCR, Flask, 60% adherence boost",
      category: "Projects & Artifacts",
      icon: FolderGit2,
      action: () => navigateTo("room-of-requirement"),
      keywords: ["healthsync", "health", "ocr", "prescription", "gemini", "flask"],
    },
    {
      id: "proj-attendance",
      title: "Smart Attendance & Analytics System",
      subtitle: "1st Place Gateway Hackathon, Face Recognition, DB-GPT NL queries",
      category: "Projects & Artifacts",
      icon: FolderGit2,
      action: () => navigateTo("room-of-requirement"),
      keywords: ["attendance", "gateway", "face recognition", "db-gpt", "neural network"],
    },
    {
      id: "proj-robocon",
      title: "Rabbit Robot: Autonomous Sensing System",
      subtitle: "All India Rank 9 DD Robocon, C++, TensorFlow Lite, ESP32, PID, LiDAR",
      category: "Projects & Artifacts",
      icon: FolderGit2,
      action: () => navigateTo("room-of-requirement"),
      keywords: ["rabbit", "robot", "robocon", "c++", "esp32", "lidar", "pid", "hardware"],
    },

    // --- Skills & Grimoire ---
    {
      id: "skill-python",
      title: "Python & Core AI/Backend",
      subtitle: "Flask, Django, FastAPI, LangChain, TensorFlow Lite, Data Science",
      category: "Skills & Grimoire",
      icon: Code2,
      action: () => navigateTo("library"),
      keywords: ["python", "flask", "django", "fastapi", "langchain", "backend"],
    },
    {
      id: "skill-unity",
      title: "Unity & Meta Quest VR SDK",
      subtitle: "Spatial computing, behavioral virtual instructor AI, VR simulations",
      category: "Skills & Grimoire",
      icon: Code2,
      action: () => navigateTo("library"),
      keywords: ["unity", "meta", "vr", "quest", "c#", "spatial"],
    },
    {
      id: "skill-gemini",
      title: "Google Gemini APIs & Agentic AI",
      subtitle: "Chain-of-Thought prompting, autonomous CLI tools, HuggingFace embeddings",
      category: "Skills & Grimoire",
      icon: Cpu,
      action: () => navigateTo("library"),
      keywords: ["gemini", "agentic", "ai", "llm", "cot", "generative ai"],
    },
    {
      id: "skill-frontend",
      title: "React.js & Next.js 15 (App Router)",
      subtitle: "TypeScript, Tailwind CSS, Framer Motion, Cypress, Responsive UI/UX",
      category: "Skills & Grimoire",
      icon: Code2,
      action: () => navigateTo("library"),
      keywords: ["react", "next.js", "typescript", "javascript", "tailwind", "frontend"],
    },
    {
      id: "skill-cloud",
      title: "Cloud Infrastructure & CI/CD",
      subtitle: "GCP, AWS, Azure, Docker, GitHub Actions, Bazel",
      category: "Skills & Grimoire",
      icon: Code2,
      action: () => navigateTo("library"),
      keywords: ["docker", "gcp", "aws", "azure", "cloud", "github actions", "ci/cd", "bazel"],
    },
  ], [isDossierMode, onToggleDossierMode, onClose, onSealMap, onOpenSecrets]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const cleanQuery = query.toLowerCase().trim();
    return allCommands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(cleanQuery);
      const matchSubtitle = cmd.subtitle.toLowerCase().includes(cleanQuery);
      const matchCategory = cmd.category.toLowerCase().includes(cleanQuery);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(cleanQuery));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [allCommands, query]);

  // Reset selection index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose, onOpen]);

  // Group filtered commands by category
  const groupedCategories = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop click dismiss */}
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-2xl parchment-texture parchment-border rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          initial={{ opacity: 0, scale: 0.94, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header & Search Bar */}
          <div className="p-4 sm:p-5 border-b border-[#8E712B]/40 bg-[#FAF4E5]/80">
            {/* Thematic Spell Ribbon */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-banner text-xs tracking-widest text-[#8E712B] uppercase flex items-center gap-1.5 font-bold">
                <Compass className="w-4 h-4 text-[#C5A55A] animate-spin" style={{ animationDuration: "14s" }} />
                <span>&ldquo;POINT ME&rdquo; • The Four-Point Compass Spell</span>
              </span>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-[#FAF4E5] border border-[#8E712B]/50 text-[#4A2D1C] flex items-center justify-center hover:bg-[#F4EAD2] transition-colors cursor-pointer"
                aria-label="Close Point Me Spellbook"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input with Lumos Search Icon */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-5 h-5 text-[#8E712B] pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cast a spell or search (e.g. 'Intrinsic', 'Resume')..."
                className="w-full pl-11 pr-4 sm:pr-24 py-2.5 rounded-lg bg-[#FAF4E5] border border-[#8E712B] text-sm sm:text-base font-body text-[#24140D] placeholder-[#8C6D53] focus:outline-none focus:ring-2 focus:ring-[#C5A55A] focus:border-[#24140D] shadow-inner"
              />
              <span className="hidden sm:inline-block absolute right-3 px-2 py-0.5 rounded bg-[#24140D]/10 text-[11px] font-mono text-[#704E37] border border-[#8E712B]/30 select-none">
                ESC to close
              </span>
            </div>
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            className="overflow-y-auto p-3 sm:p-4 space-y-4 max-h-[55vh] divide-y divide-[#8E712B]/20"
          >
            {filteredCommands.length === 0 ? (
              <div className="py-12 text-center text-[#704E37]">
                <Compass className="w-8 h-8 text-[#8E712B]/60 mx-auto mb-2 animate-bounce" />
                <p className="font-title text-base font-bold text-[#24140D]">No enchantments found</p>
                <p className="font-body text-xs italic mt-1 text-[#8C6D53]">
                  Try searching for &quot;Intrinsic&quot;, &quot;MeshLabs&quot;, &quot;Robocon&quot;, &quot;Python&quot;, or &quot;Resume&quot;
                </p>
              </div>
            ) : (
              Object.entries(groupedCategories).map(([category, items]) => (
                <div key={category} className="pt-3 first:pt-0">
                  <div className="px-2 mb-1.5 flex items-center justify-between text-[11px] font-banner uppercase tracking-widest text-[#7E1815] font-bold">
                    <span>{category}</span>
                    <span className="text-[#8E712B]/70 font-mono text-[10px]">{items.length}</span>
                  </div>

                  <div className="space-y-1">
                    {items.map((item) => {
                      const globalIndex = filteredCommands.findIndex((c) => c.id === item.id);
                      const isSelected = globalIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.id}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FAF4E5] border border-[#8E712B] shadow-sm translate-x-1"
                              : "hover:bg-[#FAF4E5]/50 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? "bg-[#24140D] text-[#F4D37A] border-[#24140D]"
                                  : "bg-[#FAF4E5] text-[#8E712B] border-[#8E712B]/40"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-title text-sm font-bold text-[#24140D] truncate">
                                {item.title}
                              </p>
                              <p className="font-body italic text-xs text-[#704E37] truncate">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 text-[#8E712B]">
                            {isSelected && (
                              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-banner text-[#7E1815]">
                                <span>Cast</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Guide */}
          <div className="p-3 bg-[#FAF4E5]/90 border-t border-[#8E712B]/40 flex flex-wrap items-center justify-between gap-2 text-[11px] font-body text-[#704E37]">
            <div className="hidden sm:flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[#24140D]/10 font-mono border border-[#8E712B]/30">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[#24140D]/10 font-mono border border-[#8E712B]/30">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[#24140D]/10 font-mono border border-[#8E712B]/30">↵</kbd>
                <span>Select</span>
              </span>
            </div>

            <span className="sm:hidden italic text-[#8E712B]">Tap any action to execute</span>

            <div className="flex items-center gap-2 italic text-[#8E712B]">
              <span>Powered by Marauder&apos;s Map Navigation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
