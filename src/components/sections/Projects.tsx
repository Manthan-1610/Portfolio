import Room from "@/components/map/Room";
import Rule, { d } from "@/components/map/Rule";
import MovingPicture from "@/components/media/MovingPicture";
import MatchFootage from "@/components/media/MatchFootage";
import Route from "@/components/media/Route";
import { projects, type Project } from "@/content";

const numerals = ["I", "II", "III", "IV"];

function Figures({ p, compact }: { p: Project; compact?: boolean }) {
  return p.figures.map((f, k) => (
    <div key={f.caption} data-ink style={d(0.35 + k * 0.15)} className="border-l border-ink/30 pl-5">
      <p
        className={`m-0 font-display leading-[0.9] tracking-[-0.02em] text-blood ${
          compact ? "text-[clamp(44px,4.4vw,62px)]" : "text-[clamp(54px,5.6vw,80px)]"
        }`}
      >
        {f.value}
      </p>
      <p className="m-0 mt-2 max-w-[15rem] font-hand text-[16.5px] leading-tight text-blood/90">{f.caption}</p>
    </div>
  ));
}

export default function Projects() {
  return (
    <Room
      id="room-of-requirement"
      numeral="III"
      name="The Room of Requirement"
      decor={["stairs"]}
      className="px-6 pb-20 pt-16 sm:px-10 md:px-14 md:pb-24 md:pt-20 lg:px-16"
    >
      <header className="mb-12 max-w-2xl md:mb-16">
        <h2 data-ink className="font-display text-[clamp(42px,5.4vw,70px)] font-normal leading-[0.95]">
          Things I&apos;ve built
        </h2>
        <p data-ink className="mt-3 font-display text-[19px] italic text-ink-soft" style={d(0.2)}>
          The room gives you whatever you need. These are what I needed.
        </p>
      </header>

      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        const m = p.media;
        // A portrait recording takes the side column; the figures move under the text.
        const portrait = m?.kind === "loop";
        return (
          <div key={p.title}>
            {i > 0 && <Rule className="my-14 opacity-80 md:my-20" />}
            <article className="relative grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className={`lg:col-span-7 ${flip ? "lg:col-start-6" : ""}`}>
                <p data-ink className="smallcaps m-0 text-[12px] text-ink-faint">
                  No. {numerals[i]} &nbsp;·&nbsp; {p.period}
                </p>
                <h3
                  data-ink
                  className="m-0 mt-2 font-display text-[clamp(46px,6.4vw,88px)] font-normal leading-[0.9] tracking-[-0.015em]"
                  style={d(0.1)}
                >
                  {p.title}
                </h3>
                <p data-ink className="m-0 mt-3 font-display text-[clamp(21px,2vw,25px)] italic leading-snug text-ink-soft" style={d(0.2)}>
                  {p.dek}
                </p>
                <p data-ink className="onum m-0 mt-5 max-w-[60ch] text-[18px] leading-[1.62] text-ink/90" style={d(0.3)}>
                  {p.body}
                </p>
                {portrait && (
                  <div className="mt-8 grid grid-cols-2 gap-6 sm:max-w-md">
                    <Figures p={p} compact />
                  </div>
                )}
                <p data-ink className="smallcaps m-0 mt-6 text-[11.5px] text-ink-faint" style={d(0.4)}>
                  {p.tools.join("  ·  ")}
                </p>
                <p data-ink className="m-0 mt-6 font-display text-[20px] italic" style={d(0.5)}>
                  <a className="ink-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    Read the source ↗
                  </a>
                </p>
              </div>

              <div
                className={`flex flex-col justify-center gap-8 lg:col-span-4 lg:gap-10 ${portrait ? "items-center" : "sm:flex-row lg:flex-col"} ${
                  flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"
                }`}
              >
                {m?.kind === "loop" ? (
                  <figure data-ink className="m-0 w-full max-w-[270px]" style={d(0.35)}>
                    <MovingPicture
                      src={m.src}
                      poster={m.poster}
                      w={m.w}
                      h={m.h}
                      alt={m.alt}
                      className={flip ? "rotate-[1.6deg]" : "-rotate-[1.6deg]"}
                    />
                    <figcaption className="mt-4 px-1 font-hand text-[16.5px] leading-snug text-ink-soft">{m.caption}</figcaption>
                  </figure>
                ) : (
                  <Figures p={p} />
                )}
                {p.marauder && <p className="invisible-ink m-0 font-hand text-[17px] leading-snug">{p.marauder}</p>}
              </div>

              {m?.kind === "youtube" && (
                <>
                  <div data-ink className="lg:col-span-8" style={d(0.3)}>
                    <MatchFootage id={m.id} poster={m.poster} title={m.title} className="-rotate-[0.8deg]" />
                  </div>
                  <div data-ink className="lg:col-span-4 lg:pt-10" style={d(0.45)}>
                    <p className="m-0 font-hand text-[19px] leading-snug text-blood">{m.caption}</p>
                    <p className="m-0 mt-3 font-display text-[18px] italic">
                      <a
                        className="ink-link"
                        href={`https://www.youtube.com/watch?v=${m.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch it on YouTube ↗
                      </a>
                    </p>
                  </div>
                </>
              )}

              {m?.kind === "route" && (
                <div data-ink className="lg:col-span-12" style={d(0.3)}>
                  <Route title={m.title} stops={m.stops} />
                </div>
              )}

              {p.stamp && (
                <div
                  data-ink
                  className={`pointer-events-none absolute z-20 hidden lg:block ${
                    portrait ? "-top-6 right-[3%]" : flip ? "-top-8 left-[1%]" : "-top-[60px] right-[1%]"
                  }`}
                  style={d(0.9)}
                  aria-hidden="true"
                >
                  <span className={`stamp ${flip && !portrait ? "rotate-[7deg]" : "-rotate-[9deg]"}`}>
                    <span className="text-[19px]">{p.stamp[0]}</span>
                    <span className="text-[10px] tracking-[0.2em]">{p.stamp[1]}</span>
                  </span>
                </div>
              )}
            </article>
          </div>
        );
      })}
    </Room>
  );
}
