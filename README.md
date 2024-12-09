```markdown
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

---

## Folder Structure

Overview of the key directories and files:
```

src
├── assets # Static assets (e.g., images, fonts)
├── components # Reusable components
│ ├── Card # Product card
│ ├── Checkout # Checkout page with payment validation
│ ├── Context # Global state management with Context API
│ ├── Footer # Footer section
│ ├── Header # Header and navigation
│ ├── Home # Homepage component
│ ├── Loading # Loading spinner component
│ ├── NotFoundPage # 404 error page
│ ├── ProductDetailPage # Product details view
│ ├── ProductListPage # Product listing for categories
│ ├── thankYouPage # Post-checkout confirmation page
│ ├── WomenCategory # Women's clothing category page
├── App.css # Main application styling
├── App.tsx # Application entry point
├── api.ts # API calls and services
├── index.css # Global CSS styles
├── main.tsx # Application bootstrap file
├── types.ts # TypeScript type definitions
└── vite-env.d.ts # Vite environment types

````

---

## Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/pramirez2328/retailClothingStore.git
   cd online-store
````

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
- **Vanilla CSS**
- **DummyJSON API**: Provides product data for the store.

---

## API Integration

The project fetches product data from the [DummyJSON API](https://dummyjson.com/). The API is used to populate product lists, product details, and more.

---

## Add-to-Cart Functionality

Users can add products to their cart directly from the product listing or detail pages. The cart is managed globally using the **Context API**, allowing for a seamless shopping experience across the application.
