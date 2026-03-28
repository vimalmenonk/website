import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5086/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('glowvitra_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const mapProduct = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: Number(product.price),
  categoryId: product.categoryId,
  category: product.categoryName,
  image: product.imageUrl,
});

export async function fetchProducts() {
  const { data } = await api.get('/products');
  return data.map(mapProduct);
}

export async function fetchProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return mapProduct(data);
}

export async function login(payload) {
  console.log('[API] POST /auth/login', { email: payload.email, url: `${API_BASE_URL}/auth/login` });
  const { data } = await api.post('/auth/login', payload);
  console.log('[API] /auth/login success', { role: data.role, email: data.email });
  return data;
}

export async function signup(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function fetchCart() {
  const { data } = await api.get('/cart');
  return data.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.productName,
    price: Number(item.price),
    qty: item.quantity,
  }));
}

export async function addCartItem(productId, quantity = 1) {
  await api.post('/cart/add', { productId, quantity });
}

export async function removeCartItem(productId) {
  await api.delete('/cart/remove', { data: { productId } });
}

export async function fetchOrders() {
  const { data } = await api.get('/orders');
  return data;
}

export async function createOrder() {
  const { data } = await api.post('/orders');
  return data;
}

export async function fetchInventory() {
  const { data } = await api.get('/inventory');
  return data;
}

export async function updateInventory(productId, stockQuantity) {
  await api.put('/inventory/update', { productId, stockQuantity });
}

export async function createProduct(payload) {
  const { data } = await api.post('/products', payload);
  return mapProduct(data);
}

export async function updateProduct(id, payload) {
  await api.put(`/products/${id}`, payload);
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
}

export default api;
