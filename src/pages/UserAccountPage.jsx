import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserAccountPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="glass-card p-6 text-gray-300">
        Please <Link to="/auth" className="text-blue-300">login</Link> to view your account.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Account</h1>
      <div className="glass-card space-y-2 p-6">
        <p><span className="text-gray-400">Name:</span> {user.name}</p>
        <p><span className="text-gray-400">Email:</span> {user.email}</p>
        <p><span className="text-gray-400">Status:</span> Active member</p>
      </div>
      <div className="glass-card p-6">
        <h2 className="mb-3 text-xl font-semibold text-white">Recent Order</h2>
        <p className="text-gray-300">No backend yet — order history will appear here once API integration is connected.</p>
      </div>
    </div>
  );
}

export default UserAccountPage;
