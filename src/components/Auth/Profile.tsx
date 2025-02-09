import { useEffect, useState } from 'react';
import { getProfile } from '../../api';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await getProfile(token);
        setUser(data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
        console.log('Error fetching profile:', err);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <p>
          Welcome, {user.username}! {user.email}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
