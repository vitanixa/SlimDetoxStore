import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const productMap = {
  slim: {
    name: 'SlimDetox Tea',
    description: 'Flush toxins, reduce bloating, and support weight loss naturally.',
    image: '/images/vitanixa_slimdetox_product.png',
    price: 24.99,
    ingredients: [
      'Rooibos (Red, Organic)',
      'Hibiscus Flowers',
      'Ginger Root',
      'Cinnamon',
      'Fennel Seeds',
      'Lemongrass'
    ]
  },
  night: {
    name: 'Night Blend',
    description: 'Promotes restful sleep and supports digestion with chamomile and rooibos.',
    image: '/images/vitanixa_night_blend_final_product.png',
    price: 26.99,
    ingredients: [
      'Chamomile Flowers',
      'Rooibos',
      'Hibiscus',
      'Ginger',
      'Cinnamon',
      'Lemongrass'
    ]
  },
  bundle: {
    name: '2-Pack Bundle',
    description: 'Get both teas and save. A full wellness routine — day and night.',
    image: '/images/vitanixa_bundle.png',
    price: 69.99,
    ingredients: [
      'Includes: SlimDetox Tea + Night Blend',
      'Save 10% compared to buying individually.'
    ]
  }
};

const ProductPage = () => {
  const { id } = useParams();
  const product = productMap[id];
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      setReviews(data || []);
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || isSubmitting) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from('reviews')
      .insert([{ ...formData, created_at: new Date() }]);

    if (!error) {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      setReviews(data);
      setFormData({ name: '', comment: '', rating: 5 });
      alert('Review submitted!');
    }

    setIsSubmitting(false);
  };

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded shadow" />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
            Add to Cart
          </button>

          <h4 className="text-lg font-bold mt-8 mb-2">Ingredients:</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {product.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
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
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;

