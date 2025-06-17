
import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handlePayPalCheckout = () => {
    const paypalUrl = `https://www.paypal.com/paypalme/vitanixa/${total}`;
    window.open(paypalUrl, '_blank');
  };

  const handleStripeCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Unable to proceed to Stripe checkout.');
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      alert('Checkout error. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <Link to="/" className="text-green-700 underline">Go back to shop</Link>
        </p>
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
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
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

          <div className="mt-8 text-right space-y-4">
            <p className="text-xl font-bold">Total: ${total}</p>

            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <button
                onClick={handlePayPalCheckout}
                className="bg-yellow-500 text-black px-5 py-2 rounded hover:bg-yellow-600 font-semibold"
              >
                Pay with PayPal
              </button>

              <button
                onClick={handleStripeCheckout}
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 font-semibold"
              >
                Pay with Card
              </button>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-600">
            <p className="font-medium text-green-700">Contact Us</p>
            <p>
              <a href="mailto:support@vitanixa.com" className="underline">
                support@vitanixa.com
              </a>
              {' '}|{' '}
              <a href="https://www.vitanixa.com" target="_blank" rel="noopener noreferrer" className="underline">
                www.vitanixa.com
              </a>
            </p>
          </div>

          <div className="mt-4 text-center">
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
