"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  badge: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    company: "ASU MeshLabs",
    role: "AI Integration Engineer",
    period: "Aug 2026 – Present",
    location: "Tempe, AZ",
    badge: "Spatial AI & VR",
    bullets: [
      "Developed a VR-based conduit bending learning experience, achieving 94% gesture classification accuracy by engineering a hybrid physical action recognition system combining Temporal Convolutional Networks (TCN) and rule-based heuristics.",
      "Engineered dynamic behavioral AI for virtual instructors, driving a 35% reduction in trainee error rates by integrating real-time player tracking data with contextual dialogue and scoring systems in Unity.",
      "Built custom data pipeline automation tools, yielding a 50% decrease in model training lifecycle times by scripting Python workflows to parse and format raw GoPro reference videos into structured datasets.",
    ],
  },
  {
    company: "Intrinsic (An AI Robotics Company at Google)",
    role: "Software Engineer Intern",
    period: "May 2026 – Aug 2026",
    location: "Mountain View, CA",
    badge: "Alphabet / Google",
    bullets: [
      "Accelerated bug investigation workflows, delivering a 92% reduction in triage time (under 5 minutes) by engineering an Agentic AI CLI using Gemini LLMs and Chain-of-Thought prompting to autonomously analyze GitHub workflows and cluster logs.",
      "Eliminated manual triage for on-call engineers, saving 2 hours daily by building an automated Postsubmit Failure Analysis system on GitHub Actions that parses 100+ workflow runs and publishes actionable diagnostic reports.",
      "Optimized the release cycle, reclaiming 4 hours of engineer time per cycle by designing an autonomous Buganizer and PR automation pipeline that calculates flakiness from historical runs and auto-generates remediation PRs.",
    ],
  },
  {
    company: "Prama",
    role: "Software Engineer Intern",
    period: "Jan 2025 – Jun 2025",
    location: "Ahmedabad, India",
    badge: "AI Conversational Systems",
    bullets: [
      "Improved conversational flow reliability and response accuracy, recording a 35% increase by implementing functional, exploratory, and regression testing suites across multiple AI chatbot implementations.",
      "Scaled backend infrastructure, successfully handling 10,000+ daily requests with 99.9% uptime by engineering robust Python, Flask, and FastAPI server applications with optimized RESTful endpoints.",
      "Accelerated web interaction speed, evidenced by a 25% reduction in user bounce rates by building responsive, mobile-first web components in React.js and streamlining cross-stack data integration.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="corridors" className="relative scroll-mt-24 py-12">
      {/* Hogwarts Room Ribbon Banner */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#C5A55A] to-[#8E712B]" />
        <span className="font-banner text-xs md:text-sm tracking-widest text-[#F4D37A] uppercase flex items-center gap-2 drop-shadow-sm">
          <Briefcase className="w-4 h-4 text-[#F4D37A]" />
          <span>~ The Corridors &bull; Professional Experience ~</span>
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#C5A55A] to-[#8E712B]" />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-title text-3xl sm:text-4xl text-[#FAF4E5] font-bold tracking-wide drop-shadow-md">
          Expeditions in the Professional Realm
        </h2>
        <p className="font-body text-[15px] sm:text-base text-[#FAF4E5]/90 mt-2 font-medium">
          Engineering spatial AI at ASU MeshLabs, agentic LLM pipelines at Google Intrinsic, &amp; reactive backends at Prama
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l-2 border-[#8E712B]/40 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Timeline Wax Node */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full wax-seal flex items-center justify-center text-[10px] text-[#FAF4E5] font-serif font-bold shadow-md">
              {idx + 1}
            </div>

            {/* Parchment Card */}
            <div className="parchment-texture parchment-border rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4 border-b border-[#8E712B]/30 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-title text-xl sm:text-2xl font-bold text-[#24140D]">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full bg-[#8E712B]/20 border border-[#8E712B]/35 text-[#2E1A0F] font-banner text-xs sm:text-[13px] font-semibold">
                      {exp.badge}
                    </span>
                  </div>

                  <p className="font-banner text-base sm:text-lg text-[#7E1815] font-bold mt-1 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8E712B]/15 border border-[#8E712B]/30 font-banner text-[13px] sm:text-sm font-semibold text-[#24140D]">
                    <Calendar className="w-3.5 h-3.5 text-[#8E712B]" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-body text-[#4A2D1C] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8E712B]" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Quantified Accomplishments */}
              <ul className="space-y-3">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-[15px] sm:text-[17px] font-body text-[#24140D] leading-[1.7]">
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2.5 shrink-0 ring-1 ring-[#8E712B]/40" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
