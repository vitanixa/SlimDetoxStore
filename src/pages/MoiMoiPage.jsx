import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, Star, ChevronDown, ChevronUp, Play } from 'lucide-react';

const MoiMoiPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const [activeVariant, setActiveVariant] = useState('yellow');
  const [quantity, setQuantity] = useState(1);
  const [faqOpen, setFaqOpen] = useState(null);
  const [addedMsg, setAddedMsg] = useState(false);

  const variants = {
    yellow: {
      id: 'moimoi_yellow',
      name: 'All Seasons Cooking Pouch',
      subtitle: 'Yellow — Pack of 100',
      tagline: 'COOKING & STORING',
      price: 20.00,
      image: '/images/moimoi_yellow_pouch.jpg',
      color: '#D4820A',
      bg: '#2a1f0a',
      description: 'BPA-free steam cooking pouches designed for Moi-Moi, Okpa, and any steamed West African dish. Fill, seal, and steam — no mess, no fuss.',
      highlights: [
        '100 pouches per pack',
        'BPA-Free food-safe material',
        'Withstands 30–45 min boiling',
        'Resealable zip-lock top',
        'Bilingual usage instructions (EN/ES)',
        'Perfect for Moi-Moi, Okpa & more',
      ],
    },
    blue: {
      id: 'moimoi_blue',
      name: 'Moi-Moi Cooking Pouch',
      subtitle: 'Blue — Pack of 100',
      tagline: 'MOI-MOI MADE EASY',
      price: 20.00,
      image: '/images/moimoi_blue_pouch.jpg',
      color: '#1a3a8f',
      bg: '#0a0f2a',
      description: 'The original Moi-Moi cooking pouch — trusted by home cooks and caterers. Same great BPA-free quality, now in the classic blue style.',
      highlights: [
        '100 pouches per pack',
        'BPA-Free food-safe material',
        'Withstands 30–45 min boiling',
        'Resealable zip-lock top',
        'Perfect for Moi-Moi, Ekuru & more',
        'Used by professional caterers',
      ],
    },
  };

  const bundleProduct = {
    id: 'moimoi_bundle',
    name: 'Moi-Moi Pouch Bundle',
    subtitle: 'Yellow + Blue — 200 Pouches Total',
    tagline: 'BEST VALUE',
    price: 37.00,
    image: '/images/moimoi_yellow_pouch.jpg',
    color: '#2E5240',
    description: 'Get both styles — 100 yellow All Seasons + 100 blue Moi-Moi pouches. Best value for avid cooks and caterers.',
    highlights: [
      '200 total pouches',
      'Both yellow & blue styles included',
      'Save $3 vs buying separately',
      'Free shipping included',
      'BPA-Free, food-safe',
    ],
  };

  const faqs = [
    { q: 'What can I cook in these pouches?', a: 'Moi-Moi, Okpa, Ekuru, and any steamed puree-based West African dish. They work perfectly for any food that needs to be steamed in a sealed pouch.' },
    { q: 'Are they safe for boiling?', a: 'Yes — these pouches are BPA-free and rated for 30–45 minutes of boiling. Do not microwave and do not overfill (fill to about 2/3 capacity).' },
    { q: 'How many servings per pouch?', a: 'Each pouch typically holds one individual serving of Moi-Moi. For larger portions, use two pouches side by side.' },
    { q: 'Can I reuse them?', a: 'These are designed for single use to ensure food safety and hygiene. At $0.20 per pouch, they\'re affordable for everyday cooking.' },
    { q: 'How fast will they ship?', a: 'Orders ship within 1–2 business days from Venus, TX via USPS. Standard delivery is 5–7 business days.' },
  ];

  const v = variants[activeVariant];

  const handleAddToCart = (product) => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  return (
    <div style={{ background: '#faf7f2', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>

      {/* ── HERO SECTION ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1a0f, #1a2e1a)', color: 'white', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: '100px', padding: '6px 14px', color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', width: 'fit-content' }}>
              🫕 West African Kitchen Essentials
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800', margin: 0, lineHeight: '1.1' }}>
              Moi-Moi Made<br /><span style={{ color: '#C8973A' }}>Easy & Clean.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', margin: 0, maxWidth: '420px' }}>
              BPA-free cooking pouches for Moi-Moi, Okpa, and steamed West African dishes. No banana leaves, no mess — just perfect results every time.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
                style={{ background: '#C8973A', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(200,151,58,0.3)' }}
              >
                Shop Pouches →
              </button>
              <button
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.25)', padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Play size={14} /> Watch Demo
              </button>
            </div>
            <div style={{ display: 'flex', gap: '24px', paddingTop: '8px' }}>
              {[['100', 'Pouches per pack'], ['$0.20', 'Per pouch'], ['BPA', 'Free & safe']].map(([val, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '800', color: '#C8973A', margin: 0 }}>{val}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product image with variant toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: v.bg, borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <img src={v.image} alt={v.name}
                style={{ height: '280px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
            </div>
            {/* Variant toggle */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {Object.entries(variants).map(([key, vr]) => (
                <button key={key} onClick={() => setActiveVariant(key)}
                  style={{ padding: '10px 20px', borderRadius: '10px', border: `2px solid ${activeVariant === key ? vr.color : 'rgba(255,255,255,0.15)'}`, background: activeVariant === key ? `${vr.color}20` : 'transparent', color: activeVariant === key ? vr.color : 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {key === 'yellow' ? '🟡 Yellow' : '🔵 Blue'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP SECTION ── */}
      <section id="shop" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Choose Your Pack</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: '800', color: '#1a3328', margin: 0 }}>Shop Cooking Pouches</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[...Object.values(variants), bundleProduct].map((product) => (
            <div key={product.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f0ebe3', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: product.bg || '#1a2e1a', padding: '36px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {product.id === 'moimoi_bundle' && (
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#C8973A', color: 'white', fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Save $3</span>
                )}
                <img src={product.image} alt={product.name}
                  style={{ height: '160px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }} />
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                <div>
                  <p style={{ color: '#C8973A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>{product.tagline}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: '700', color: '#1a3328', margin: 0 }}>{product.name}</h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>{product.subtitle}</p>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0, flex: 1 }}>{product.description}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: 0, padding: 0 }}>
                  {product.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#4A7C59', fontWeight: '600', listStyle: 'none' }}>
                      <Check size={13} style={{ color: '#4A7C59', flexShrink: 0 }} /> {h}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0ebe3', paddingTop: '16px', marginTop: '4px' }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: '800', color: '#1a3328', margin: 0 }}>${product.price.toFixed(2)}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>
                      {product.id === 'moimoi_bundle' ? 'Free shipping' : product.price >= 30 ? 'Free shipping' : '+ $5.99 shipping'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{ background: '#1a3328', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#4A7C59'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1a3328'}
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {addedMsg && (
          <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1a3328', color: 'white', padding: '14px 20px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', zIndex: 100, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✅ Added to cart!
          </div>
        )}
      </section>

      {/* ── VIDEO DEMO ── */}
      <section id="demo" style={{ background: '#1a3328', padding: '80px 24px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>See It In Action</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>
              How to Use the Cooking Pouch
            </h2>
          </div>
          <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <video
              controls
              style={{ width: '100%', display: 'block', maxHeight: '500px', objectFit: 'contain', background: '#000' }}
              poster="/images/moimoi_yellow_pouch.jpg"
            >
              <source src="/videos/moimoi_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%' }}>
            {[
              { step: '1', text: 'Prepare your Moi-Moi batter as usual' },
              { step: '2', text: 'Pour batter into the pouch — fill 2/3 only' },
              { step: '3', text: 'Seal the zip-lock and place in boiling water' },
              { step: '4', text: 'Cook 30–45 min. Open and enjoy!' },
            ].map(({ step, text }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#C8973A', color: 'white', fontWeight: '800', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>{step}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#C8973A', fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Got Questions?</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: '800', color: '#1a3328', margin: 0 }}>Frequently Asked</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0ebe3', overflow: 'hidden' }}>
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1a3328' }}>{faq.q}</span>
                {faqOpen === i ? <ChevronUp size={18} style={{ color: '#4A7C59', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />}
              </button>
              {faqOpen === i && (
                <div style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f15, #1a3328)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '48px' }}>🫕</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>Ready to Cook?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', margin: 0, lineHeight: '1.7' }}>
            100 pouches for $20 — only $0.20 per serving. Free shipping on the bundle.
          </p>
          <button
            onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
            style={{ background: '#C8973A', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(200,151,58,0.3)' }}
          >
            Shop Moi-Moi Pouches →
          </button>
        </div>
      </section>

    </div>
  );
};

export default MoiMoiPage;
