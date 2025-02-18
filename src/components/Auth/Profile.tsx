import { useEffect, useState } from 'react';
import { getProfile } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';
import './AuthStyles/Profile.css';

interface User {
  username: string;
  email: string;
  _id: string;
  purchases: string[];
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

  const handlePurchaseHistory = () => {
    navigate('/profile/purchase-history', { state: { user } });
  };

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <h2>Profile</h2>
        {user ? (
          <>
            <h3>Welcome {user.username}!</h3>
            <p className='profile-details'>Email: {user.email}</p>
            <p className='profile-details'>User #: {user._id}</p>
            <h3>Purchase History</h3>

            {user.purchases.length > 0 ? (
              <p className='purchase-length'>You have {user.purchases.length} purchases</p>
            ) : (
              <p>No purchases found.</p>
            )}

            <div className='profile-buttons'>
              {user.purchases.length > 0 && (
                <button className='fetch-purchases-button' onClick={handlePurchaseHistory}>
                  Get Purchase history
                </button>
              )}
              <button className='logout-button' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
