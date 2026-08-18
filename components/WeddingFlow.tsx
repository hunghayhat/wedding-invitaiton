"use client";

import { useState } from "react";
import { Location } from "./Location";
import { WeddingInfo } from "./WeddingInfo";

type SideFilter = "all" | "groom" | "bride";

const filters: { value: SideFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "groom", label: "Nhà trai" },
  { value: "bride", label: "Nhà gái" },
];

export function WeddingFlow() {
  const [selectedSide, setSelectedSide] = useState<SideFilter>("all");

  return (
    <>
      <section className="bg-[#fff7ef] px-4 py-12 text-[#4a1212] sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#982723] sm:text-sm sm:tracking-[0.2em]">
              Lịch mời
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
              Chọn thông tin theo bên mời
            </h2>
            <div className="mt-6 grid grid-cols-3 border border-[#d7a84f] bg-white/70 p-1">
              {filters.map((filter) => {
                const isActive = selectedSide === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedSide(filter.value)}
                    className={`min-h-11 px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#982723] text-white"
                        : "text-[#6b4435] hover:bg-[#f6ead6]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <WeddingInfo selectedSide={selectedSide} />
        </div>
      </section>

      <Location selectedSide={selectedSide} />
    </>
  );
}
