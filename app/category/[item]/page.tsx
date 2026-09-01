"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Volume2 } from "lucide-react";
import { getProducts } from "@/data/products";

export default function CategoryPage({ params }: { params: Promise<{ item: string }> }) {
  // Promise unwrap කිරීම
  const resolvedParams = use(params);
  const rawItem = resolvedParams?.item || "";
  
  // URL Slug එක Clean කිරීම
  const cleanItem = decodeURIComponent(rawItem)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase Database එකෙන් Products Load කිරීම
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getProducts();
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Product Filter Logic (Safely handles both Array and String for subCategory)
  const categoryProducts = products.filter((product: any) => {
    const rawSub = product.subCategory || product.sub_category || "";
    const subString = Array.isArray(rawSub) ? rawSub.join(" ") : String(rawSub);

    const pCat = (product.category || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const pSub = subString.toLowerCase().replace(/[^a-z0-9]/g, "");
    const pName = (product.name || product.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    return (
      pCat === cleanItem ||
      pSub === cleanItem ||
      pCat.includes(cleanItem) ||
      pSub.includes(cleanItem) ||
      pName.includes(cleanItem) ||
      (cleanItem !== "" && pSub.includes(cleanItem))
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-cyan-500 selection:text-black">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg mb-6 transition-all hover:border-cyan-500/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
            <Volume2 className="w-3 h-3 text-cyan-400" /> K.M SOUNDS Category
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          {decodeURIComponent(rawItem)}
        </h1>
        
        <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">
          {loading ? "Loading items..." : `Showing ${categoryProducts.length} Professional Audio Equipment Models`}
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80">
            <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Loading Audio Gear...</p>
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80">
            <span className="text-4xl block mb-3">🔊</span>
            <p className="text-slate-300 text-sm font-semibold">
              No products available under "{decodeURIComponent(rawItem)}".
            </p>
            <p className="text-slate-500 text-xs mt-1">Try exploring other categories from home.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((item: any, idx: number) => {
              const displayImg = item.images?.[0] || item.image || "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80";

              {/* Safe SubCategory Badge Text Resolver */}
              const rawSub = item.subCategory || item.sub_category;
              const badgeText = Array.isArray(rawSub) 
                ? rawSub.join(" / ") 
                : rawSub || item.category || "K.M SOUNDS";

              return (
                <Link
                  key={`cat-${item.id}-${idx}`}
                  href={`/product/${item.id}`}
                  className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col justify-between"
                >
                  {/* Category / SubCategory Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                    {badgeText}
                  </div>

                  {/* Product Image Display Box */}
                  <div className="relative w-full h-56 bg-slate-950/70 p-4 flex items-center justify-center border-b border-slate-800/80 overflow-hidden">
                    <img
                      src={displayImg}
                      alt={item.name || "Product"}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Card Info Section */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      {item.material && (
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                          {item.material}
                        </p>
                      )}
                    </div>

                    {/* Price & Action Button */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Price</p>
                        <p className="text-sm md:text-base font-black text-cyan-400">
                          {typeof item.price === "number" ? `LKR ${item.price.toLocaleString()}` : item.price || "Price on Request"}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-slate-300 bg-slate-800/80 group-hover:bg-cyan-500 group-hover:text-black px-3 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1 shrink-0">
                        View <Sparkles className="w-3 h-3 hidden group-hover:inline" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}