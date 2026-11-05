"use client";

export default function MischiefButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        window.dispatchEvent(
          new CustomEvent("mischief-managed", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }),
        );
      }}
      className="group text-left"
    >
      <span className="block font-script text-[44px] leading-none text-ink transition-colors group-hover:text-blood">
        Mischief managed
      </span>
      <span className="smallcaps mt-1 block text-[11px] text-ink-faint">fold the map away</span>
    </button>
  );
}
