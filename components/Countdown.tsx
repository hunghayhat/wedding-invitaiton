"use client";

import { useEffect, useMemo, useState } from "react";
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

  const items = useMemo(
    () => [
      ["Ngày", timeLeft?.days ?? "--"],
      ["Giờ", timeLeft?.hours ?? "--"],
      ["Phút", timeLeft?.minutes ?? "--"],
      ["Giây", timeLeft?.seconds ?? "--"],
    ],
    [timeLeft],
  );

  return (
    <section className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl border-y border-[#e1b85c] py-8 text-center sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.2em]">
          Countdown
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
          Đếm ngược đến ngày vui
        </h2>
        <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3">
          {items.map(([label, value]) => (
            <div key={label} className="min-w-0 bg-[#4a1212] p-4 text-[#fff4ce] sm:p-5">
              <p className="text-3xl font-semibold tabular-nums text-[#f4c65c] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
