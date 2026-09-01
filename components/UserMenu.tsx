"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface UserMenuProps {
  onOpenAuth: () => void;
}

export default function UserMenu({ onOpenAuth }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Outer click detector
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    window.location.reload();
  };

  const handleSwitchAccount = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    onOpenAuth();
  };

  if (!user) {
    return (
      <button
        onClick={onOpenAuth}
        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition shadow-lg"
      >
        Sign In
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || "User";

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-amber-500/80 overflow-hidden hover:opacity-90 transition shadow-md bg-slate-800"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-amber-500 font-bold text-sm">
            {fullName.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {/* Simple Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-full border border-amber-500/50 overflow-hidden shrink-0 bg-slate-800 flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-amber-500 font-bold text-sm">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-100 truncate">{fullName}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          <div className="pt-3 space-y-1">
            <button
              onClick={handleSwitchAccount}
              className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition flex items-center gap-2"
            >
              <span>👤</span> Add / Switch Account
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition flex items-center gap-2 font-medium"
            >
              <span>🚪</span> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}