
import React from 'react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleStripeCheckout = () => {
    const stripe = window.Stripe('pk_test_12345'); // Replace with your real public key
    stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1RPIknFvs7BGtO2X8MVIJWZc', quantity: 1 }],
      mode: 'payment',
      successUrl: window.location.origin + '/?success=true',
      cancelUrl: window.location.origin + '/cart',
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <p className="font-medium">Total: ${total}</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleStripeCheckout}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
            >
              Pay with Stripe
            </button>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_blank"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input type="hidden" name="business" value="support@vitanixa.com" />
              <input type="hidden" name="item_name" value="Vitanixa SlimDetox Order" />
              <input type="hidden" name="amount" value={total} />
              <input type="hidden" name="currency_code" value="USD" />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600"
              >
                Pay with PayPal
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
