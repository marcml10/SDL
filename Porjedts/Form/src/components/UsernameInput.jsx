export default function UsernameInput({ value, onChange, onBlur, status }) {
  // status: 'idle' | 'checking' | 'taken' | 'available'

  const borderClass = {
    idle:      'border-slate-200',
    checking:  'border-indigo-300',
    taken:     'border-red-400',
    available: 'border-green-400',
  }[status] ?? 'border-slate-200';

  return (
    <div className="mb-5">
      <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
        Username
      </label>
      <div className="relative">
        <input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="yourname"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-3 pr-10 rounded-xl border bg-slate-50 text-slate-900 text-sm
            placeholder-slate-400 transition-all duration-150 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${borderClass}`}
        />

        {/* Status indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === 'checking' && (
            <svg className="w-4 h-4 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          )}
          {status === 'available' && (
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          )}
          {status === 'taken' && (
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          )}
        </div>
      </div>

      {status === 'taken' && (
        <p className="mt-1.5 text-xs text-red-500">Username is already taken.</p>
      )}
      {status === 'available' && (
        <p className="mt-1.5 text-xs text-green-500">Username is available!</p>
      )}
    </div>
  );
}