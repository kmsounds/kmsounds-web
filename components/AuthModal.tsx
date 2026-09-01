"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const origin =
        typeof window !== "undefined" && window.location.hostname === "0.0.0.0"
          ? "http://localhost:3000"
          : window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            prompt: "select_account", // Account direct select කරගැනීමට (Password නැවත නොගසා)
          },
        },
      });

      if (error) {
        console.error("Google Auth Error:", error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-all cursor-pointer animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative cursor-default p-6 sm:p-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Welcome to <span className="text-amber-500">K.M SOUNDS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sign in or create an account to save your cart & track orders.
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-100 font-medium py-3 px-4 rounded-xl border border-slate-700/80 transition-all hover:border-amber-500/50 shadow-lg cursor-pointer group"
          >
            {loading ? (
              <span className="text-sm text-slate-300">Connecting to Google...</span>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span className="text-sm">Continue with Google</span>
              </>
            )}
          </button>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
              <span className="text-amber-500">✓</span> Saved Cart Items
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
              <span className="text-amber-500">✓</span> Order Status
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 text-center mt-6">
          By continuing, you agree to K.M SOUNDS Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}