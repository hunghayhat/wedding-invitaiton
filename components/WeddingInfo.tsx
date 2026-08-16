import { wedding } from "../data/wedding";

export function WeddingInfo() {
  return (
    <section className="bg-white px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2f5f58]">
            Thông tin buổi lễ
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#36251f]">
            Lịch trình ngày cưới
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {wedding.events.map((event) => (
            <article
              key={event.title}
              className="rounded-lg border border-[#e7ddd4] bg-[#fffaf5] p-6"
            >
              <p className="text-sm font-semibold text-[#a6533f]">{event.date}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#36251f]">
                {event.title}
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#2f5f58]">
                {event.time}
              </p>
              <p className="mt-4 leading-7 text-[#665850]">{event.address}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
