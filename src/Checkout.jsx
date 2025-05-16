import React from "react";

export default function Checkout() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="mb-4">Choose a payment method:</p>
      <a
        href="https://buy.stripe.com/test_28o3eHfAkfUjcScfYY"
        className="block bg-blue-600 text-white px-4 py-2 mb-4 rounded text-center"
      >
        Pay with Stripe
      </a>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
        <input type="hidden" name="cmd" value="_xclick">
        <input type="hidden" name="business" value="support@vitanixa.com">
        <input type="hidden" name="item_name" value="Vitanixa SlimDetox">
        <input type="hidden" name="amount" value="19.99">
        <input type="hidden" name="currency_code" value="USD">
        <button type="submit" className="bg-yellow-400 px-4 py-2 rounded w-full text-center">
          Pay with PayPal
        </button>
      </form>
    </div>
  );
}