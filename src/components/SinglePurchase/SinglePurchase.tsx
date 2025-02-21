import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PURCHASE_BY_ID } from '../../graphql/queries';
import './SinglePurchase.css';

interface Item {
  title: string;
  price: number;
  orderQty: number;
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

interface PurchaseQueryResponse {
  purchase: Purchase;
}

function SinglePurchase() {
  const { purchaseId } = useParams<{ purchaseId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user as User | undefined;

  const { loading, error, data } = useQuery<PurchaseQueryResponse>(GET_PURCHASE_BY_ID, {
    variables: { purchaseId },
    skip: !purchaseId
  });

  if (loading) return <p className='loading'>Loading purchase details...</p>;
  if (error) return <p className='error'>Error fetching purchase: {error.message}</p>;

  if (!data?.purchase) return <p className='no-purchase'>Purchase not found.</p>;

  const { purchase } = data;

  return (
    <div className='purchase-details'>
      <div>
        <h2>Purchase Details</h2>
        <button
          className='back-to-purchases-button'
          onClick={() => navigate('/profile/purchase-history', { state: { user } })}
        >
          Back to Purchases
        </button>
      </div>
      <div className='purchase-card'>
        <div>
          <h4>Order ID: </h4>
          <h3>{purchase.purchaseId}</h3>
        </div>

        <p className='purchase-amount'>
          Total Amount: <span>${purchase.totalAmount}</span>
        </p>
        <p className='purchase-date'>Purchased On: {purchase.createdAt}</p>
        <h4>Items:</h4>
        <ol className='items-list'>
          {purchase.items.map((item, index) => (
            <li key={index} className='item'>
              {item.title} - <strong>${item.price}</strong>
              <p>
                <i>(quantity: {item.orderQty})</i>
              </p>
              {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SinglePurchase;
