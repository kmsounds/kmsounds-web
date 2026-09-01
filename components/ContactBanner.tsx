"use client";

import Link from "next/link";
import { FaPhoneAlt, FaArrowRight, FaHeadset } from "react-icons/fa";

export default function ContactBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-8">
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-black border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500">
        
        {/* Continuous Moving Shimmer Light Line Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div className="relative z-10 px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Text & Status Dot */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="relative flex shrink-0">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-white font-extrabold text-sm sm:text-lg tracking-wide flex items-center justify-center sm:justify-start gap-2">
                <FaHeadset className="text-emerald-400 text-base" /> Contact Page
              </span>
              <span className="text-gray-400 text-xs sm:text-sm hidden md:inline">
                • Speaker Box Design & Custom Sound Systems
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <Link
            href="/contact"
            className="w-full sm:w-auto shrink-0 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 transition-all duration-300 hover:scale-105 group/btn"
          >
            <FaPhoneAlt className="text-xs" />
            <span>CONTACT US NOW</span>
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

        </div>
      </div>
    </div>
  );
}