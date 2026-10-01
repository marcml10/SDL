import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import CartPage from "./components/CartPage";

export default function App() {
  const [page, setPage] = useState("home");
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
    <div className="min-h-screen bg-[#F3F4F6] text-[#111827]">
      {/* Floating Dock Navbar */}
      <Navbar cartCount={cartCount} onNavigate={setPage} currentPage={page} />

      {page === "home" ? (
        <HomePage onNavigate={setPage} onAddToCart={addToCart} />
      ) : page === "products" ? (
        <ProductsPage onAddToCart={addToCart} />
      ) : page === "cart" ? (
        <CartPage cart={cart} setCart={setCart} onNavigate={setPage} />
      ) : null}
    </div>
  );
}