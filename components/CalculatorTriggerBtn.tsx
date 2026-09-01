"use client";

import React from 'react';
import { Calculator } from 'lucide-react';

export default function CalculatorTriggerBtn() {
  const scrollToCalculator = () => {
    const calcElement = document.getElementById("baffle-calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToCalculator}
      style={{ zIndex: 99999 }}
      className="fixed bottom-34 left-5 sm:bottom-38 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.8)] flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 animate-bounce cursor-pointer group border-2 border-cyan-300"
      aria-label="Scroll to Baffle Calculator"
    >
      <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />

      {/* Responsive Hover Tooltip */}
      <span className="absolute right-16 bg-black/90 text-cyan-400 text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-cyan-500/40 shadow-xl">
        Baffle Calculator
      </span>
    </button>
  );
}