"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProductGridProps {
  filteredProducts: any[];
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  handleAddToCart: (e: React.MouseEvent, product: any) => void;
  handleWhatsAppOrder: (product: any) => void;
  addedItemAnim: number | null;
}

export default function ProductGrid({
  filteredProducts,
  wishlist,
  toggleWishlist,
  handleAddToCart,
  handleWhatsAppOrder,
  addedItemAnim,
}: ProductGridProps) {
  // මුලින් පෙන්නන Products ගණන 4යි
  const [visibleCount, setVisibleCount] = useState(4);

  // See More Click කළාම තව 4ක් එකතු වෙනවා
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // ඊළඟට Display වෙන Products ටික Slice කරගැනීම (Database Empty වුණත් Safe වෙන විදිහට)
  const visibleProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(0, visibleCount)
    : [];

  // Image Safe Fetch Function
  const getProductImage = (p: any) => {
    if (Array.isArray(p.images) && p.images.length > 0) {
      return p.images[0];
    }
    if (typeof p.images === "string" && p.images.trim() !== "") {
      return p.images;
    }
    if (p.image_url && p.image_url.trim() !== "") {
      return p.image_url;
    }
    return "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80";
  };

  return (
    <section className="py-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((p) => {
          const imgUrl = getProductImage(p);

          // SubCategory Array or String Safe Resolution
          const rawSub = p.subCategory || p.sub_category;
          const subCategoryName = Array.isArray(rawSub)
            ? rawSub.join(" / ")
            : rawSub || "General";

          return (
            <motion.div
              onClick={() =>
                (window.location.href = `/product/${encodeURIComponent(
                  p.id || p.name
                )}`)
              }
              key={p.id}
              whileHover={{ y: -5 }}
              className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-xl group cursor-pointer"
            >
              <div>
                {/* Image Container: Photo එක කැපෙන්නේ නැතිව 100% Fit වෙන පරිදි සකස් කර ඇත */}
                <div className="w-full h-40 sm:h-52 bg-slate-950/90 rounded-lg sm:rounded-xl border border-slate-800/80 flex items-center justify-center relative mb-2.5 sm:mb-4 overflow-hidden p-2">
                  {p.isVideo ? (
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                      ▶️ Video Preview
                    </span>
                  ) : imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                    />
                  ) : (
                    <span className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-widest text-center px-1">
                      {p.name}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs hover:scale-110 transition-transform border border-slate-700/50"
                  >
                    {wishlist.includes(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>

              <div className="text-[9px] sm:text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-1.5 sm:px-2 py-0.5 rounded max-w-full truncate mb-1.5 sm:mb-2 inline-block">
  {(() => {
    const fullString = `${p.category || ''} | ${subCategoryName || ''}`;
    const parts = fullString.split(/[/|]/).map((item) => item.trim()).filter(Boolean);
    
    if (parts.length > 2) {
      return `${parts[0]} | ${parts[1]} ...`;
    }
    return fullString;
  })()}
</div>
                <h3 className="font-bold text-white text-xs sm:text-base group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {p.name}
                </h3>

                {/* නමට යටින් තිබූ Description / Specs (15) කොටස සම්පූර්ණයෙන්ම ඉවත් කරන ලදී */}

                <div className="text-cyan-400 font-black text-xs sm:text-lg mt-2 sm:mt-3">
                  LKR {Number(p.price || 0).toLocaleString()}
                </div>
              </div>

              <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, p);
                  }}
                  className={`w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                    addedItemAnim === p.id
                      ? "bg-green-500 text-black font-black"
                      : "bg-slate-800/90 hover:bg-slate-700 text-white"
                  }`}
                >
                  {addedItemAnim === p.id ? "✓ Added!" : "Add to Cart"}
                </motion.button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppOrder(p);
                  }}
                  className="w-full py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black active:scale-95 transition-transform shadow-lg shadow-cyan-500/10"
                >
                  WhatsApp Order
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* තව Products තියෙනවා නම් විතරක් See More Button එක පෙන්වයි */}
      {Array.isArray(filteredProducts) && visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowMore}
            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-400/30 transition-all flex items-center gap-2"
          >
            See More Products
            <span className="bg-slate-950/30 px-2 py-0.5 rounded-full text-[10px] sm:text-xs text-white">
              +{filteredProducts.length - visibleCount}
            </span>
          </motion.button>
        </div>
      )}
    </section>
  );
}