import { useEffect, useState } from 'react';
import { getProfile } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';
import './AuthStyles/Profile.css';

interface User {
  username: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticated, setIsAuthenticated } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const data = await getProfile(token);
        setUser(data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <h2>Profile</h2>
        {user ? (
          <>
            <p className='profile-details'>Username: {user.username}</p>
            <p className='profile-details'>Email: {user.email}</p>
            <button className='logout-button' onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
