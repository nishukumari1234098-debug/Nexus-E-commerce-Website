import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  // Total calculate
  const totalAmount = cart
    ? cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)
    : '0.00';

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Order Success Screen Set Karo
    setIsOrdered(true);

    // Agar clearCart Context mein available hai toh trigger karo
    if (typeof clearCart === 'function') {
      clearCart();
    }
  };

  // 🎉 1. SUCCESS VIEW (Checkout ke baad dikhega)
  if (isOrdered) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ 
          background: 'var(--surface, #1e293b)', 
          padding: '3rem 2rem', 
          borderRadius: '24px', 
          maxWidth: '520px', 
          margin: '0 auto', 
          border: '1px solid var(--border-color, #334155)',
          color: 'var(--text-main, #ffffff)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>Order Placed Successfully!</h2>
          <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Thank you for shopping with us! Your mock order ID is <strong style={{ color: '#818cf8' }}>#NEX-{Math.floor(100000 + Math.random() * 900000)}</strong>.
          </p>
          <Link 
            to="/products" 
            className={styles.primaryBtn} 
            style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2rem' }}
            onClick={() => setIsOrdered(false)}
          >
            Continue Shopping 🛍️
          </Link>
        </div>
      </div>
    );
  }

  // 🛒 2. EMPTY CART VIEW (Agar items bilkul zero ho)
  if (!cart || cart.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your Shopping Cart</h2>
        <div style={{ 
          background: 'var(--surface, #1e293b)', 
          padding: '3rem 2rem', 
          borderRadius: '20px', 
          maxWidth: '500px', 
          margin: '0 auto', 
          border: '1px solid var(--border-color, #334155)' 
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h3 style={{ color: 'var(--text-main, #fff)', marginBottom: '0.5rem' }}>Your Cart is Empty</h3>
          <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '1.5rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className={styles.primaryBtn} style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2rem' }}>
            Browse Products 🛍️
          </Link>
        </div>
      </div>
    );
  }

  // 🛍️ 3. NORMAL CART ITEMS VIEW
  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: '2rem' }}>Your Shopping Cart</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {cart.map((item) => (
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              background: 'var(--surface, #1e293b)',
              color: 'white',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color, #334155)',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Image & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1', minWidth: '220px' }}>
              <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '10px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={item.image} alt={item.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'white', fontSize: '1rem' }}>{item.title}</h4>
                <div style={{ color: '#818cf8', fontWeight: '700' }}>${item.price} each</div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) - 1)}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                -
              </button>
              <span style={{ fontWeight: '700', padding: '0 0.5rem' }}>{item.quantity || 1}</span>
              <button 
                onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart && removeFromCart(item.id)}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total & Checkout Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        // background: 'var(--surface, #1e293b)', 
        padding: '1.5rem', 
        borderRadius: '16px', 
        border: '1px solid var(--border-color, #334155)' 
      }}>
        <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
          Total Amount: <span style={{ color: '#6366f1' }}>${totalAmount}</span>
        </h3>
        <button 
          onClick={handleCheckout} 
          className={styles.primaryBtn}
          style={{ width: 'auto', padding: '0.9rem 2.5rem', cursor: 'pointer' }}
        >
          Proceed to Checkout 💳
        </button>
      </div>
    </div>
  );
}

export default Cart;