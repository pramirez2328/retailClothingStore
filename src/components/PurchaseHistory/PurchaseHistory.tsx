import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PURCHASES } from '../../graphql/queries';

import { useEffect, useState } from 'react';
import './PurchaseHistory.css';

// Define TypeScript Types
interface Item {
  productId: number;
  title: string;
  price: number;
  orderQty: number;
  selectedSize?: string;
  thumbnail?: string;
}

interface Purchase {
  purchaseId: string;
  totalAmount: number;
  createdAt: string;
  items: Item[];
}

interface User {
  _id: string;
  username: string;
  email: string;
  purchases: Purchase[];
}

interface QueryResponse {
  user: User;
}

function PurchaseHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user as User | undefined;

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id);
    } else {
      navigate('/'); // Redirect to home if user data is missing
    }
  }, [user, navigate]);

  const { loading, error, data } = useQuery<QueryResponse>(GET_USER_PURCHASES, {
    variables: { userId },
    skip: !userId
  });

  if (loading) return <p className='loading'>Loading purchases...</p>;
  if (error) return <p className='error'>Error fetching purchases: {error.message}</p>;

  console.log(data);

  return (
    <div className='purchase-history'>
      <h1>{user?.username.toUpperCase()}</h1>
      <h2>Purchase History</h2>
      {data?.user?.purchases.length === 0 ? (
        <p className='no-purchases'>No purchases found.</p>
      ) : (
        data?.user?.purchases.map((purchase: Purchase) => (
          <div key={purchase.purchaseId} className='purchase-card'>
            <h3>Order ID: {purchase.purchaseId}</h3>
            <p className='purchase-amount'>
              Total Amount: <span>${purchase.totalAmount}</span>
            </p>
            <p className='purchase-date'>Purchased On: {purchase.createdAt}</p>
            <h4>Items:</h4>
            <ol className='items-list'>
              {purchase.items.map((item: Item, index: number) => (
                <li key={index} className='item'>
                  {item.title} - <strong>${item.price}</strong>
                  <p>
                    <i> (quantity: {item.orderQty})</i>
                  </p>
                  <div>{item.thumbnail && <img src={item.thumbnail} alt={item.title} />}</div>
                </li>
              ))}
            </ol>
          </div>
        ))
      )}
    </div>
  );
}

export default PurchaseHistory;
