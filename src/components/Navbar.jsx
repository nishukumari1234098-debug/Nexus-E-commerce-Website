import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#222' }}>
      <Link to="/" style={{ color: 'white' }}>Home</Link>
      <Link to="/products" style={{ color: 'white' }}>Products</Link>
      <Link to="/cart" style={{ color: 'white' }}>Cart</Link>
    </nav>
  )
}

export default Navbar