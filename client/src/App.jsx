import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Store, Cancel, Success } from './pages/index';
import CartProvider from './context/CartContext';

function App() {
  return (
    <Container>
      <CartProvider>
        <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Container>
  );
}

export default App;
