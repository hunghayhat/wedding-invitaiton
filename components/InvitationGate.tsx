"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { wedding } from "../data/wedding";

const TRACK_SRC = "/audio/wedding-track.mp3";

function SpeakerIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 fill-none stroke-current stroke-[1.8]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 8.5 6 11H3.75a.75.75 0 0 0-.75.75v.5c0 .41.34.75.75.75H6l3.5 2.5V8.5Z"
      />
      {isPlaying ? (
        <>
          <path strokeLinecap="round" d="M15.2 9.2a3.4 3.4 0 0 1 0 5.6" />
          <path strokeLinecap="round" d="M17.6 7a6 6 0 0 1 0 10" />
        </>
      ) : (
        <path strokeLinecap="round" d="m15.2 9.2 5.1 5.1M20.3 9.2l-5.1 5.1" />
      )}
    </svg>
  );
}

export function InvitationGate({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function playTrack() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.4;
    void audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }

  function openInvitation() {
    playTrack();
    setIsOpen(true);
  }

  function toggleTrack() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      playTrack();
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="auto" />

      {isOpen ? (
        children
      ) : (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          <button
            type="button"
            onClick={openInvitation}
            aria-label={`Mở thiệp cưới ${wedding.groom} và ${wedding.bride}`}
            className="group w-full max-w-[17rem] cursor-pointer text-center focus-visible:outline-none sm:max-w-[19rem]"
          >
            <img
              src="/images/envelope-only.png"
              alt=""
              width={800}
              height={558}
              decoding="async"
              className="mx-auto h-auto w-full origin-center drop-shadow-[0_16px_24px_rgba(74,18,18,0.16)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-105 group-hover:-rotate-2"
            />
            <span className="mt-5 block transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <span className="font-display block text-2xl leading-tight text-[#4a1212] sm:text-[1.7rem]">
                {wedding.groom}
                <span className="font-script mx-2 text-xl text-[#982723]">
                  &
                </span>
                {wedding.bride}
              </span>
              <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#7a5c48]">
                Nhấn để mở thư
              </span>
            </span>
          </button>
        </div>
      )}

      {isOpen && mounted
        ? createPortal(
            <button
              type="button"
              onClick={toggleTrack}
              aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
              aria-pressed={isPlaying}
              className="fixed z-[90] flex size-12 items-center justify-center rounded-full border border-[#e8bd76]/70 bg-[#982723] text-[#f7efe6] shadow-[0_10px_24px_rgba(74,18,18,0.28)] transition hover:bg-[#7f1f1b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8bd76]/80"
              style={{
                right: "max(1rem, env(safe-area-inset-right))",
                bottom: "max(1rem, env(safe-area-inset-bottom))",
              }}
            >
              <SpeakerIcon isPlaying={isPlaying} />
            </button>,
            document.body,
          )
        : null}
    </>
  );
}
