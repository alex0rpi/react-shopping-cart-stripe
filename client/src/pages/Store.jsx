import { Row, Col } from 'react-bootstrap';
import { productsArray, getProductData } from '../productsStore';
import ProductCard from '../components/ProductCard';

const Store = () => {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((productItem) => (
          <Col align="center" key={productItem.id}>
            <ProductCard product={productItem} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
