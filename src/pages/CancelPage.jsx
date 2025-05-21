import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => (
  <div className="max-w-3xl mx-auto p-8 text-center">
    <h1 className="text-4xl font-bold text-red-600 mb-6">Order Cancelled</h1>
    <p className="text-lg mb-4">Your checkout was cancelled or failed.</p>
    <p className="text-gray-600 mb-8">No payment was made. You can return and try again.</p>
    <Link to="/cart" className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800">
      Return to Cart
    </Link>
  </div>
);

export default CancelPage;
