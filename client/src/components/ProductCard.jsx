import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const ProductCard = ({ product }) => {
  //instead of props we directly distructure in the funcion arguments
  const { items, addOneToCart, getProductQuantity, removeOneFromCart, deleteFromCart } = useContext(CartContext);
  const productQty = getProductQuantity(product.id);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQty > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQty}
              </Form.Label>
              <Col sm="6">
                <Button className="mx-2" onClick={() => addOneToCart(product.id)}>
                  +
                </Button>
                <Button className="mx-2" onClick={() => removeOneFromCart(product.id)}>
                  -
                </Button>
              </Col>
            </Form>
            <Button variant="danger" className="my-2" onClick={() => deleteFromCart(product.id)}>
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => addOneToCart(product.id)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
