import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Sidebar.module.css';

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <h3 className={styles.title}>🛠️ Nexus Admin</h3>
        <nav className={styles.navContainer}>
          <Link to="/admin" className={styles.sideLink}>Dashboard</Link>
          <Link to="/admin/products" className={styles.sideLink}>Manage Products</Link>
          <Link to="/" className={styles.sideLink}>View Storefront</Link>
        </nav>
      </div>
      <button onClick={handleLogout} className={styles.logoutBtn}>Log Out</button>
    </aside>
  );
}

export default Sidebar;