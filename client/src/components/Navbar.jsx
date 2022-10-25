import { useState, useContext } from 'react';
import { Button, Navbar, Modal } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import CartProduct from './cartProduct';

const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const { items, getTotalCost } = useContext(CartContext);
  const totalQty = items.reduce((accum, item) => accum + item.quantity, 0);

  const onCheckout = async () => {
    const result = await fetch('http://localhost:5000/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items }),
    });
    const data = await result.json();
    const url = data.url;
    if (url) {
      console.log(url);
      window.location.assign(url); //*<--Recuerda esta! alternativa a useNavigate
      // !This forwards the user to stripe payment page.
    }
  };

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* For collapsing on mobile screens */}
          <Button onClick={() => setShow(true)}>Cart ({totalQty} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {totalQty > 0 ? (
            <>
              <p>Items in your cart</p>
              {items.map((cartItem) => (
                <CartProduct id={cartItem.id} qty={cartItem.quantity} key={cartItem.id} />
              ))}
              <h2>Total: ${getTotalCost().toFixed(2)} items</h2>
              <Button variant="success" onClick={onCheckout}>
                Purchase
              </Button>
            </>
          ) : (
            <h2>There are no items in your cart</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
