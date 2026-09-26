const RULES = [
  { id: 'length',  label: '8 – 20 characters',             test: (v) => v.length >= 8 && v.length <= 20 },
  { id: 'upper',   label: 'At least one uppercase letter',  test: (v) => /[A-Z]/.test(v) },
  { id: 'number',  label: 'At least one number',            test: (v) => /\d/.test(v) },
  { id: 'special', label: 'At least one special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export default function PasswordRules({ password = '' }) {  // ← default to empty string
  return (
    <ul className="flex flex-col gap-1 mt-2 mb-5">
      {RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.id}
            className={`flex items-center gap-2 text-xs transition-colors duration-200
              ${passed ? 'text-green-500' : 'text-red-500'}`}
          >
            <span>{passed ? '✓' : '✗'}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}