// ProductCard.jsx
import React from 'react';

const ProductCard = () => {
  return (
    <div className="p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold">SlimDetox Tea</h2>
      <p className="text-sm">$24.99</p>
      <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded">Add to Cart</button>
    </div>
  );
};

export default ProductCard;