import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const CancelPage = () => (
  <div className="min-h-[80vh] bg-[#FAF7F2] flex items-center justify-center px-6">
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 max-w-md w-full text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto">
        <XCircle className="w-10 h-10 text-red-400" />
      </div>
      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#2E5240]">Payment Cancelled</h1>
        <p className="text-slate-500 text-sm">Your order was not completed. Your cart is still saved — head back whenever you're ready.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link to="/cart" className="bg-[#4A7C59] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#2E5240] transition-all text-sm">
          Back to Cart
        </Link>
        <Link to="/" className="border border-slate-200 text-slate-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-50 transition-all text-sm">
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
);

export default CancelPage;
