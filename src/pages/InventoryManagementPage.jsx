import { useEffect, useState } from 'react';
import { fetchInventory, updateInventory } from '../services/api';

function InventoryManagementPage() {
  const [inventory, setInventory] = useState([]);
  const [draftStock, setDraftStock] = useState({});

  const load = async () => {
    const data = await fetchInventory();
    setInventory(data);
    setDraftStock(Object.fromEntries(data.map((item) => [item.productId, item.stockQuantity])));
  };

  useEffect(() => {
    load().catch(() => setInventory([]));
  }, []);

  const handleUpdate = async (productId) => {
    const nextValue = Number(draftStock[productId]);
    if (Number.isNaN(nextValue) || nextValue < 0) return;
    await updateInventory(productId, nextValue);
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="section-title">Inventory Management</h1>
      <div className="panel-shell overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.productId} className="border-t border-white/10">
                <td className="px-4 py-3 text-white">{item.productName}</td>
                <td className="px-4 py-3 text-gray-400">{item.productId}</td>
                <td className="px-4 py-3 w-36"><input className="input-base py-1.5" type="number" min="0" value={draftStock[item.productId] ?? ''} onChange={(e) => setDraftStock((prev) => ({ ...prev, [item.productId]: e.target.value }))} /></td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${item.stockQuantity < 15 ? 'bg-red-500/20 text-red-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
                    {item.stockQuantity < 15 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="px-4 py-3"><button type="button" onClick={() => handleUpdate(item.productId)} className="neon-btn text-sm">Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagementPage;
