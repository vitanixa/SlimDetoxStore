import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = ({ setCart }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    localStorage.removeItem('vitanixa-cart');
    if (setCart) setCart({});

    // Try to get Stripe session details from URL
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) setSession(sessionId);
  }, [setCart]);

  return (
    <div style={{ minHeight: "80vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "white", borderRadius: "28px", padding: "56px 48px", maxWidth: "480px", width: "100%", textAlign: "center", border: "1px solid #f0ebe3", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e8f0eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle size={40} style={{ color: "#4A7C59" }} />
        </div>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "32px", fontWeight: "800", color: "#1a3328", margin: "0 0 8px" }}>
            Order Confirmed! 🍃
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
            Thank you for your order! A confirmation has been sent to your email. Your Vitanixa blends will be on their way soon.
          </p>
        </div>
        <div style={{ background: "#e8f0eb", borderRadius: "16px", padding: "16px 20px", width: "100%", textAlign: "left" }}>
          <p style={{ fontSize: "13px", color: "#4A7C59", fontWeight: "600", margin: "0 0 4px" }}>🌿 Your wellness journey starts now</p>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
            Steep 5–7 minutes in hot water. Drink SlimDetox in the morning, Night Blend before bed. Feel the difference in 7 days.
          </p>
        </div>
        <Link to="/" style={{ background: "#1a3328", color: "white", padding: "14px 36px", borderRadius: "14px", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
