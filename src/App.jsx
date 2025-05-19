import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductImage from './components/ProductImage';

const App = () => {
  const [cart, setCart] = useState({});
  const [modalImage, setModalImage] = useState(null);

  const products = [
    {
      id: 'slim',
      name: 'SlimDetox Tea',
      description: 'Flush toxins naturally with our herbal detox blend.',
      price: 24.99,
      image: '/images/vitanixa_slimdetox_square.png',
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
        {/* Product Grid */}
        <section id="shop" className="grid gap-6 md:grid-cols-3">
          {products.map(product => (
            <motion.div
              key={product.id}
              className="p-4 bg-white rounded shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                onClick={() => setModalImage(product.image)}
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm my-2">{product.description}</p>
              <p className="font-bold mb-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </section>

        {/* Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setModalImage(null)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-0 right-0 m-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={modalImage}
                alt="Product Zoom"
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Cart */}
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
