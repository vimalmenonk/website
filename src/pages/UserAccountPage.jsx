import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchOrders } from '../services/api';

function UserAccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchOrders().then(setOrders).catch(() => setOrders([]));
  }, [user]);

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
        <p><span className="text-gray-400">Role:</span> {user.role}</p>
      </div>
      <div className="glass-card p-6">
        <h2 className="mb-3 text-xl font-semibold text-white">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-300">No orders yet.</p>
        ) : (
          <div className="space-y-2 text-sm text-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-white/10 p-3">
                <p>Order #{order.id}</p>
                <p>Total: ${Number(order.totalAmount).toFixed(2)}</p>
                <p>Items: {order.items.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAccountPage;
