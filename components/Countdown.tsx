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
    <section className="bg-[#2f5f58] px-5 py-16 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7d7c2]">
          Countdown
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Đếm ngược đến ngày vui</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-white/12 p-5 backdrop-blur">
              <p className="text-4xl font-semibold tabular-nums">{value}</p>
              <p className="mt-2 text-sm text-[#f8e9df]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
