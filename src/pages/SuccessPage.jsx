import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => (
  <div className="max-w-3xl mx-auto p-8 text-center">
    <h1 className="text-4xl font-bold text-green-700 mb-6">Thank You!</h1>
    <p className="text-lg mb-4">Your order has been successfully placed.</p>
    <p className="text-gray-600 mb-8">We’ll email you a confirmation and shipping details shortly.</p>
    <Link to="/" className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800">
      Back to Home
    </Link>
  </div>
);

export default SuccessPage;
