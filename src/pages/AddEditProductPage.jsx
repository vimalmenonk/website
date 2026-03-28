import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, fetchProductById, updateProduct, updateInventory } from '../services/api';

const categoryOptions = [
  { id: 1, label: 'Transformation' },
  { id: 2, label: 'Setup' },
  { id: 3, label: 'Cozy' },
];

function AddEditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: 1,
    imageUrl: '',
    stockQuantity: 0,
  });

  useEffect(() => {
    if (!isEdit) return;

    fetchProductById(id)
      .then((product) => {
        setForm((prev) => ({
          ...prev,
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
          imageUrl: product.image,
        }));
      })
      .catch(() => null);
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      imageUrl: form.imageUrl,
    };

    if (isEdit) {
      await updateProduct(id, payload);
      await updateInventory(Number(id), Number(form.stockQuantity));
    } else {
      const created = await createProduct(payload);
      await updateInventory(created.id, Number(form.stockQuantity));
    }

    navigate('/admin/products');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="section-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={onSubmit} className="panel-shell grid gap-4 p-6 md:grid-cols-2">
        <input className="input-base" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input-base" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <select className="input-base" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}>
          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>{category.label}</option>
          ))}
        </select>
        <input className="input-base" type="number" placeholder="Stock Quantity" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} required />
        <input className="input-base md:col-span-2" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required />
        <textarea className="input-base min-h-36 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <div className="md:col-span-2 flex justify-end gap-3">
          <button type="button" className="neon-btn-soft" onClick={() => navigate('/admin/products')}>Cancel</button>
          <button type="submit" className="neon-btn">{isEdit ? 'Save Product' : 'Add Product'}</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditProductPage;
