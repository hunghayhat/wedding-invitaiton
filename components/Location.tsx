import { Reveal } from "./Reveal";
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
      <Reveal className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#f4c65c]/60 sm:w-12"
            />
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#f4c65c]">
              Địa điểm
            </p>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#f4c65c]/60 sm:w-12"
            />
          </div>
          <h2 className="font-display mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
            Chỉ đường tới nơi tổ chức
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {locations.map((location) => (
            <article
              key={`${location.side}-${location.title}`}
              className="flex w-full min-w-0 max-w-md flex-col rounded-xl border border-[#f4c65c]/25 bg-[#3d0d0d] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)] @2xl:w-[calc(50%-0.625rem)] @2xl:max-w-none @4xl:w-[calc(33.333%-0.875rem)]"
            >
              <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#f4c65c]">
                <span
                  aria-hidden="true"
                  className="size-1.5 rotate-45 bg-[#f4c65c]/80"
                />
                {location.sideLabel}
              </p>

              <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-white">
                {location.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#e5b877]/90">
                {location.description}
              </p>

              <span
                aria-hidden="true"
                className="mt-5 block h-px w-full bg-gradient-to-r from-[#f4c65c]/35 to-transparent"
              />

              <p className="mt-5 text-sm leading-7 text-[#f3ddba]">
                {location.address}
              </p>

              <div className="mt-auto pt-6">
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#f4c65c]/70 px-6 py-3 text-sm font-semibold tracking-wide text-[#f4c65c] transition hover:bg-[#f4c65c] hover:text-[#4a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4c65c]/50"
                >
                  Mở Google Maps
                </a>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
