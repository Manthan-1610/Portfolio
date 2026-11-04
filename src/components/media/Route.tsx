const numerals = ["I", "II", "III", "IV", "V", "VI"];

/** Footprints walking from one stop to the next, in place of a drawn line. */
function Steps() {
  const feet = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 120 16" preserveAspectRatio="xMidYMid meet" className="h-4 w-full fill-ink/55" aria-hidden="true">
      {feet.map((k) => (
        <use
          key={k}
          href={k % 2 ? "#foot-r" : "#foot-l"}
          width="4.6"
          height="10"
          transform={`translate(${8 + k * 20} ${k % 2 ? 9.5 : 6.5}) rotate(90) translate(-2.3 -5)`}
          opacity={0.45 + k * 0.1}
        />
      ))}
    </svg>
  );
}

/**
 * For projects without footage: the route the data takes through the system,
 * drawn like a path on the map with numbered stops.
 */
export default function Route({ title, stops }: { title: string; stops: { name: string; note: string }[] }) {
  return (
    <figure className="m-0">
      <figcaption className="smallcaps mb-6 text-[11.5px] text-ink-faint">{title}</figcaption>
      <ol
        className="m-0 grid list-none gap-0 p-0 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        style={{ "--n": stops.length } as React.CSSProperties}
      >
        {stops.map((s, i) => {
          const last = i === stops.length - 1;
          return (
            <li key={s.name} className="relative grid grid-cols-[44px_1fr] gap-x-4 pb-7 md:block md:pb-0 md:text-center">
              {/* the path to the next stop */}
              {!last && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[21px] top-11 border-l border-dashed border-ink/45 md:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+30px)] right-[calc(-50%+30px)] top-[13px] hidden md:block"
                  >
                    <Steps />
                  </span>
                </>
              )}
              <span
                className={`relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border font-display text-[17px] italic md:mx-auto ${
                  last ? "border-blood bg-blood text-[#f1dfbd]" : "border-ink/60 bg-paper text-ink"
                }`}
                aria-hidden="true"
              >
                {numerals[i]}
              </span>
              <span className="block pt-1.5 md:px-2 md:pt-3">
                <span className="block font-display text-[20px] leading-tight">{s.name}</span>
                <span className="block font-hand text-[15.5px] leading-snug text-ink-soft">{s.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
