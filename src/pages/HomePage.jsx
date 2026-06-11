import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck, Truck, Star, ChevronRight, ArrowRight, Check } from 'lucide-react';

const products = [
  {
    id: 'slim',
    name: 'SlimDetox Tea',
    tagline: 'MORNING RITUAL',
    description: 'Flush toxins, reduce bloating, and ignite your metabolism with our signature morning blend.',
    price: 21.99,
    image: '/images/vitanixa_slimdetox_product.png',
    badge: 'Best Seller',
    bg: '#1a3a2a',
    accent: '#4A7C59',
    perks: ['Boosts metabolism', 'Reduces bloating', 'Clean energy'],
  },
  {
    id: 'night',
    name: 'Night Blend',
    tagline: 'EVENING RITUAL',
    description: 'Restore, calm, and sleep deeply with botanicals that work while you rest.',
    price: 21.99,
    image: '/images/vitanixa_night_blend_product.png',
    badge: 'Fan Favorite',
    bg: '#1a1f3a',
    accent: '#6B7FD4',
    perks: ['Restful sleep', 'Overnight detox', 'Caffeine-free'],
  },
  {
    id: 'bundle',
    name: 'Complete Bundle',
    tagline: 'DAY + NIGHT SYSTEM',
    description: 'The ultimate 24-hour wellness system. Detox by day. Restore by night.',
    price: 42.50,
    image: '/images/vitanixa_bundle.png',
    badge: 'Best Value',
    bg: '#3a2a1a',
    accent: '#C8973A',
    perks: ['Complete system', 'Save $1.48', '30-day supply each'],
  },
];

const testimonials = [
  { name: 'Maya T.', location: 'Austin, TX', stars: 5, text: 'I have been drinking SlimDetox for 3 weeks and the difference is real. No bloating, better energy, and I already feel lighter.' },
  { name: 'Jordan R.', location: 'Atlanta, GA', stars: 5, text: 'The Night Blend is the best thing I have added to my routine. I sleep so much deeper and wake up genuinely refreshed.' },
  { name: 'Priya K.', location: 'New York, NY', stars: 5, text: 'Ordered the bundle and it completely changed my wellness routine. Love that it\'s all natural and actually works.' },
  { name: 'Camille D.', location: 'Dallas, TX', stars: 5, text: 'Not bitter at all — actually tastes amazing. The SlimDetox has a beautiful tart-spice flavor I look forward to every morning.' },
];

const HomePage = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f15 0%, #1a3328 50%, #0d1a10 100%)', color: 'white', minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,124,89,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,151,58,0.1) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: '100px', padding: '6px 14px', width: 'fit-content' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8973A', display: 'block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>100% Natural · Made in USA</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.05', margin: 0 }}>
              Your Body.<br />
              <span style={{ color: '#C8973A' }}>Cleansed.</span><br />
              Restored.
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.7', maxWidth: '420px', margin: 0 }}>
              Premium herbal tea blends crafted to detox, slim, and restore your body from within — naturally and deliciously.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                style={{ background: '#C8973A', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 32px rgba(200,151,58,0.4)' }}
              >
                Shop All Blends <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/product/bundle')}
                style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.25)', padding: '16px 32px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                View Bundle →
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: '#C8973A', color: '#C8973A' }} />)}
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}><strong style={{ color: 'white' }}>4.9/5</strong> from 2,400+ customers</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(circle, rgba(74,124,89,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
            <img src="/images/vitanixa_bundle.png" alt="Vitanixa Bundle"
              style={{ width: '100%', maxWidth: '420px', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))', position: 'relative', zIndex: 1 }} />
            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', background: 'white', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 2 }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>This Month</p>
              <p style={{ fontSize: '20px', fontWeight: '800', color: '#1a3328', margin: '2px 0 0' }}>2,400+</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Orders shipped 🍃</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: '#f8f5f0', borderTop: '1px solid #e8e0d5', borderBottom: '1px solid #e8e0d5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { icon: '🌿', text: '100% Natural Herbs' },
            { icon: '🧪', text: 'Lab Tested & Verified' },
            { icon: '🚚', text: 'Free US Shipping $30+' },
            { icon: '🇺🇸', text: 'Made in the USA' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>{icon}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#4A7C59' }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ background: '#faf7f2', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Blends</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#1a3328', margin: '0 0 16px' }}>
              Crafted for Your Wellness
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              Each blend is carefully formulated with premium, ethically sourced botanicals — no fillers, no shortcuts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {products.map(p => (
              <div key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0ebe3', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Product image area */}
                <div style={{ background: p.bg, padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: p.accent, color: 'white', fontSize: '10px', fontWeight: '800', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {p.badge}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{p.tagline}</p>
                  <img src={p.image} alt={p.name} style={{ height: '200px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', transition: 'transform 0.3s ease' }} />
                </div>

                {/* Product info */}
                <div style={{ padding: '28px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: '700', color: '#1a3328', margin: '0 0 8px' }}>{p.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>{p.description}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                    {p.perks.map(perk => (
                      <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={14} style={{ color: '#4A7C59', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: '#4A7C59', fontWeight: '600' }}>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0ebe3', paddingTop: '20px' }}>
                    <div>
                      <p style={{ fontSize: '22px', fontWeight: '800', color: '#1a3328', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>${p.price.toFixed(2)}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>30 herbal tea bags</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(p); }}
                      style={{ background: '#1a3328', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#4A7C59'}
                      onMouseLeave={e => e.currentTarget.style.background = '#1a3328'}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#1a3328', color: 'white', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>The Ritual</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', margin: '0 0 64px' }}>
            Simple. Natural. <span style={{ color: '#C8973A' }}>Effective.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
            {[
              { num: '01', title: 'Steep', desc: 'Add one bag to 8oz hot water. Steep 5–7 minutes for full herbal potency.', emoji: '🫖' },
              { num: '02', title: 'Sip Daily', desc: 'SlimDetox in the morning. Night Blend before bed. Consistency is key.', emoji: '☕' },
              { num: '03', title: 'Transform', desc: 'Feel lighter, sleep better, and notice real results in 7–14 days.', emoji: '✨' },
            ].map(({ num, title, desc, emoji }) => (
              <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '40px' }}>{emoji}</span>
                <p style={{ color: 'rgba(200,151,58,0.4)', fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: '800', lineHeight: 1, margin: 0 }}>{num}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '700', margin: 0 }}>{title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: '#faf7f2', padding: '100px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Real Results</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', color: '#1a3328', margin: '0 0 48px' }}>
            What Our Customers Say
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '28px', textAlign: 'left', border: '1px solid #f0ebe3', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} style={{ fill: '#C8973A', color: '#C8973A' }} />)}
                </div>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', fontStyle: 'italic', margin: '0 0 20px' }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid #f0ebe3', paddingTop: '16px' }}>
                  <p style={{ fontWeight: '700', color: '#1a3328', fontSize: '13px', margin: 0 }}>{t.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: '2px 0 0' }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f15, #1a3328)', color: 'white', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <span style={{ fontSize: '48px' }}>🍃</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', margin: 0 }}>
            Start Your Wellness Journey Today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            Join over 2,400 customers who have transformed their wellness routine with Vitanixa.
          </p>
          <button
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            style={{ background: '#C8973A', color: 'white', border: 'none', padding: '18px 40px', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(200,151,58,0.4)' }}
          >
            Shop Vitanixa Blends <ArrowRight size={18} />
          </button>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>Free shipping on orders over $30 · 30-day happiness guarantee</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
