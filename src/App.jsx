import React, { useState } from 'react';

const PRODUCTS = [
  { id: 'slim', name: 'SlimDetox Tea', price: 24.99 },
  { id: 'night', name: 'Night Blend', price: 26.99 },
  { id: 'bundle', name: '3-Pack Bundle', price: 69.99 }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, qty } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="p-6 bg-[#fdf8f3] min-h-screen text-[#2f3d2f]">
      <h1 className="text-4xl font-bold mb-4">Vitanixa Store</h1>
      <h2 className="text-2xl mb-2">Products</h2>
      <div className="grid gap-4 mb-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm">${product.price.toFixed(2)}</p>
            <button
              className="mt-2 px-4 py-1 bg-[#2f3d2f] text-white rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-sm">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <strong>{item.name}</strong> (${item.price}) × 
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                  className="w-16 ml-2 p-1 border"
                />
              </div>
              <button
                className="text-red-500 underline"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <p className="text-lg font-semibold">Total: ${total}</p>
          <button className="px-6 py-2 bg-green-600 text-white rounded">Checkout (coming soon)</button>
        </div>
      )}
    </div>
  );
}
