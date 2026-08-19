import { wedding } from "../data/wedding";

type Person = {
  role?: string;
  name: string;
  photo: string;
};

function LatticePattern({
  patternId,
  color,
  className = "",
}: {
  patternId: string;
  color: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id={patternId}
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M22 2 L42 22 L22 42 L2 22 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <circle cx="22" cy="22" r="2.5" fill={color} />
          <circle cx="0" cy="0" r="1.5" fill={color} />
          <circle cx="44" cy="0" r="1.5" fill={color} />
          <circle cx="0" cy="44" r="1.5" fill={color} />
          <circle cx="44" cy="44" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function PortraitCircle({ person }: { person: Person }) {
  return (
    <div className="relative z-10 mx-auto aspect-square w-full max-w-[10.5rem] overflow-hidden rounded-full border-[6px] border-[#f7efe6] bg-[#8f2622] shadow-[0_18px_40px_rgba(94,23,20,0.28)] outline outline-2 outline-[#d59a49]/70 @2xl:max-w-[13rem] @2xl:border-[8px] @4xl:max-w-[16rem]">
      <img
        src={person.photo}
        alt={person.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function PortraitCaption({ person }: { person: Person }) {
  return (
    <div className="min-w-0 text-center">
      {person.role ? (
        <p className="text-xs uppercase tracking-[0.22em] text-[#8a6f5f] sm:text-sm">
          {person.role}
        </p>
      ) : null}
      <h1 className="font-script mt-2 break-words text-3xl font-bold leading-tight text-[#982723] @2xl:text-4xl @4xl:text-5xl">
        {person.name}
      </h1>
    </div>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#f7efe6] text-[#982723]">
      <div className="relative overflow-hidden border-b-2 border-[#d59a49]/60 bg-[#982723] px-5 py-7 text-center text-[#fff7ef] sm:px-8 sm:py-9">
        <LatticePattern
          patternId="heroLatticeTop"
          color="#e8bd76"
          className="opacity-25"
        />
        <div className="relative mx-auto max-w-sm">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#e8bd76]">
            {wedding.hero.kicker}
          </p>
          <div className="mx-auto my-4 flex w-24 items-center gap-2">
            <span className="h-px flex-1 bg-[#e8bd76]/50" />
            <span className="text-[0.6rem] text-[#e8bd76]">✦</span>
            <span className="h-px flex-1 bg-[#e8bd76]/50" />
          </div>
          <p className="font-display text-2xl tracking-[0.12em] text-[#fff7ef] sm:text-3xl">
            {wedding.hero.title}
          </p>
          <p className="mt-3 text-sm tabular-nums tracking-[0.2em] text-[#f7efe6]/80">
            {wedding.hero.dateLabel}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-1 h-px bg-[#e8bd76]/45" />
      </div>

      <div className="relative overflow-hidden">
        <LatticePattern
          patternId="heroLatticeBody"
          color="#c8964a"
          className="opacity-[0.14]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:pb-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-[-50vw] top-1/2 h-12 -translate-y-1/2 bg-[#982723] sm:h-16"
            >
              <div className="absolute inset-x-0 top-[3px] h-px bg-[#e8bd76]/55" />
              <div className="absolute inset-x-0 bottom-[3px] h-px bg-[#e8bd76]/55" />
            </div>

            <div className="relative grid grid-cols-2 gap-6 @2xl:gap-12 @4xl:gap-20">
              <PortraitCircle person={wedding.people.groom} />
              <PortraitCircle person={wedding.people.bride} />
            </div>

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#e8bd76] bg-[#982723] shadow-[0_10px_24px_rgba(94,23,20,0.35)] @2xl:size-16 @4xl:size-20"
            >
              <span className="text-2xl font-bold leading-none text-[#f7efe6] @2xl:text-3xl @4xl:text-4xl">
                {"\u56CD"}
              </span>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-2 gap-6 @2xl:mt-8 @2xl:gap-12 @4xl:gap-20">
            <PortraitCaption person={wedding.people.groom} />
            <PortraitCaption person={wedding.people.bride} />
          </div>
        </div>
      </div>

      <div className="relative border-t-2 border-[#d59a49]/60 bg-[#982723] px-4 py-5 text-center text-[#fff7ef] sm:py-6">
        <LatticePattern
          patternId="heroLatticeBottom"
          color="#e8bd76"
          className="opacity-20"
        />
        <h2 className="font-display relative text-2xl font-semibold uppercase leading-tight sm:text-3xl">
          Thông tin lễ cưới
        </h2>
      </div>
    </section>
  );
}
