export default function EmailInput({
  value,
  onChange,
  onBlur,
  showError,
  errorMsg,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        Email
      </label>
      <input
        id="email"
        type="text"
        placeholder="you@example.com"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm outline-none
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
          ${showError ? "border-red-400" : "border-slate-200"}`}
      />
        {showError && <p className="mt-1.5 text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
