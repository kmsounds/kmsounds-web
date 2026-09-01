"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  removeFromCart: (id: number) => void;
  handleWhatsAppOrder: (product: any) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  removeFromCart,
  handleWhatsAppOrder,
}: CartDrawerProps) {
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h2 className="text-lg font-bold text-slate-100">Your Cart</h2>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-cyan-500/20">
                  {cart.length} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-5xl block mb-3 opacity-30">🛍️</span>
                  <p className="text-slate-400 text-sm font-medium">
                    Your cart is empty!
                  </p>
                </div>
              ) : (
                cart.map((item: any, index: number) => {
                  const itemName = item.name || item.title || "Sound Equipment";
                  const itemPrice =
                    item.price ||
                    (item.priceNum
                      ? `LKR ${item.priceNum.toLocaleString()}`
                      : "LKR 0");
                  const itemCategory =
                    item.category || item.subCategory || "K.M SOUNDS";

                  return (
                    <div
                      key={`cart-item-${item.id}-${index}`}
                      className="flex gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 items-center justify-between hover:border-slate-600 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={itemName}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800"
                      />

                      <div className="flex-1 min-w-0 px-1">
                        <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase block truncate">
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
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all cursor-pointer text-xs"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer & WhatsApp Checkout Button */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 px-1">
                  <span>Selected Items:</span>
                  <span className="text-cyan-400">{cart.length} Products</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    handleWhatsAppOrder(cart[0]);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-black text-xs tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  Order via WhatsApp ➔
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}