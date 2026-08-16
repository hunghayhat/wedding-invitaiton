import { wedding } from "../data/wedding";

export function Location() {
  return (
    <section id="location" className="bg-[#4a1212] px-4 py-12 text-[#fff4ce] sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c65c] sm:text-sm sm:tracking-[0.2em]">
            Địa điểm
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
            {wedding.location.name}
          </h2>
          <p className="mt-4 leading-7 text-[#f7ddb0]">
            {wedding.location.address}
          </p>
          <a
            href={wedding.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#f4c65c] px-6 py-3 text-sm font-semibold text-[#4a1212] transition hover:bg-[#ffe08a] sm:w-auto"
          >
            Mở Google Maps
          </a>
        </div>
        <div className="min-h-64 border border-[#f4c65c]/50 bg-[#350909] p-4 sm:min-h-72 sm:p-5">
          <div className="flex h-full min-h-56 items-center justify-center border border-dashed border-[#f4c65c]/60 text-center text-[#f6d484] sm:min-h-64">
            <div>
              <p className="text-5xl leading-none">{"\u56CD"}</p>
              <p className="mt-4 text-lg font-semibold">Khu vực bản đồ</p>
              <p className="mt-2 text-sm text-[#f7ddb0]">
                Có thể thay bằng iframe Google Maps sau.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
