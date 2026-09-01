"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle, FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Info } from 'lucide-react';  
import UserMenu from "./UserMenu";

interface NavbarProps {
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (subCat: string) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  wishlist: number[];
  cartRef: React.RefObject<HTMLButtonElement | null>;
  setIsCartOpen: (open: boolean) => void;
  cart: any[];
  setIsAuthOpen: (open: boolean) => void;
  categoriesData: { [key: string]: string[] };
  isCategoryDropdownOpen: boolean;
  setIsCategoryDropdownOpen: (open: boolean) => void;
  hoveredCategory: string | null;
  setHoveredCategory: (cat: string | null) => void;
  activeCategory: string;
  activeSubCategory: string;
}

export default function Navbar({
  setActiveCategory,
  setActiveSubCategory,
  setIsSidebarOpen,
  setIsSearchOpen,
  setIsWishlistOpen,
  wishlist,
  cartRef,
  setIsCartOpen,
  cart,
  setIsAuthOpen,
  categoriesData,
  isCategoryDropdownOpen,
  setIsCategoryDropdownOpen,
  hoveredCategory,
  setHoveredCategory,
  activeCategory,
  activeSubCategory,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryMouseEnter = (cat: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(cat);
    }, 200);
  };

  const handleDropdownMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCategoryDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  const categoryKeys = Object.keys(categoriesData);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-40 px-4 py-3.5 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-950/30"
            : "bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-400 active:scale-95 transition-transform"
            >
              ☰
            </button>
            <span
              onClick={() => {
                setActiveCategory("All");
                setActiveSubCategory("All");
              }}
              className="text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 cursor-pointer drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            >
              K.M SOUNDS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/about"
              title="About Us"
              className="hidden sm:flex items-center justify-center p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:text-cyan-400 active:scale-95 transition-transform cursor-pointer"
            >
              <Info className="w-4 h-4 text-cyan-400" />
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 active:scale-95 transition-transform cursor-pointer"
            >
                
              🔍
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 relative active:scale-95 transition-transform cursor-pointer"
            >
              ❤️{" "}
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <motion.button
              ref={cartRef}
              onClick={() => setIsCartOpen(true)}
              whileTap={{ scale: 0.85 }}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 relative cursor-pointer"
            >
              🛒{" "}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.button>

            <div className="hidden md:block">
              <UserMenu onOpenAuth={() => setIsAuthOpen(true)} />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Announcement Bar */}
      <div className="w-full bg-slate-900/60 backdrop-blur-md border-y border-amber-500/20 py-2 overflow-hidden relative z-30">
        <div className="animate-marquee flex whitespace-nowrap items-center text-xs font-semibold text-amber-400/90 tracking-wide">
          <div className="flex items-center gap-6 px-4">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
              🔊 Custom Speaker Box Design Orders Open Now!
            </span>
            <span className="text-slate-600">•</span>
            <span>Visit Workshop for Live Sound Demos</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">
              Feel the Power Hear The Quality
            </span>
            <span className="text-slate-600">•</span>
            <span>🔊 1 Year Replacement Warranty for All Baffle Boxes!</span>
            <span className="text-slate-600">•</span>
            <span>💥 Special Discounts on Bulk Light Stands Orders!</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">
              ⚡ Heavy Duty Power Amplifiers & Cables Now in Stock!
            </span>
            <span className="text-slate-600">•</span>
          </div>

          <div className="flex items-center gap-6 px-4">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
              🔊 Custom Speaker Box Design Orders Open Now!
            </span>
            <span className="text-slate-600">•</span>
            <span>Visit Workshop for Live Sound Demos</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">
              Feel the Power Hear The Quality
            </span>
            <span className="text-slate-600">•</span>
            <span>🔊 1 Year Replacement Warranty for All Baffle Boxes!</span>
            <span className="text-slate-600">•</span>
            <span>💥 Special Discounts on Bulk Light Stands Orders!</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">
              ⚡ Heavy Duty Power Amplifiers & Cables Now in Stock!
            </span>
            <span className="text-slate-600">•</span>
          </div>
        </div>
      </div>

      {/* Desktop Category Dropdown */}
      <div className="hidden md:block bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 text-sm relative z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 py-2">
          <div
            className="relative"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setIsCategoryDropdownOpen(true);
            }}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3.5 flex items-center gap-3 transition-colors shadow-lg shadow-cyan-500/10 cursor-pointer">
              <span>☰</span> BROWSE CATEGORIES <span className="text-xs">▼</span>
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl py-2 z-50">
                {categoryKeys.map((cat) => (
                  <div
                    key={cat}
                    onMouseEnter={() => handleCategoryMouseEnter(cat)}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveSubCategory("All");
                      setIsCategoryDropdownOpen(false);
                      const safeCatStr = Array.isArray(cat) ? cat.join(" ") : String(cat || "");
                      window.location.href = `/category/${encodeURIComponent(
                        safeCatStr.toLowerCase().replace(/\s+/g, "-")
                      )}`;
                    }}
                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer text-xs font-bold transition-all ${
                      hoveredCategory === cat
                        ? "bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-400"
                        : "text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-slate-500">›</span>
                  </div>
                ))}

                {hoveredCategory && categoriesData[hoveredCategory] && (
                  <div
                    className={`absolute left-full w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl py-2 z-50 ${
                      categoryKeys.indexOf(hoveredCategory) > categoryKeys.length / 2
                        ? "bottom-0"
                        : "top-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0 bottom-0 w-2 bg-transparent" />

                    <div className="px-4 py-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest border-b border-slate-800 mb-1">
                      {hoveredCategory} Types
                    </div>
                    {categoriesData[hoveredCategory].map((subCat) => (
                      <div
                        key={subCat}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory(hoveredCategory);
                          setActiveSubCategory(subCat);
                          setIsCategoryDropdownOpen(false);
                          const safeSubStr = Array.isArray(subCat) ? subCat.join(" ") : String(subCat || "");
                          window.location.href = `/category/${encodeURIComponent(
                            safeSubStr.toLowerCase().replace(/\s+/g, "-")
                          )}`;
                        }}
                        className="px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-cyan-400 cursor-pointer font-medium transition-colors"
                      >
                        {subCat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Filter:</span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 text-cyan-400 font-bold">
              {activeCategory}{" "}
              {activeSubCategory !== "All"
                ? `› ${Array.isArray(activeSubCategory) ? (activeSubCategory as string[]).join(" / ") : activeSubCategory}`
                : ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}