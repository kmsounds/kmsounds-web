"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { getProducts } from "@/data/products";

const categoryTitles: Record<string, string> = {
  baffles: "Speaker Baffles & Cabinets",
  amplifiers: "Power Amplifiers",
  cables: "Pro Cables & Wire",
  accessories: "Amplifire Racks",
  all: "All Audio Products",
};

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await getProducts();
      setProducts(data || []);
      setLoading(false);
    }
    loadProducts();
  }, []);

  // Supabase Database Category Matching Mapping
  const dbCategoryMap: Record<string, string[]> = {
    baffles: ["speakers", "baffles"],
    amplifiers: ["amplifiers", "power amps"],
    cables: ["cables"],
    accessories: ["amp rack", "accessories", "light stands", "lights", "others"]
  };

  const filteredProducts =
    categoryParam === "all"
      ? products
      : products.filter((p) => {
          const matchedCategories = dbCategoryMap[categoryParam.toLowerCase()] || [categoryParam.toLowerCase()];
          return matchedCategories.some((cat) => p.category?.toLowerCase().includes(cat));
        });

  const pageTitle = categoryTitles[categoryParam] || "K.M SOUNDS Products";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 mb-4 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-500 uppercase tracking-wide">
            {pageTitle}
          </h1>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">
            Loading products from database...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">
            No products found.
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all"
              >
                <div>
                  <div className="w-full h-48 bg-slate-950 rounded-xl mb-4 border border-slate-800 flex items-center justify-center overflow-hidden">
                    {p.images && p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-600 font-bold">
                        {p.name} Image
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Specs: {p.material || "N/A"}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-amber-500 font-bold text-sm">
                    {typeof p.price === "number"
                      ? `LKR ${p.price.toLocaleString()}`
                      : p.price}
                  </span>
                  <Link
                    href={`/product/${p.id}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-medium text-xs rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-slate-500">
          Loading Catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}