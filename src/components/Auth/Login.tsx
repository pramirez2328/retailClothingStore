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
    // Prevent the default form submission behavior
    e.preventDefault();

    try {
      // Call the login API
      // Assuming the API returns a token and user data
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
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
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
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
