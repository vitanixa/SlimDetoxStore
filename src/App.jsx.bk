// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import FitnessPage from './pages/FitnessPage';
import FitnessUpload from './pages/FitnessUpload';
import { ShoppingCart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import FatBurnBlast from './pages/FatBurnBlast';
import StrengthBuilder from './pages/StrengthBuilder';
import BeginnerStarter from './pages/BeginnerStarter';
import CalmCoreYoga from './pages/CalmCoreYoga';
import FitnessPrograms from './pages/FitnessPrograms';
import FitnessPlayer from './pages/FitnessPlayer';

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
      toast.success(`${product.name} added to cart!`);
      return {
        ...prev,
        [product.id]: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
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
      <Toaster position="top-center" />
      
      {/* ✅ Sticky Mobile-Responsive Header */}
      <header className="bg-green-700 text-white p-4 shadow flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:underline">
            Vitanixa-Herbal-Teas
          </Link>
          <Link to="/fitness" className="text-xl sm:text-2xl font-bold hover:underline">
            Vitanixa-Workout-Videos
          </Link>
          <Link to="/fitness/programs" className="text-xl sm:text-2xl font-bold hover:underline">
            Fitness-Programs
          </Link>
        </div>
        <Link to="/cart" title="View Cart" className="relative mt-2 sm:mt-0">
          <ShoppingCart className="w-6 h-6 text-white hover:text-green-200 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-green-700 text-xs font-bold rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      {/* ✅ Route Pages */}
      <main className="min-h-screen bg-beige text-green-900 font-sans">
        <Routes>
          <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/fitness/upload" element={<FitnessUpload />} />
          <Route path="/fitness/programs/fat-burn-blast" element={<FatBurnBlast />} />
          <Route path="/fitness/programs/strength-builder" element={<StrengthBuilder />} />
          <Route path="/fitness/programs/beginner-starter" element={<BeginnerStarter />} />
          <Route path="/fitness/programs/calm-core-yoga" element={<CalmCoreYoga />} />
          <Route path="/fitness/programs" element={<FitnessPrograms />} />
          <Route path="/fitness/player" element={<FitnessPlayer />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;

