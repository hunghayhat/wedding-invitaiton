import { wedding } from "../data/wedding";

export function Gallery() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a6533f]">
            Gallery
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#36251f]">
            Những khoảnh khắc yêu thương
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wedding.gallery.map((item, index) => (
            <div
              key={item}
              className="flex aspect-[4/5] items-end rounded-lg bg-[linear-gradient(160deg,#f4c9b1,#f8efe8_55%,#b8d0cb)] p-4 shadow-sm"
            >
              <p className="rounded-full bg-white/78 px-4 py-2 text-sm font-semibold text-[#4d4039] backdrop-blur">
                {index + 1}. {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
