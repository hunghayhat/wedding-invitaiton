"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "../data/wedding";

const polaroidTilts = [
  "-rotate-2",
  "rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-[1.5deg]",
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = wedding.gallery;
  const canSlide = photos.length > 1;

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? photos.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === photos.length - 1 ? 0 : current + 1;
    });
  }

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  if (photos.length === 0) {
    return null;
  }

  const activePhoto =
    activeIndex === null ? null : (photos[activeIndex] ?? null);

  return (
    <section className="bg-[#fff7e6] px-4 py-14 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#d7a84f]/70 sm:w-12"
            />
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#982723]">
              Album
            </p>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#d7a84f]/70 sm:w-12"
            />
          </div>
          <h2 className="font-display mt-4 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
            Những khoảnh khắc yêu thương
          </h2>
        </div>

        <div className="columns-2 gap-4 @2xl:columns-3 @4xl:gap-5">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`mb-4 block w-full break-inside-avoid rounded-sm bg-white p-2 pb-8 text-left shadow-[0_10px_24px_rgba(74,18,18,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(74,18,18,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#982723]/40 @2xl:mb-5 @2xl:p-2.5 @2xl:pb-9 ${polaroidTilts[index % polaroidTilts.length]}`}
            >
              <img
                src={photo}
                alt={`Ảnh cưới ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="aspect-[3/4] w-full object-cover"
              />
            </button>
          ))}
        </div>
      </Reveal>

      {activePhoto && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Ảnh cưới ${activeIndex + 1}`}
            className="relative w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-sm bg-white p-3 pb-10 shadow-2xl">
              <img
                src={activePhoto}
                alt={`Ảnh cưới ${activeIndex + 1}`}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Đóng ảnh"
              className="absolute -right-2 -top-3 flex size-9 items-center justify-center rounded-full bg-[#982723] text-xl leading-none text-white shadow-md"
            >
              ×
            </button>

            {canSlide ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Xem ảnh trước"
                  className="absolute left-0 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a1212]/85 text-2xl leading-none text-[#fff7e6]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Xem ảnh tiếp theo"
                  className="absolute right-0 top-1/2 flex size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#4a1212]/85 text-2xl leading-none text-[#fff7e6]"
                >
                  ›
                </button>
                <p className="mt-4 text-center text-sm font-semibold text-[#fff7e6]/80">
                  {activeIndex + 1} / {photos.length}
                </p>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
