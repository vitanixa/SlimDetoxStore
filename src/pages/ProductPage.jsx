import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ShieldCheck, Leaf, Star, Minus, Plus } from 'lucide-react';

const productMap = {
  slim: {
    id: 'slim', name: 'SlimDetox Tea', tagline: 'Flush • Cleanse • Energize',
    description: 'Flush toxins, reduce bloating, and support healthy weight management with our signature morning blend.',
    image: '/images/vitanixa_slimdetox_product.png', price: 21.99,
    color: '#4A7C59',
    highlights: ['Boosts metabolism naturally', 'Reduces bloating fast', 'Clean energy — no jitters', 'Antioxidant-rich botanicals'],
    ingredients: [
      { name: 'Green Tea (Sencha)', benefit: 'Boosts metabolism & antioxidants' },
      { name: 'Oolong Tea', benefit: 'Thermogenic support & fat oxidation' },
      { name: 'Yerba Mate', benefit: 'Appetite control & energy' },
      { name: 'Hibiscus', benefit: 'Antioxidant & natural diuretic' },
      { name: 'Ginger', benefit: 'Digestion & thermogenesis' },
      { name: 'Fennel Seeds', benefit: 'Bloating relief & digestion' },
      { name: 'Lemongrass', benefit: 'Detox support & citrus flavor' },
    ]
  },
  night: {
    id: 'night', name: 'Night Blend', tagline: 'Calm • Restore • Sleep',
    description: 'Wind down with calming botanicals that promote restful sleep, overnight digestion, and cellular recovery.',
    image: '/images/vitanixa_night_blend_product.png', price: 21.99,
    color: '#2E5240',
    highlights: ['Promotes deep, restful sleep', 'Supports overnight digestion', 'Reduces evening bloating', 'Caffeine-free botanicals'],
    ingredients: [
      { name: 'Rooibos', benefit: 'Antioxidants & metabolism support' },
      { name: 'Hibiscus', benefit: 'Fat metabolism & bloating reduction' },
      { name: 'Ginger', benefit: 'Thermogenesis & digestion' },
      { name: 'Fennel Seeds', benefit: 'Bloating relief & digestion' },
      { name: 'Peppermint', benefit: 'Digestion & appetite curbing' },
      { name: 'Nettle Leaf', benefit: 'Diuretic & kidney detox support' },
    ]
  },
  bundle: {
    id: 'bundle', name: '2-Pack Bundle', tagline: 'Complete Day + Night Wellness',
    description: 'The ultimate wellness duo. Detox and energize by day with SlimDetox, restore and sleep deeply by night with Night Blend.',
    image: '/images/vitanixa_bundle.png', price: 42.50,
    color: '#C8973A',
    highlights: ['Complete 24hr wellness system', 'Best value — save $1.48', 'SlimDetox + Night Blend', 'Perfect gift for wellness lovers'],
    ingredients: [
      { name: 'Includes SlimDetox Tea', benefit: 'Morning detox & energy' },
      { name: 'Includes Night Blend', benefit: 'Evening calm & recovery' },
    ]
  },
};

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productMap[id];
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="p-8 text-center text-slate-500">Product not found.</div>;

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold text-[#4A7C59] hover:text-[#2E5240] mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div className="bg-[#E8F0EB] rounded-3xl p-10 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-80 object-contain drop-shadow-xl" />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#C8973A] uppercase">{product.tagline}</p>
              <h1 className="font-serif text-4xl font-bold text-[#2E5240] mt-1">{product.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C8973A] text-[#C8973A]" />)}
                <span className="text-xs text-slate-500 ml-1">4.9 (284 reviews)</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>

            <ul className="space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#2E5240] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#4A7C59] shrink-0" /> {h}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-3xl font-bold text-[#2E5240]">${product.price.toFixed(2)}</p>
              <span className="text-xs text-slate-400">+ Free shipping over $30</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 font-bold text-sm text-[#2E5240]">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#4A7C59] text-white font-bold py-3.5 rounded-xl hover:bg-[#2E5240] transition-all shadow-md shadow-[#4A7C59]/20 text-sm"
              >
                Add to Cart
              </button>
            </div>

            {/* Ingredients */}
            <div className="border-t border-slate-200 pt-6 space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-black text-[#2E5240] uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-[#4A7C59]" /> Ingredients
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                    <span className="font-semibold text-[#2E5240]">{ing.name}</span>
                    <span className="text-slate-400">{ing.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
