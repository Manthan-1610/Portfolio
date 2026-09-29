"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Bot, Award, Zap, Maximize2, X } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  category: string;
  prize: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Trophy;
}

const achievements: Achievement[] = [
  {
    id: "gateway-hackathon",
    title: "1st Place — Gateway Group Hackathon",
    category: "AI & Embedded Systems Track",
    prize: "1st Place Champions Trophy & Prize",
    description:
      "Won 1st Place at the Gateway Group Hackathon, defeating 50+ competing teams by leading an engineering team to design and deploy an AI-driven face recognition attendance platform with anti-spoofing and real-time DB-GPT query analytics.",
    imageSrc: "/photos/hackathon-gateway.jpeg",
    imageAlt: "Gateway Group Hackathon winning moment with team, trophy and certificate",
    icon: Trophy,
  },
  {
    id: "dd-robocon",
    title: "AIR Rank 9 — DD Robocon 2024",
    category: "National Robotics Championship Finals",
    prize: "All India Rank 9 (Top 6% of 150+ Teams)",
    description:
      "Engineered high-precision autonomous robotics chassis, holonomic drive system, tuned PID control reaching 85% target hit rate, and LiDAR-integrated TensorFlow Lite anomaly detection with 95% accuracy.",
    imageSrc: "/photos/robocon.jpeg",
    imageAlt: "Team in arena with ODIN 2.0 robot at DD Robocon National Championship Finals",
    icon: Bot,
  },
  {
    id: "mlh-sidequest",
    title: "Side Quest Winner — MLH Hackathon",
    category: "Major League Hacking (MLH)",
    prize: "Side Quest Champion & Official Trophy",
    description:
      "Awarded 1st place for the MLH bonus side-quest challenge at the official Major League Hacking in-person hackathon ceremony, demonstrating rapid technical prototyping and creative problem-solving.",
    imageSrc: "/photos/mlh-sidequest.jpeg",
    imageAlt: "Winning celebration on stage at Major League Hacking ceremony",
    icon: Zap,
  },
  {
    id: "tech-innovation-hackathon",
    title: "1st Place — Tech Innovation Hackathon",
    category: "AI & Web Track National Finals",
    prize: "1st Place Champions Trophy",
    description:
      "Triumphed at the Tech Innovation Hackathon in the competitive AI & Web category, building real-time collaborative applications with distributed backend services and generative intelligence.",
    imageSrc: "/photos/hackathon-2.jpeg",
    imageAlt: "Winners holding trophy and certificate at Tech Innovation Hackathon",
    icon: Award,
  },
];

export default function AchievementGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Achievement | null>(null);

  return (
    <section id="trophy-room" className="relative scroll-mt-24 py-12">
      {/* Hogwarts Room Ribbon Banner */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#C5A55A] to-[#8E712B]" />
        <span className="font-banner text-xs md:text-sm tracking-widest text-[#F4D37A] uppercase flex items-center gap-2 drop-shadow-sm">
          <Trophy className="w-4 h-4 text-[#F4D37A]" />
          <span>~ The Trophy Room &bull; Honors &amp; Accolades ~</span>
        </span>
        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#C5A55A] to-[#8E712B]" />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-title text-3xl sm:text-4xl text-[#FAF4E5] font-bold tracking-wide drop-shadow-md">
          Triwizard Trophies &amp; Engineering Laurels
        </h2>
        <p className="font-body italic text-sm sm:text-base text-[#D0BC95] mt-2">
          Verified tournament victories with photographic evidence &bull; Tap any photograph to enlarge
        </p>
      </div>

      {/* Grid of 4 Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((ach, idx) => {
          const Icon = ach.icon;
          return (
            <motion.div
              key={ach.id}
              className="parchment-texture parchment-border rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF4E5] border border-[#8E712B]/40 flex items-center justify-center text-[#8E712B] shrink-0 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-title text-xl font-bold text-[#24140D]">
                      {ach.title}
                    </h3>
                    <p className="font-body italic text-xs text-[#704E37]">
                      {ach.category}
                    </p>
                  </div>
                </div>

                {/* Prize Seal */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full wax-seal text-[#FAF4E5] font-banner text-xs font-semibold shadow-xs">
                    <Trophy className="w-3.5 h-3.5 text-[#F4D37A]" />
                    <span>{ach.prize}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-[#3D2517] leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Photo Frame with Click-to-Zoom (Uncut full presentation) */}
              <div
                onClick={() => setSelectedPhoto(ach)}
                className="group relative w-full h-64 sm:h-72 rounded-lg overflow-hidden border-2 border-[#8E712B]/50 shadow-md cursor-pointer bg-[#140D07]"
              >
                {/* Ambient Blurred Backdrop to smoothly fill letterbox margins */}
                <Image
                  src={ach.imageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover blur-lg scale-115 opacity-35 transition-transform duration-500 group-hover:scale-120"
                  aria-hidden="true"
                />

                {/* Crystal-Clear Uncut Photo */}
                <Image
                  src={ach.imageSrc}
                  alt={ach.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-1.5 relative z-10 transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-md"
                  priority={idx < 2}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 pointer-events-none">
                  <span className="font-banner text-xs text-[#FAF4E5] flex items-center gap-1.5 drop-shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-[#F4D37A]" />
                    <span>Click to view full certificate / trophy</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] text-[#F4D37A] font-mono border border-[#8E712B]/40">
                    Full Resolution
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl parchment-texture parchment-border rounded-xl p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#FAF4E5] border border-[#8E712B] text-[#24140D] flex items-center justify-center hover:bg-[#F4EAD2] transition-colors cursor-pointer shadow-lg"
                aria-label="Close photo inspection"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[50vh] sm:h-[62vh] max-h-[600px] rounded-lg overflow-hidden border border-[#8E712B] mb-3 bg-[#0F0804] flex items-center justify-center">
                {/* Ambient Blurred Background in Lightbox */}
                <Image
                  src={selectedPhoto.imageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover blur-2xl opacity-30"
                  aria-hidden="true"
                />

                {/* Completely Uncut Original Photograph */}
                <Image
                  src={selectedPhoto.imageSrc}
                  alt={selectedPhoto.imageAlt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain p-2 relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-title text-xl font-bold text-[#24140D]">
                    {selectedPhoto.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full wax-seal text-[#FAF4E5] font-banner text-xs font-semibold">
                    {selectedPhoto.prize}
                  </span>
                </div>
                <p className="font-body text-sm text-[#4A2D1C] leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
