import Room from "@/components/map/Room";
import Rule, { WithMetric, d } from "@/components/map/Rule";
import { jobs } from "@/content";

const numerals = ["i.", "ii.", "iii.", "iv."];

export default function Experience() {
  return (
    <Room
      id="clock-tower"
      numeral="II"
      name="The Clock Tower"
      decor={["windows"]}
      className="px-6 pb-16 pt-16 sm:px-10 md:px-14 md:pb-20 md:pt-20 lg:px-16"
    >
      <header className="mb-12 max-w-2xl md:mb-16">
        <h2 data-ink className="font-display text-[clamp(42px,5.4vw,70px)] font-normal leading-[0.95]">
          Where I&apos;ve worked
        </h2>
        <p data-ink className="mt-3 font-display text-[19px] italic text-ink-soft" style={d(0.2)}>
          Most recent first. The clock only runs one way.
        </p>
      </header>

      <ol className="m-0 list-none p-0">
        {jobs.map((job, i) => (
          <li key={job.company}>
            {i > 0 && <Rule className="my-12 opacity-80 md:my-16" />}
            <article id={job.id} className="relative scroll-mt-24 grid gap-x-10 gap-y-6 md:grid-cols-[190px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_190px]">
              <div data-ink className="flex flex-row items-end justify-between gap-6 md:flex-col md:items-start md:justify-start">
                <div>
                  <p className="smallcaps m-0 text-[12.5px] text-ink">{job.period}</p>
                  <p className="m-0 font-display text-[16px] italic text-ink-faint">{job.place}</p>
                </div>
                <div className="text-right md:mt-6 md:text-left">
                  <p className="m-0 font-display text-[clamp(52px,6vw,78px)] leading-[0.9] tracking-[-0.02em] text-blood">
                    {job.figure.value}
                  </p>
                  <p className="m-0 mt-1 max-w-[11rem] font-hand text-[16px] leading-tight text-blood/90 md:-rotate-2">
                    {job.figure.caption}
                  </p>
                </div>
              </div>

              <div>
                <h3 data-ink className="m-0 font-display text-[clamp(30px,3.2vw,42px)] font-normal leading-[1.05]">
                  {job.role}
                </h3>
                <p data-ink className="m-0 mt-1 font-display text-[21px] italic text-ink-soft" style={d(0.1)}>
                  {job.company}
                  {job.companyNote && <span className="text-ink-faint">, {job.companyNote}</span>}
                </p>
                <p data-ink className="m-0 mt-5 max-w-[52ch] text-[20px] leading-[1.45] text-ink" style={d(0.2)}>
                  {job.dek}
                </p>
                <ul className="m-0 mt-5 max-w-[64ch] list-none space-y-3 p-0">
                  {job.points.map((p, k) => (
                    <li
                      key={k}
                      data-ink
                      className="onum grid grid-cols-[2rem_1fr] text-[17.5px] leading-[1.6] text-ink/90"
                      style={d(0.3 + k * 0.12)}
                    >
                      <span className="font-display italic text-blood">{numerals[k]}</span>
                      <span>
                        <WithMetric text={p.text} metric={p.metric} />
                      </span>
                    </li>
                  ))}
                </ul>
                <p data-ink className="smallcaps m-0 mt-5 text-[11.5px] text-ink-faint" style={d(0.6)}>
                  {job.tools.join("  ·  ")}
                </p>
              </div>

              {job.proudest && (
                <div
                  data-ink
                  className="pointer-events-none absolute -top-7 right-0 hidden sm:block"
                  style={d(0.8)}
                  aria-hidden="true"
                >
                  <span className="stamp -rotate-[7deg]">
                    <span className="text-[18px]">Proudest work</span>
                    <span className="text-[10px] tracking-[0.2em]">Intrinsic · Google</span>
                  </span>
                </div>
              )}

              <p className="invisible-ink m-0 self-center font-hand text-[17px] leading-snug md:col-start-2 xl:col-start-auto">
                {job.marauder}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Room>
  );
}
