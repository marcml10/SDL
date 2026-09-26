import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UsernameInput from './UsernameInput';
import EmailInput    from './EmailInput';
import PasswordInput from './PasswordInput';
import PasswordRules from './PasswordRules';
import {
  checkUsernameTaken,
  checkEmailTaken,
  signUp,
} from '../api/auth';


// ── Regex ───────────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[a-z0-9]+([._%+-][a-z0-9]+)*@[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,}$/;

// ── Email error ─────────────────────────────────────────────────────────────
function getEmailError(val) {
  if (val === '')              return '';
  if (/\s/.test(val))         return 'Email must not contain spaces.';
  if (/[A-Z]/.test(val))      return 'Email must be all lowercase.';
  if (!EMAIL_REGEX.test(val)) return 'Enter a valid email (e.g. ab@gmail.com).';
  return '';
}

// ── Component ───────────────────────────────────────────────────────────────
export default function SignUpPage() {
  const navigate = useNavigate();
  const usernameRef = useRef('');

  const [username, setUsername]           = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [emailBlurred, setEmailBlurred]   = useState(false);
  const [pwdStarted, setPwdStarted]       = useState(false);
  const [usernameStatus, setUsernameStatus] = useState('idle');
  const [emailTaken, setEmailTaken] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // usernameStatus: 'idle' | 'checking' | 'taken' | 'available'
  

  usernameRef.current = username;

  // ── Username: fetch from API → SQL lookup on blur ────────────────────────
  const handleUsernameBlur = useCallback(async () => {
    const trimmed = username.trim();
    if (trimmed.length === 0) return;
    setUsernameStatus('checking');
    try {
      const taken = await checkUsernameTaken(trimmed);
      if (usernameRef.current.trim() !== trimmed) return;
      setUsernameStatus(taken ? 'taken' : 'available');
    } catch {
      if (usernameRef.current.trim() !== trimmed) return;
      setUsernameStatus('idle');
    }
  }, [username]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameStatus('idle');
  };

  const emailError  = getEmailError(email);

  const handleEmailBlur = async () => {
    setEmailBlurred(true);
    if (emailError !== '' || email === '') return;
    try {
      const taken = await checkEmailTaken(email);
      setEmailTaken(taken);
    } catch {
      setEmailTaken(false);
    }
  };

  // ── Derived validation ───────────────────────────────────────────────────
  const emailValid  = emailError === '' && email !== '' && !emailTaken;

  const pwdValid = [
    password.length >= 8 && password.length <= 20,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].every(Boolean);

  const usernameOk =
    username.trim().length > 0 &&
    usernameStatus !== 'taken' &&
    usernameStatus !== 'checking';
  const formValid = usernameOk && emailValid && pwdValid && !isSubmitting;

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (!pwdStarted && val.length > 0) setPwdStarted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    const trimmedUsername = username.trim();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      if (usernameStatus !== 'available') {
        setUsernameStatus('checking');
        const usernameTaken = await checkUsernameTaken(trimmedUsername);
        if (usernameTaken) {
          setUsernameStatus('taken');
          return;
        }
        setUsernameStatus('available');
      }

      const emailInUse = await checkEmailTaken(email);
      if (emailInUse) {
        setEmailBlurred(true);
        setEmailTaken(true);
        return;
      }
      setEmailTaken(false);

      await signUp({ username: trimmedUsername, email, password });
      navigate('/signup/success');
    } catch (err) {
      setUsernameStatus((s) => (s === 'checking' ? 'idle' : s));
      setSubmitError(err.message || 'Sign up failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ── LEFT: Sign up panel ─────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm">

          {/* Heading + toggle */}
          <div className="mb-8">
            <p className="text-xs font-medium tracking-widest text-indigo-500 uppercase mb-1">
              Get started
            </p>

            {/* Sign In / Sign Up switcher */}
            <div className="flex items-baseline gap-3 mb-1">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-slate-300 hover:text-slate-400
                  transition-colors duration-200 leading-tight"
              >
                Sign
                <span className="inline-block transition-all duration-300 origin-bottom"> In</span>
              </button>
              <span className="text-slate-200 text-xl font-light">/</span>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                Sign
                <span className="inline-block transition-all duration-300 origin-top"> Up</span>
              </h1>
            </div>
            <p className="text-sm text-slate-400">Create your account below.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <UsernameInput
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              status={usernameStatus}
            />

            {/* Email */}
            <EmailInput
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailTaken(false); }}
                onBlur={handleEmailBlur}
                showError={emailBlurred && (emailError !== '' || emailTaken)}
                errorMsg={emailTaken ? 'This email is already registered.' : emailError}
            />

            {/* Password */}
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              isValid={pwdStarted && pwdValid}
              isInvalid={pwdStarted && !pwdValid}
            />

            {pwdStarted && <PasswordRules password={password} />}

            {submitError !== '' && (
              <p className="mb-3 text-xs text-red-500 text-center" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={!formValid}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm
                tracking-wide transition-all duration-200
                hover:bg-indigo-700 active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>

            <p className="mt-5 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-indigo-500 font-medium hover:underline"
              >
                Sign in
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