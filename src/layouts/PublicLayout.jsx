import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PublicLayout() {
  return (
    <div className="public-layout">
      <Navbar />

      {/* Outlet = "render whichever child route matched here" */}
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout