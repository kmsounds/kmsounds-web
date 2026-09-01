"use client";
import React from "react";
import Link from 'next/link';

interface FooterProps {
  setActiveCategory: (cat: string) => void;
}

export default function Footer({ setActiveCategory }: FooterProps) {
  return (
    <footer className="bg-slate-900/90 border-t border-slate-800 mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-xl font-black text-cyan-400">K.M SOUNDS | Pro Audio Solutios</span>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Feel the Power Hear The Quality
            </p>
          </div>
        <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link
                  href="/category/baffles"
                  className="hover:text-cyan-400 cursor-pointer block transition-colors"
                >
                  Speaker Cabinets
                </Link>
              </li>
              <li>
                <Link
                  href="/category/amplifiers"
                  className="hover:text-cyan-400 cursor-pointer block transition-colors"
                >
                  Power Amplifiers
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cables"
                  className="hover:text-cyan-400 cursor-pointer block transition-colors"
                >
                  Cables
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Hotline: +94 75 151 3131</li>
              <li>WhatsApp Orders Active 24/7</li>
              <li>Islandwide Cash on Delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Direct Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/94751513131"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                💬 WhatsApp Support
              </a>
              <a
                href="tel:+94751513131"
                className="bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                📞 Call Us Directly
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>©️ {new Date().getFullYear()} K.M SOUNDS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Visa / Mastercard</span>
            <span>Bank Transfer</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}