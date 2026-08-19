"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  labelledBy?: string;
  label?: string;
  onClose: () => void;
};

export function Modal({ children, labelledBy, label, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={label}
        className="relative my-auto w-full max-w-lg"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
