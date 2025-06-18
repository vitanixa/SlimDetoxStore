import React from 'react';
import { Link } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleStripeCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: Object.values(cart) }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Stripe: Invalid JSON:', text);
        alert('Stripe error. Try again later.');
        return;
      }

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Stripe checkout failed.');
      }

    } catch (err) {
      console.error('Stripe error:', err);
      alert('Stripe checkout failed.');
    }
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
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
                onClick={handleStripeCheckout}
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 font-semibold"
              >
                Pay with Card (Stripe)
              </button>
            </div>

            <div className="mt-4">
              {isPending ? (
                <p>Loading PayPal...</p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={onCreateOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error('PayPal error:', err);
                    alert('PayPal checkout failed.');
                  }}
                />
              )}
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

