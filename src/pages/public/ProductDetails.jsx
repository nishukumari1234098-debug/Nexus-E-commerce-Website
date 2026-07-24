import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../../context/CartContext';
import styles from './Pages.module.css';

const fetchSingleProduct = async (id) => {
  const res = await fetch(`http://localhost:5000/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id),
  });

  // Handle Add to Cart with Click Feedback!
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product) {
      addToCart(product);
      setIsAdded(true);
      
      // 2 seconds baad button button normal ho jayega
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  if (isLoading) return <div className={styles.container} style={{ textAlign: 'center', padding: '4rem' }}>Loading details...</div>;
  if (error || !product) return <div className={styles.container} style={{ textAlign: 'center', padding: '4rem' }}>Product not found!</div>;

  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.secondaryBtn} style={{ marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Catalog
      </Link>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '3rem', 
        background: 'var(--surface, #1e293b)', 
        padding: '2.5rem', 
        borderRadius: '20px', 
        border: '1px solid var(--border-color, #334155)',
        color: 'var(--text-main, #fff)'
      }}>
        {/* Product Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffff', borderRadius: '16px', padding: '1.5rem' }}>
          <img src={product.image} alt={product.title} style={{ maxHeight: '350px', objectFit: 'contain', width: '100%' }} />
        </div>

        {/* Product Details */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: '#818cf8', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
            {product.category}
          </span>
          
          <h1 style={{ fontSize: '2.25rem', margin: '0.5rem 0 1rem 0', fontWeight: '800' }}>{product.title}</h1>
          
          <p style={{ color: 'var(--text-muted, #94a3b8)', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>
            {product.description}
          </p>
          
          <div style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '2rem', color: '#6366f1' }}>
            ${product.price}
          </div>

          {/* Fixed Button with Feedback */}
          <button 
            type="button"
            onClick={handleAddToCart}
            className={styles.primaryBtn} 
            style={{ 
              width: 'auto', 
              padding: '1rem 2.5rem', 
              fontSize: '1rem', 
              cursor: 'pointer',
              background: isAdded ? '#10b981' : undefined,
              transition: 'all 0.3s ease'
            }}
          >
            {isAdded ? '✓ Added to Cart!' : 'Add To Shopping Cart 🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;