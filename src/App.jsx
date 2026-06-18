// src/App.jsx
import Footer from './components/Footer'; // ⬅️ Add this at the top
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShoppingCart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Reviews from "./pages/Reviews";
import MoiMoiPage from "./pages/MoiMoiPage";
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
  "client-id": "AQlkZ_rVKY9won9AH0dJCXRCWLSQoINm52BbALJwyiTxSoWgo2VPNnGAY6T3EqCEEuTP1-JCeyOebzHz",
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
        
        {/* Header */}
        <header style={{ background: 'rgba(13,31,21,0.97)', backdropFilter: 'blur(12px)', color: 'white', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ background: '#C8973A', textAlign: 'center', fontSize: '12px', fontWeight: '600', padding: '8px 16px', letterSpacing: '0.03em' }}>
            🍃 Free US shipping on orders over $30 &nbsp;·&nbsp; 100% Natural · Made in USA
          </div>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#C8973A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🍃</div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700', fontSize: '18px', margin: 0, color: 'white' }}>Vitanixa</p>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Herbal Wellness</p>
              </div>
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>Shop</Link>
              <Link to="/product/slim" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>SlimDetox</Link>
              <Link to="/product/night" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>Night Blend</Link>
              <Link to="/product/bundle" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>Bundle</Link>
              <Link to="/moi-moi" style={{ color: '#C8973A', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>🫕 Moi-Moi Pouches</Link>
            </nav>
            <Link to="/cart" className="cart-icon-bounce" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', background: '#C8973A', color: 'white', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>
              <ShoppingCart size={16} />
              Cart
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'white', color: '#1a3328', fontSize: '10px', fontWeight: '800', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* ✅ Route Pages */}
        <main className="min-h-screen bg-beige text-green-900 font-sans">
          <Routes>
            <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/cart" element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            } />
            <Route path="/success" element={<SuccessPage setCart={setCart} />} />
            <Route path="/moi-moi" element={<MoiMoiPage addToCart={addToCart} />} />
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

