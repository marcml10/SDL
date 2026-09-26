import { useNavigate } from 'react-router-dom';

export default function SignUpSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6">
      <p className="text-3xl font-semibold text-slate-900 tracking-tight">Success</p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 text-sm text-indigo-600 font-medium hover:underline"
      >
        Go to sign in
      </button>
    </div>
  );
}
