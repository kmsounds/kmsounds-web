"use client";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";
import Link from 'next/link';

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

interface HeroAndFilterProps {
  heroBanners: any[];
  categoriesGrid: any[];
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (subCat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  activeCategory: string;
  activeSubCategory: string;
  filteredCount: number;
}

export default function HeroAndFilter({
  heroBanners,
  categoriesGrid,
  setActiveCategory,
  setActiveSubCategory,
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
  activeCategory,
  activeSubCategory,
  filteredCount,
}: HeroAndFilterProps) {
  return (
    <div className="space-y-10">
      {/* 1. 3D Cube Interactive Hero Slider */}
      <section className="w-full max-w-4xl mx-auto">
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={true}
          modules={[EffectCube, Autoplay, Pagination]}
          className="rounded-3xl border border-slate-800 overflow-hidden shadow-2xl h-64 sm:h-80"
        >
         {heroBanners.map((slide) => (
  <SwiperSlide key={slide.id}>
    <div
      className="w-full h-full bg-cover bg-center relative p-6 sm:p-10 flex flex-col justify-center overflow-hidden"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />

      <div className="relative z-10">
        <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-black px-3 py-1 rounded-md w-max mb-3 inline-block">
          {slide.tag}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          {slide.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
          {slide.desc}
        </p>
        
        {/* මෙන්න මෙතන motion.button වෙනුවට Link එකක් දාලා තියෙනවා */}
        <Link href={slide.link || "#"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 bg-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs w-max shadow-lg shadow-cyan-400/20"
          >
            Explore Category →
          </motion.button>
        </Link>

      </div>
    </div>
  </SwiperSlide>
))}
        </Swiper>
      </section>

      {/* 2. Visual Category Cards Section */}
      <section>
        <h3 className="text-lg font-black text-white mb-4 uppercase tracking-wider border-l-4 border-cyan-400 pl-3">
          Featured Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesGrid.map((c, i) => (
            <a
              key={i}
              href={`/shop?category=${c.cat}`}
              className="block cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(34, 211, 238, 0.5)" }}
                className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl transition-all"
              >
                <div className="text-3xl p-3 bg-slate-800/80 rounded-xl group-hover:bg-amber-500 transition-colors inline-block mb-3">
                  {c.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-500">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500">{c.count}</p>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Product Search & Filter Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 my-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            aria-label="search products"
            placeholder="Search products (e.g. SRX 715, RCF, Amp)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <select
        aria-label="Filter by brand"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="All">All Brands</option>
          <option value="SRX">SRX Series</option>
          <option value="RCF">RCF</option>
          <option value="JBL">JBL</option>
          <option value="K.M SOUNDS">K.M SOUNDS Custom Made</option>
        </select>

        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400">
            Max Price: LKR {maxPrice.toLocaleString()}
          </span>
          <input
            type="range"
            aria-label="Filter by maximum price"
            min="5000"
            max="500000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Category Heading Header */}
      <div className="mb-6 border-l-4 border-cyan-400 pl-3 sm:pl-4">
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
          {activeCategory}{" "}
          {activeSubCategory !== "All" && (
            <span className="text-cyan-400">- {activeSubCategory}</span>
          )}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Showing {filteredCount} items
        </p>
      </div>
    </div>
  );
}