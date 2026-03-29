import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  createProduct,
  deleteProduct,
  fetchInventory,
  fetchProducts,
  updateInventory,
  updateProduct,
} from '../services/api';

const PAGE_SIZE = 8;

function toStatus(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock < 15) return 'Low Stock';
  return 'In Stock';
}

function InventoryManagementPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
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
    return items.filter((item) => {
      const matchQuery = !q || item.name.toLowerCase().includes(q);
      const itemStatus = toStatus(item.stock);
      const matchStatus = status === 'All' || itemStatus === status;
      return matchQuery && matchStatus;
    });
  }, [items, query, status]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const mutateItem = async (item, mode) => {
    const name = prompt('Product name', item?.name ?? '');
    if (!name?.trim()) return;

    const price = Number(prompt('Price', String(item?.price ?? 0)));
    if (Number.isNaN(price) || price < 0) return;

    const categoryId = Number(prompt('Category Id (1-3)', String(item?.categoryId ?? 1)));
    if (Number.isNaN(categoryId) || categoryId < 1) return;

    const image = prompt('Image URL', item?.image ?? 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80');
    if (!image?.trim()) return;

    const stock = Number(prompt('Stock quantity', String(item?.stock ?? 0)));
    if (Number.isNaN(stock) || stock < 0) return;

    const payload = {
      name: name.trim(),
      description: item?.description ?? `${name.trim()} product`,
      price,
      categoryId,
      imageUrl: image.trim(),
    };

    if (mode === 'create') {
      const created = await createProduct(payload);
      await updateInventory(created.id, stock);
    } else if (item) {
      await updateProduct(item.id, payload);
      await updateInventory(item.id, stock);
    }

    await load();
  };

  return (
    <AdminLayout title="Inventory Management" subtitle="Track stock, update products and monitor low stock alerts.">
      <section className="admin-panel p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          <select className="input-base max-w-[180px]" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <input className="input-base max-w-md" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
          <button type="button" className="neon-btn ml-auto" onClick={() => mutateItem(null, 'create')}>Add Product</button>
        </div>

        {error && <p className="mb-3 text-sm text-red-300">{error}</p>}

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-fuchsia-500/10 text-slate-200">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={item.id} className="border-t border-white/10 bg-slate-950/50 text-slate-100">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">₹{Math.round(item.price).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{item.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toStatus(item.stock) === 'In Stock' ? 'bg-emerald-500/20 text-emerald-300' : toStatus(item.stock) === 'Low Stock' ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'}`}>
                      {toStatus(item.stock)}
                    </span>
                  </td>
                  <td className="space-x-2 px-4 py-3">
                    <button type="button" className="neon-btn-soft" onClick={() => mutateItem(item, 'edit')}>Edit</button>
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <p>
            Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filteredItems.length)} of {filteredItems.length} entries
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
