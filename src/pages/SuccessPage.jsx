// src/pages/SuccessPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SuccessPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) console.error("❌ Fetch error:", error);
      else setOrder(data[0]);
      setLoading(false);
    };
    fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p>Loading your order...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You! 🎉</h1>
      <p className="text-lg mb-4">Your order has been successfully placed.</p>
      {order && (
        <div className="bg-white shadow-md rounded-xl p-6 mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2 text-green-800">
            Order Summary
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <strong>Email:</strong> {order.payer_email}
          </p>
          <div className="divide-y">
            {order.items.map((item, i) => (
              <div key={i} className="py-2 flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="text-right font-bold mt-4">
            Total: ${Number(order.amount).toFixed(2)} {order.currency}
          </div>
        </div>
      )}
      <div className="mt-8">
        <Link
          to="/"
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800"
        >
          Back to Home
        </Link>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Need help? Contact support@vitanixa.com
      </p>
    </div>
  );
};

export default SuccessPage;

