import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Leaf } from 'lucide-react';

const SuccessPage = ({ setCart }) => {
  useEffect(() => {
    localStorage.removeItem('vitanixa-cart');
    if (setCart) setCart({});
  }, [setCart]);

  return (
    <div className="min-h-[80vh] bg-[#FAF7F2] flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#E8F0EB] flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-[#4A7C59]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#2E5240]">Order Confirmed!</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Thank you for your order. A confirmation has been sent to your email. Your Vitanixa blends will be on their way soon!
          </p>
        </div>
        <div className="bg-[#E8F0EB] rounded-2xl p-4 flex items-center gap-3 text-left">
          <Leaf className="w-5 h-5 text-[#4A7C59] shrink-0" />
          <p className="text-xs text-[#2E5240] font-semibold">Steep, sip, and start your wellness journey. Feel the difference in 7 days.</p>
        </div>
        <Link to="/" className="inline-block bg-[#4A7C59] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#2E5240] transition-all text-sm">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
