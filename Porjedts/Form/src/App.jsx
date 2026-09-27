import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsPage from "./components/ProductsPage";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar cartCount={cartCount} />
      <Hero />
      <ProductsPage onAddToCart={addToCart} />
      <footer className="border-t border-slate-100 mt-20 py-8 text-center text-xs text-slate-400">
        © 2026 LUMA. All rights reserved.
      </footer>
    </div>
  );
}