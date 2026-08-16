import { wedding } from "../data/wedding";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#fff4e8] px-5 py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(216,125,96,0.22),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(91,126,122,0.2),transparent_28%),linear-gradient(135deg,#fffaf5_0%,#f5e4d4_52%,#e9f0ec_100%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="space-y-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7a6a42]">
            Save the date
          </p>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-tight text-[#36251f] sm:text-6xl lg:text-7xl">
              {wedding.bride}
              <span className="block text-[#a6533f]">&</span>
              {wedding.groom}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#62514a]">
              {wedding.invitation}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#rsvp"
              className="rounded-full bg-[#2f5f58] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#284f4a]"
            >
              Xác nhận tham dự
            </a>
            <a
              href="#location"
              className="rounded-full border border-[#2f5f58]/30 bg-white/65 px-6 py-3 text-sm font-semibold text-[#2f5f58] backdrop-blur transition hover:bg-white"
            >
              Xem địa điểm
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full border border-white/70 bg-[#f8dcc7] p-4 shadow-2xl shadow-[#8b6040]/15">
          <div className="flex h-full items-center justify-center rounded-t-full bg-[linear-gradient(160deg,#f8c9b3,#fff7ee_52%,#bfd4ce)] text-center">
            <div className="space-y-4 px-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7b5d4e]">
                Wedding Day
              </p>
              <p className="text-4xl font-semibold text-[#34241e]">
                {wedding.dateLabel}
              </p>
              <p className="text-base text-[#705c53]">Bắt đầu lúc {wedding.partyTime}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
