"use client";

import React from "react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {
  if (!isOpen) return null;

 const handleClose = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("hasSeenWelcome", "true");
      }
    } catch (e) {
      console.error(e);
    }
    onClose();
  };
  
  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl relative cursor-default"
      >
        <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          🎉
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-1">
          Welcome back!
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Hi <span className="text-amber-400 font-semibold">{userName || "Customer"}</span>, you have successfully signed in to K.M SOUNDS.
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg text-sm cursor-pointer"
        >
          OK, Continue
        </button>
      </div>
    </div>
  );
}