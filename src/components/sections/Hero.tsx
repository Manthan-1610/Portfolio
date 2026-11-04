import Room from "@/components/map/Room";
import { PacingFootprints } from "@/components/map/Footprint";
import { d } from "@/components/map/Rule";

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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
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

        <PacingFootprints label="Manthan Mehta" sub="pacing the Great Hall" className="mx-auto w-[200px]" />
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
