export function RsvpPlaceholder() {
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
          Vui lòng gửi lời xác nhận để gia đình chuẩn bị đón tiếp chu đáo nhất.
          Phần này đang là giao diện mẫu và có thể kết nối API ở bước tiếp theo.
        </p>
        <form className="mt-6 grid gap-4" aria-label="Form RSVP mẫu">
          <input
            className="min-h-11 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c] disabled:bg-[#fbf3e4]"
            placeholder="Tên khách mời"
            disabled
          />
          <input
            className="min-h-11 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c] disabled:bg-[#fbf3e4]"
            placeholder="Số người tham dự"
            disabled
          />
          <textarea
            className="min-h-28 w-full min-w-0 border border-[#d9b66a] px-4 py-3 outline-none focus:border-[#9b1c1c] disabled:bg-[#fbf3e4]"
            placeholder="Gửi lời chúc đến cô dâu chú rể"
            disabled
          />
          <button
            type="button"
            disabled
            className="min-h-11 cursor-not-allowed rounded-full bg-[#c8a456] px-6 py-3 text-sm font-semibold text-white"
          >
            Sẽ mở ở bước sau
          </button>
        </form>
      </div>
    </section>
  );
}
