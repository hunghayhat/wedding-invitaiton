import { wedding } from "../data/wedding";

export function Invitation() {
  return (
    <section className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.2em]">
          Trân trọng kính mời
        </p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl lg:text-4xl">
          Chung vui cùng hai gia đình trong ngày thành hôn
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#6b4435] sm:mt-6 sm:text-lg sm:leading-8">
          Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình hai bên và
          là món quà ý nghĩa nhất dành cho {wedding.groom} và {wedding.bride}.
        </p>
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          <article className="min-w-0 border border-[#e1b85c] bg-white/75 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.18em]">
              Nhà trai
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#4a1212] sm:text-xl">
              {wedding.families.groom}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#765140]">
              {wedding.addresses.groom}
            </p>
          </article>
          <article className="min-w-0 border border-[#e1b85c] bg-white/75 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.18em]">
              Nhà gái
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#4a1212] sm:text-xl">
              {wedding.families.bride}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#765140]">
              {wedding.addresses.bride}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
