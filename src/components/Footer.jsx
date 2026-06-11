import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#2E5240] text-white">
    <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C8973A] flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-lg font-bold">Vitanixa</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed max-w-xs">
          Premium herbal wellness teas crafted with care. Naturally detox, slim, and restore your body from within.
        </p>
        <div className="flex items-center gap-3">
          <a href="mailto:support@vitanixa.com" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Mail className="w-4 h-4" />
          </a>
          <a href="https://instagram.com/vitanixa" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-[#C8973A]">Shop</h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li><Link to="/product/slim" className="hover:text-white transition-colors">SlimDetox Tea</Link></li>
          <li><Link to="/product/night" className="hover:text-white transition-colors">Night Blend</Link></li>
          <li><Link to="/product/bundle" className="hover:text-white transition-colors">2-Pack Bundle</Link></li>
          <li><Link to="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-[#C8973A]">Support</h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li><a href="mailto:support@vitanixa.com" className="hover:text-white transition-colors">support@vitanixa.com</a></li>
          <li><a href="https://www.vitanixa.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.vitanixa.com</a></li>
        </ul>
        <div className="pt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Leaf className="w-3 h-3 text-[#C8973A]" /> 100% Natural Ingredients
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Leaf className="w-3 h-3 text-[#C8973A]" /> Free US Shipping over $30
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} Vitanixa LLC. All rights reserved. These statements have not been evaluated by the FDA.
    </div>
  </footer>
);

export default Footer;
