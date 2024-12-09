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
