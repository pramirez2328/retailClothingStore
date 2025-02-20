// main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App.tsx';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql', // GraphQL API endpoint
  cache: new InMemoryCache() // Enable caching for better performance
});

// Wrap App with ApolloProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
