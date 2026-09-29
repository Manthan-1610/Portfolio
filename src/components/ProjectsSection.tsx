"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Award, Sparkles, Calendar, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface Project {
  title: string;
  subtitle: string;
  period: string;
  badge: {
    text: string;
    isAward: boolean;
  };
  tech: string[];
  bullets: React.ReactNode[];
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: "HealthSync",
    subtitle: "Full-Stack AI Healthcare Platform",
    period: "Jul 2024 – Dec 2024",
    badge: {
      text: "Clinical AI & Automated OCR Engine",
      isAward: false,
    },
    tech: ["Python", "Google Gemini AI", "Tesseract OCR", "Flask", "RESTful APIs"],
    bullets: [
      <span>
        Increased medication adherence, generating a{" "}
        <strong className="font-semibold text-[#1A0D07]">60% boost</strong> among test users by creating a full-stack Python application featuring personalized tracking and multi-treatment analytics.
      </span>,
      <span>
        Automated medical document workflows, reaching{" "}
        <strong className="font-semibold text-[#1A0D07]">90%+ extraction accuracy</strong> and reducing processing time by{" "}
        <strong className="font-semibold text-[#1A0D07]">40%</strong> by integrating Tesseract OCR and Google Gemini AI for intelligent prescription processing.
      </span>,
    ],
    githubUrl: "https://github.com/Manthan-1610/HealthSync",
  },
  {
    title: "Smart Attendance System",
    subtitle: "AI Face Recognition & Analytics Platform",
    period: "Oct 2023 – Jan 2024",
    badge: {
      text: "1st Place Winner • Gateway Hackathon",
      isAward: true,
    },
    tech: ["Python", "Neural Networks", "REST APIs", "DB-GPT", "Computer Vision"],
    bullets: [
      <span>
        Won <strong className="font-semibold text-[#1A0D07]">1st Place</strong> at the Gateway Group Hackathon, defeating 50+ competing teams and securing the prize by leading a team to design and deploy an AI-driven face recognition platform using deep neural networks.
      </span>,
      <span>
        Boosted attendance tracking efficiency, realizing a{" "}
        <strong className="font-semibold text-[#1A0D07]">40% speed increase</strong> and{" "}
        <strong className="font-semibold text-[#1A0D07]">25% accuracy gain</strong> by implementing real-time RESTful APIs and integrating DB-GPT for natural language query execution.
      </span>,
    ],
    githubUrl: "https://github.com/PreetShah77/Smart-Attendance-System",
  },
  {
    title: "Rabbit Robot: Sensing System",
    subtitle: "Autonomous Robotics & Embedded Vision",
    period: "Jan 2023 – Jul 2024",
    badge: {
      text: "AIR 9 (Top 6%) • DD Robocon Finals",
      isAward: true,
    },
    tech: ["C++", "TensorFlow Lite", "ESP32", "PID Control", "LiDAR", "Robotics"],
    bullets: [
      <span>
        Engineered a high-precision autonomous robotic system, securing{" "}
        <strong className="font-semibold text-[#1A0D07]">All India Rank 9</strong> (Top 6% among 150+ teams) at DD Robocon by designing tuned PID control algorithms that reached an{" "}
        <strong className="font-semibold text-[#1A0D07]">85% target hit rate</strong>.
      </span>,
      <span>
        Enhanced real-time anomaly detection, demonstrating{" "}
        <strong className="font-semibold text-[#1A0D07]">95% accuracy</strong> across 1,000+ test scenarios by integrating LiDAR sensors and deploying TensorFlow Lite models on ESP32 microcontrollers.
      </span>,
    ],
    githubUrl: "https://github.com/Manthan-1610/RR-Robocon",
  },
];

export default function ProjectsSection() {
  return (
    <section id="room-of-requirement" className="relative scroll-mt-28 py-12">
      {/* Hogwarts Room Ribbon Banner */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#C5A55A] to-[#8E712B]" />
        <span className="font-banner text-xs md:text-sm tracking-widest text-[#F4D37A] uppercase flex items-center gap-2 drop-shadow-sm">
          <FolderGit2 className="w-4 h-4 text-[#F4D37A]" />
          <span>~ The Room of Requirement &bull; Featured Projects ~</span>
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#C5A55A] to-[#8E712B]" />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-title text-3xl sm:text-4xl text-[#FAF4E5] font-bold tracking-wide drop-shadow-md">
          Artifacts of Practical Sorcery
        </h2>
        <p className="font-body text-[15px] sm:text-base text-[#FAF4E5]/90 mt-2 font-medium">
          Real-world applications combining generative AI, computer vision, and robust backend engineering
        </p>
      </div>

      {/* Projects Grid (3 Featured Technical Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <motion.article
            key={proj.title}
            className="parchment-texture parchment-border rounded-xl p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Secret Room Watermark - Placed subtly in bottom-right */}
            <div className="absolute bottom-20 right-4 font-title text-7xl text-[#8E712B]/6 select-none pointer-events-none">
              0{idx + 1}
            </div>

            <div className="flex flex-col flex-1">
              {/* Row 1: Award/Highlight Badge (Full width unconstrained row: single-line, zero wrapping) */}
              <div className="mb-3.5 min-h-[30px] flex items-center">
                {proj.badge.isAward ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full wax-seal text-[#FAF4E5] font-banner text-[10px] sm:text-xs font-bold tracking-wide shadow-xs max-w-full">
                    <Award className="w-3.5 h-3.5 text-[#F4D37A] shrink-0" />
                    <span className="truncate sm:whitespace-nowrap">{proj.badge.text}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E712B]/15 border border-[#8E712B]/35 text-[#2E1A0F] font-banner text-[10px] sm:text-xs font-bold tracking-wide shadow-xs max-w-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#8E712B] shrink-0" />
                    <span className="truncate sm:whitespace-nowrap">{proj.badge.text}</span>
                  </span>
                )}
              </div>

              {/* Row 2: Title & Subtitle (Uniform min-height ensures border line is horizontally level) */}
              <div className="min-h-[72px] flex flex-col justify-start border-b border-[#8E712B]/30 pb-3 mb-4">
                <h3 className="font-title text-xl sm:text-[22px] font-bold text-[#24140D] tracking-tight leading-snug">
                  {proj.title}
                </h3>
                <p className="font-banner text-xs sm:text-[13px] text-[#4A2D1C] font-semibold mt-1">
                  {proj.subtitle}
                </p>
              </div>

              {/* Row 3: Tech Badges (Uniform min-height ensures bullets start at the exact same line) */}
              <div className="min-h-[64px] flex flex-wrap content-start gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[#FAF4E5] border border-[#8E712B]/45 text-[12px] font-banner font-semibold text-[#1A0D07] shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Row 4: Description Bullets */}
              <ul className="flex-1 space-y-2.5 mb-5">
                {proj.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] font-body text-[#24140D] leading-[1.65]">
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0 ring-1 ring-[#8E712B]/40" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Row 5: Aligned Footer Bar with Period, Status, and Full-Width Repository CTA */}
            <div className="pt-3.5 border-t border-[#8E712B]/30 mt-auto flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-banner">
                <span className="text-[#4A2D1C] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8E712B]" />
                  <span>{proj.period}</span>
                </span>
                <span className="text-[#2E6B47] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B47]" />
                  <span>Production Tested</span>
                </span>
              </div>

              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-[#FAF4E5] border-2 border-[#8E712B]/60 hover:border-[#24140D] hover:bg-[#F4EAD2] hover:shadow-md text-[#24140D] font-banner text-xs sm:text-[13px] font-bold transition-all group/btn active:scale-[0.98] shadow-xs cursor-pointer"
              >
                <GithubIcon className="w-5 h-5 text-[#24140D] group-hover/btn:text-[#7E1815] transition-colors shrink-0" />
                <span>View Source on GitHub</span>
                <ExternalLink className="w-4 h-4 text-[#8E712B] opacity-75 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all shrink-0" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
