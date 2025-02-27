import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PURCHASES } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { QueryResponse, Purchase, Item } from '../../types';
import './PurchaseHistory.css';

function PurchaseHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const userIdFromState = location.state?.userId as string | undefined;
  const [userId, setUserId] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>('');

  useEffect(() => {
    if (userIdFromState) {
      setUserId(userIdFromState);
    } else {
      navigate('/'); // Redirect to home if user data is missing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdFromState]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  // Redirect to purchase details when filtering by ID
  const handleFilterById = () => {
    if (searchId.trim()) {
      navigate(`/profile/purchase-history/${searchId.trim()}`, { state: { userId } });
    }
  };

  // Fetch latest purchases from the backend
  const { loading, error, data, refetch } = useQuery<QueryResponse>(GET_USER_PURCHASES, {
    variables: { userId },
    skip: !userId
  });

  useEffect(() => {
    if (userId) {
      refetch(); // Refetch latest data when userId changes
    }
  }, [userId, refetch]);

  if (loading) return <p className='loading'>Loading purchases...</p>;
  if (error) return <p className='error'>Error fetching purchases: {error.message}</p>;

  return (
    <div className='purchase-history'>
      <h1>Purchase History</h1>
      <div>
        <h2>Orders</h2>
        <div className='filter-container'>
          <input
            type='text'
            className='filter-input'
            placeholder='Enter Purchase ID...'
            value={searchId}
            onChange={handleInputChange}
          />
          <button className='filter-by-id-button' onClick={handleFilterById}>
            Filter
          </button>
        </div>
      </div>
      {data?.user?.purchases.length === 0 ? (
        <p className='no-purchases'>No purchases found.</p>
      ) : (
        data?.user?.purchases.map((purchase: Purchase) => (
          <div key={purchase.purchaseId} className='purchase-card'>
            <div>
              <h4>Purchase ID: </h4>
              <h3>{purchase.purchaseId}</h3>
            </div>

            <p className='purchase-amount'>
              Total Amount: <span>${purchase.totalAmount?.toFixed(2)}</span>
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
