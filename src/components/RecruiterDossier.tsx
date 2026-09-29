"use client";

import { Download, Mail, Printer, Building2, Calendar, MapPin, Award, Cpu, FolderGit2, Briefcase, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function RecruiterDossier() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-[96vw] max-w-4xl mx-auto my-4 sm:my-6 bg-[#FCF8EE] border-2 border-[#8E712B] rounded-xl p-4 sm:p-8 md:p-12 shadow-2xl text-[#24140D]">
      {/* Top Dossier Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#8E712B]/40">
        <div>
          <span className="font-banner text-[10px] sm:text-xs uppercase tracking-widest text-[#7E1815] font-bold">
            Confidential Candidate Dossier &bull; Ministry of Software Engineering
          </span>
          <h1 className="font-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24140D] tracking-wide mt-1">
            Manthan Mehta
          </h1>
          <p className="font-banner text-sm sm:text-base md:text-lg text-[#5A3825] font-semibold">
            Full-Stack &amp; AI Software Engineer &bull; New Grad 2027
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8E712B] text-xs font-banner text-[#24140D] hover:bg-[#F4EAD2] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>

          <a
            href="/api/download-resume"
            download="Manthan_Mehta_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg wax-seal text-[#FAF4E5] text-xs font-banner tracking-wide shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Logistics & Contact Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-[#8E712B]/30 text-sm sm:text-[15px] font-body text-[#2E1A0F]">
        <div>
          <p>
            <strong>Education:</strong> MS in Computer Software Engineering, Arizona State University
          </p>
          <p className="text-[#8B2500] font-bold mt-0.5">
            Expected Graduation: May 2027 (Seeking Full-Time New Grad 2027 Roles)
          </p>
          <p className="mt-0.5">
            <strong>Undergrad:</strong> B.Tech in IT, Ganpat University &bull;{" "}
            <span className="text-[#8B2500] font-bold">Gold Medalist</span> (2021 – 2025)
          </p>
        </div>

        <div className="sm:text-right space-y-1">
          <p>
            <strong>Phone:</strong> +1 (480) 809-7588
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:mmanthan780@gmail.com" className="text-[#7E1815] font-semibold underline hover:text-[#24140D]">
              mmanthan780@gmail.com
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://linkedin.com/in/manthan-mehta-7a341622b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7E1815] font-semibold underline hover:text-[#24140D]"
            >
              linkedin.com/in/manthan-mehta-7a341622b
            </a>
          </p>
          <p>
            <strong>Location:</strong> Tempe, Arizona (Open to US Relocation)
          </p>
        </div>
      </div>

      {/* Technical Arsenal (Categorized, NO progress bars) */}
      <div className="py-6 border-b border-[#8E712B]/30">
        <h2 className="font-title text-xl font-bold text-[#24140D] mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#8E712B]" />
          <span>Core Competencies &amp; Technical Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px] font-body">
          <div className="bg-[#FAF4E5] p-3.5 rounded-lg border border-[#8E712B]/35">
            <p className="font-banner text-xs sm:text-[13px] font-bold text-[#7E1815] mb-1">Languages &amp; Core CS</p>
            <p className="text-[#24140D] leading-relaxed">
              Python, JavaScript, TypeScript, C/C++, HTML5/CSS3, Data Structures &amp; Algorithms, OOP
            </p>
          </div>

          <div className="bg-[#FAF4E5] p-3.5 rounded-lg border border-[#8E712B]/35">
            <p className="font-banner text-xs sm:text-[13px] font-bold text-[#7E1815] mb-1">Frameworks &amp; Spatial Computing</p>
            <p className="text-[#24140D] leading-relaxed">
              React.js, Next.js 15, Unity, Meta Quest SDK, Tailwind CSS, Framer Motion, Cypress, RESTful APIs
            </p>
          </div>

          <div className="bg-[#FAF4E5] p-3.5 rounded-lg border border-[#8E712B]/35">
            <p className="font-banner text-xs sm:text-[13px] font-bold text-[#7E1815] mb-1">Backend &amp; Databases</p>
            <p className="text-[#24140D] leading-relaxed">
              Node.js, FastAPI, Flask, Django, PostgreSQL, MongoDB, Firebase
            </p>
          </div>

          <div className="bg-[#FAF4E5] p-3.5 rounded-lg border border-[#8E712B]/35">
            <p className="font-banner text-xs sm:text-[13px] font-bold text-[#7E1815] mb-1">AI &amp; Cloud Infrastructure</p>
            <p className="text-[#24140D] leading-relaxed">
              Gemini APIs, Generative AI, LangChain, TensorFlow Lite, TCN Action Recognition, HuggingFace, DB-GPT, Tesseract OCR, GCP, AWS, Azure, Docker, GitHub Actions, Bazel
            </p>
          </div>
        </div>
      </div>

      {/* Professional Experience */}
      <div className="py-6 border-b border-[#8E712B]/30">
        <h2 className="font-title text-xl font-bold text-[#24140D] mb-4 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#8E712B]" />
          <span>Professional Experience</span>
        </h2>

        {/* ASU MeshLabs */}
        <div className="mb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <h3 className="font-title text-base sm:text-lg font-bold text-[#24140D]">
              AI Integration Engineer &bull; ASU MeshLabs
            </h3>
            <span className="font-banner text-xs sm:text-[13px] font-semibold text-[#24140D] bg-[#8E712B]/15 px-2.5 py-0.5 rounded border border-[#8E712B]/30">
              Aug 2026 – Present &bull; Tempe, AZ
            </span>
          </div>

          <ul className="mt-2 space-y-2 text-sm sm:text-[15px] font-body text-[#24140D] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Developed a VR-based conduit bending learning experience, achieving <strong className="font-semibold text-[#1A0D07]">94% gesture classification accuracy</strong> by engineering a hybrid physical action recognition system combining Temporal Convolutional Networks (TCN) and rule-based heuristics.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Engineered dynamic behavioral AI for virtual instructors, driving a <strong className="font-semibold text-[#1A0D07]">35% reduction in trainee error rates</strong> by integrating real-time player tracking data with contextual dialogue and scoring systems in Unity.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Built custom data pipeline automation tools, yielding a <strong className="font-semibold text-[#1A0D07]">50% decrease in model training lifecycle times</strong> by scripting Python workflows to parse and format raw GoPro reference videos into structured datasets.
              </span>
            </li>
          </ul>
        </div>

        {/* Intrinsic */}
        <div className="mb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <h3 className="font-title text-base sm:text-lg font-bold text-[#24140D]">
              Software Engineer Intern &bull; Intrinsic (An AI Robotics Company at Google)
            </h3>
            <span className="font-banner text-xs sm:text-[13px] font-semibold text-[#24140D] bg-[#8E712B]/15 px-2.5 py-0.5 rounded border border-[#8E712B]/30">
              May 2026 – Aug 2026 &bull; Mountain View, CA
            </span>
          </div>

          <ul className="mt-2 space-y-2 text-sm sm:text-[15px] font-body text-[#24140D] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Accelerated bug investigation workflows, delivering a <strong className="font-semibold text-[#1A0D07]">92% reduction in triage time</strong> (under 5 minutes) by engineering an Agentic AI CLI using Gemini LLMs and Chain-of-Thought prompting to autonomously analyze GitHub workflows and cluster logs.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Eliminated manual triage for on-call engineers, saving <strong className="font-semibold text-[#1A0D07]">2 hours daily</strong> by building an automated Postsubmit Failure Analysis system on GitHub Actions parsing 100+ workflow runs with actionable diagnostic reports.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Optimized the release cycle, reclaiming <strong className="font-semibold text-[#1A0D07]">4 hours of engineer time per cycle</strong> by designing an autonomous Buganizer and PR automation pipeline calculating flakiness and auto-generating remediation PRs.
              </span>
            </li>
          </ul>
        </div>

        {/* Prama */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <h3 className="font-title text-base sm:text-lg font-bold text-[#24140D]">
              Software Engineer Intern &bull; Prama
            </h3>
            <span className="font-banner text-xs sm:text-[13px] font-semibold text-[#24140D] bg-[#8E712B]/15 px-2.5 py-0.5 rounded border border-[#8E712B]/30">
              Jan 2025 – Jun 2025 &bull; Ahmedabad, India
            </span>
          </div>

          <ul className="mt-2 space-y-2 text-sm sm:text-[15px] font-body text-[#24140D] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Improved conversational flow reliability and response accuracy by <strong className="font-semibold text-[#1A0D07]">35%</strong> by implementing functional, exploratory, and regression testing suites across multiple AI chatbot implementations.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Scaled backend infrastructure, successfully handling <strong className="font-semibold text-[#1A0D07]">10,000+ daily requests</strong> with <strong className="font-semibold text-[#1A0D07]">99.9% uptime</strong> by engineering robust Python, Flask, and FastAPI server applications with optimized RESTful endpoints.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#8E712B] mt-2 shrink-0" aria-hidden="true" />
              <span>
                Accelerated web interaction speed, evidenced by a <strong className="font-semibold text-[#1A0D07]">25% reduction in bounce rates</strong> by building responsive mobile-first web components in React.js and streamlining cross-stack data integration.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Projects */}
      <div className="py-6 border-b border-[#8E712B]/30">
        <h2 className="font-title text-xl font-bold text-[#24140D] mb-4 flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-[#8E712B]" />
          <span>Technical Projects</span>
        </h2>

        <div className="space-y-4 text-sm sm:text-[15px] font-body">
          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <a
                href="https://github.com/Manthan-1610/HealthSync"
                target="_blank"
                rel="noopener noreferrer"
                className="font-banner font-bold text-sm sm:text-base text-[#7E1815] hover:underline inline-flex items-center gap-1.5 group"
              >
                <span>HealthSync: Full-Stack Healthcare Platform</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E712B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-xs sm:text-[13px] text-[#4A2D1C] font-medium">Python, Gemini AI, Tesseract OCR, Flask</span>
            </div>
            <p className="text-[#24140D] mt-1 leading-relaxed">
              Generated a <strong className="font-semibold text-[#1A0D07]">60% boost</strong> in medication adherence with personalized tracking; automated prescription parsing with <strong className="font-semibold text-[#1A0D07]">90%+ accuracy</strong> and <strong className="font-semibold text-[#1A0D07]">40% time reduction</strong> via Tesseract OCR and Google Gemini AI.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <a
                href="https://github.com/PreetShah77/Smart-Attendance-System"
                target="_blank"
                rel="noopener noreferrer"
                className="font-banner font-bold text-sm sm:text-base text-[#7E1815] hover:underline inline-flex items-center gap-1.5 group"
              >
                <span>Smart Attendance &amp; Analytics System</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E712B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-xs sm:text-[13px] text-[#4A2D1C] font-medium">Python, Neural Networks, REST APIs, DB-GPT</span>
            </div>
            <p className="text-[#24140D] mt-1 leading-relaxed">
              <strong className="font-semibold text-[#1A0D07]">1st Place Winner</strong> at Gateway Group Hackathon (defeating 50+ competing teams); achieved a <strong className="font-semibold text-[#1A0D07]">40% speed boost</strong> and <strong className="font-semibold text-[#1A0D07]">25% accuracy gain</strong> with real-time REST APIs and DB-GPT natural language queries.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <a
                href="https://github.com/Manthan-1610/RR-Robocon"
                target="_blank"
                rel="noopener noreferrer"
                className="font-banner font-bold text-sm sm:text-base text-[#7E1815] hover:underline inline-flex items-center gap-1.5 group"
              >
                <span>Rabbit Robot: Autonomous Sensing System</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E712B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-xs sm:text-[13px] text-[#4A2D1C] font-medium">C++, TensorFlow Lite, ESP32, PID Control, LiDAR</span>
            </div>
            <p className="text-[#24140D] mt-1 leading-relaxed">
              Secured <strong className="font-semibold text-[#1A0D07]">All India Rank 9</strong> (Top 6% among 150+ teams) at DD Robocon National Championship Finals with tuned PID control (85% target hit rate) and 95% anomaly detection accuracy via LiDAR and embedded TensorFlow Lite models.
            </p>
          </div>
        </div>
      </div>

      {/* Major Honors & Hackathon Wins */}
      <div className="pt-6">
        <h2 className="font-title text-xl font-bold text-[#24140D] mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#8E712B]" />
          <span>Competitive Accolades &amp; Honors</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] font-body">
          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <p className="font-banner font-bold text-xs sm:text-sm text-[#7E1815]">B.Tech in IT Gold Medalist</p>
            <p className="text-[#725219] font-semibold">Ganpat University &bull; Ranked 1st</p>
            <p className="text-[#24140D] mt-1 leading-relaxed">Academic and technical excellence award for the graduating cohort (2021 – 2025).</p>
          </div>

          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <p className="font-banner font-bold text-xs sm:text-sm text-[#7E1815]">1st Place — Gateway Group Hackathon</p>
            <p className="text-[#725219] font-semibold">Defeated 50+ Competing Teams &bull; Team Lead</p>
            <p className="text-[#24140D] mt-1 leading-relaxed">AI-driven face recognition platform with anti-spoofing and DB-GPT analytics.</p>
          </div>

          <div className="p-3.5 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/35">
            <p className="font-banner font-bold text-xs sm:text-sm text-[#7E1815]">AIR Rank 9 — DD Robocon 2024</p>
            <p className="text-[#725219] font-semibold">Top 6% of 150+ Teams &bull; National Finals</p>
            <p className="text-[#24140D] mt-1 leading-relaxed">Autonomous mobile robotics chassis, drive control, and vision tracking.</p>
          </div>

          <div className="p-3 bg-[#FAF4E5] rounded-lg border border-[#8E712B]/30">
            <p className="font-banner font-bold text-[#7E1815]">Side Quest Winner — MLH Hackathon</p>
            <p className="text-[#8E712B] font-semibold">Major League Hacking Champion</p>
            <p className="text-[#3F2516] mt-1">1st place for creative and rapid technical bonus challenge prototyping.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
