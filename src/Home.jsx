import React from "react";
import { useCart } from "./CartContext";

const products = [
  {
    id: "vitanixa-tea",
    name: "SlimDetox Herbal Tea",
    price: 19.99,
    image: "/pouch-front.jpg",
    description: "Supports detox, burns fat, controls cravings."
  },
  {
    id: "bundle-pack",
    name: "3-Pack Bundle",
    price: 49.99,
    image: "/bundle.jpg",
    description: "Save more with a 3-pack SlimDetox bundle!"
  }
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">Vitanixa SlimDetox</h1>
        <p className="text-lg mb-4">Natural herbal tea for detox, fat burn, and appetite control.</p>
        <img src="/pouch-front.jpg" alt="SlimDetox Tea" className="mx-auto w-64 mb-6 rounded shadow" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow text-center bg-white dark:bg-gray-800">
            <img src={product.image} alt={product.name} className="w-40 h-auto mx-auto mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm mb-2">{product.description}</p>
            <p className="font-bold text-lg mb-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}