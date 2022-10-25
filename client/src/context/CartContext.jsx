import { createContext, useState } from 'react';
import { getProductData } from '../productsStore';

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  //   [ { id:1, quantity:2 } ]
  const getProductQuantity = (id) => {
    const targetedProduct = cartProducts.find((p) => p.id === id);
    // const targetedProduct = cartProducts.find((p) => p.id === id)?.quantity;
    if (!targetedProduct) return 0;
    return targetedProduct.quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCartProducts([...cartProducts, { id, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        )
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        )
      );
    }
  };

  // delete the total amount of units of a certain product id, not the whole cart.
  const deleteFromCart = (id) => {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((product) => {
      const productData = getProductData(product.id);
      totalCost = totalCost + productData.price * product.quantity;
    });
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
