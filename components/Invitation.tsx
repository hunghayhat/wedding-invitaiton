import { wedding } from "../data/wedding";

export function Invitation() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a6533f]">
          Trân trọng kính mời
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-[#36251f] sm:text-4xl">
          Cùng gia đình chung vui trong ngày thành hôn
        </h2>
        <p className="mt-6 text-lg leading-8 text-[#665850]">
          Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình hai bên và
          là món quà ý nghĩa nhất dành cho {wedding.bride} và {wedding.groom}.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#e8d6c8] bg-white/70 p-5">
            <p className="text-sm text-[#786b62]">{wedding.families.bride}</p>
            <p className="mt-2 text-xl font-semibold text-[#36251f]">Nhà gái</p>
          </div>
          <div className="rounded-lg border border-[#e8d6c8] bg-white/70 p-5">
            <p className="text-sm text-[#786b62]">{wedding.families.groom}</p>
            <p className="mt-2 text-xl font-semibold text-[#36251f]">Nhà trai</p>
          </div>
        </div>
      </div>
    </section>
  );
}
