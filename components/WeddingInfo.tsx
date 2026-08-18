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
    <div className="flex flex-wrap justify-center gap-4">
      {events.map((event) => (
        <article
          key={`${event.side}-${event.title}`}
          className="w-full min-w-0 border border-[#d7a84f] bg-white/70 p-5 text-center shadow-sm sm:w-[calc(50%-0.5rem)] sm:p-6 xl:w-[calc(25%-0.75rem)]"
        >
          <h3 className="flex min-h-14 items-center justify-center text-lg font-semibold uppercase tracking-[0.08em] text-[#982723]">
            {event.title}
          </h3>
          <p className="font-display mt-4 text-4xl font-semibold tabular-nums text-[#982723]">
            {event.time}
          </p>
          <p className="mt-2 text-base font-semibold text-[#4a1212]">
            {event.date}
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
