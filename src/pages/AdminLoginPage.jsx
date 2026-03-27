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
    } catch {
      setError('Admin login failed.');
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      <form onSubmit={onSubmit} className="glass-card space-y-4 p-6">
        <input className="input-base" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-base" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" className="neon-btn w-full">Access Dashboard</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
