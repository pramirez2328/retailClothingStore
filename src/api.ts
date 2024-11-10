export const manShirts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/mens-shirts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};

export const manShoes = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/mens-shoes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};
