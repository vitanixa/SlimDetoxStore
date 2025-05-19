
import React from 'react';

const App = () => {
  return (
    <div className="bg-beige text-green-900 font-sans min-h-screen">
      <header className="bg-green-700 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">Vitanixa Herbal Teas</h1>
      </header>
      <main className="p-8 max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Naturally Cleanse. Deeply Nourish.</h2>
          <p className="text-lg mb-6">
            Discover the power of herbal wellness with Vitanixa's signature blends—formulated to detox, calm, and rejuvenate your body from within.
          </p>
          <a href="#shop" className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-800">
            Shop Now
          </a>
        </section>
        <section id="shop" className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2">SlimDetox Tea</h3>
            <p className="mb-2">Flush toxins naturally with our herbal detox blend.</p>
            <p className="font-bold">$24.99</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2">Night Blend</h3>
            <p className="mb-2">Wind down and sleep deeply with calming botanicals.</p>
            <p className="font-bold">$26.99</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow md:col-span-2">
            <h3 className="text-2xl font-semibold mb-2">3-Pack Bundle</h3>
            <p className="mb-2">Best value! Get both blends and more for your wellness journey.</p>
            <p className="font-bold">$69.99</p>
          </div>
        </section>
      </main>
      <footer className="text-center text-sm text-green-900 mt-12 p-4">
        &copy; 2025 Vitanixa. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
