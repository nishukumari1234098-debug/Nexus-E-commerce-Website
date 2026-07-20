import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Nexus<span>Portal</span></Link>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/products" className={styles.link}>Products</Link>
        <Link to="/cart" className={styles.link}>
          Cart<span className={styles.cartBadge}>{totalItems}</span>
        </Link>
        {isAuthenticated ? (
          <Link to="/admin" className={styles.activeAdmin}>Admin Panel</Link>
        ) : (
          <Link to="/login" className={styles.link}>Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;