"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A wizard photograph that actually moves: a short silent loop that plays
 * while it's on screen, sepia while still and in colour while playing.
 * Visitors can pause it (anything moving for more than five seconds needs a
 * pause control), and it never plays by itself under reduced motion.
 */
export default function MovingPicture({
  src,
  poster,
  w,
  h,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const paused = useRef(false); // paused by the visitor, so don't resume on scroll

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't always carry `muted` onto server-rendered video, and
    // browsers only autoplay muted video.
    v.muted = true;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) paused.current = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !paused.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      paused.current = false;
      v.play().catch(() => {});
    } else {
      paused.current = true;
      v.pause();
    }
  };

  return (
    <div
      className={`moving-photo relative bg-[#f6eedb] p-2.5 pb-3 shadow-[2px_5px_12px_rgb(43_27_16/0.28)] ${className}`}
      data-playing={playing}
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-2 bg-[rgb(238_226_196/0.72)] shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
        style={{ clipPath: "polygon(2% 8%, 98% 0, 100% 92%, 0 100%)" }}
      />
      <video
        ref={ref}
        className="block h-auto w-full bg-[#1f1f1f]"
        width={w}
        height={h}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-6 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(43_27_16/0.72)] text-[#f1dfbd] shadow-md transition-opacity hover:bg-[rgb(43_27_16/0.88)]"
        aria-label={playing ? "Pause the recording" : "Play the recording"}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
          {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4.5 2.5v11l9-5.5z" />}
        </svg>
      </button>
    </div>
  );
}
