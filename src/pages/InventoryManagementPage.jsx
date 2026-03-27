import { useEffect, useState } from 'react';
import { fetchInventory, updateInventory } from '../services/api';

function InventoryManagementPage() {
  const [inventory, setInventory] = useState([]);

  const load = async () => {
    const data = await fetchInventory();
    setInventory(data);
  };

  useEffect(() => {
    load().catch(() => setInventory([]));
  }, []);

  const handleUpdate = async (productId, currentStock) => {
    const nextValue = Number(prompt('Enter new stock quantity', String(currentStock)));
    if (Number.isNaN(nextValue) || nextValue < 0) return;
    await updateInventory(productId, nextValue);
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {inventory.map((item) => (
          <button key={item.productId} type="button" onClick={() => handleUpdate(item.productId, item.stockQuantity)} className="glass-card flex items-center justify-between p-4 text-left">
            <div>
              <h2 className="font-semibold text-white">{item.productName}</h2>
              <p className="text-sm text-gray-400">SKU: {item.productId}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm ${item.stockQuantity < 15 ? 'bg-red-500/20 text-red-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
              {item.stockQuantity} in stock
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InventoryManagementPage;
