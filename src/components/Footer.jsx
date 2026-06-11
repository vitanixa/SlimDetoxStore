import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#0d1f15', color: 'white', fontFamily: "'Inter', sans-serif" }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#C8973A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🍃</div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700', fontSize: '18px', margin: 0 }}>Vitanixa</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Herbal Wellness</p>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: '1.7', maxWidth: '240px', margin: 0 }}>
          Premium herbal tea blends crafted to detox, slim, and restore your body — naturally.
        </p>
        <a href="mailto:support@vitanixa.com" style={{ color: '#C8973A', fontSize: '13px', textDecoration: 'none' }}>support@vitanixa.com</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ color: '#C8973A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>Shop</p>
        {[['/', 'All Products'], ['/product/slim', 'SlimDetox Tea'], ['/product/night', 'Night Blend'], ['/product/bundle', '2-Pack Bundle'], ['/cart', 'Your Cart']].map(([to, label]) => (
          <Link key={to} to={to} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = 'white'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{label}</Link>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ color: '#C8973A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>The Brand</p>
        {[['🌿', '100% Natural Ingredients'], ['🧪', 'Lab Tested & Verified'], ['🇺🇸', 'Made in the USA'], ['🚚', 'Free US Shipping $30+'], ['💚', '30-Day Guarantee']].map(([icon, text]) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{text}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
        © {new Date().getFullYear()} Vitanixa LLC. All rights reserved. &nbsp;·&nbsp; These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </div>
  </footer>
);

export default Footer;
