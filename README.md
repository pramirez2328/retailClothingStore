# Online Store: Clothes, Furniture, and Home Decoration

This project is a modern online store for **clothes**, **furniture**, and **home decoration**. Built with **React**, **TypeScript**, and **Vite**, it offers a seamless shopping experience with robust features like a checkout page with payment validation, an add-to-cart feature, and global state management using the Context API.

---

## Features

- **React + TypeScript**: Leveraging the power of React for building dynamic user interfaces and TypeScript for type safety and better developer experience.
- **Vite**: Ensuring a fast and efficient development and build process.
- **React Router DOM**: Enabling client-side navigation for pages like Home, Product Listings, Product Details, Checkout, and more.
- **Context API**: Providing global state management for a smoother and more consistent shopping experience across the application.
- **Vanilla CSS**: Using lightweight CSS for styling to maintain simplicity and efficiency.
- **Checkout Page with Payment Validation**: Includes payment validation to ensure a secure checkout process.
- **Fetch API Integration**: Fetches product data from the [DummyJSON API](https://dummyjson.com/).
- **Add-to-Cart Feature**: Allows users to add products to their cart and manage their selections seamlessly.
- **Apollo Client + GraphQL**: Fetching and managing data efficiently.
- **User Authentication**: Supports user login, registration, and profile management.
- **Purchase History**: Displays a user's past purchases and allows viewing single purchase details.

---

## Folder Structure

Overview of the key directories and files:

```
src
|── assets # Static assets (e.g., images, fonts)
├── components # Reusable components
│ ├── Card # Product card
│ ├── Checkout # Checkout page with payment validation
│ ├── Context # Global state management with Context API
│ ├── Footer # Footer section
│ ├── Header # Header and navigation
│ ├── Home # Homepage component
│ ├── Loading # Loading spinner component
│ ├── Login # Login component
│ ├── Register # Register component
│ ├── Profile # User profile component
│ ├── PurchaseHistory # List of user purchases
│ ├── SinglePurchase # Detailed view of a single purchase
│ ├── NotFoundPage # 404 error page
│ ├── ProductDetailPage # Product details view
│ ├── ProductListPage # Product listing for categories
│ ├── thankYouPage # Post-checkout confirmation page
├── graphql # GraphQL queries and mutations
│ ├── queries.ts # GraphQL queries
├── App.css # Main application styling
├── App.tsx # Application entry point
├── api.ts # API calls and services
├── index.css # Global CSS styles
├── main.tsx # Application bootstrap file
├── types.ts # TypeScript type definitions
└── vite-env.d.ts # Vite environment types
```

---

## Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/pramirez2328/retailClothingStore.git
   cd online-store
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.

---

## Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Context API**
- **Apollo Client + GraphQL**
- **Vanilla CSS**
- **DummyJSON API**: Provides product data for the store.

---

## GraphQL Integration

The project integrates GraphQL for efficient data fetching.

### **GraphQL Queries**

- **Get All Purchases for a User**

  ```ts
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
  ```

- **Get Single Purchase by ID**
  ```ts
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
  ```

---

## License

This project is licensed under the MIT License.

---

**Maintainer**: Pedro Ramirez
