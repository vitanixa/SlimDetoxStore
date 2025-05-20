import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const items = Object.values(cart);

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePayPalCheckout = () => {
    const paypalUrl = `https://www.paypal.com/paypalme/vitanixa/${total}`;
    window.location.href = paypalUrl;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-green-700 underline">Go back to shop</Link></p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map(item => (
              <li key={item.id} className="py-4 flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded shadow" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="border px-2 py-1 w-20 rounded"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total}</p>
            <button
              onClick={handlePayPalCheckout}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Checkout with PayPal
            </button>
          </div>

          <div className="mt-6">
            <Link to="/" className="text-green-700 underline text-sm">
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

