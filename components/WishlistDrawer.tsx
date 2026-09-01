"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: number[];
  filteredProducts: any[];
  products: any[];
  toggleWishlist: (id: number) => void;
  wishlistQuantities: { [key: string]: number };
  setWishlistQuantities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  setIsCartOpen: (open: boolean) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  filteredProducts,
  products,
  toggleWishlist,
  wishlistQuantities,
  setWishlistQuantities,
  setCart,
  setIsCartOpen,
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <span className="text-xl">❤️</span>
                <h2 className="text-lg font-bold text-slate-100">Saved Wishlist</h2>
                <span className="bg-rose-500/10 text-rose-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-rose-500/20">
                  {wishlist.length} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="text-5xl block mb-3 opacity-30">🤍</span>
                  <p className="text-slate-400 text-sm font-medium">
                    Your wishlist is empty!
                  </p>
                </div>
              ) : (
                wishlist.map((id: any, index: number) => {
                  const allItems: any =
                    typeof filteredProducts !== "undefined" && filteredProducts.length > 0
                      ? filteredProducts
                      : products;
                  const item: any = allItems.find((p: any) => p.id === id) || {
                    id,
                    name: `Equipment #${id}`,
                    price: "LKR --",
                    image: "/placeholder.jpg",
                    category: "K.M SOUNDS",
                  };

                  const itemName = item?.name || item?.title || "Sound Equipment";
                  const itemPrice =
                    item?.price ||
                    (item?.priceNum
                      ? `LKR ${item.priceNum.toLocaleString()}`
                      : "LKR --");
                  const itemCategory =
                    item?.category || item?.subCategory || "K.M SOUNDS";

                  const currentQty = wishlistQuantities[id] || 1;

                  return (
                    <div
                      key={`wish-${id}-${index}`}
                      className="flex flex-col gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-all"
                    >
                      <div className="flex gap-3 items-center justify-between">
                        {item?.image && (
                          <img
                            src={item.image}
                            alt={itemName}
                            className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800"
                          />
                        )}

                        <div className="flex-1 min-w-0 px-1">
                          <span className="text-[10px] font-bold text-rose-400 tracking-wider uppercase block truncate">
                            {itemCategory}
                          </span>
                          <h4 className="text-xs font-bold text-slate-100 truncate mt-0.5">
                            {itemName}
                          </h4>
                          <p className="text-amber-400 font-extrabold text-xs mt-1">
                            {itemPrice}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleWishlist(id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all text-xs cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Quantity & Add to Cart Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => {
                              setWishlistQuantities((prev) => ({
                                ...prev,
                                [id]: Math.max(1, (prev[id] || 1) - 1),
                              }));
                            }}
                            className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs cursor-pointer active:scale-95 transition-all"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-200 px-2 min-w-[20px] text-center">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => {
                              setWishlistQuantities((prev) => ({
                                ...prev,
                                [id]: (prev[id] || 1) + 1,
                              }));
                            }}
                            className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs cursor-pointer active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setCart((prev: any[]) => {
                              const exists = prev.find((c: any) => c.id === item.id);
                              if (exists) {
                                return prev.map((c: any) =>
                                  c.id === item.id
                                    ? { ...c, quantity: (c.quantity || 1) + currentQty }
                                    : c
                                );
                              } else {
                                return [...prev, { ...item, quantity: currentQty }];
                              }
                            });

                            onClose();
                            setIsCartOpen(true);
                          }}
                          className="flex-1 ml-3 py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 transition-all text-xs font-bold text-center cursor-pointer active:scale-95"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}