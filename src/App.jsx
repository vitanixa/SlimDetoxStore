
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'slim',
    name: 'SlimDetox Tea',
    description: 'Flush toxins naturally with our herbal detox blend.',
    price: 24.99,
    image: '/images/slimdetox.jpg',
  },
  {
    id: 'night',
    name: 'Night Blend',
    description: 'Wind down and sleep deeply with calming botanicals.',
    price: 26.99,
    image: '/images/nightblend.jpg',
  },
  {
    id: 'bundle',
    name: '3-Pack Bundle',
    description: 'Best value! Get both blends and more for your wellness journey.',
    price: 69.99,
    image: '/images/bundle.jpg',
  }
];

const App = () => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart(prev => {
      const quantity = prev[product.id]?.quantity || 0;
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: quantity + 1
        }
      };
    });
  };

  const cartTotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="bg-beige text-green-900 font-sans min-h-screen">
      <header className="bg-green-700 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">Vitanixa Herbal Teas</h1>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Naturally Cleanse. Deeply Nourish.</h2>
          <p className="text-lg mb-6">
            Discover the power of herbal wellness with Vitanixa's signature blends—formulated to detox, calm, and rejuvenate your body from within.
          </p>
          <a href="#shop" className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-800">
            Shop Now
          </a>
        </motion.section>

        <section id="shop" className="grid gap-6 md:grid-cols-3">
          {products.map(product => (
            <motion.div
              key={product.id}
              className="p-4 bg-white rounded shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={product.image} alt={product.name} className="rounded mb-4 w-full h-60 object-cover" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm my-2">{product.description}</p>
              <p className="font-bold mb-2">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white p-6 rounded shadow"
        >
          <h4 className="text-2xl font-bold mb-4">Cart</h4>
          {Object.keys(cart).length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {Object.values(cart).map(item => (
                <li key={item.id} className="mb-2">
                  {item.name} x {item.quantity} = ${(item.quantity * item.price).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 font-semibold">Total: ${cartTotal}</div>
        </motion.section>
      </main>
      <footer className="text-center text-sm text-green-900 mt-12 p-4">
        &copy; 2025 Vitanixa. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
