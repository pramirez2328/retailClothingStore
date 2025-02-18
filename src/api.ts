const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) throw new Error('Invalid credentials');
  return response.json(); // Returns JWT Token
};

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const getProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};

export const fetchData = async (endpoint: string) => {
  // dinamically fetch data from the API depending on the endpoint
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${endpoint.trim()}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};
