import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{ width: '200px', background: '#333', color: 'white', padding: '1rem', minHeight: '100vh' }}>
      <h3>Admin Panel</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/admin" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/admin/products" style={{ color: 'white' }}>Manage Products</Link>
        <button onClick={handleLogout}>Log Out</button>
      </nav>
    </aside>
  )
}

export default Sidebar