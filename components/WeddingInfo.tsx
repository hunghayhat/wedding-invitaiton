import { wedding } from "../data/wedding";

export function WeddingInfo() {
  return (
    <section className="bg-[#5a1010] px-4 py-12 text-[#fff4ce] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c65c] sm:text-sm sm:tracking-[0.2em]">
            Lịch trình
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            Thông tin buổi lễ
          </h2>
        </div>
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wedding.events.map((event, index) => (
            <article
              key={event.title}
              className="min-w-0 border border-[#f4c65c]/45 bg-[#3d0b0b]/55 p-5 shadow-lg shadow-black/10 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-semibold tabular-nums text-[#f4c65c] sm:text-3xl">
                  {event.time}
                </p>
                <span className="flex size-9 items-center justify-center rounded-full border border-[#f4c65c]/60 text-sm text-[#f4c65c]">
                  {index + 1}
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#f6d484] sm:text-sm sm:tracking-[0.16em]">
                {event.date}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-7 text-white sm:text-2xl">
                {event.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#f7ddb0]">
                {event.note}
              </p>
              <p className="mt-4 leading-7 text-[#fff4ce]">{event.address}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
