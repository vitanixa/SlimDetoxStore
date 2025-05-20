// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. <button className="underline text-green-700" onClick={() => navigate('/')}>Go shopping</button>.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>${item.price.toFixed(2)} each</p>
                <div className="mt-2">
                  <label className="mr-2">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-16 p-1 border rounded"
                  />
                  <button
                    className="ml-4 text-red-600 underline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-bold">${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: ${total}</p>
            <button className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

