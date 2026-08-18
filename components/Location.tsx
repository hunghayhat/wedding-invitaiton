import { wedding } from "../data/wedding";

type SelectedSide = "all" | "groom" | "bride";

export function Location({
  selectedSide = "all",
}: {
  selectedSide?: SelectedSide;
}) {
  const locations = wedding.locations.filter(
    (location) => selectedSide === "all" || location.side === selectedSide,
  );

  return (
    <section
      id="location"
      className="bg-[#4a1212] px-4 py-12 text-[#fff4ce] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c65c] sm:text-sm sm:tracking-[0.2em]">
            Địa điểm
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
            Chỉ đường tới nơi tổ chức
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {locations.map((location) => (
            <article
              key={`${location.side}-${location.title}`}
              className="w-full min-w-0 border border-[#f4c65c]/50 bg-[#350909] p-5 sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]"
            >
              <p className="inline-flex border border-[#f4c65c]/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4c65c]">
                {location.sideLabel}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-white">
                {location.title}
              </h3>
              <p className="mt-2 text-sm text-[#f6d484]">
                {location.description}
              </p>
              <p className="mt-4 leading-7 text-[#f7ddb0]">
                {location.address}
              </p>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#f4c65c] px-6 py-3 text-sm font-semibold text-[#4a1212] transition hover:bg-[#ffe08a]"
              >
                Mở Google Maps
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
