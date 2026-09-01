"use client";
import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import UserMenu from "./UserMenu";

interface MobileDrawerProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  categoriesData: { [key: string]: string[] };
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (subCat: string) => void;
  expandedMobileCategory: string | null;
  setExpandedMobileCategory: (cat: string | null) => void;
  setIsAuthOpen: (open: boolean) => void;
}

export default function MobileDrawer({
  isSidebarOpen,
  setIsSidebarOpen,
  categoriesData,
  setActiveCategory,
  setActiveSubCategory,
  expandedMobileCategory,
  setExpandedMobileCategory,
  setIsAuthOpen,
}: MobileDrawerProps) {
  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex md:hidden">
      <div className="w-80 bg-slate-900/90 border-r border-slate-800/80 h-full p-5 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <span className="font-black text-cyan-400 tracking-wider text-base">
              CATEGORIES
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 font-bold p-2 text-lg"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveSubCategory("All");
                setIsSidebarOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs font-bold text-cyan-400 mb-3"
            >
              🌐 View All Products
            </button>

            {Object.keys(categoriesData).map((cat) => (
              <div key={cat} className="border-b border-slate-800/40">
                <div
                  onClick={() =>
                    setExpandedMobileCategory(
                      expandedMobileCategory === cat ? null : cat
                    )
                  }
                  className="flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-200 hover:text-cyan-400 cursor-pointer"
                >
                  <span>{cat}</span>
                  <span className="text-slate-500">
                    {expandedMobileCategory === cat ? "▲" : "▼"}
                  </span>
                </div>

                {expandedMobileCategory === cat && (
                  <div className="pl-4 py-1 space-y-1 bg-slate-950/50 rounded-xl my-1 border-l-2 border-cyan-400">
                    {categoriesData[cat].map((subCat) => (
                      <button
                        key={Array.isArray(subCat) ? subCat.join("-") : subCat}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory(cat);
                          setActiveSubCategory(subCat);
                          setIsSidebarOpen(false);
                          const safeSubStr = Array.isArray(subCat)
                            ? subCat.join(" ")
                            : String(subCat || "");
                          window.location.href = `/category/${encodeURIComponent(
                            safeSubStr.toLowerCase().replace(/\s+/g, "-")
                          )}`;
                        }}
                        className="block w-full text-left text-[11px] text-slate-400 hover:text-cyan-400 py-1.5 px-2"
                      >
                        • {Array.isArray(subCat) ? subCat.join(" / ") : subCat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 px-2">
            <UserMenu
              onOpenAuth={() => {
                setIsSidebarOpen(false);
                setIsAuthOpen(true);
              }}
            />

            <Link
              href="/about"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-500/30 transition-all duration-300 group mt-2"
            >
              <Info className="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              <span className="font-medium text-sm">About Us</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
    </div>
  );
}