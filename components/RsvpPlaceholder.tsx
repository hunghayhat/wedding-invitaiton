"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "./Reveal";

type SubmitState = "idle" | "submitting" | "success" | "error";
type AttendingStatus = "yes" | "maybe" | "no";
type GuestSide = "groom" | "bride" | "shared";
type EventSide = "groom" | "bride";
type EventKind = "ceremony" | "party";

const guestSides: { value: GuestSide; label: string }[] = [
  { value: "groom", label: "Khách nhà trai" },
  { value: "bride", label: "Khách nhà gái" },
  { value: "shared", label: "Bạn chung" },
];

const attendanceOptions: { value: AttendingStatus; label: string }[] = [
  { value: "yes", label: "Có tham dự" },
  { value: "maybe", label: "Chưa chắc" },
  { value: "no", label: "Không tham dự" },
];

const eventOptions: {
  value: string;
  label: string;
  side: EventSide;
  kind: EventKind;
}[] = [
  {
    value: "brideCeremony",
    label: "Lễ nạp tài",
    side: "bride",
    kind: "ceremony",
  },
  { value: "brideParty", label: "Tiệc nhà gái", side: "bride", kind: "party" },
  {
    value: "groomCeremony",
    label: "Hôn lễ nhà trai",
    side: "groom",
    kind: "ceremony",
  },
  { value: "groomParty", label: "Tiệc nhà trai", side: "groom", kind: "party" },
];

type RadioOptionProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: RadioOptionProps) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-[#e3d4c5] bg-[#fffcf8] px-4 py-3 text-sm font-medium text-[#4a1212] shadow-[0_1px_2px_rgba(74,18,18,0.03)] transition hover:border-[#c99b6b] hover:bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-[#b5463f]/25 has-checked:border-[#b5463f] has-checked:bg-[#fff4f0] has-checked:shadow-[inset_3px_0_0_#982723] sm:text-base">
      <input
        className="size-4 shrink-0 accent-[#982723]"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}

function CheckboxOption({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-[#e3d4c5] bg-[#fffcf8] px-4 py-3 text-sm font-medium text-[#4a1212] shadow-[0_1px_2px_rgba(74,18,18,0.03)] transition hover:border-[#c99b6b] hover:bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-[#b5463f]/25 has-checked:border-[#b5463f] has-checked:bg-[#fff4f0] has-checked:shadow-[inset_3px_0_0_#982723] sm:text-base">
      <input
        className="size-4 shrink-0 accent-[#982723]"
        type="checkbox"
        name="events"
        value={value}
      />
      <span>{label}</span>
    </label>
  );
}

export function RsvpPlaceholder() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attending, setAttending] = useState<AttendingStatus>("yes");
  const [guestSide, setGuestSide] = useState<GuestSide>("groom");
  const [guestCount, setGuestCount] = useState(1);

  const canChooseDetails = attending !== "no";
  const visibleEventOptions = eventOptions.filter(
    (option) =>
      option.kind === "ceremony" ||
      guestSide === "shared" ||
      option.side === guestSide,
  );
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const selectedEvents = form.getAll("events").map(String);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      guestSide,
      attending,
      events: selectedEvents,
      brideMealCount:
        guestSide === "bride" ||
        (guestSide === "shared" && selectedEvents.includes("brideParty"))
          ? guestCount
          : 0,
      groomMealCount:
        guestSide === "groom" ||
        (guestSide === "shared" && selectedEvents.includes("groomParty"))
          ? guestCount
          : 0,
      message: String(form.get("message") ?? "").trim(),
      website: String(form.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Chưa gửi được xác nhận.");
      }

      formElement.reset();
      setGuestSide("groom");
      setAttending("yes");
      setGuestCount(1);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra, bạn thử lại giúp mình nhé.",
      );
    }
  }

  function clearFeedback() {
    if (submitState === "success" || submitState === "error") {
      setSubmitState("idle");
      setErrorMessage("");
    }
  }

  return (
    <section id="rsvp" className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <Reveal className="mx-auto max-w-3xl rounded-xl border border-[#ead9c5] bg-white/95 p-5 shadow-[0_18px_50px_rgba(74,18,18,0.08)] sm:p-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase text-[#a2332e] sm:text-sm">
            Phản hồi lời mời
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
            Xác nhận tham dự
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#765140] sm:text-base sm:leading-7">
            Vui lòng cho gia đình biết bạn dự phần nào và số người tham dự để
            hai bên sắp xếp chu đáo nhất.
          </p>
        </div>

        <form
          className="mt-7 grid gap-6 border-t border-[#efe3d7] pt-7"
          aria-label="Biểu mẫu xác nhận tham dự"
          onSubmit={handleSubmit}
          onChange={clearFeedback}
        >
          <input
            className="hidden"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#4a1212]" htmlFor="rsvp-name">
              Tên khách mời
            </label>
            <input
              id="rsvp-name"
              className="min-h-12 w-full min-w-0 rounded-md border border-[#e3d4c5] bg-[#fffcf8] px-4 py-3 text-[#4a1212] shadow-[0_1px_2px_rgba(74,18,18,0.03)] outline-none transition placeholder:text-[#a98d7d] hover:border-[#c99b6b] focus:border-[#b5463f] focus:bg-white focus:ring-2 focus:ring-[#b5463f]/20"
              name="name"
              placeholder="Nhập họ và tên"
              autoComplete="name"
              required
              maxLength={100}
            />
          </div>

          <fieldset className="grid gap-2.5">
            <legend className="mb-2 text-sm font-semibold text-[#4a1212]">
              Bạn là khách của
            </legend>
            <div className="grid gap-2.5 @2xl:grid-cols-3">
              {guestSides.map((side) => (
                <RadioOption
                  key={side.value}
                  name="guestSide"
                  value={side.value}
                  label={side.label}
                  checked={guestSide === side.value}
                  onChange={() => setGuestSide(side.value)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2.5">
            <legend className="mb-2 text-sm font-semibold text-[#4a1212]">
              Bạn có tham dự không?
            </legend>
            <div className="grid gap-2.5 @2xl:grid-cols-3">
              {attendanceOptions.map((option) => (
                <RadioOption
                  key={option.value}
                  name="attending"
                  value={option.value}
                  label={option.label}
                  checked={attending === option.value}
                  onChange={() => setAttending(option.value)}
                />
              ))}
            </div>
          </fieldset>

          {canChooseDetails ? (
            <>
              <fieldset className="grid gap-2.5">
                <legend className="mb-2 text-sm font-semibold text-[#4a1212]">
                  Bạn dự phần nào?
                </legend>
                <div className="grid gap-2.5 @2xl:grid-cols-2">
                  {visibleEventOptions.map((option) => (
                    <CheckboxOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="grid gap-2.5">
                <legend className="mb-2 text-sm font-semibold text-[#4a1212]">
                  Số người tham dự
                </legend>
                <div className="grid w-40 grid-cols-[2.75rem_1fr_2.75rem] overflow-hidden rounded-md border border-[#e3d4c5] bg-[#fffcf8] shadow-[0_1px_2px_rgba(74,18,18,0.03)] focus-within:border-[#b5463f] focus-within:ring-2 focus-within:ring-[#b5463f]/20">
                  <button
                    type="button"
                    aria-label="Giảm số người tham dự"
                    disabled={guestCount <= 1}
                    onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                    className="min-h-11 border-r border-[#e3d4c5] text-xl text-[#982723] transition hover:bg-[#fff4f0] disabled:cursor-not-allowed disabled:text-[#cbb8aa]"
                  >
                    −
                  </button>
                  <input
                    className="min-w-0 bg-transparent px-1 text-center font-semibold tabular-nums text-[#4a1212] outline-none"
                    name="guestCount"
                    type="number"
                    min={1}
                    max={20}
                    value={guestCount}
                    onChange={(event) =>
                      setGuestCount(
                        Math.min(20, Math.max(1, Number(event.target.value) || 1)),
                      )
                    }
                    required
                  />
                  <button
                    type="button"
                    aria-label="Tăng số người tham dự"
                    disabled={guestCount >= 20}
                    onClick={() => setGuestCount((count) => Math.min(20, count + 1))}
                    className="min-h-11 border-l border-[#e3d4c5] text-xl text-[#982723] transition hover:bg-[#fff4f0] disabled:cursor-not-allowed disabled:text-[#cbb8aa]"
                  >
                    +
                  </button>
                </div>
              </fieldset>
            </>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#4a1212]" htmlFor="rsvp-message">
              Lời chúc <span className="font-normal text-[#9b7c6c]">(không bắt buộc)</span>
            </label>
            <textarea
              id="rsvp-message"
              className="min-h-28 w-full min-w-0 resize-y rounded-md border border-[#e3d4c5] bg-[#fffcf8] px-4 py-3 text-[#4a1212] shadow-[0_1px_2px_rgba(74,18,18,0.03)] outline-none transition placeholder:text-[#a98d7d] hover:border-[#c99b6b] focus:border-[#b5463f] focus:bg-white focus:ring-2 focus:ring-[#b5463f]/20"
              name="message"
              placeholder="Gửi lời chúc đến cô dâu chú rể"
              maxLength={500}
            />
          </div>

          <button
            type="submit"
            disabled={submitState === "submitting"}
            aria-busy={submitState === "submitting"}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#982723] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(152,39,35,0.18)] transition hover:bg-[#7f1f1b] hover:shadow-[0_10px_24px_rgba(152,39,35,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#982723]/35 focus-visible:ring-offset-2 disabled:cursor-wait disabled:bg-[#b99b84] disabled:shadow-none sm:text-base"
          >
            {submitState === "submitting" ? (
              <>
                <span
                  className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
                Đang ghi nhận...
              </>
            ) : (
              "Gửi xác nhận"
            )}
          </button>

          {submitState === "success" ? (
            <p
              className="rounded-md border border-[#b9dbc5] bg-[#f2faf4] px-4 py-3 text-center text-sm font-semibold text-[#23683b]"
              role="status"
              aria-live="polite"
            >
              Cảm ơn bạn, lời xác nhận đã được ghi nhận.
            </p>
          ) : null}

          {submitState === "error" ? (
            <p
              className="rounded-md border border-[#e6b9b6] bg-[#fff4f2] px-4 py-3 text-center text-sm font-semibold text-[#982723]"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
