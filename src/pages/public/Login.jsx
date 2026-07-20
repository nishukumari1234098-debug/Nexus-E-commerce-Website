import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Pages.module.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/admin'); 
  };

  return (
    <div className={styles.authBox}>
      <h2>Admin Login</h2>
      <p style={{ color: '#64748b' }}>This is a mock login — click below to simulate authenticating as admin.</p>
      <button onClick={handleLogin} className={styles.primaryBtn}>
        Log In as Admin 🔐
      </button>
    </div>
  );
}

export default Login;