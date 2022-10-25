import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { getProductData } from '../productsStore';

const CartProduct = ({ id, qty }) => {
  const ctx = useContext(CartContext);
  const productData = getProductData(id);
  return (
    <>
      <h3>{productData.title}</h3>
      <p>{qty}</p>
      <p>${(qty * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => ctx.deleteFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
};

export default CartProduct;
