import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './AdminProducts.module.css';

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

const addProductAPI = async (newProduct) => {
  const res = await fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
};

const deleteProductAPI = async (id) => {
  const res = await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
};

function AdminProducts() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  
  // Default values including Image Link input!
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'electronics',
    image: '',
    description: '',
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const addMutation = useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      setFormData({ title: '', price: '', category: 'electronics', image: '', description: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return alert('Please enter title & price');
    
    // Default fallback image if user leaves image URL empty!
    const finalImage = formData.image.trim() !== '' 
      ? formData.image 
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';

    addMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      image: finalImage
    });
  };

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading Admin Console...</div>;
  if (error) return <div style={{ padding: '2rem' }}>Error connecting to server.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div>
          <h2>Product Inventory Console</h2>
          <p>Manage, add, and inspect all live commercial inventory.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          ➕ Add New Product
        </button>
      </div>

      {/* FLOATING MODAL FORM FOR ADDING PRODUCT */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3>Create Store Item</h3>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Product Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Ergonomic Mechanical Keyboard"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.inputGroup}>
                    <label>Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="89.99"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="electronics">Electronics</option>
                      <option value="men's clothing">Men's Clothing</option>
                      <option value="women's clothing">Women's Clothing</option>
                      <option value="jewelery">Jewelery</option>
                    </select>
                  </div>
                </div>

                {/* NEW IMAGE URL INPUT FIELD */}
                <div className={styles.inputGroup}>
                  <label>Image URL Link</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Leave empty to use default product image placeholder.</span>
                </div>

                <div className={styles.inputGroup}>
                  <label>Description</label>
                  <textarea
                    rows="3"
                    placeholder="Brief description of features..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={addMutation.isPending}>
                {addMutation.isPending ? 'Publishing...' : 'Publish Product to Store'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODERN TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Product Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} className={styles.thumbImg} />
                </td>
                <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                <td><span className={styles.badge}>{item.category}</span></td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>${item.price}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteMutation.mutate(item.id)}
                    disabled={deleteMutation.isPending}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;