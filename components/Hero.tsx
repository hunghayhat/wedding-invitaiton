import { wedding } from "../data/wedding";

type Person = {
  role?: string;
  name: string;
  photo: string;
};

function DragonPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="flex -translate-y-10 flex-wrap gap-x-10 gap-y-1 text-8xl font-semibold leading-none text-[#d59a49]/45 sm:text-9xl">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={index % 2 === 0 ? "rotate-12" : "-rotate-12"}
          >
            {"\u9F8D"}
          </span>
        ))}
      </div>
    </div>
  );
}

function PortraitCard({ person }: { person: Person }) {
  return (
    <article className="relative z-10 min-w-0 text-center">
      <div className="mx-auto size-[clamp(8.75rem,34vw,18rem)] overflow-hidden rounded-full border-[8px] border-[#efe3d7] bg-[#8f2622] shadow-xl shadow-[#5e1714]/20 sm:border-[10px]">
        <img
          src={person.photo}
          alt={person.name}
          className="h-full w-full object-cover"
        />
      </div>
      {person.role ? (
        <p className="mt-6 text-sm font-medium text-[#6f5b50] sm:text-base">
          {person.role}
        </p>
      ) : null}
      <h1
        className={`font-display break-words text-3xl font-semibold leading-tight text-[#982723] sm:text-4xl lg:text-5xl ${
          person.role ? "mt-1" : "mt-6"
        }`}
      >
        {person.name}
      </h1>
    </article>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#efe3d7] text-[#982723]">
      <div className="relative h-24 overflow-hidden bg-[#982723] sm:h-36">
        <DragonPattern />
      </div>

      <div className="relative overflow-hidden bg-[#efe3d7]">
        <DragonPattern className="opacity-15" />
        <div className="absolute inset-x-0 top-[34%] h-14 bg-[#982723] sm:top-[35%] sm:h-20" />
        <div className="absolute inset-x-0 top-[34%] h-14 bg-[radial-gradient(circle_at_center,rgba(238,227,215,0.14),transparent_40%)] sm:top-[35%] sm:h-20" />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20">
          <div className="relative grid grid-cols-2 items-start gap-4 sm:gap-10 lg:gap-16">
            <PortraitCard person={wedding.people.groom} />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[clamp(4.7rem,18vw,9.8rem)] z-20 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold leading-none text-[#982723] sm:text-7xl lg:text-8xl"
              style={{
                textShadow:
                  "2px 0 #fff7ef, -2px 0 #fff7ef, 0 2px #fff7ef, 0 -2px #fff7ef",
              }}
            >
              {"\u56CD"}
            </div>

            <PortraitCard person={wedding.people.bride} />
          </div>
        </div>
      </div>

      <div className="bg-[#982723] px-4 py-5 text-center text-[#fff7ef] sm:py-6">
        <h2 className="font-display text-2xl font-semibold uppercase leading-tight sm:text-3xl">
          Thông tin lễ cưới
        </h2>
      </div>
    </section>
  );
}
