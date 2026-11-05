"use client";

import { useEffect } from "react";

/**
 * Marks every [data-ink] element with `.inked` the first time it scrolls into
 * view. CSS does the rest (ink bleeds in, walls draw themselves). Elements
 * added later — e.g. the corridor once it has measured the page — are picked up
 * by the MutationObserver.
 */
export default function InkObserver() {
  useEffect(() => {
    const root = document.documentElement;
    let swornAt = root.classList.contains("sworn") ? performance.now() - 10_000 : Infinity;
    const classWatch = new MutationObserver(() => {
      const sworn = root.classList.contains("sworn");
      if (sworn && swornAt === Infinity) swornAt = performance.now();
      if (!sworn) swornAt = Infinity;
    });
    classWatch.observe(root, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(
      (entries) => {
        // Long staggered delays are for the opening reveal; anything inked
        // later (while scrolling) should appear promptly.
        const late = performance.now() - swornAt > 2500;
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            if (late && parseFloat(el.style.getPropertyValue("--d") || "0") > 0.6) el.style.setProperty("--d", "0.1s");
            el.classList.add("inked");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-ink]:not(.inked)").forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n instanceof Element) {
            if (n.matches("[data-ink]:not(.inked)")) io.observe(n);
            scan(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      classWatch.disconnect();
    };
  }, []);

  return null;
}
