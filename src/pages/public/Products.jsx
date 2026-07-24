import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import useDebounce from '../../hooks/useDebounce';
import styles from './Pages.module.css';

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/products');
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { addToCart } = useCart();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Category list extraction
  const categories = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery'];

  // Filter & Sort Logic
  let filteredProducts = products?.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (sortBy === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (isLoading) return <div className={styles.container} style={{ textAlign: 'center', padding: '4rem' }}><h3>⚡ Loading Catalog...</h3></div>;
  if (error) return <div className={styles.container} style={{ textAlign: 'center', padding: '4rem', color: 'red' }}><h3>Error connecting to server!</h3></div>;

  return (
    <div className={styles.container}>
      {/* Rich Banner Header */}
      <section className={styles.hero} style={{ padding: '3.5rem 2rem', marginBottom: '2rem' }}>
        <h1>Curated Essentials Collection</h1>
        <p>Explore top-tier fashion, high-tech electronics, and everyday items. Free shipping on orders over $50 with guaranteed satisfaction.</p>
      </section>

      {/* Filter and Control Bar */}
      <div className={styles.filterBar}>
        <div style={{ flex: '1', minWidth: '260px' }}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍 Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '100%' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                background: selectedCategory === cat ? 'var(--text-main)' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Count Header */}
      <div style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
        Showing <strong>{filteredProducts.length}</strong> items in catalog
      </div>

      {/* Content Rich Responsive Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div>
                {/* Image + In-Stock Badge */}
                <div className={styles.imgWrapper}>
                  <img src={product.image} alt={product.title} className={styles.cardImg} />
                </div>

                {/* Top Meta Info */}
                <div className={styles.cardHeader}>
                  <span className={styles.badge}>{product.category}</span>
                  <span className={styles.stockTag}>● In Stock</span>
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{product.title}</h3>

                {/* Mock Rating */}
                <div className={styles.ratingRow}>
                  <span>★ ★ ★ ★ ☆</span>
                  <span className={styles.reviewCount}>(4.5 / 5)</span>
                </div>

                {/* Price */}
                <div className={styles.cardPrice}>${product.price}</div>
              </div>

              {/* Action Buttons Footer */}
              <div className={styles.cardFooter}>
                <Link
                  to={`/product/${product.id}`}
                  className={styles.secondaryBtn}
                  style={{ flex: 1, padding: '0.65rem 0', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className={styles.primaryBtn}
                  style={{ flex: 1.5, padding: '0.65rem 0', fontSize: '0.85rem' }}
                >
                  Add Cart 🛒
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
            <h4>No products found matching "{searchTerm}"</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Try searching with a different term or clearing filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;