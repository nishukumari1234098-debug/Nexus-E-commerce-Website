import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Pages.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Calling auth context login function
    const isSuccess = login(username, password);

    if (isSuccess) {
      navigate('/admin');
    } else {
      setError('Invalid Credentials! Use username: admin & password: admin123');
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>Admin Portal Access</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>Please enter your credentials to log in.</p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#ef4444',
            border: '1px solid #fee2e2',
            padding: '0.75rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Username</label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '0.95rem'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '0.95rem'
              }}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.primaryBtn}
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
          >
            Authenticate & Login 🔐
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          💡 Demo Credentials: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;