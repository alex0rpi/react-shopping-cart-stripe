export const productsArray = [
  {
    // id: '1',
    id: 'stripe_product_key1',
    title: 'Coffee',
    price: 1.99,
  },
  {
    // id: '2',
    id: 'stripe_product_key2',
    title: 'Sunglasses',
    price: 9.99,
  },
  {
    // id: '3',
    id: 'stripe_product_key3',
    title: 'Camera',
    price: 50,
  },
];

export const getProductData = (id) => {
  const productData = productsArray.find((product) => product.id === id);

  if (!productData) {
    console.log('Product data does not exist for id ' + id);
    return undefined;
  }

  return productData;
};
