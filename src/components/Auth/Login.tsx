import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';
import { loginUser } from '../../api';
import './AuthStyles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useCart();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true); // ✅ Update authentication state in context
      navigate('/profile');
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        {error && <p className='error-message'>{error}</p>}
        <form className='login-form' onSubmit={handleLogin}>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='login-button'>
            Login
          </button>
        </form>
        <div className='login-links'>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
