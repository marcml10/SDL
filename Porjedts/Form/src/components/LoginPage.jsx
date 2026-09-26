import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput    from './EmailInput';
import PasswordInput from './PasswordInput';
import PasswordRules from './PasswordRules';
import { signIn } from '../api/auth';

const EMAIL_REGEX = /^[a-z0-9]+([._%+-][a-z0-9]+)*@[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,}$/;

function getEmailError(val) {
  if (val === '')              return '';
  if (/\s/.test(val))         return 'Email must not contain spaces.';
  if (/[A-Z]/.test(val))      return 'Email must be all lowercase.';
  if (!EMAIL_REGEX.test(val)) return 'Enter a valid email (e.g. ab@gmail.com).';
  return '';
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [pwdStarted, setPwdStarted]     = useState(false);

  const emailError = getEmailError(email);
  const emailValid = emailError === '' && email !== '';

  const pwdValid = [
    password.length >= 8 && password.length <= 20,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].every(Boolean);

  const formValid = emailValid && pwdValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      const data = await signIn({ email, password });
      alert(`Welcome back, ${data.username}!`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (!pwdStarted && val.length > 0) setPwdStarted(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ── LEFT: Login panel ───────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm">

          {/* Heading + Sign Up toggle */}
          <div className="mb-8">
            <p className="text-xs font-medium tracking-widest text-indigo-500 uppercase mb-1">
              Welcome back
            </p>

            {/* Sign In / Sign Up switcher — "Up" is faded, clicking navigates */}
            <div className="flex items-baseline gap-3 mb-1">
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                Sign
                <span className="inline-block transition-all duration-300 origin-bottom"> In</span>
              </h1>
              <span className="text-slate-200 text-xl font-light">/</span>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-2xl font-bold text-slate-300 hover:text-slate-400
                  transition-colors duration-200 leading-tight"
              >
                Sign
                <span className="inline-block transition-all duration-300 origin-top"> Up</span>
              </button>
            </div>
            <p className="text-sm text-slate-400">Sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailBlurred(true)}
              showError={emailBlurred && emailError !== ''}
              errorMsg={emailError}
            />

            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              isValid={pwdStarted && pwdValid}
              isInvalid={pwdStarted && !pwdValid}
            />

            {pwdStarted && <PasswordRules password={password} />}

            <button
              type="submit"
              disabled={!formValid}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm
                tracking-wide transition-all duration-200
                hover:bg-indigo-700 active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sign in
            </button>

            <p className="mt-5 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-indigo-500 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>

          </form>
        </div>
      </div>

      {/* ── RIGHT: Guitar image panel ────────────────────────────────────── */}
      <div
        className="hidden md:block md:w-1/2 bg-slate-900"
        style={{
          backgroundImage: "url('/guitar.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-slate-900/30 to-indigo-900/20" />
      </div>

    </div>
  );
}