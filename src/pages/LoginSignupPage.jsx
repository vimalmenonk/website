import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginSignupPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup({ name: form.name, email: form.email });
    } else {
      login({ email: form.email });
    }
    navigate('/account');
  };

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-3xl font-bold text-white">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
      <form onSubmit={onSubmit} className="glass-card space-y-4 p-6">
        {isSignup && (
          <input
            className="input-base"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          className="input-base"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input-base"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="neon-btn w-full">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button type="button" onClick={() => setIsSignup((prev) => !prev)} className="text-blue-300 hover:text-blue-200">
        {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}

export default LoginSignupPage;
