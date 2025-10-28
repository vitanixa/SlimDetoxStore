import { supabase } from "../supabaseClient";
import { toast } from "react-hot-toast";
import React from "react";
import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const cartItems = Object.values(cart);
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

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

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      const name = `${details.payer.name.given_name} ${details.payer.name.surname}`;
      const email = details.payer.email_address;
      const amount = details.purchase_units[0].amount.value;
      const currency = details.purchase_units[0].amount.currency_code;
      const orderId = details.id;
      const shipping = details.purchase_units[0].shipping || null;

      // ✅ Fix: use cartItems from above
      const items = cartItems;

      console.log("🛒 Attempting Supabase insert...");
      const { error } = await supabase.from("orders").insert([
        {
          payer_name: name,
          payer_email: email,
          amount,
          currency,
          paypal_order_id: orderId,
          items, // ✅ now defined
          shipping,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("❌ Supabase insert error:", error);
        toast.error("Failed to save order.");
        return;
      }

      console.log("📧 Sending email via /api/sendEmail...");
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          paypal_order_id: orderId,
          payer_name: name,
          payer_email: email,
          amount,
          currency,
          items,
          shipping,
        }),
      });

      if (!res.ok) {
        console.error("❌ Email API error:", await res.text());
        toast.error("Email send failed.");
        return;
      }

      toast.success(`Payment completed by ${name}`);

      // ✅ Clear cart
      localStorage.removeItem("vitanixa-cart");
      if (typeof updateQuantity === "function") {
        Object.keys(cart).forEach((id) => updateQuantity(id, 0));
      }

      setTimeout(() => {
        window.location.href = "/success";
      }, 1500);
    } catch (err) {
      console.error("❌ PayPal approval error:", err);
      toast.error("Something went wrong during checkout.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-green-700 underline">
            Go back to shop
          </Link>
        </p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded shadow"
                />
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

          <div className="mt-8 text-right space-y-4">
            <p className="text-xl font-bold">Total: ${total}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2 text-center">
                💳 Credit or Debit Cards accepted via PayPal – no PayPal account
                needed.
              </p>
              {isPending ? (
                <p className="text-center">Loading PayPal...</p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={onCreateOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error("PayPal error:", err);
                    alert("PayPal checkout failed.");
                  }}
                />
              )}
            </div>
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

