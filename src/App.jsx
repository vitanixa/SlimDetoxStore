// App.jsx
import React from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

const App = () => {
  return (
    <div className="bg-beige text-green-900 font-sans">
      <Header />
      <main className="p-4">
        <ProductCard />
        <Cart />
      </main>
    </div>
  );
};

export default App;