import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

   const handleLogin = () => {
    login()
    navigate('/admin') 
  }

  return (
    <div>
      <h1>Login</h1>
      <p>This is a mock login — click below to simulate authenticating as admin.</p>
      <button onClick={handleLogin}>Log In as Admin</button>
    </div>
  )
}

export default Login