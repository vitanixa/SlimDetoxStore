// Vitanixa SlimDetox Store - React + TailwindCSS
// Ready for Vercel or Netlify deployment

import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf8f3] text-[#2f3d2f] font-sans">
      <section className="w-full px-4 py-16 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Vitanixa SlimDetox Herbal Tea</h1>
        <p className="text-lg md:text-xl mb-6">Detox. Burn Fat. Control Cravings — Naturally.</p>
        <img
          src="/pouch-front.jpg"
          alt="Vitanixa Tea Pouch"
          className="mx-auto w-64 h-auto rounded-lg shadow-md mb-8"
        />
        <p className="mb-4 text-base max-w-xl mx-auto">
          Our premium herbal blend supports gentle detoxification, boosts metabolism, and helps reduce bloating — all without harsh laxatives.
        </p>
        <a
          href="https://buy.stripe.com/test_checkout"
          className="inline-block bg-[#2f3d2f] text-white px-6 py-3 text-lg rounded-md hover:opacity-90"
        >
          Buy Now with Stripe
        </a>
        <br />
        <a
          href="https://www.paypal.com/paypalme/vitanixa"
          className="inline-block mt-3 text-[#2f3d2f] underline text-sm"
        >
          Or pay with PayPal
        </a>
      </section>

      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>🔥 Boosts metabolism with green & oolong tea</li>
              <li>🧘‍♀️ Reduces bloating & supports digestion</li>
              <li>🌿 100% natural, no laxatives or fillers</li>
              <li>🌙 Night Blend launching soon</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <p className="text-sm leading-relaxed">
              Sencha Green Tea (0.8g), Oolong Tea (0.5g), Yerba Mate (0.4g), Dandelion Root (0.3g), Hibiscus Flowers (0.4g), Ginger Root (0.3g), Cinnamon Bark (0.2g), Fennel Seeds (0.1g), Lemongrass (0.1g)
            </p>
            <p className="mt-2 text-xs">Net Wt. 84g | Made in USA</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Watch & Move</h2>
        <p className="mb-4 text-sm">Explore our fitness & detox video content for your daily routine.</p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Vitanixa Fitness"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <footer className="text-center text-sm text-gray-600 py-6">
        <p>© 2024 Vitanixa Wellness | <a href="mailto:support@vitanixa.com" className="underline">support@vitanixa.com</a></p>
        <p className="mt-1">Follow us: @vitanixatea</p>
        <p className="mt-1"><a href="https://www.vitanixa.com" className="underline">www.vitanixa.com</a></p>
      </footer>
    </main>
  );
}
