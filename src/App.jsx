// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => {
      const quantity = prev[product.id]?.quantity || 0;
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: quantity + 1,
        },
      };
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
};

export default App;

