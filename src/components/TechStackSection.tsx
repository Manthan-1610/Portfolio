"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Server, Cpu, BookOpen } from "lucide-react";

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: typeof Code2;
  skills: { name: string; tag?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Core CS",
    subtitle: "Foundational spells & algorithms",
    icon: Code2,
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C / C++" },
      { name: "HTML5 / CSS3" },
      { name: "Data Structures & Algorithms" },
      { name: "Object-Oriented Design (OOP)" },
    ],
  },
  {
    title: "Frameworks & Spatial Computing",
    subtitle: "Interactive web, VR & testing suites",
    icon: Layout,
    skills: [
      { name: "React.js" },
      { name: "Next.js 15 (App Router)" },
      { name: "Unity" },
      { name: "Meta Quest SDK" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Cypress Testing" },
      { name: "RESTful APIs" },
    ],
  },
  {
    title: "Backend & Databases",
    subtitle: "Distributed architectures & data persistence",
    icon: Server,
    skills: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Django" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Firebase" },
    ],
  },
  {
    title: "AI & Cloud Infrastructure",
    subtitle: "LLM agents, spatial models & CI/CD pipelines",
    icon: Cpu,
    skills: [
      { name: "Google Gemini APIs" },
      { name: "Generative AI & LLMs" },
      { name: "LangChain" },
      { name: "TensorFlow Lite" },
      { name: "TCN Action Recognition" },
      { name: "HuggingFace Embeddings" },
      { name: "DB-GPT" },
      { name: "Tesseract OCR" },
      { name: "Google Cloud (GCP)" },
      { name: "AWS" },
      { name: "Azure" },
      { name: "Docker" },
      { name: "GitHub Actions CI/CD" },
      { name: "Bazel" },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section id="library" className="relative scroll-mt-24 py-12">
      {/* Hogwarts Room Ribbon Banner */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#C5A55A] to-[#8E712B]" />
        <span className="font-banner text-xs md:text-sm tracking-widest text-[#F4D37A] uppercase flex items-center gap-2 drop-shadow-sm">
          <BookOpen className="w-4 h-4 text-[#F4D37A]" />
          <span>~ The Library &bull; Technical Arsenal ~</span>
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#C5A55A] to-[#8E712B]" />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-title text-3xl sm:text-4xl text-[#FAF4E5] font-bold tracking-wide drop-shadow-md">
          Grimoire of Spells &amp; Technologies
        </h2>
        <p className="font-body text-[15px] sm:text-base text-[#FAF4E5]/90 mt-2 font-medium">
          Grouped by engineering domain &bull; Pure capability without misleading progress bars
        </p>
      </div>

      {/* Grid of 4 Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              className="parchment-texture parchment-border rounded-xl p-6 relative shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#8E712B]/30">
                <div className="w-9 h-9 rounded-lg bg-[#FAF4E5] border border-[#8E712B]/50 flex items-center justify-center text-[#8E712B] shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-title text-lg sm:text-xl font-bold text-[#24140D]">
                    {category.title}
                  </h3>
                  <p className="font-body text-[13px] text-[#4A2D1C] font-medium">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Badges (Tactile Parchment Ink Stamps) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#FAF4E5] border border-[#8E712B]/45 text-[13px] font-banner font-medium text-[#1A0D07] shadow-xs hover:border-[#24140D] hover:bg-[#F4EAD2] hover:scale-[1.03] transition-all cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
