import { wedding } from "../data/wedding";

export function Location() {
  return (
    <section id="location" className="bg-white px-5 py-16">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2f5f58]">
            Địa điểm
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#36251f]">
            {wedding.location.name}
          </h2>
          <p className="mt-4 leading-7 text-[#665850]">{wedding.location.address}</p>
          <a
            href={wedding.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-[#2f5f58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#284f4a]"
          >
            Mở Google Maps
          </a>
        </div>
        <div className="min-h-72 rounded-lg border border-[#d9e4df] bg-[linear-gradient(135deg,#e5f0ec,#fffaf5)] p-5">
          <div className="flex h-full min-h-64 items-center justify-center rounded-md border border-dashed border-[#8fb3aa] text-center text-[#2f5f58]">
            <div>
              <p className="text-lg font-semibold">Khu vực bản đồ</p>
              <p className="mt-2 text-sm">Có thể thay bằng iframe Google Maps sau.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
