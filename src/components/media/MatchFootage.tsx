"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A YouTube video behind a still photograph. Nothing from YouTube loads until
 * the visitor asks for it, which keeps the page light and cookie-free.
 */
export default function MatchFootage({
  id,
  poster,
  title,
  className = "",
}: {
  id: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative bg-[#f6eedb] p-2.5 pb-3 shadow-[2px_5px_12px_rgb(43_27_16/0.28)] transition-transform duration-500 ${
        open ? "rotate-0" : `hover:rotate-0 ${className}`
      }`}
    >
      {["left-1 top-1 [clip-path:polygon(0_0,100%_0,0_100%)]", "right-1 top-1 [clip-path:polygon(0_0,100%_0,100%_100%)]", "bottom-1 left-1 [clip-path:polygon(0_0,100%_100%,0_100%)]", "bottom-1 right-1 [clip-path:polygon(100%_0,100%_100%,0_100%)]"].map(
        (pos) => (
          <span key={pos} aria-hidden="true" className={`absolute z-10 h-6 w-6 bg-[#2b1b10]/85 ${pos}`} />
        ),
      )}
      <div className="relative aspect-video overflow-hidden bg-[#1f1f1f]">
        {open ? (
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="match-poster group absolute inset-0 block h-full w-full"
            aria-label={`Play the video: ${title}`}
          >
            <Image src={poster} alt="" fill sizes="(max-width: 1024px) 92vw, 720px" className="object-cover" />
            <span className="wax absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 sm:h-[72px] sm:w-[72px] -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 16 16" width="24" height="24" aria-hidden="true" fill="currentColor" className="ml-1">
                <path d="M4.5 2.5v11l9-5.5z" />
              </svg>
            </span>
            <span className="smallcaps absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[rgb(43_27_16/0.7)] px-2.5 py-1 text-[11px] text-[#f1dfbd]">
              Play the match
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
