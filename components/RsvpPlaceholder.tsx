"use client";

import { FormEvent, useState } from "react";

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

const mealOptions: { name: string; label: string; side: EventSide }[] = [
  { name: "brideMealCount", label: "Tiệc nhà gái", side: "bride" },
  { name: "groomMealCount", label: "Tiệc nhà trai", side: "groom" },
];

export function RsvpPlaceholder() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attending, setAttending] = useState<AttendingStatus>("yes");
  const [guestSide, setGuestSide] = useState<GuestSide>("groom");

  const canChooseDetails = attending !== "no";
  const visibleEventOptions = eventOptions.filter(
    (option) =>
      option.kind === "ceremony" ||
      guestSide === "shared" ||
      option.side === guestSide,
  );
  const visibleMealOptions = mealOptions.filter(
    (option) => guestSide === "shared" || option.side === guestSide,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      guestSide,
      attending,
      events: form.getAll("events").map(String),
      brideMealCount:
        guestSide === "bride" || guestSide === "shared"
          ? Number(form.get("brideMealCount") ?? 0)
          : 0,
      groomMealCount:
        guestSide === "groom" || guestSide === "shared"
          ? Number(form.get("groomMealCount") ?? 0)
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

      event.currentTarget.reset();
      setGuestSide("groom");
      setAttending("yes");
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

  return (
    <section id="rsvp" className="bg-[#fff7e6] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl border border-[#e1b85c] bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b1c1c] sm:text-sm sm:tracking-[0.2em]">
          RSVP & lời chúc
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#4a1212] sm:text-3xl">
          Xác nhận tham dự
        </h2>
        <p className="mt-4 text-base leading-7 text-[#6b4435]">
          Vui lòng cho gia đình biết bạn dự phần nào và cần chuẩn bị suất tiệc
          ở đâu để hai bên sắp xếp chu đáo nhất.
        </p>

        <form
          className="mt-6 grid gap-5"
          aria-label="Form RSVP"
          onSubmit={handleSubmit}
        >
          <input
            className="hidden"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <input
            className="min-h-11 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c]"
            name="name"
            placeholder="Tên khách mời"
            required
            maxLength={100}
          />

          <fieldset className="grid gap-3">
            <legend className="text-sm font-semibold text-[#4a1212]">
              Bạn là khách của
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {guestSides.map((side) => (
                <label
                  key={side.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#d9b66a] px-4 py-3 text-[#4a1212]"
                >
                  <input
                    type="radio"
                    name="guestSide"
                    value={side.value}
                    checked={guestSide === side.value}
                    onChange={() => setGuestSide(side.value)}
                  />
                  {side.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-semibold text-[#4a1212]">
              Bạn có tham dự không?
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#d9b66a] px-4 py-3 text-[#4a1212]">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                />
                Có tham dự
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#d9b66a] px-4 py-3 text-[#4a1212]">
                <input
                  type="radio"
                  name="attending"
                  value="maybe"
                  checked={attending === "maybe"}
                  onChange={() => setAttending("maybe")}
                />
                Chưa chắc
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#d9b66a] px-4 py-3 text-[#4a1212]">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                Không tham dự
              </label>
            </div>
          </fieldset>

          {canChooseDetails ? (
            <>
              <fieldset className="grid gap-3">
                <legend className="text-sm font-semibold text-[#4a1212]">
                  Bạn dự phần nào?
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {visibleEventOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#d9b66a] px-4 py-3 text-[#4a1212]"
                    >
                      <input type="checkbox" name="events" value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="grid gap-3">
                <legend className="text-sm font-semibold text-[#4a1212]">
                  Số suất tiệc cần chuẩn bị
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {visibleMealOptions.map((option) => (
                    <label
                      key={option.name}
                      className="grid gap-2 text-sm font-medium text-[#6b4435]"
                    >
                      {option.label}
                      <input
                        className="min-h-11 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c]"
                        name={option.name}
                        type="number"
                        min={0}
                        max={20}
                        defaultValue={0}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          ) : null}

          <textarea
            className="min-h-28 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c]"
            name="message"
            placeholder="Gửi lời chúc đến cô dâu chú rể"
            maxLength={500}
          />

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="min-h-11 rounded-full bg-[#982723] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f1f1b] disabled:cursor-wait disabled:bg-[#c8a456]"
          >
            {submitState === "submitting" ? "Đang gửi..." : "Gửi xác nhận"}
          </button>

          {submitState === "success" ? (
            <p className="text-center text-sm font-semibold text-[#1f7a43]">
              Cảm ơn bạn, lời xác nhận đã được ghi nhận.
            </p>
          ) : null}

          {submitState === "error" ? (
            <p className="text-center text-sm font-semibold text-[#9b1c1c]">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
