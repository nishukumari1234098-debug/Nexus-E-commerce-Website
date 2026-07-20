import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PublicLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ padding: '2rem', flex: 1 }}>
        
        <Outlet />

      </main>

      <Footer />

    </div>
  )
}

export default PublicLayout