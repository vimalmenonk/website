import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginSignupPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: 'user@glowvitra.com', password: '' });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let current;
      if (isSignup) {
        current = await signup({ name: form.name, email: form.email, password: form.password });
      } else {
        current = await login({ email: form.email, password: form.password });
      }

      console.log('[Auth] login/signup success', { email: current.email, role: current.role });
      navigate(current.role === 'Admin' ? '/admin/dashboard' : '/');
    } catch (authError) {
      console.error('[Auth] login/signup failed', authError?.response?.data || authError?.message || authError);
      setError('Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <section className="mx-auto max-w-xl space-y-4">
      <div className="panel-shell overflow-hidden p-8">
        <h1 className="mb-6 text-center text-3xl font-semibold text-white">Welcome Back</h1>
        <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 text-sm">
          <button type="button" onClick={() => setIsSignup(false)} className={`py-2 ${!isSignup ? 'bg-blue-500/25 text-blue-200' : 'text-gray-300'}`}>Login</button>
          <button type="button" onClick={() => setIsSignup(true)} className={`py-2 ${isSignup ? 'bg-blue-500/25 text-blue-200' : 'text-gray-300'}`}>Sign Up</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {isSignup && (
            <input className="input-base" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          )}
          <input className="input-base" type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input-base" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button type="submit" className="neon-btn w-full">{isSignup ? 'Create Account' : 'Login'}</button>
        </form>
      </div>
    </section>
  );
}

export default LoginSignupPage;
