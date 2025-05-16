import React, { useState } from 'react';

const price = 24.99;
const stripePriceId = 'price_1RPIknFvs7BGtO2X8MVIJWZc';

export default function App() {
  const [quantity, setQuantity] = useState(1);

  const handleStripeCheckout = () => {
    const stripe = window.Stripe('pk_test_123'); // replace with your real publishable key
    stripe.redirectToCheckout({
      lineItems: [{ price: stripePriceId, quantity }],
      mode: 'payment',
      successUrl: window.location.href,
      cancelUrl: window.location.href,
    });
  };

  const handlePayPalRedirect = () => {
    const total = (price * quantity).toFixed(2);
    window.location.href = `https://www.paypal.com/paypalme/vitanixa/${total}`;
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] text-[#2f3d2f] p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Vitanixa SlimDetox Tea</h1>
      <p className="mb-2 text-lg">Feel better, naturally.</p>
      <div className="my-6">
        <label htmlFor="qty" className="mr-2">Quantity:</label>
        <select
          id="qty"
          className="px-3 py-1 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>
      <p className="mb-4">Total: ${(price * quantity).toFixed(2)}</p>
      <button
        onClick={handleStripeCheckout}
        className="bg-[#2f3d2f] text-white px-6 py-2 rounded hover:opacity-90 mr-4"
      >
        Checkout with Stripe
      </button>
      <button
        onClick={handlePayPalRedirect}
        className="underline text-sm text-[#2f3d2f]"
      >
        Or Pay with PayPal
      </button>
    </div>
  );
}
