"use client";

import { useState } from "react";
import { wedding } from "../data/wedding";

type GiftSide = "groom" | "bride";

const giftSides: { value: GiftSide; label: string }[] = [
  { value: "groom", label: "Nh\u00e0 trai" },
  { value: "bride", label: "Nh\u00e0 g\u00e1i" },
];

export function Gift() {
  const [selectedSide, setSelectedSide] = useState<GiftSide>("groom");
  const gift = wedding.gifts[selectedSide];

  return (
    <section
      id="gift"
      className="bg-[#fff7ef] px-4 py-12 text-[#4a1212] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#982723] sm:text-sm sm:tracking-[0.2em]">
          {"M\u1eebng c\u01b0\u1edbi"}
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
          {"G\u1eedi l\u1eddi ch\u00fac m\u1eebng t\u1edbi hai gia \u0111\u00ecnh"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6b4435] sm:text-lg sm:leading-8">
          {
            "Qu\u00fd kh\u00e1ch c\u00f3 th\u1ec3 ch\u1ecdn nh\u00e0 trai ho\u1eb7c nh\u00e0 g\u00e1i \u0111\u1ec3 g\u1eedi qu\u00e0 m\u1eebng c\u01b0\u1edbi."
          }
        </p>

        <div
          className="mt-5 inline-flex rounded-md border border-[#e4cfaf] bg-white/90 p-1 shadow-sm"
          role="group"
          aria-label={"Ch\u1ecdn gia \u0111\u00ecnh nh\u1eadn qu\u00e0 m\u1eebng c\u01b0\u1edbi"}
        >
          {giftSides.map((side) => {
            const isActive = selectedSide === side.value;

            return (
              <button
                key={side.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedSide(side.value)}
                className={`min-h-10 min-w-24 rounded-[4px] px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#982723]/30 ${
                  isActive
                    ? "bg-[#982723] text-white shadow-sm"
                    : "text-[#6b4435] hover:bg-[#f6ead6]"
                }`}
              >
                {side.label}
              </button>
            );
          })}
        </div>

        <figure className="mx-auto mt-7 w-full max-w-[24rem]">
          <figcaption className="text-lg font-semibold text-[#4a1212] sm:text-xl">
            {gift.title}
          </figcaption>
          <div className="mt-4 overflow-hidden rounded-md border border-[#d7a84f] bg-white p-1 shadow-sm">
            <img
              key={selectedSide}
              src={gift.qrImage}
              alt={`M\u00e3 QR ${gift.family}`}
              className="block h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
