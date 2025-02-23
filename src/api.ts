const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
  console.log('API_BASE_URL', API_BASE_URL);
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) throw new Error('Invalid credentials');

  return response.json(); // Returns JWT Token
};

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const getProfile = async (token: string) => {
  try {
    // 🔹 Check if token is expired BEFORE making the API call
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    if (payload.exp * 1000 < Date.now()) {
      throw new Error('Token expired');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 🔹 If response is not OK, check status codes explicitly
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Token Invalid');
      }
      if (response.status === 403) {
        throw new Error('Forbidden - Access Denied');
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching profile:', err);

    // 🔹 Ensure token is removed on failure
    localStorage.removeItem('token');

    throw err; // Rethrow to let the calling component handle the logout
  }
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
