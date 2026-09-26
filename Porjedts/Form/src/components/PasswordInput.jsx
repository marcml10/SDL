import { useState } from 'react';

export default function PasswordInput({ value, onChange, isValid, isInvalid }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2">
      <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 pr-11 rounded-xl border bg-slate-50 text-slate-900 text-sm
            placeholder-slate-400 transition-all duration-150 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            ${isInvalid ? 'border-red-300' : ''}
            ${isValid   ? 'border-green-400' : 'border-slate-200'}`}
        />

        {/* Eye toggle */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
            hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Toggle password visibility"
        >                    
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                   a9.968 9.968 0 012.563-4.293M6.53 6.53A9.956 9.956 0 0112 5
                   c4.477 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.065 5.209M3 3l18 18"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
                   9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}