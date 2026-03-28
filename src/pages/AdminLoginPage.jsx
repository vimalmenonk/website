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
      console.log('[AdminAuth] login success', { email: current.email, role: current.role });
      if (current.role !== 'Admin') {
        setError('This account does not have admin permissions.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (authError) {
      console.error('[AdminAuth] login failed', authError?.response?.data || authError?.message || authError);
      setError('Admin login failed.');
    }
  };

  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="section-title">Admin Login</h1>
      <form onSubmit={onSubmit} className="panel-shell space-y-4 p-7">
        <input className="input-base" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-base" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" className="neon-btn w-full">Login</button>
      </form>
    </section>
  );
}

export default AdminLoginPage;
