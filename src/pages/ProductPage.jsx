import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const productMap = {
  slim: {
    id: 'slim',
    name: 'SlimDetox Tea',
    description: 'Flush toxins, reduce bloating, and support weight loss naturally.',
    image: '/images/vitanixa_slimdetox_product.png',
    price: 24.99,
    ingredients: [
      'Green Tea (Sencha) - Boosts metabolism, antioxidants',
      'Oolong Tea - Thermogenic support, fat oxidation',
      'Yerba Mate - Curb appetite, energy boost',
      'Hibiscus - Antioxidant & diuretic',
      'Ginger - Aids digestion & Thermogenesis',
      'Fennel Seeds- Bloating relief & digestion',
      'Lemongrass - Detox & digestion, citrus flavor'
    ]
  },
  night: {
    id: 'night',
    name: 'Night Blend',
    description: 'Promotes restful sleep and digestion with calming botanicals.',
    image: '/images/vitanixa_night_blend_product.png',
    price: 26.99,
    ingredients: [
      'Rooibos - Antioxidants & metabolism support',
      'Hibiscus - Enhances fat metabolism, reduces bloating, tart',
      'Ginger - Boosts thermogenesis, digestion',
      'Fennel Seeds - Reduces bloating, digestion',
      'Peppermint - Soothes digestion, refreshing, curbs appetite',
      'Nettle Leaf - Diuretic, detoxifies, supports kidney function'
    ]
  },
  bundle: {
    id: 'bundle',
    name: '2-Pack Bundle',
    description: 'Save and get both blends for your complete wellness journey.',
    image: '/images/vitanixa_bundle.png',
    price: 69.99,
    ingredients: [
      'Includes SlimDetox + Night Blend',
      'Total body wellness, day and night.'
    ]
  }
};

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productMap[id];
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button onClick={() => navigate('/')} className="text-green-700 mb-4 underline">
        ← Back to Shop
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded shadow" />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border w-20 px-2 py-1 rounded"
            />
            <button
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
          </div>

          <h4 className="text-lg font-bold mt-8 mb-2">Ingredients:</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {product.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
