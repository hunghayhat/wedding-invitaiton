import { Reveal } from "./Reveal";
import { wedding } from "../data/wedding";

type FamilySide = "groom" | "bride";

const familyCards: { side: FamilySide; label: string }[] = [
  { side: "groom", label: "Nhà trai" },
  { side: "bride", label: "Nhà gái" },
];

function FamilyCard({ side, label }: { side: FamilySide; label: string }) {
  const family = wedding.families[side];

  return (
    <article className="flex h-full min-w-0 flex-col px-6 py-7 text-center sm:px-8 sm:py-8">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#982723]">
        {label}
      </p>

      <span
        aria-hidden="true"
        className="mx-auto mt-4 block h-px w-12 bg-[#d7a84f]/50"
      />

      <div className="mt-5 flex flex-1 flex-col items-center justify-center">
        <p className="min-h-5 text-sm uppercase tracking-[0.14em] text-[#8a6f5f]">
          {family.title}
        </p>
        <div className="mt-1 flex min-h-16 flex-col justify-center space-y-1">
          {family.names.map((name) => (
            <p
              key={name}
              className="font-display text-xl font-semibold leading-8 text-[#4a1212] sm:text-2xl"
            >
              {name}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-6 min-h-[4.5rem] text-sm leading-6 text-[#8a6f5f]">
        {wedding.addresses[side]}
      </p>
    </article>
  );
}

export function Invitation() {
  return (
    <section className="bg-[#fff7e6] px-4 py-14 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-transparent to-[#d7a84f]/70 sm:w-12"
          />
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#982723]">
            Trân trọng kính mời
          </p>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-l from-transparent to-[#d7a84f]/70 sm:w-12"
          />
        </div>

        <h2 className="font-display mt-4 text-2xl font-semibold leading-snug text-[#4a1212] sm:text-3xl lg:text-4xl">
          Chung vui cùng hai gia đình trong ngày thành hôn
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6b4435] sm:text-lg">
          Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình hai bên và
          là món quà ý nghĩa nhất dành cho {wedding.groom} và {wedding.bride}.
        </p>

        <div className="mt-10 grid items-stretch overflow-hidden rounded-xl border border-[#d7a84f]/40 bg-white/75 shadow-[0_12px_32px_rgba(122,20,22,0.06)] @2xl:grid-cols-2">
          {familyCards.map((card, index) => (
            <div
              key={card.side}
              className={
                index === 0
                  ? "h-full border-[#d7a84f]/40 @2xl:border-r"
                  : "h-full border-t border-[#d7a84f]/40 @2xl:border-t-0"
              }
            >
              <FamilyCard side={card.side} label={card.label} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
