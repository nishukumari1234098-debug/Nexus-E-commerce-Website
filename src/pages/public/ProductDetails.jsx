import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../../context/CartContext';
import styles from './Pages.module.css';

const fetchSingleProduct = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id),
  });

  if (isLoading) return <div className={styles.loading}>Loading item details...</div>;
  if (error) return <div className={styles.error}>Error fetching product.</div>;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`${product.title} added to cart!🛒`);
  };

  return (
    <div className={styles.container}>
      <Link to="/products" style={{ textDecoration: 'none', color: '#2563eb' }}>← Back to Catalog</Link>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <img src={product.image} alt={product.title} style={{ width: '300px', height: '300px', objectFit: 'contain' }} />
        <div>
          <h2>{product.title}</h2>
          <p style={{ color: '#64748b', margin: '1rem 0' }}>{product.description}</p>
          <h3 style={{ color: '#0f172a' }}>${product.price}</h3>
          <button onClick={handleAddToCart} className={styles.primaryBtn} style={{ maxWidth: '200px' }}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;