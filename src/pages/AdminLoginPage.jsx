import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLoginPage() {
  const [email, setEmail] = useState('admin@glowvitra.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const current = await login({ email, password });
      if (current.role !== 'Admin') {
        setError('This account does not have admin permissions.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (authError) {
      setError(authError?.response?.data?.message || 'Admin login failed. Please check your credentials.');
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-violet-300/20 bg-[#100824] px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.28),transparent_40%),radial-gradient(circle_at_60%_75%,rgba(79,70,229,0.28),transparent_44%)]" />

      <div className="relative mx-auto max-w-4xl rounded-2xl border border-violet-300/30 bg-[#0e1026]/90 p-6 shadow-[0_0_80px_rgba(76,29,149,0.45)] md:p-10">
        <h1 className="mb-8 text-center text-5xl font-semibold tracking-tight text-violet-100">Admin Login</h1>
        <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5">
          <label className="block text-sm text-violet-100">
            Username
            <input className="input-base mt-2 border-violet-300/20 bg-[#1b1d3a]/80" type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block text-sm text-violet-100">
            Password
            <input className="input-base mt-2 border-violet-300/20 bg-[#1b1d3a]/80" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button type="submit" className="w-full rounded-xl border border-blue-200/40 bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-xl font-semibold text-white">Login</button>
        </form>
      </div>
    </section>
  );
}

export default AdminLoginPage;
