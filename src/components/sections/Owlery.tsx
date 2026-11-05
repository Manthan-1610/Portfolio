import Room from "@/components/map/Room";
import MischiefButton from "@/components/map/MischiefButton";
import { PacingFootprints } from "@/components/map/Footprint";
import { d } from "@/components/map/Rule";
import { profile } from "@/content";

function Envelope() {
  return (
    <a
      href={`mailto:${profile.email}`}
      className="group @container relative block aspect-[1.6] w-full max-w-[460px] [perspective:900px]"
      aria-label="Send Manthan an email"
    >
      <span className="absolute inset-0 bg-[#ead7ae] shadow-[3px_6px_14px_rgb(43_27_16/0.25)] transition-transform duration-500 group-hover:-translate-y-1.5" />
      {/* the letter peeking out */}
      <span className="absolute inset-x-[7%] top-[6%] h-[70%] bg-[#f8f0dc] shadow-sm transition-transform delay-150 duration-500 ease-out group-hover:-translate-y-[10%]">
        <span className="block pt-[9%] text-center font-hand text-[3.8cqw] text-ink-soft">Dear Manthan,</span>
      </span>
      {/* envelope body: everything but the V the flap covers */}
      <span
        className="absolute inset-0 bg-[#e8d3a7] transition-transform duration-500 group-hover:-translate-y-1.5"
        style={{ clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)" }}
      />
      <span className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-1.5">
        {/* the folds */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 62.5" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 62.5 L44 33 M100 62.5 L56 33" stroke="rgb(87 64 45 / 0.22)" strokeWidth="0.35" fill="none" />
        </svg>
        <span className="absolute bottom-[9%] left-[8%] font-script text-[7cqw] leading-[1.05] text-ink">
          Mr. M. Mehta
          <span className="block pl-[1em] text-[0.8em]">The Owlery, Tempe</span>
          <span className="block pl-[2em] text-[0.8em]">Arizona</span>
        </span>
        {/* postage stamp */}
        <span
          className="absolute right-[6%] top-[60%] block h-[13.5cqw] w-[11.3cqw] rotate-[4deg]"
          style={{
            background: "radial-gradient(circle at 3px 3px, #e8d3a7 1.7px, #f4e6c6 2px) -3px -3px / 6px 6px",
          }}
          aria-hidden="true"
        >
          <span className="absolute inset-[4px] flex flex-col items-center justify-center bg-[#7d2316] text-[#f1dfbd]">
            <span className="font-display text-[4.4cqw] leading-none">27</span>
            <span className="smallcaps mt-0.5 text-[1.45cqw] tracking-[0.16em]">New grad</span>
          </span>
        </span>
      </span>
      {/* top flap, opens on hover */}
      <span
        className="absolute inset-x-0 top-0 h-[56%] origin-top bg-[#dfc796] transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(160deg)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />
      {/* wax seal */}
      <span className="wax absolute left-1/2 top-[54%] flex h-[11cqw] w-[11cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-display text-[4.6cqw] italic transition-opacity duration-300 group-hover:opacity-0">
        M
      </span>
    </a>
  );
}

export default function Owlery() {
  return (
    <Room
      id="owlery"
      numeral="VI"
      name="The Owlery"
      decor={["stairs"]}
      className="px-6 pb-12 pt-16 sm:px-10 md:px-14 md:pb-14 md:pt-20 lg:px-16"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        <div>
          <h2 data-ink className="font-display text-[clamp(46px,6vw,80px)] font-normal leading-[0.92]">
            Send an owl
          </h2>
          <p data-ink className="mt-5 max-w-[46ch] text-[20px] leading-[1.5]" style={d(0.15)}>
            I graduate in May 2027 and I&apos;m looking for new-grad roles in software and applied AI. If you&apos;re hiring,
            building something interesting with agents, or just want to talk shop, write to me. Owls are checked daily.
          </p>
          <ul data-ink className="mt-8 grid max-w-md list-none gap-0 border-t border-ink/25 p-0" style={d(0.3)}>
            {[
              { k: "Email", v: "Write to me", href: `mailto:${profile.email}` },
              { k: "LinkedIn", v: "manthan-mehta", href: profile.linkedin, ext: true },
              { k: "GitHub", v: "Manthan-1610", href: profile.github, ext: true },
              { k: "Résumé", v: "Download the PDF", href: profile.resume, dl: true },
            ].map((row) => (
              <li key={row.k} className="grid grid-cols-[6.5rem_1fr] items-baseline border-b border-ink/25 py-2.5">
                <span className="smallcaps text-[11.5px] text-ink-faint">{row.k}</span>
                <a
                  className="ink-link w-fit font-display text-[19px] italic"
                  href={row.href}
                  {...(row.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(row.dl ? { download: "Manthan_Mehta_Resume.pdf" } : {})}
                >
                  {row.v}
                </a>
              </li>
            ))}
          </ul>
          <p className="invisible-ink m-0 mt-6 max-w-[40ch] font-hand text-[17px] leading-snug">
            Mr. Padfoot would like to know why the visitor is still reading instead of sending an owl.
          </p>
        </div>

        <div data-ink className="relative flex flex-col items-center" style={d(0.3)}>
          <Envelope />
          <PacingFootprints label="Manthan Mehta" sub="waiting for your owl" className="mt-8 w-[190px]" />
        </div>
      </div>

      <footer className="mt-16 flex flex-col gap-8 border-t border-dashed border-ink/30 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <MischiefButton />
        <div className="text-[14px] leading-relaxed text-ink-faint sm:text-right">
          <p className="m-0 font-display italic">
            Spells known to work on this parchment: <span className="text-ink-soft">lumos</span>,{" "}
            <span className="text-ink-soft">nox</span>, <span className="text-ink-soft">mischief managed</span>.
          </p>
          <p className="smallcaps m-0 mt-1 text-[11px]">Drawn by hand, more or less · Tempe, 2026</p>
        </div>
      </footer>
    </Room>
  );
}
