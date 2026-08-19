"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "../data/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string): TimeLeft {
  const total = Math.max(0, new Date(target).getTime() - Date.now());

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(wedding.countdownTarget));

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(wedding.countdownTarget));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(() => {
    const pad = (value: number | undefined) =>
      value === undefined ? "--" : String(value).padStart(2, "0");

    return [
      { label: "Ngày", value: timeLeft ? String(timeLeft.days) : "--" },
      { label: "Giờ", value: pad(timeLeft?.hours) },
      { label: "Phút", value: pad(timeLeft?.minutes) },
      { label: "Giây", value: pad(timeLeft?.seconds) },
    ];
  }, [timeLeft]);

  return (
    <section className="bg-[#fff7e6] px-4 py-14 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-transparent to-[#d7a84f]/70 sm:w-12"
          />
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#982723]">
            Đếm ngược
          </p>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-l from-transparent to-[#d7a84f]/70 sm:w-12"
          />
        </div>

        <h2 className="font-display mt-4 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
          Đếm ngược đến ngày vui
        </h2>

        <div className="mt-9 grid grid-cols-4 gap-2 sm:gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-[#d7a84f]/40 bg-white/70 px-2 py-5 shadow-[0_12px_30px_rgba(122,20,22,0.07)] sm:px-3"
            >
              <span className="font-display text-3xl font-semibold leading-none tabular-nums text-[#982723] @2xl:text-4xl @4xl:text-5xl">
                {item.value}
              </span>
              <span className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#8a6f5f]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
