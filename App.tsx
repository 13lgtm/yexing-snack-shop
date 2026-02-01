
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import OrderHistory from './pages/OrderHistory';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="max-w-md mx-auto min-h-screen bg-background-light shadow-2xl relative">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/history" element={<OrderHistory />} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
};

export default App;
