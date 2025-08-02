import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
        const resultado = await login({ email, password })

        if(resultado.success) {
            navigate('/')
        } else {
            setError(resultado.error || 'Login fallido')
        }

    } catch (err) {
        console.error('Error al iniciar sesión:', err)
        setError('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
    } finally {
        setLoading(false)
    }
  }
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login