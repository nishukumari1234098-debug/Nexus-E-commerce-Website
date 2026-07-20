import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '30px', background: '#f7fafc', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout