import { products } from '../services/mockData';

function InventoryManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <h2 className="font-semibold text-white">{product.name}</h2>
              <p className="text-sm text-gray-400">SKU: {product.id.toUpperCase()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm ${product.stock < 15 ? 'bg-red-500/20 text-red-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
              {product.stock} in stock
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryManagementPage;
