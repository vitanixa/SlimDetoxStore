// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { ShoppingCart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

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
      const existing = prev[product.id];
      const quantity = (existing?.quantity || 0) + qty;

      // 🧠 Use the original product info from the first add (if it exists)
      return {
        ...prev,
        [product.id]: {
          id: product.id,
          name: existing?.name || product.name,
          image: existing?.image || product.image,
          price: existing?.price || product.price,
          quantity
        }
      };
    });

    toast.success(`${product.name} added to cart!`);
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
      <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-green-700 text-white p-6 shadow flex justify-between items-center">
        <Link to="/cart" title="View Cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-white hover:text-green-200 transition" />
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

