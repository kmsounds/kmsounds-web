"use client";

import React, { useState, useRef } from "react";

interface ThreeSixtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  images: string[];
}

export default function ThreeSixtyModal({
  isOpen,
  onClose,
  productName,
  images,
}: ThreeSixtyModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 8) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      startX.current = currentX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl overflow-hidden flex flex-col items-center">
        
        {/* Header & Close Cross Icon (උඩ කතිරේ) */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div>
            <span className="text-[10px] font-black text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
              360° Inspection Mode
            </span>
            <h3 className="text-lg font-black text-white mt-1">{productName}</h3>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-500/20 border border-slate-700/60 flex items-center justify-center text-lg font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* 360 Drag Viewport */}
        <div
          className="w-full h-80 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative overflow-hidden group my-2"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <img
            src={images[currentIndex]}
            alt="360 Angle View"
            className="max-h-72 object-contain pointer-events-none drop-shadow-2xl"
          />

          {/* Interactive Hint */}
          <div className="absolute bottom-4 bg-slate-900/90 border border-slate-700/60 text-slate-300 text-xs px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg">
            <span>👈 Drag Left / Right 👉</span>
          </div>

          <div className="absolute top-4 right-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
            Angle: {currentIndex + 1} / {images.length}
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-2 text-center">
          Rotate to inspect 18mm Malaysian Plywood joints, grille fittings, and handle cutouts.
        </p>

      </div>
    </div>
  );
}