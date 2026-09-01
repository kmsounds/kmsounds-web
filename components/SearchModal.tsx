"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/data/products";

interface Product {
  id: string | number;
  title?: string;
  name?: string;
  price?: number | string;
  image?: string;
  images?: string[];
  category?: string;
}

interface SearchModalProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchModal({
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
}: SearchModalProps) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Supabase Database එකෙන් live search කිරීම
  useEffect(() => {
    const fetchResults = async () => {
      const query = searchQuery.trim();
      if (!query) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchProducts(query);
        setSearchResults(data || []);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300); // Debounce to prevent too many Supabase calls

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchOpen(false);
    const safeQueryStr = String(searchQuery.trim());
    window.location.href = `/category/${encodeURIComponent(
      safeQueryStr.toLowerCase().replace(/\s+/g, "-")
    )}`;
  };

  return (
    <div
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative cursor-default flex flex-col max-h-[80vh]"
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-2 sm:gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/50 shrink-0"
        >
          <input
            type="text"
            placeholder="Type speaker name, amplifier, cables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none font-medium px-1"
            autoFocus
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-md shrink-0 cursor-pointer"
            >
              Clear
            </button>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <svg
              className="w-4 h-4 text-slate-950"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchOpen(false);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all text-xs font-bold shrink-0 cursor-pointer ml-1"
          >
            ✕
          </button>
        </form>

        <div className="p-4 bg-slate-900/80 overflow-y-auto space-y-4 flex-1">
          {searchQuery.trim() !== "" ? (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Matching Products ({searchResults.length})</span>
                {loading && <span className="text-amber-500 font-normal">Searching...</span>}
              </p>

              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.slice(0, 6).map((prod) => {
                    const title = prod.title || prod.name || "Product";
                    const imgSrc =
                      prod.image ||
                      (prod.images && prod.images[0]) ||
                      "/placeholder.jpg";

                    return (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 hover:border-amber-500/50 transition-all group cursor-pointer"
                      >
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                          <Image
                            src={imgSrc}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 truncate">
                            {title}
                          </h4>
                          {prod.category && (
                            <p className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">
                              {prod.category}
                            </p>
                          )}
                        </div>
                        {prod.price && (
                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-black text-amber-500">
                              Rs. {Number(prod.price).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                !loading && (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No products found for &quot;{searchQuery}&quot;
                  </div>
                )
              )}
            </div>
          ) : (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "SRX 715",
                  "PM 2602",
                  "18inch Baffles",
                  "XLR Cables",
                  "Class D Amps",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(tag);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 bg-slate-950/30 shrink-0">
          <span>Press Enter or click Search button</span>
          <span className="text-amber-500/80 font-semibold">
            K.M SOUNDS Catalog
          </span>
        </div>
      </div>
    </div>
  );
}