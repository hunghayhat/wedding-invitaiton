import { wedding } from "../data/wedding";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#4a1212] px-4 py-10 text-[#ffe9b3] sm:px-6 sm:py-14 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(255,216,118,0.18),transparent_26%),radial-gradient(circle_at_84%_78%,rgba(255,96,72,0.16),transparent_30%),linear-gradient(135deg,#5a1515_0%,#320909_56%,#210505_100%)]" />
      <div
        aria-hidden="true"
        className="absolute left-3 top-4 text-4xl text-[#f4c65c]/25 sm:left-6 sm:text-7xl"
      >
        {"\u56CD"}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-4 text-5xl text-[#f4c65c]/20 sm:right-6 sm:text-8xl"
      >
        {"\u56CD"}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c65c] sm:text-sm sm:tracking-[0.22em]">
            Song Long Đỏ
          </p>
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-[#fff4ce] sm:text-5xl lg:text-6xl">
              <span className="block break-words">{wedding.groom}</span>
              <span className="mx-auto my-3 block h-px w-24 bg-[#f4c65c] sm:w-28 lg:mx-0" />
              <span className="block break-words">{wedding.bride}</span>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-7 text-[#f7ddb0] sm:text-lg sm:leading-8 lg:mx-0">
              {wedding.invitation}
            </p>
          </div>
          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
            <a
              href="#rsvp"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f4c65c] px-5 py-3 text-sm font-semibold text-[#4a1212] shadow-sm transition hover:bg-[#ffe08a]"
            >
              Xác nhận tham dự
            </a>
            <a
              href="#location"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#f4c65c]/50 bg-white/5 px-5 py-3 text-sm font-semibold text-[#ffe9b3] backdrop-blur transition hover:bg-white/10"
            >
              Xem địa điểm
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] border border-[#f4c65c]/60 bg-[#741717] p-3 shadow-2xl shadow-black/30 sm:rounded-t-[12rem] sm:p-4">
            <div className="absolute inset-4 rounded-t-[9rem] border border-[#f8d777]/50 sm:inset-5 sm:rounded-t-[10rem]" />
            <div className="flex h-full flex-col items-center justify-between rounded-t-[9rem] bg-[linear-gradient(160deg,#8b1b1b_0%,#5a1010_52%,#340909_100%)] px-5 py-7 text-center sm:rounded-t-[10rem] sm:px-7 sm:py-10">
              <div
                aria-hidden="true"
                className="grid w-full grid-cols-2 text-4xl font-semibold text-[#f4c65c]/75 sm:text-6xl"
              >
                <span>{"\u9F8D"}</span>
                <span className="-scale-x-100">{"\u9F8D"}</span>
              </div>
              <div>
                <p className="text-5xl leading-none text-[#f4c65c] sm:text-7xl">
                  {"\u56CD"}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f6d484] sm:mt-6 sm:text-sm sm:tracking-[0.24em]">
                  Wedding Day
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#fff4ce] sm:text-4xl">
                  {wedding.dateShort}
                </p>
                <p className="mt-3 text-sm text-[#f7ddb0] sm:text-base">
                  Bắt đầu lúc {wedding.partyTime}
                </p>
              </div>
              <p className="max-w-48 text-xs leading-5 text-[#f6d484] sm:max-w-none sm:text-sm">
                {wedding.lunarDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
