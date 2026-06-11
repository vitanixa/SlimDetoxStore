import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Star } from "lucide-react";

const SEED_REVIEWS = [
  { id: 's1', name: 'Maya T.', rating: 5, comment: 'I have been drinking SlimDetox for 3 weeks and I already feel so much lighter. No bloating and my energy is amazing in the mornings!', created_at: '2026-05-01' },
  { id: 's2', name: 'Jordan R.', rating: 5, comment: 'The Night Blend is my new bedtime ritual. I sleep so much deeper and wake up feeling refreshed. Worth every penny.', created_at: '2026-04-22' },
  { id: 's3', name: 'Priya K.', rating: 5, comment: 'Ordered the bundle and it has completely changed my wellness routine. Love the natural flavors — not bitter at all!', created_at: '2026-04-10' },
];

export default function Reviews({ limit = 3 }) {
  const [reviews, setReviews] = useState(SEED_REVIEWS);
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (!error && data?.length) setReviews([...data, ...SEED_REVIEWS]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("reviews").insert([form]);
    if (!error) { setSubmitted(true); setForm({ name: "", comment: "", rating: 5 }); fetchReviews(); }
    setLoading(false);
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, limit);
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="bg-[#FAF7F2] py-20 px-6 border-t border-slate-100">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#C8973A] uppercase">Real Results</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2E5240]">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#C8973A] text-[#C8973A]" />)}
            </div>
            <span className="text-sm font-bold text-[#2E5240]">{avgRating} out of 5</span>
            <span className="text-sm text-slate-400">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C8973A] text-[#C8973A]" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-[#2E5240]">{rev.name}</p>
                <p className="text-[10px] text-slate-400">{new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>

        {reviews.length > limit && (
          <div className="text-center">
            <button onClick={() => setShowAll(p => !p)}
              className="text-sm font-bold text-[#4A7C59] border border-[#4A7C59]/30 px-6 py-2.5 rounded-xl hover:bg-[#E8F0EB] transition-colors">
              {showAll ? 'Show Less' : `View All ${reviews.length} Reviews`}
            </button>
          </div>
        )}

        {/* Submit Review */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#2E5240] mb-6 text-center">Share Your Experience</h3>
          {submitted ? (
            <div className="text-center py-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-[#4A7C59] fill-[#4A7C59]" />
              </div>
              <p className="font-bold text-[#2E5240]">Thank you for your review!</p>
              <p className="text-sm text-slate-500">Your feedback helps our community thrive.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your name" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A7C59]" />
              <textarea placeholder="Tell us about your experience..." required value={form.comment} rows={4}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#4A7C59]" />
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-slate-600">Rating:</label>
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A7C59]">
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#4A7C59] text-white font-bold py-3.5 rounded-xl hover:bg-[#2E5240] transition-all disabled:opacity-60 text-sm">
                {loading ? 'Submitting…' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
