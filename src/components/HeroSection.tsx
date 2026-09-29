"use client";

import { motion } from "framer-motion";
import { Download, Mail, Cpu, Terminal, Trophy, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function HeroSection() {
  return (
    <section id="great-hall" className="relative scroll-mt-24 pt-2 pb-12">
      {/* Main Parchment Hero Container */}
      <motion.div
        className="parchment-texture parchment-border rounded-xl p-5 sm:p-8 md:p-14 relative z-10 shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Hogwarts Room Ribbon Banner */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#8E712B]" />
          <span className="font-banner text-xs md:text-sm tracking-widest text-[#4A2D1C] font-semibold uppercase">
            ~ The Great Hall ~
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#8E712B]" />
        </div>

        {/* Coded Floating Candles Inside The Great Hall (Atmospheric warm glow above name) */}
        <div className="flex justify-center items-center gap-6 sm:gap-14 mb-5 pointer-events-none opacity-90 select-none" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                transform: `translateY(${Math.sin(i * 1.5) * 8}px)`,
                animation: `candleFloat ${3.2 + i * 0.4}s infinite ease-in-out alternate`,
              }}
            >
              {/* Candle Flame with Warm Glow */}
              <div className="w-2.5 h-3.5 bg-gradient-to-t from-[#E68A00] via-[#FFD24D] to-[#FFF8E7] rounded-full animate-candle-flame shadow-[0_0_12px_#F4D37A]" />
              {/* Candle Body */}
              <div className="w-2 h-8 sm:h-9 bg-gradient-to-b from-[#FFFDF6] via-[#F5EAD2] to-[#E3D1AF] rounded-sm border-t border-[#D9BE87] shadow-xs" />
            </div>
          ))}
        </div>

        {/* The Hook: Name & Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-title text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#24140D] tracking-wide leading-tight">
            Manthan Mehta
          </h1>

          <p className="font-banner text-base sm:text-xl md:text-2xl text-[#4A2D1C] font-semibold mt-2.5 sm:mt-3 tracking-wide">
            Full-Stack &amp; AI Software Engineer
          </p>

          {/* The Logistics: ASU MS CSE, New Grad May 2027 */}
          <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FAF4E5] border border-[#8E712B]/60 text-xs sm:text-[14px] font-body text-[#24140D] shadow-sm max-w-full text-left sm:text-center">
            <GraduationCap className="w-4 h-4 text-[#8E712B] shrink-0" />
            <span className="leading-snug">
              <strong>MS Computer Software Engineering</strong> at ASU &bull;{" "}
              <span className="text-[#8B2500] font-bold">Graduating May 2027</span>
            </span>
          </div>

          <p className="font-body text-[15px] sm:text-[17px] text-[#361F12] mt-4 max-w-2xl mx-auto leading-[1.7]">
            AI Integration Engineer at <strong className="text-[#1A0D07]">ASU MeshLabs</strong> &amp; former Software Engineer Intern at <strong className="text-[#1A0D07]">Intrinsic (Google AI Robotics)</strong>. 
            Passionate about building spatial AI, agentic LLM workflows, and high-performance full-stack architectures.
          </p>

          {/* Primary Recruiter Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {/* Resume Download */}
            <a
              href="/api/download-resume"
              download="Manthan_Mehta_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg wax-seal text-[#FAF4E5] font-banner text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Manthan-1610"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] hover:border-[#24140D] transition-colors shadow-sm"
            >
              <GithubIcon className="w-4 h-4 text-[#24140D]" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/manthan-mehta-7a341622b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] hover:border-[#24140D] transition-colors shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href="mailto:mmanthan780@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] hover:border-[#24140D] transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#7E1815]" />
              <span>Send Owl (Email)</span>
            </a>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-[#8E712B]/30 text-left">
            <div className="bg-[#FAF4E5]/80 p-4 rounded-lg border border-[#8E712B]/40 shadow-xs">
              <div className="flex items-center gap-2 text-[#7E1815] mb-1.5">
                <Cpu className="w-4 h-4 text-[#7E1815]" />
                <span className="font-banner text-xs font-bold uppercase tracking-wider">ASU MeshLabs</span>
              </div>
              <p className="font-body text-[13px] sm:text-sm text-[#24140D] leading-relaxed">
                Spatial AI &amp; VR gesture classification achieving <strong className="font-semibold text-[#1A0D07]">94% accuracy</strong> with TCN models and Unity.
              </p>
            </div>

            <div className="bg-[#FAF4E5]/80 p-4 rounded-lg border border-[#8E712B]/40 shadow-xs">
              <div className="flex items-center gap-2 text-[#8E712B] mb-1.5">
                <Terminal className="w-4 h-4 text-[#8E712B]" />
                <span className="font-banner text-xs font-bold uppercase tracking-wider text-[#3F2516]">Google Intrinsic</span>
              </div>
              <p className="font-body text-[13px] sm:text-sm text-[#24140D] leading-relaxed">
                Engineered Agentic AI CLI with Gemini LLMs, slashing triage time by <strong className="font-semibold text-[#1A0D07]">92%</strong> (&lt;5 min).
              </p>
            </div>

            <div className="bg-[#FAF4E5]/80 p-4 rounded-lg border border-[#8E712B]/40 shadow-xs">
              <div className="flex items-center gap-2 text-[#24140D] mb-1.5">
                <Trophy className="w-4 h-4 text-[#8E712B]" />
                <span className="font-banner text-xs font-bold uppercase tracking-wider">AIR 9 &bull; Gold Medalist</span>
              </div>
              <p className="font-body text-[13px] sm:text-sm text-[#24140D] leading-relaxed">
                All India Rank 9 at DD Robocon autonomous robotics &amp; Ganpat University B.Tech <strong className="font-semibold text-[#1A0D07]">Gold Medalist</strong>.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
