import { supabase } from "../supabaseClient";
import { toast } from "react-hot-toast";
import React from "react";
import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Minus, Plus, Trash2, ShoppingBag, Leaf } from "lucide-react";

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const cartItems = Object.values(cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const onCreateOrder = (data, actions) =>
    actions.order.create({ purchase_units: [{ amount: { value: total } }] });

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const name = `${details.payer.name.given_name} ${details.payer.name.surname}`;
      const email = details.payer.email_address;
      const amount = details.purchase_units[0].amount.value;
      const orderId = details.id;
      const shipping = details.purchase_units[0].shipping || null;

      await supabase.from("orders").insert([{
        payer_name: name, payer_email: email, amount,
        currency: "USD", paypal_order_id: orderId,
        items: cartItems, shipping, created_at: new Date().toISOString(),
      }]);

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, paypal_order_id: orderId, payer_name: name, payer_email: email, amount, currency: "USD", items: cartItems, shipping }),
      });

      toast.success(`Order confirmed! Thank you, ${name.split(' ')[0]} 🍃`);
      localStorage.removeItem("vitanixa-cart");
      setTimeout(() => { window.location.href = "/success"; }, 1500);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (cartItems.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 bg-[#FAF7F2]">
      <div className="w-20 h-20 rounded-full bg-[#E8F0EB] flex items-center justify-center">
        <ShoppingBag className="w-10 h-10 text-[#4A7C59]" />
      </div>
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-[#2E5240]">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mt-2">Discover our herbal wellness blends</p>
      </div>
      <Link to="/" className="bg-[#4A7C59] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#2E5240] transition-all text-sm">
        Shop Now
      </Link>
    </div>
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-[#2E5240] mb-10">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm border border-slate-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-xl bg-[#E8F0EB] p-2" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-[#2E5240]">{item.name}</h3>
                  <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#2E5240]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right space-y-3">
                  <p className="font-serif font-bold text-[#2E5240]">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A7C59] hover:text-[#2E5240] mt-2 transition-colors">
              ← Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5 sticky top-24">
            <h3 className="font-serif font-bold text-[#2E5240] text-lg border-b border-slate-100 pb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-slate-600">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-[#4A7C59] font-semibold">{parseFloat(total) >= 30 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-[#2E5240] text-base pt-2 border-t border-slate-100">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
                <Leaf className="w-3 h-3 text-[#4A7C59]" /> Secure checkout via PayPal — no account needed
              </p>
              {isPending ? (
                <p className="text-center text-sm text-slate-400">Loading checkout…</p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                  createOrder={onCreateOrder}
                  onApprove={onApprove}
                  onError={() => toast.error("PayPal checkout failed. Please try again.")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
