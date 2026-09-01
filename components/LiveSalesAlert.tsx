"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";

// Cities 10ක්
const locations = [
  "Kandy", "Kurunegala", "Galle", "Anuradhapura", "Gampaha", 
  "Negombo", "Matara", "Ratnapura", "Nuwara Eliya", "Jaffna"
];

// Products 20ක් (ඔයා වෙනස් කළ Original List එකමයි)
const products = [
  "SRX 725 Double Top Pair",
  "SRX 715 Single Top Box",
  "SRX 718 Sub Baffle",
  "RCF Subwoofer Empty Bins",
  "RCF Top Cabinet Set",
  "Custom Line Array Cabinets",
  "W Bin Box 4qty",
  "Line Array Top Box 12 inch Dual",
  "Double Bin Empty Box 10qty ",
  "Custom Baffle Cut-out Order",
  "SRX 728 Dual Sub Baffle",
  "RCF 18-Inch Horn Loaded Bin",
  "Cerwin Bin Box",
  "Dual 15-Inch Active Top Box",
  "12 inch Monitor",
  "SRX 728 Double Bin ",
  "Amplifier Rack (16U Shockproof)",
  "Custom Subwoofer Baffle Pair",
  "Compact Monitor Wedge Cabinet",
   "18mm Malaysian Plywood Cabinet Set"
];

const timeScales = ["1 min ago", "3 mins ago", "7 mins ago", "12 mins ago", "18 mins ago", "25 mins ago"];

export default function LiveSalesAlert() {
  const [currentAlert, setCurrentAlert] = useState<{ location: string; product: string; time: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // මුලින්ම Alert එක එන්න තත්පර 7ක්
    const initialTimer = setTimeout(() => {
      triggerNewAlert();
    }, 7000);

    // ඊළඟ Alerts එන්න තත්පර 35ක GAP එකක් (35000ms)
    const interval = setInterval(() => {
      triggerNewAlert();
    }, 35000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  const triggerNewAlert = () => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomTime = timeScales[Math.floor(Math.random() * timeScales.length)];

    setCurrentAlert({
      location: randomLocation,
      product: randomProduct,
      time: randomTime
    });

    setIsVisible(true);

    // හරියටම තත්පර 5කින් Hide වෙනවා (5000ms)
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  if (isDismissed || !currentAlert) return null;

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`fixed bottom-5 left-5 max-w-[290px] sm:max-w-xs bg-slate-900/95 text-white p-3 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md transition-all duration-500 transform flex items-center gap-3 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Icon Badge - Emerald Green */}
      <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center flex-shrink-0 text-emerald-400">
        <ShoppingBag className="w-4 h-4 animate-pulse" />
      </div>

      {/* Alert Content */}
      <div className="flex-1 text-xs">
        <p className="font-semibold text-emerald-400 flex items-center gap-1.5 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          Recent Quote Request
        </p>
        <p className="text-slate-200 font-medium mt-0.5 leading-snug">
          Someone from <span className="text-white font-bold">{currentAlert.location}</span> requested a quote for{" "}
          <span className="text-emerald-300 font-bold">{currentAlert.product}</span>
        </p>
        <span className="text-[10px] text-slate-400 mt-1 block">{currentAlert.time}</span>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
        aria-label="Close alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}