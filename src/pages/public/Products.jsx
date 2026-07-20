import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import styles from './Pages.module.css';

const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Network response error');
  return res.json();
};

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className={styles.loading}>Loading exclusive catalog...</div>;
  if (error) return <div className={styles.error}>Something went wrong.</div>;

  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Premium Collection</h1>
        <p>Discover high-quality items curated for digital perfection.</p>
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Filter products dynamically..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.productGrid}>
        {filteredProducts?.map(product => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imgWrapper}>
              <img src={product.image} alt={product.title} className={styles.cardImg} />
            </div>
            <div>
              <h4 className={styles.cardTitle}>{product.title}</h4>
              <p className={styles.cardPrice}>${product.price}</p>
            </div>
            <Link to={`/product/${product.id}`} className={styles.primaryBtn}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;