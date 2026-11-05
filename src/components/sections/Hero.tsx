import Image from "next/image";
import Room from "@/components/map/Room";
import { d } from "@/components/map/Rule";
import portrait from "@/images/manthan-portrait.jpg";

const facts: { label: string; value: string; href?: string }[] = [
  { label: "Proudest", value: "Software Engineer Intern, Intrinsic (Google) · Summer 2026", href: "#intrinsic" },
  { label: "Now", value: "AI Integration Engineer, ASU MeshLabs" },
  { label: "Studying", value: "MS Software Engineering, Arizona State · May 2027" },
];

export default function Hero() {
  return (
    <Room
      id="great-hall"
      numeral="I"
      name="The Great Hall"
      decor={["hearth"]}
      className="px-6 pb-14 pt-16 sm:px-10 md:px-14 md:pb-16 md:pt-20 lg:px-16"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <div>
          <h2 data-ink className="font-display text-[clamp(42px,5.4vw,70px)] font-normal leading-[0.95]">
            Who I am
          </h2>
          <p data-ink className="mt-6 max-w-[34ch] font-display text-[clamp(23px,2.4vw,31px)] leading-[1.28] text-ink" style={d(0.15)}>
            I build AI that does real work: agents that triage failing builds, VR instructors that watch your hands, and the
            occasional competition robot.
          </p>

          <dl data-ink className="mt-9 max-w-xl border-t border-ink/25" style={d(0.3)}>
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 border-b border-ink/25 py-2.5">
                <dt className="smallcaps text-[11.5px] text-ink-faint">{f.label}</dt>
                <dd className="m-0 text-[17px] leading-snug sm:text-[18px]">
                  {f.href ? (
                    <a className="ink-link" href={f.href}>
                      {f.value}
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A wizard photograph: sepia until you look at it, then it comes alive. */}
        <figure data-ink className="m-0 mx-auto w-full max-w-[280px]" style={d(0.35)}>
          <div className="wizard-photo relative rotate-[1.8deg] bg-[#f6eedb] p-2.5 pb-3 shadow-[2px_5px_12px_rgb(43_27_16/0.28)] transition-transform duration-500 hover:rotate-0">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 bg-[rgb(238_226_196/0.72)] shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
              style={{ clipPath: "polygon(2% 8%, 98% 0, 100% 92%, 0 100%)" }}
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}>
              <Image
                src={portrait}
                alt="Manthan Mehta in a Gryffindor uniform and round glasses, arms crossed, on a city street at night"
                fill
                sizes="280px"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-4 px-1 text-center">
            <span className="block font-display text-[19px] leading-tight">Manthan Mehta</span>
            <span className="block font-hand text-[15px] leading-snug text-ink-soft">in house colours, naturally</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-12 grid gap-1 border-t border-dashed border-ink/25 pt-5 sm:grid-cols-[auto_1fr] sm:gap-6">
        <p data-ink className="font-hand text-[17px] leading-snug text-ink-soft" style={d(0.45)}>
          <span className="only-hover">Some ink on this map only shows near a lit wand. Move yours about →</span>
          <span className="only-touch">Some notes on this map were written in invisible ink. Here&apos;s the first:</span>
        </p>
        <p className="invisible-ink font-hand text-[18px] leading-snug">
          Mr. Moony presents his compliments to the visitor, and begs them to keep walking.
        </p>
      </div>

    </Room>
  );
}
