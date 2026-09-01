"use client";

import React, { useState } from "react";
import { Sliders, X, ArrowLeft } from "lucide-react";
import VenueCalculator from "@/components/VenueCalculator";

export default function ProductCalculatorButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Product Page එකේ පෙනෙන Main Button එක */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3.5 px-4 mb-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300 backdrop-blur-md text-sm cursor-pointer"
      >
        <Sliders className="w-4 h-4 text-cyan-400" />
        <span>Calculate Setup Power for Venue</span>
      </button>

      {/* Pop-up Card / Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-955/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] my-auto overflow-hidden">
            
            {/* Modal Navigation Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-slate-950/60">
              {/* Back to Product Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/60 text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Product</span>
              </button>

              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest hidden sm:block">
                K.M SOUNDS System Estimator
              </span>

              {/* Top Right Close (X) Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calculator Component Container */}
            <div className="p-2 sm:p-4 max-h-[80vh] overflow-y-auto">
              <VenueCalculator />
            </div>

          </div>
        </div>
      )}
    </>
  );
}