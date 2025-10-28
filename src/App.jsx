// src/App.jsx
import Footer from './components/Footer'; // ⬅️ Add this at the top
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShoppingCart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Reviews from "./pages/Reviews";
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import FitnessPage from './pages/FitnessPage';
import FitnessUpload from './pages/FitnessUpload';
import FatBurnBlast from './pages/FatBurnBlast';
import StrengthBuilder from './pages/StrengthBuilder';
import BeginnerStarter from './pages/BeginnerStarter';
import CalmCoreYoga from './pages/CalmCoreYoga';
import FitnessPrograms from './pages/FitnessPrograms';
import FitnessPlayer from './pages/FitnessPlayer';

const initialPayPalOptions = {
  "client-id": "AQlkZ_rVKY9won9AH0dJCXRCWLSQoINm52BbALJwyiTxSoWgo2VPNnGAY6T3EqCEEuTP1-JCeyOebzHz", // ⬅️ replace with your real live client ID
  currency: "USD",
  intent: "capture",
  "enable-funding": "card"
};

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
      const updatedCart = {
        ...prev,
        [product.id]: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: currentQty + qty,
        },
      };

      // 🧮 Calculate subtotal + count
      const subtotal = Object.values(updatedCart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = Object.values(updatedCart).reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // 🛒 Animate the cart icon briefly
      const cartIcon = document.querySelector(".cart-icon-bounce");
      if (cartIcon) {
        cartIcon.classList.add("cart-bounce");
        setTimeout(() => cartIcon.classList.remove("cart-bounce"), 400);
      }

      // 🧁 Amazon-style toast panel
      toast.custom(
        (t) => (
          <div
            className={`fixed right-4 top-20 sm:top-24 bg-white border border-green-200 shadow-2xl rounded-2xl p-5 w-80 sm:w-96 transform transition-all duration-500 ease-out ${
              t.visible
                ? "animate-enter translate-x-0 opacity-100"
                : "animate-leave translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <h3 className="font-semibold text-green-800 text-sm">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  ${product.price.toFixed(2)} added to cart
                </p>
              </div>
            </div>

            <hr className="my-3" />

            <div className="text-sm text-gray-700">
              <p className="font-semibold">
                Cart Subtotal:{" "}
                <span className="text-green-700">${subtotal.toFixed(2)}</span>
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {totalItems} item{totalItems > 1 ? "s" : ""} in cart
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="/cart"
                className="bg-green-700 hover:bg-green-800 text-white text-sm py-2 rounded-lg font-medium text-center"
              >
                Proceed to Checkout ({totalItems} items)
              </a>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="border border-green-600 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ),
        { duration: 6000 }
      );

      return updatedCart;
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
    <PayPalScriptProvider options={initialPayPalOptions}>
      <Router>
        <Toaster position="top-center" />
        
        {/* ✅ Sticky Mobile-Responsive Header */}
        <header className="bg-green-700 text-white p-4 shadow flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl sm:text-2xl font-bold hover:underline">
              Vitanixa-Herbal-Teas
            </Link>
           {/*
            <Link to="/fitness" className="text-xl sm:text-2xl font-bold hover:underline">
              Vitanixa-Workout-Videos
            </Link>
            <Link to="/fitness/programs" className="text-xl sm:text-2xl font-bold hover:underline">
              Fitness-Programs
            </Link>
           */}
          </div>
          <Link to="/cart" title="View Cart" className="relative mt-2 sm:mt-0 cart-icon-bounce">
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
            <Route path="/" element={<><HomePage cart={cart} addToCart={addToCart} /><Reviews /></>} />
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/cart" element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            } />
            <Route path="/success" element={<SuccessPage setCart={setCart} />} />
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
         <Footer />
        </main>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;

