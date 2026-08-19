import { wedding } from "../data/wedding";

type SelectedSide = "all" | "groom" | "bride";

export function WeddingInfo({
  selectedSide = "all",
}: {
  selectedSide?: SelectedSide;
}) {
  const events = wedding.events.filter(
    (event) => selectedSide === "all" || event.side === selectedSide,
  );

  return (
    <div className="grid gap-4 @2xl:grid-cols-2">
      {events.map((event) => (
        <article
          key={`${event.side}-${event.title}`}
          className="@container min-w-0 rounded-xl border border-[#d7a84f]/40 bg-white/70 p-6 text-center shadow-[0_12px_32px_rgba(122,20,22,0.06)]"
        >
          <h3 className="flex min-h-14 items-center justify-center text-lg font-semibold uppercase tracking-[0.08em] text-[#982723]">
            {event.title}
          </h3>
          <p className="font-display mt-4 text-3xl font-semibold text-[#982723] @2xs:text-4xl">
            {event.date}
          </p>
          <p className="mt-2 flex min-h-7 items-center justify-center text-base font-semibold tabular-nums text-[#4a1212]">
            {"time" in event && event.time ? event.time : null}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#80685a]">
            {event.note}
          </p>
          <p className="mt-4 leading-7 text-[#5f4034]">
            Tại {event.venue}
          </p>
        </article>
      ))}
    </div>
  );
}
