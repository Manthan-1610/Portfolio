"use client";

import { Mail, Download, MapPin, Feather } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function ContactFooter() {
  return (
    <footer id="owlery" className="relative scroll-mt-24 pt-12 pb-16">
      {/* Hogwarts Room Ribbon Banner */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#C5A55A] to-[#8E712B]" />
        <span className="font-banner text-xs md:text-sm tracking-widest text-[#F4D37A] uppercase flex items-center gap-2 drop-shadow-sm">
          <Feather className="w-4 h-4 text-[#F4D37A]" />
          <span>~ The Owlery &bull; Dispatch a Message ~</span>
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#C5A55A] to-[#8E712B]" />
      </div>

      <div className="parchment-texture parchment-border rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden">
        {/* Parchment Stamp Watermark */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full border-4 border-[#8E712B]/15 flex items-center justify-center pointer-events-none rotate-12">
          <span className="font-title text-xs text-[#8E712B]/25 uppercase tracking-widest text-center px-4">
            Hogwarts Post &bull; Tempe AZ
          </span>
        </div>

        <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#24140D]">
          Send an Owl
        </h2>

        <p className="font-body text-base sm:text-lg text-[#4A2D1C] mt-3 max-w-xl mx-auto leading-relaxed">
          Whether you have an upcoming New Grad 2027 opportunity, want to discuss agentic AI systems, or collaborate on innovative projects — my owls are always primed for flight.
        </p>

        {/* Dispatch Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="mailto:mmanthan780@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl wax-seal text-[#FAF4E5] font-banner text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>

          <a
            href="https://linkedin.com/in/manthan-mehta-7a341622b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] transition-colors shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href="https://github.com/Manthan-1610"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] transition-colors shadow-xs"
          >
            <GithubIcon className="w-4 h-4 text-[#24140D]" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="/api/download-resume"
            download="Manthan_Mehta_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] font-banner text-sm hover:bg-[#F4EAD2] transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-[#7E1815]" />
            <span>Download Resume PDF</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[#8E712B]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-body text-[#704E37]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#8E712B]" />
            <span>Arizona State University, Tempe, AZ &bull; Phoenix Metro</span>
          </span>

          <span className="italic">
            Crafted with Next.js 15, TypeScript &amp; Framer Motion &bull; Mischief Managed
          </span>
        </div>
      </div>
    </footer>
  );
}
