"use client";

import { type TouchEvent, useRef, useState } from "react";
import { wedding } from "../data/wedding";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const photos = wedding.gallery;
  const activePhoto = photos[activeIndex];
  const canSlide = photos.length > 1;

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1,
    );
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;

    touchStartX.current = null;

    if (startX === null || endX === undefined) {
      return;
    }

    const distance = endX - startX;

    if (Math.abs(distance) < 48) {
      return;
    }

    if (distance > 0) {
      showPrevious();
      return;
    }

    showNext();
  }

  if (!activePhoto) {
    return null;
  }

  return (
    <section className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.2em]">
            Album
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
            Những khoảnh khắc yêu thương
          </h2>
        </div>

        <div className="mx-auto max-w-[520px]">
          <div className="relative overflow-hidden border border-[#e1b85c] bg-white p-2 shadow-sm sm:p-3">
            <div
              className="relative aspect-[2/3] overflow-hidden bg-[#f9f0df]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {photos.map((photo, index) => (
                  <div
                    key={photo}
                    className="relative h-full min-w-full overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt=""
                      aria-hidden="true"
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-[#fff7e6]/35" />
                    <img
                      src={photo}
                      alt={`Ảnh cưới ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="relative z-10 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {canSlide ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Xem ảnh trước"
                  className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a1212]/75 text-2xl leading-none text-[#fff7e6] transition hover:bg-[#4a1212] sm:left-5"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Xem ảnh tiếp theo"
                  className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a1212]/75 text-2xl leading-none text-[#fff7e6] transition hover:bg-[#4a1212] sm:right-5"
                >
                  ›
                </button>
              </>
            ) : null}
          </div>

          {canSlide ? (
            <div className="mt-5 flex items-center justify-center gap-4">
              <p className="min-w-12 text-center text-sm font-semibold tabular-nums text-[#6b4435]">
                {activeIndex + 1} / {photos.length}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    aria-label={`Xem ảnh cưới ${index + 1}`}
                    aria-current={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    className={`size-2.5 rounded-full transition ${
                      index === activeIndex
                        ? "bg-[#982723]"
                        : "bg-[#d7a84f]/45"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
