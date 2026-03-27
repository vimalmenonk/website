import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../services/mockData';

function AddEditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const product = useMemo(() => products.find((item) => item.id === id), [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/products');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={onSubmit} className="glass-card grid gap-4 p-6">
        <input className="input-base" placeholder="Product Name" defaultValue={product?.name || ''} required />
        <input className="input-base" placeholder="Category" defaultValue={product?.category || ''} required />
        <input className="input-base" type="number" placeholder="Price" defaultValue={product?.price || ''} required />
        <input className="input-base" type="number" placeholder="Stock" defaultValue={product?.stock || ''} required />
        <textarea className="input-base min-h-32" placeholder="Description" defaultValue={product?.description || ''} required />
        <button type="submit" className="neon-btn">{isEdit ? 'Save Changes' : 'Create Product'}</button>
      </form>
    </div>
  );
}

export default AddEditProductPage;
