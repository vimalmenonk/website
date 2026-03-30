import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { deleteProduct, fetchInventory, fetchProducts, updateInventory, updateProduct } from '../services/api';

const PAGE_SIZE = 8;

function toStockStatus(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock < 15) return 'Low Stock';
  return 'In Stock';
}

function InventoryManagementPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const load = async () => {
    const [products, inventory] = await Promise.all([fetchProducts(), fetchInventory()]);
    const stockById = new Map(inventory.map((item) => [item.productId, item.stockQuantity]));

    setItems(
      products.map((product) => ({
        ...product,
        stock: stockById.get(product.id) ?? 0,
      })),
    );
  };

  useEffect(() => {
    load().catch(() => setError('Unable to load inventory right now.'));
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => !q || item.name.toLowerCase().includes(q));
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const editItem = async (item) => {
    const name = prompt('Product name', item.name);
    if (!name?.trim()) return;

    const price = Number(prompt('Price', String(item.price)));
    if (Number.isNaN(price) || price < 0) return;

    const stock = Number(prompt('Stock quantity', String(item.stock)));
    if (Number.isNaN(stock) || stock < 0) return;

    const payload = {
      name: name.trim(),
      description: item.description,
      price,
      categoryId: item.categoryId,
      imageUrl: item.image,
    };

    await updateProduct(item.id, payload);
    await updateInventory(item.id, stock);
    await load();
  };

  return (
    <AdminLayout title="Inventory Management" subtitle="Track stock and manage products.">
      <section className="admin-panel p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          <input className="input-base max-w-md" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by product name..." />
          <button type="button" className="neon-btn ml-auto" onClick={() => navigate('/admin/products/new')}>Add Product</button>
        </div>

        {error && <p className="mb-3 text-sm text-red-300">{error}</p>}

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-fuchsia-500/10 text-slate-200">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => {
                const stockStatus = toStockStatus(item.stock);
                const activeStatus = item.stock > 0 ? 'Active' : 'Inactive';

                return (
                  <tr key={item.id} className="border-t border-white/10 bg-slate-950/50 text-slate-100">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">₹{Math.round(item.price).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">{item.stock}</td>
                    <td className="px-4 py-3">{item.category || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activeStatus === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300'}`}>
                          {activeStatus}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stockStatus === 'In Stock' ? 'bg-cyan-500/20 text-cyan-300' : stockStatus === 'Low Stock' ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'}`}>
                          {stockStatus}
                        </span>
                      </div>
                    </td>
                    <td className="space-x-2 px-4 py-3">
                      <button type="button" className="neon-btn-soft" onClick={() => editItem(item)}>Edit</button>
                      <button
                        type="button"
                        className="rounded-lg border border-red-400/40 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/20"
                        onClick={async () => {
                          if (!confirm(`Delete ${item.name}?`)) return;
                          await deleteProduct(item.id);
                          await load();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <p>
            Showing {filteredItems.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filteredItems.length)} of {filteredItems.length} entries
          </p>
          <div className="space-x-2">
            <button type="button" className="neon-btn-soft" disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
            <span className="rounded-lg border border-white/10 px-3 py-1.5">{page} / {totalPages}</span>
            <button type="button" className="neon-btn-soft" disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default InventoryManagementPage;
