export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${endpoint.trim()}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};
