import { supabase } from "../supabaseClient";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Minus, Plus, Trash2, ShoppingBag, Lock, CreditCard, ChevronRight } from "lucide-react";

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [stripeLoading, setStripeLoading] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState("stripe"); // "stripe" | "paypal"

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 30 ? 0 : 4.99;
  const total = (subtotal + shipping).toFixed(2);

  // ── Stripe checkout ──
  const handleStripeCheckout = async () => {
    if (cartItems.length === 0) return;
    setStripeLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Could not start Stripe checkout. Please try PayPal below.");
    } finally {
      setStripeLoading(false);
    }
  };

  // ── PayPal handlers ──
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

      toast.success(`Order confirmed! Thank you, ${name.split(" ")[0]} 🍃`);
      localStorage.removeItem("vitanixa-cart");
      setTimeout(() => { window.location.href = "/success"; }, 1500);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ── Empty cart ──
  if (cartItems.length === 0) return (
    <div style={{ minHeight: "60vh", background: "#faf7f2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "48px 24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e8f0eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>🍃</div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: "800", color: "#1a3328", margin: "0 0 8px" }}>Your cart is empty</h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Discover our herbal wellness blends</p>
      </div>
      <Link to="/" style={{ background: "#1a3328", color: "white", padding: "14px 32px", borderRadius: "14px", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
        Shop Now
      </Link>
    </div>
  );

  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh", padding: "48px 24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: "800", color: "#1a3328", marginBottom: "40px" }}>Your Cart</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "32px", alignItems: "start" }}>

          {/* ── Cart Items ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ background: "white", borderRadius: "20px", padding: "20px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #f0ebe3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ width: "80px", height: "80px", background: "#e8f0eb", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: "70px", height: "70px", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", color: "#1a3328", margin: "0 0 4px", fontSize: "17px" }}>{item.name}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 12px" }}>${item.price.toFixed(2)} each · 30 tea bags</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                      style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Minus size={13} />
                    </button>
                    <span style={{ width: "32px", textAlign: "center", fontWeight: "700", color: "#1a3328", fontSize: "14px" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "800", color: "#1a3328", fontSize: "18px", margin: 0 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                    onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#4A7C59", fontSize: "13px", fontWeight: "600", textDecoration: "none", marginTop: "8px" }}>
              ← Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary & Checkout ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "100px" }}>

            {/* Summary */}
            <div style={{ background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #f0ebe3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", color: "#1a3328", fontSize: "18px", margin: "0 0 20px", paddingBottom: "16px", borderBottom: "1px solid #f0ebe3" }}>
                Order Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b" }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", paddingTop: "10px", borderTop: "1px solid #f0ebe3" }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#4A7C59" : "#1a3328", fontWeight: "600" }}>
                    {shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "2px solid #f0ebe3" }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "800", color: "#1a3328", fontSize: "17px" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "800", color: "#1a3328", fontSize: "17px" }}>${total}</span>
                </div>
              </div>
              {subtotal < 30 && (
                <div style={{ background: "#e8f0eb", borderRadius: "10px", padding: "10px 14px", fontSize: "12px", color: "#4A7C59", fontWeight: "600" }}>
                  🍃 Add ${(30 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>

            {/* Payment Method Toggle */}
            <div style={{ background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #f0ebe3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                <Lock size={14} style={{ color: "#4A7C59" }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#4A7C59", textTransform: "uppercase", letterSpacing: "0.1em" }}>Secure Checkout</span>
              </div>

              {/* Method tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                <button
                  onClick={() => setCheckoutMethod("stripe")}
                  style={{ padding: "12px", borderRadius: "12px", border: checkoutMethod === "stripe" ? "2px solid #1a3328" : "2px solid #e2e8f0", background: checkoutMethod === "stripe" ? "#1a3328" : "white", color: checkoutMethod === "stripe" ? "white" : "#64748b", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <CreditCard size={15} /> Card / Stripe
                </button>
                <button
                  onClick={() => setCheckoutMethod("paypal")}
                  style={{ padding: "12px", borderRadius: "12px", border: checkoutMethod === "paypal" ? "2px solid #003087" : "2px solid #e2e8f0", background: checkoutMethod === "paypal" ? "#003087" : "white", color: checkoutMethod === "paypal" ? "white" : "#64748b", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <span style={{ fontWeight: "900", fontStyle: "italic" }}>P</span> PayPal
                </button>
              </div>

              {/* Stripe checkout */}
              {checkoutMethod === "stripe" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button
                    onClick={handleStripeCheckout}
                    disabled={stripeLoading}
                    style={{ width: "100%", background: stripeLoading ? "#94a3b8" : "#635BFF", color: "white", border: "none", padding: "16px", borderRadius: "14px", fontSize: "15px", fontWeight: "700", cursor: stripeLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: stripeLoading ? "none" : "0 8px 24px rgba(99,91,255,0.35)", transition: "all 0.2s" }}
                  >
                    {stripeLoading ? (
                      "Redirecting to Stripe…"
                    ) : (
                      <><CreditCard size={18} /> Pay with Card — ${total}</>
                    )}
                  </button>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                    {["Visa", "Mastercard", "Amex", "Discover", "Apple Pay", "Google Pay"].map(card => (
                      <span key={card} style={{ fontSize: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "3px 8px", color: "#64748b", fontWeight: "600" }}>{card}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: 0 }}>
                    🔒 Powered by Stripe — 256-bit SSL encryption
                  </p>
                </div>
              )}

              {/* PayPal checkout */}
              {checkoutMethod === "paypal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontSize: "12px", color: "#64748b", textAlign: "center", margin: "0 0 4px" }}>
                    No PayPal account needed — pay with any card
                  </p>
                  {isPending ? (
                    <div style={{ textAlign: "center", color: "#64748b", fontSize: "13px", padding: "16px" }}>Loading PayPal…</div>
                  ) : (
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "rect", color: "blue", label: "pay" }}
                      createOrder={onCreateOrder}
                      onApprove={onApprove}
                      onError={() => toast.error("PayPal checkout failed. Please try again.")}
                    />
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
