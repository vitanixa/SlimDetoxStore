import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#2f3d2f] text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Vitanixa</Link>
      <nav>
        <Link to="/cart" className="px-4 hover:underline">Cart</Link>
      </nav>
    </header>
  );
}