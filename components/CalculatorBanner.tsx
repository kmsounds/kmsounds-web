"use client";

import Link from "next/link";
import { Sliders, ArrowRight } from "lucide-react";

export default function CalculatorBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-8">
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950/80 via-slate-900 to-black border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500">
        
        {/* Continuous Moving Shimmer Light Line Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div className="relative z-10 px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Text & Status Dot */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="relative flex shrink-0">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-white font-extrabold text-sm sm:text-lg tracking-wide flex items-center justify-center sm:justify-start gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" /> Setup Calculator
              </span>
              <span className="text-gray-400 text-xs sm:text-sm hidden md:inline">
                • Calculate Required Watts, Subwoofers & Rig Specs
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <Link
            href="/calculator"
            className="w-full sm:w-auto shrink-0 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-400 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/80 transition-all duration-300 hover:scale-105 group/btn"
          >
            <span>CALCULATE NOW</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

        </div>
      </div>
    </div>
  );
}