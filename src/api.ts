export const fetchData = async (endpoint: string) => {
  try {
    console.log('endpoint', endpoint);
    const response = await fetch(`https://dummyjson.com/products/category/${endpoint.trim()}`);
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};
