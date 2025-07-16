import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Reviews({ limit = 3 }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) console.error("Fetch error:", error);
    else setReviews(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("reviews").insert([form]);
    if (error) console.error("Submit error:", error);
    else {
      setForm({ name: "", comment: "", rating: 5 });
      fetchReviews();
    }
    setLoading(false);
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, limit);

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Customer Reviews</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Your review"
          className="w-full border px-3 py-2 rounded"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          required
        ></textarea>
        <select
          className="border px-3 py-2 rounded"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div className="space-y-4">
        {displayedReviews.map((rev) => (
          <div key={rev.id} className="border-t pt-2">
            <p className="font-semibold">{rev.name} ({rev.rating}⭐)</p>
            <p>{rev.comment}</p>
            <p className="text-sm text-gray-500">{new Date(rev.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {reviews.length > limit && (
        <div className="text-center mt-4">
          <button
            className="text-green-700 hover:underline"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "View All Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
