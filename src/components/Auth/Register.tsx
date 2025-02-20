import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api';
import { useCart } from '../Context/CartProvider';
import './AuthStyles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuthenticated } = useCart();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the register API
      const response = await registerUser(username, email, password);

      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        setMessage('❌ Registration failed. No token received.');
        console.error('Registration error: No token received from backend');
      }
    } catch (err) {
      setMessage('❌ Registration failed. Try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Register</h2>
        {message && <p className='message'>{message}</p>}
        <form className='register-form' onSubmit={handleRegister}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='register-button'>
            Register
          </button>
        </form>
        <div className='register-links'>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
