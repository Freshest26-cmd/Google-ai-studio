/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, Component, ErrorInfo, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PromotionVideoButton from "./components/PromotionVideoButton";
import PriceTag from "./components/PriceTag";
import GetStartedButton from "./components/GetStartedButton";
import CarouselArrows from "./components/CarouselArrows";
import GravitySection from "./components/GravitySection";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductExperience from "./components/ProductExperience";
import ProductList from "./components/ProductList";
import TrendingProducts from "./components/TrendingProducts";
import FAQ from "./components/FAQ";
import CustomerReviews from "./components/CustomerReviews";
import CheckoutPage from "./components/CheckoutPage";
import ProductModal from "./components/ProductModal";
import AuthForm from "./components/AuthForm";
import Features from "./components/Features";
import { Product } from "./data/products";
import Testimonials from "./components/Testimonials";
import NewsletterCTA from "./components/NewsletterCTA";
import Footer from "./components/Footer";
import HomePage from "./components/home/HomePage";
import SuccessPage from "./components/SuccessPage";

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-black flex items-center justify-center p-12 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Something went wrong</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [view, setView] = useState<"home" | "checkout" | "success">(() => {
    if (window.location.pathname === "/success") return "success";
    return "home";
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user, isLoading } = useAuth();

  const handleContinueShopping = () => {
    window.history.replaceState({}, "", "/");
    setView("home");
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  // If no user, show Auth page
  if (!user) {
    return (
      <ErrorBoundary>
        <AuthForm 
          onSuccess={() => setView("home")} 
          onBack={() => {}} 
        />
      </ErrorBoundary>
    );
  }

  // If user exists, show HomePage, Checkout or Success
  return (
    <ErrorBoundary>
      <div className="relative w-full min-h-[100dvh] bg-black overflow-x-hidden overflow-y-auto scroll-smooth">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <HomePage 
              key="home"
              onCheckout={() => setView("checkout")} 
              onAuth={() => {}} // Already logged in
              onSelectProduct={setSelectedProduct}
            />
          ) : view === "checkout" ? (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
            >
              <Navbar onCheckout={() => setView("checkout")} onAuth={() => {}} />
              <div className="pt-24">
                <CheckoutPage onBack={() => setView("home")} />
              </div>
            </motion.div>
          ) : (
            <SuccessPage onContinue={handleContinueShopping} />
          )}
        </AnimatePresence>

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </ErrorBoundary>
  );
}
