import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchInventory, fetchProducts } from '../services/api';

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  const load = async () => {
    const [productData, inventoryData] = await Promise.all([fetchProducts(), fetchInventory()]);
    setProducts(productData);
    setInventory(inventoryData);
  };

  useEffect(() => {
    load().catch(() => {
      setProducts([]);
      setInventory([]);
    });
  }, []);

  const stockByProductId = new Map(inventory.map((item) => [item.productId, item.stockQuantity]));

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="section-title">Product Management</h1>
        <Link to="/admin/products/new" className="neon-btn">Add Product</Link>
      </div>
      <div className="panel-shell overflow-hidden">
        <table className="w-full border-collapse bg-white/5 text-left text-sm">
          <thead className="bg-white/10 text-xs uppercase tracking-wider text-gray-300">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-white/10 text-gray-200">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 text-amber-300">₹{Math.round(product.price * 10)}</td>
                <td className="px-4 py-3">{stockByProductId.get(product.id) ?? 0}</td>
                <td className="space-x-3 px-4 py-3">
                  <Link to={`/admin/products/${product.id}/edit`} className="text-blue-300 hover:text-blue-200">Edit</Link>
                  <button type="button" className="text-red-300 hover:text-red-200" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagementPage;
