export function RsvpPlaceholder() {
  return (
    <section id="rsvp" className="px-5 py-16">
      <div className="mx-auto max-w-3xl rounded-lg border border-[#e5d5ca] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a6533f]">
          RSVP
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[#36251f]">
          Xác nhận tham dự
        </h2>
        <p className="mt-4 leading-7 text-[#665850]">
          Đây là placeholder giao diện. Ở bước tiếp theo có thể thêm form thật,
          chống spam và lưu dữ liệu qua API riêng trước khi kết nối Supabase.
        </p>
        <form className="mt-6 grid gap-4" aria-label="Form RSVP mẫu">
          <input
            className="rounded-md border border-[#dccbc0] px-4 py-3 outline-none focus:border-[#2f5f58]"
            placeholder="Tên khách mời"
            disabled
          />
          <input
            className="rounded-md border border-[#dccbc0] px-4 py-3 outline-none focus:border-[#2f5f58]"
            placeholder="Số người tham dự"
            disabled
          />
          <textarea
            className="min-h-28 rounded-md border border-[#dccbc0] px-4 py-3 outline-none focus:border-[#2f5f58]"
            placeholder="Lời chúc"
            disabled
          />
          <button
            type="button"
            disabled
            className="rounded-full bg-[#c8b8ad] px-6 py-3 text-sm font-semibold text-white"
          >
            Sẽ mở ở bước sau
          </button>
        </form>
      </div>
    </section>
  );
}
