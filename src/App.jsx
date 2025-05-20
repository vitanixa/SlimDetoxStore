// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const App = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('vitanixa-cart');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('vitanixa-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const currentQty = prev[product.id]?.quantity || 0;
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: currentQty + qty,
        },
      };
    });
  };

  const updateQuantity = (productId, qty) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: qty,
      },
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <header className="bg-green-700 text-white p-6 shadow flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Vitanixa Herbal Teas</Link>
        <Link to="/cart" className="relative text-white text-xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-green-700 text-xs font-bold rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;

