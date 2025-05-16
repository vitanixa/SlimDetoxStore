import React from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 border p-4 rounded">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Qty: {item.qty}</p>
              <p>${(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="mt-2 text-red-600">Remove</button>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-6">Total: ${total.toFixed(2)}</h3>
          <a href="/checkout" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded">Proceed to Checkout</a>
          <button onClick={clearCart} className="ml-4 text-sm text-gray-600 underline">Clear Cart</button>
        </div>
      )}
    </div>
  );
}