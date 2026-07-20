import { useCart } from '../../context/CartContext';
import styles from './Pages.module.css';

function Cart() {
  const { cart, dispatch } = useCart();

  const updateQty = (id, currentQty, amount) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: currentQty + amount } });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#64748b', marginTop: '1rem' }}>Your cart is empty. Start shopping!</p>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                <div>
                  <h4 style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                  <span style={{ color: '#64748b' }}>${item.price} each</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <div>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity, -1)}>-</button>
                  <span> {item.quantity} </span>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity, 1)}>+</button>
                </div>
                <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '2rem', textAlign: 'right', borderTop: '2px solid #e2e8f0', padding臨Top: '1rem' }}>
            <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
            <button className={styles.primaryBtn} style={{ maxWidth: '250px', marginTop: '1rem' }}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;