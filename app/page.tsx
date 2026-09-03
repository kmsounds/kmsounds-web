"use client";
import { getProducts } from "@/data/products";
import React, { useState, useRef, useEffect } from "react";
import { categoriesData, categoriesGrid, heroBanners } from "@/data/categoriesData";
import WelcomeModal from "@/components/WelcomeModal";
import ContactBanner from "@/components/ContactBanner";
import CalculatorBanner from "@/components/CalculatorBanner";
import CableGuideBanner from "@/components/CableGuideBanner";
// Components Imports

import { supabase } from "@/lib/supabase";
import LiveSalesAlert from "@/components/LiveSalesAlert";
import LocationSection from "@/components/LocationSection";
import AuthModal from "@/components/AuthModal";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import NavbarAndDrawers from "@/components/NavbarAndDrawers";
import HeroAndFilter from "@/components/HeroAndFilter";
import ProductGrid from "@/components/ProductGrid";
import CustomOrderCalculator from "@/components/CustomOrderCalculator";
import CalculatorTriggerBtn from "@/components/CalculatorTriggerBtn";
import AboutBanner from "@/components/AboutBanner";
import Footer from "@/components/Footer";

// Custom Clean Components
import BackgroundOverlay from "@/components/BackgroundOverlay";
import FlyingCartAnimation from "@/components/FlyingCartAnimation";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Safe localStorage & Auth Check (Prevents older Chrome/Huawei Browser crash)
  useEffect(() => {
    const checkWelcome = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        let hasSeen = null;
        if (typeof window !== "undefined" && window.localStorage) {
          hasSeen = localStorage.getItem("hasSeenWelcome");
        }

        if (session?.user && !hasSeen) {
          const name = session.user.user_metadata?.full_name || session.user.email?.split("@")[0];
          setUserName(name || "Customer");
          setIsWelcomeOpen(true);
        }
      } catch (error) {
        console.error("Welcome modal check error:", error);
      }
    };

    checkWelcome();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          let hasSeen = null;
          if (typeof window !== "undefined" && window.localStorage) {
            hasSeen = localStorage.getItem("hasSeenWelcome");
          }

          if (!hasSeen) {
            const name = session.user.user_metadata?.full_name || session.user.email?.split("@")[0];
            setUserName(name || "Customer");
            setIsWelcomeOpen(true);
          }
        } catch (error) {
          console.error("Auth state change error:", error);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      const data = await getProducts();
      if (data && data.length > 0) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchAllProducts();
  }, []);

  const removeFromCart = (id: number) => {
    setCart((prev: any[]) => prev.filter((item: any) => item.id !== id));
  };

  // Search & Navigation States
  const [wishlistQuantities, setWishlistQuantities] = React.useState<{
    [key: string]: number;
  }>({});
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Category Filtering States
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  // Cart & Animation States
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });
  const [flyingItems, setFlyingItems] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [addedItemAnim, setAddedItemAnim] = useState<number | null>(null);
  const cartRef = useRef<HTMLButtonElement>(null);

  // Safe Filter Logic with Normalized Search (Handles spaces, symbols, brand, price & categories)
  const filteredProducts = products.filter((product: any) => {
    const matchesCategory =
      !activeCategory ||
      activeCategory === "All" ||
      product.category === activeCategory;

    // SubCategory Array / String Check
    const rawSub = product.subCategory || product.sub_category;
    const matchesSubCategory =
      !activeSubCategory ||
      activeSubCategory === "All" ||
      (Array.isArray(rawSub)
        ? rawSub.includes(activeSubCategory)
        : rawSub === activeSubCategory);

    // Clean String Function (Spaces, Hyphens, Dashes Ignore කරලා සර්ච් කිරීමට)
    const cleanStr = (str: string) =>
      (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    const searchClean = cleanStr(searchQuery);

    // 1. Enhanced Normalized Search
    const matchesSearch =
      !searchQuery ||
      cleanStr(product.name).includes(searchClean) ||
      cleanStr(product.title).includes(searchClean) ||
      cleanStr(product.description).includes(searchClean) ||
      cleanStr(product.category).includes(searchClean) ||
      cleanStr(product.brand).includes(searchClean);

    // 2. Flexible Brand Matching
    const brandLower = selectedBrand.toLowerCase();
    const productBrandLower = (product.brand || "").toLowerCase();
    const productTitleLower = (product.name || product.title || "").toLowerCase();

    const matchesBrand =
      !selectedBrand ||
      selectedBrand === "All" ||
      productBrandLower === brandLower ||
      productTitleLower.includes(brandLower);

    // 3. Price Filter
    const matchesPrice = !product.price || Number(product.price) <= maxPrice;

    return (
      matchesCategory &&
      matchesSubCategory &&
      matchesSearch &&
      matchesBrand &&
      matchesPrice
    );
  });

  // Direct WhatsApp Order
  const handleWhatsAppOrder = (product: any) => {
    const phone = "94751513131";
    const rawSub = product.subCategory || product.sub_category;
    const subText = Array.isArray(rawSub) ? rawSub.join(", ") : rawSub || "";
    const msg = `*NEW ORDER - K.M SOUNDS*\n--------------------------\nOrder ID: #ORD-${product.id}\nProduct: ${product.name}\nCategory: ${product.category} (${subText})\nPrice: LKR ${product.price}\n--------------------------\nPlease confirm details.`;
    window.open(`https://wa.me/751513131?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Flying Micro-Interaction & Add To Cart
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    if (cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();
      setCartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    const startX = e.clientX;
    const startY = e.clientY;

    const newItem = { id: Date.now(), x: startX, y: startY };
    setFlyingItems((prev) => [...prev, newItem]);
    setAddedItemAnim(product.id);

    setTimeout(() => {
      setCart((prev) => [...prev, product]);
      setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
      setAddedItemAnim(null);
    }, 800);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Background Glassmorphism Overlay */}
      <BackgroundOverlay />

      {/* Header, Announcements, Desktop Dropdown, Search Modal, Mobile Drawers */}
      <NavbarAndDrawers
        setActiveCategory={setActiveCategory}
        setActiveSubCategory={setActiveSubCategory}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSearchOpen={setIsSearchOpen}
        isSearchOpen={isSearchOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        wishlist={wishlist}
        cartRef={cartRef}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        setIsAuthOpen={setIsAuthOpen}
        categoriesData={categoriesData}
        isCategoryDropdownOpen={isCategoryDropdownOpen}
        setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
        hoveredCategory={hoveredCategory}
        setHoveredCategory={setHoveredCategory}
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        expandedMobileCategory={expandedMobileCategory}
        setExpandedMobileCategory={setExpandedMobileCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Flying Particle Animation to Cart */}
      <FlyingCartAnimation
        flyingItems={flyingItems}
        cartPosition={cartPosition}
      />

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        handleWhatsAppOrder={handleWhatsAppOrder}
      />

      {/* Wishlist Side Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        filteredProducts={filteredProducts}
        products={products}
        toggleWishlist={toggleWishlist}
        wishlistQuantities={wishlistQuantities}
        setWishlistQuantities={setWishlistQuantities}
        setCart={setCart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10 space-y-10">

        {/* Hero Slider & Filters */}
        <HeroAndFilter
          heroBanners={heroBanners}
          categoriesGrid={categoriesGrid}
          setActiveCategory={setActiveCategory}
          setActiveSubCategory={setActiveSubCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          filteredCount={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <ProductGrid
          filteredProducts={filteredProducts}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          handleAddToCart={handleAddToCart}
          handleWhatsAppOrder={handleWhatsAppOrder}
          addedItemAnim={addedItemAnim}
        />

        {/* Location / Map Section */}
        <LocationSection />

        {/* Custom Baffle Calculator Section */}
        <section id="baffle-calculator" className="py-10 px-4 max-w-7xl mx-auto">
          <CustomOrderCalculator />
        </section>

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={isWelcomeOpen}
          onClose={() => setIsWelcomeOpen(false)}
          userName={userName}
        />

      </main>

      {/* Footer එකට උඩින් Contact Banner එක */}
      <ContactBanner />

      <CableGuideBanner />

      <CalculatorBanner />

      <AboutBanner />

      {/* Footer */}
      <Footer setActiveCategory={setActiveCategory} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <CalculatorTriggerBtn />

      <LiveSalesAlert />
    </div>
  );
}