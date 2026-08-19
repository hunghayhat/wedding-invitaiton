"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "../data/wedding";

type GiftSide = "groom" | "bride";

const giftSides: { value: GiftSide; label: string }[] = [
  { value: "groom", label: "Nhà trai" },
  { value: "bride", label: "Nhà gái" },
];

function Envelope({
  gradientId,
  className,
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 300"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6e3b4" />
          <stop offset="45%" stopColor="#e7c78b" />
          <stop offset="100%" stopColor="#cfa960" />
        </linearGradient>
        <linearGradient id={`${gradientId}-flap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9ebc9" />
          <stop offset="100%" stopColor="#dfba79" />
        </linearGradient>
      </defs>

      <rect
        x="4"
        y="4"
        width="192"
        height="292"
        rx="10"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M4 14 A10 10 0 0 1 14 4 H186 A10 10 0 0 1 196 14 L100 96 Z"
        fill={`url(#${gradientId}-flap)`}
      />
      <path
        d="M4 14 A10 10 0 0 1 14 4 H186 A10 10 0 0 1 196 14 L100 96 Z"
        fill="none"
        stroke="#c39a4f"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <g
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M100 132 C74 142 62 168 74 190 C84 208 112 210 126 194" />
        <path d="M126 194 C138 180 132 158 114 152 C98 147 84 158 86 172" />
        <path d="M86 172 C88 184 102 188 110 180" />
        <path d="M100 132 C118 128 136 138 144 154" />
        <path d="M62 214 C82 232 116 236 138 220" />
        <path d="M72 240 C94 254 122 254 142 240" />
      </g>
      <rect
        x="4"
        y="4"
        width="192"
        height="292"
        rx="10"
        fill="none"
        stroke="#c39a4f"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
    </svg>
  );
}

function GiftCard({ side }: { side: GiftSide }) {
  const gift = wedding.gifts[side];
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(gift.accountNumber);
      setCopied(true);

      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }

      copyTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const hasBankInfo = Boolean(
    gift.bankName || gift.accountNumber || gift.accountName,
  );

  return (
    <div className="flex h-full min-w-0 flex-col items-center text-center">
      <p className="text-sm font-semibold text-[#e9c877]">{gift.title}</p>

      <div className="mt-3 w-full max-w-[11rem] rounded-lg bg-white p-2 shadow-lg">
        <div className="aspect-[3/4] w-full">
          <img
            src={gift.qrImage}
            alt={`Mã QR ${gift.family}`}
            className="h-full w-full rounded-md object-contain"
          />
        </div>
      </div>

      {hasBankInfo ? (
        <div className="mt-3 space-y-0.5 text-sm text-[#f6e6c8]">
          {gift.bankName ? <p>{gift.bankName}</p> : null}
          {gift.accountNumber ? (
            <p className="font-semibold tracking-wide tabular-nums">
              {gift.accountNumber}
            </p>
          ) : null}
          {gift.accountName ? (
            <p className="font-semibold">{gift.accountName}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-4">
        <a
          href={gift.qrImage}
          download={`qr-${side}.png`}
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#e9c877]/60 bg-[#e9c877]/15 px-3.5 py-1.5 text-xs font-semibold text-[#f6e6c8] transition hover:bg-[#e9c877]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c877]/60"
        >
          Lưu QR
        </a>

        {gift.accountNumber ? (
          <button
            type="button"
            onClick={copyAccountNumber}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#e9c877]/60 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-[#f6e6c8] transition hover:bg-[#e9c877]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c877]/60"
          >
            {copied ? "Đã sao chép" : "Sao chép STK"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function Gift() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <section
      id="gift"
      className="relative overflow-hidden bg-[#7a1416] px-4 py-14 text-[#f6e6c8] sm:px-6 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(233,200,119,0.16),transparent_62%)]"
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-[#e9c877] sm:text-3xl sm:tracking-[0.24em]">
          Hộp quà mừng
        </h2>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group mx-auto mt-10 block rounded-2xl px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c877]/70"
        >
          <span className="relative flex h-52 w-64 items-end justify-center sm:h-64 sm:w-80">
            <Envelope
              gradientId="giftEnvelopeLeft"
              className="absolute bottom-0 left-2 h-44 w-auto -rotate-[14deg] drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-[18deg] sm:h-56"
            />
            <Envelope
              gradientId="giftEnvelopeRight"
              className="absolute bottom-0 right-2 h-44 w-auto rotate-[14deg] drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-[18deg] sm:h-56"
            />
          </span>
          <span className="mt-6 block text-sm font-semibold tracking-[0.14em] text-[#e9c877]/85">
            Nhấn để mở
          </span>
        </button>
      </Reveal>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-[#7a1416] shadow-2xl"
          >
            <div className="relative bg-[#e6c88a] px-6 py-3.5">
              <h3
                id="gift-modal-title"
                className="font-display text-center text-lg uppercase tracking-[0.16em] text-white sm:text-xl sm:tracking-[0.2em]"
              >
                Hộp quà mừng
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Đóng hộp quà mừng"
                className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-xl leading-none text-white transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-5 px-5 py-6 sm:gap-7 sm:px-7">
              {giftSides.map((side) => (
                <GiftCard key={side.value} side={side.value} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
