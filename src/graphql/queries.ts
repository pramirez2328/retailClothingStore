// src/graphql/queries.ts
import { gql } from '@apollo/client';

// ✅ Query to get all purchases for a user
export const GET_USER_PURCHASES = gql`
  query GetUserPurchases($userId: ID!) {
    user(id: $userId) {
      username
      email
      purchases {
        purchaseId
        totalAmount
        createdAt
        items {
          title
          price
          orderQty
          thumbnail
        }
      }
    }
  }
`;

// ✅ Query to get a single purchase by its ID
export const GET_PURCHASE_BY_ID = gql`
  query GetPurchase($purchaseId: String!) {
    purchase(purchaseId: $purchaseId) {
      purchaseId
      totalAmount
      createdAt
      items {
        title
        price
        orderQty
        thumbnail
      }
    }
  }
`;
