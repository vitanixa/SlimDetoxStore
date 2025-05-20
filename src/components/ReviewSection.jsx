import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, comment, rating } = formData;
    if (!name || !comment) return;

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ name, comment, rating }]);

    if (!error) {
      setReviews([data[0], ...reviews]);
      setFormData({ name: '', comment: '', rating: 5 });
    }
  };

  return (
    <section className="mt-16 bg-white p-6 rounded shadow max-w-3xl mx-auto" id="reviews">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} className="mb-4 border-b pb-3">
          <p className="font-semibold">{r.name} <span className="text-yellow-500">{"★".repeat(r.rating)}</span></p>
          <p className="text-sm text-gray-700">{r.comment}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>
        <input
          type="text"
          placeholder="Your name"
          className="border p-2 rounded w-full mb-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Your comment"
          className="border p-2 rounded w-full mb-2"
          rows="3"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />
        <select
          className="border p-2 rounded w-full mb-2"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
        >
          {[5, 4, 3, 2, 1].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800" type="submit">
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default ReviewSection;

