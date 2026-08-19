"use client";

import { type ReactNode, useEffect, useState } from "react";
import { wedding } from "../data/wedding";

export function InvitationGate({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (isOpen) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Mở thiệp cưới ${wedding.groom} và ${wedding.bride}`}
        className="group w-full max-w-[17rem] cursor-pointer text-center focus-visible:outline-none sm:max-w-[19rem]"
      >
        <picture>
          <source srcSet="/images/envelope-only.webp" type="image/webp" />
          <img
            src="/images/envelope-only.png"
            alt=""
            width={800}
            height={558}
            decoding="async"
            onError={(event) => {
              const image = event.currentTarget;
              image.onerror = null;
              image.src = "/images/envelope-only.png";
            }}
            className="mx-auto h-auto w-full bg-transparent shadow-[0_16px_24px_rgba(74,18,18,0.16)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-105 group-hover:-rotate-2"
          />
        </picture>
        <span className="mt-5 block transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <span className="font-display block text-2xl leading-tight text-[#4a1212] sm:text-[1.7rem]">
            {wedding.groom}
            <span className="font-script mx-2 text-xl text-[#982723]">&</span>
            {wedding.bride}
          </span>
          <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#7a5c48]">
            Nhấn để mở thư
          </span>
        </span>
      </button>
    </div>
  );
}
