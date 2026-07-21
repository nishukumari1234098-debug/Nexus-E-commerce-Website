import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../../context/CartContext';
import styles from './Pages.module.css';

const fetchSingleProduct = async (id) => {
  // Local JSON Server URL setup!
  const res = await fetch(`http://localhost:5000/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id),
  });

  if (isLoading) return <div className={styles.loading}>Loading details...</div>;
  if (error || !product) return <div className={styles.error}>Product not found!</div>;

  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.secondaryBtn} style={{ marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Catalog
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', background: '#fff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={product.image} alt={product.title} style={{ maxHeight: '350px', objectFit: 'contain' }} />
        </div>
        <div>
          <span style={{ color: '#2563eb', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem' }}>{product.category}</span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0' }}>{product.title}</h1>
          <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>{product.description}</p>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>${product.price}</div>
          <button 
            className={styles.primaryBtn} 
            onClick={() => addToCart(product)}
            style={{ width: 'auto', padding: '1rem 2.5rem' }}
          >
            Add To Shopping Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;