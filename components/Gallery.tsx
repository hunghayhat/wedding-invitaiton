import { wedding } from "../data/wedding";

export function Gallery() {
  return (
    <section className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.2em]">
            Album
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
            Những khoảnh khắc yêu thương
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wedding.gallery.map((item, index) => (
            <div
              key={item}
              className="flex aspect-[5/4] min-w-0 items-end border border-[#e1b85c] bg-[linear-gradient(160deg,#781818,#a51f1f_48%,#f4c65c)] p-4 shadow-sm sm:aspect-[4/5]"
            >
              <p className="max-w-full bg-[#fff7e6]/90 px-4 py-2 text-sm font-semibold leading-6 text-[#4a1212] backdrop-blur">
                {index + 1}. {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
