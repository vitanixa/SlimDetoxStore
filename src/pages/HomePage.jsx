import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck, Truck, Star } from 'lucide-react';

const products = [
  {
    id: 'slim',
    name: 'SlimDetox Tea',
    tagline: 'Flush • Cleanse • Energize',
    description: 'Flush toxins naturally, reduce bloating, and support weight loss with our signature herbal blend.',
    price: 21.99,
    image: '/images/vitanixa_slimdetox_product.png',
    badge: 'Best Seller',
    badgeColor: 'bg-[#C8973A] text-white',
  },
  {
    id: 'night',
    name: 'Night Blend',
    tagline: 'Calm • Restore • Sleep',
    description: 'Wind down and sleep deeply with calming botanicals that support overnight digestion and recovery.',
    price: 21.99,
    image: '/images/vitanixa_night_blend_product.png',
    badge: 'Fan Favorite',
    badgeColor: 'bg-[#4A7C59] text-white',
  },
  {
    id: 'bundle',
    name: '2-Pack Bundle',
    tagline: 'Day + Night Wellness',
    description: 'Complete body wellness — detox by day, restore by night. Best value for your wellness journey.',
    price: 42.50,
    image: '/images/vitanixa_bundle.png',
    badge: 'Save $1.48',
    badgeColor: 'bg-rose-600 text-white',
  },
];

const benefits = [
  { icon: Leaf, title: '100% Herbal', desc: 'No artificial additives, fillers, or preservatives' },
  { icon: ShieldCheck, title: 'Lab Tested', desc: 'Every batch tested for purity and potency' },
  { icon: Truck, title: 'Free Shipping', desc: 'Free US shipping on all orders over $30' },
  { icon: Star, title: '5-Star Rated', desc: 'Loved by thousands of wellness enthusiasts' },
];

const HomePage = ({ addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF7F2]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2E5240] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1800&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-[#C8973A] uppercase border border-[#C8973A]/30 px-3 py-1 rounded-full">
              100% Natural Herbal Blends
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
              Cleanse Your Body.<br />
              <span className="text-[#C8973A]">Elevate Your Life.</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md">
              Vitanixa teas are crafted with premium botanicals to help you detox, slim, and restore — naturally, deliciously, daily.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#C8973A] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#b5852f] transition-all shadow-lg shadow-[#C8973A]/30"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/product/bundle')}
                className="border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all"
              >
                View Bundle
              </button>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['A','B','C','D'].map(l => (
                  <div key={l} className="w-8 h-8 rounded-full bg-[#C8973A]/30 border-2 border-[#2E5240] flex items-center justify-center text-[10px] font-bold text-white">{l}</div>
                ))}
              </div>
              <p className="text-xs text-slate-300"><span className="text-white font-bold">2,400+</span> happy customers this month</p>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img src="/images/vitanixa_bundle.png" alt="Vitanixa Bundle" className="w-80 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#E8F0EB] border-y border-[#4A7C59]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4A7C59] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2E5240]">{title}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#C8973A] uppercase">Our Blends</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2E5240]">Crafted for Your Wellness</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">Each blend is carefully formulated with premium, ethically sourced botanicals.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative bg-[#E8F0EB] p-8 flex items-center justify-center h-56">
                <span className={`absolute top-4 left-4 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${product.badgeColor}`}>
                  {product.badge}
                </span>
                <img src={product.image} alt={product.name}
                  className="h-44 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-[#C8973A] tracking-widest uppercase">{product.tagline}</p>
                  <h3 className="font-serif text-xl font-bold text-[#2E5240] mt-0.5">{product.name}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{product.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <p className="font-serif text-xl font-bold text-[#2E5240]">${product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="bg-[#4A7C59] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#2E5240] transition-all shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#2E5240] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C8973A] uppercase">The Ritual</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Simple. Natural. Effective.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Steep', desc: 'Add one tea bag to 8oz of hot water. Steep 5–7 minutes for full potency.' },
              { step: '02', title: 'Sip Daily', desc: 'Drink your SlimDetox in the morning and Night Blend before bed for best results.' },
              { step: '03', title: 'Transform', desc: 'Feel lighter, sleep better, and notice the difference in 7–14 days.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="space-y-3">
                <p className="font-serif text-5xl font-bold text-[#C8973A]/40">{step}</p>
                <h3 className="font-serif text-xl font-bold">{title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
