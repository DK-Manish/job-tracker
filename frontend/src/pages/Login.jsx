import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await login(email, password)
      localStorage.setItem('token', res.data.access_token)
      navigate('/board')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🗂️ Job Tracker</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}