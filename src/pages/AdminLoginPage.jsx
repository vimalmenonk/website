import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLoginPage() {
  const [email, setEmail] = useState('admin@glowvitra.com');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, role: 'admin' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      <form onSubmit={onSubmit} className="glass-card space-y-4 p-6">
        <input className="input-base" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-base" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="neon-btn w-full">Access Dashboard</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
