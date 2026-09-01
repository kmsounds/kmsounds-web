"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function SocialFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hydration Issue එක සම්පූර්ණයෙන්ම වළක්වයි

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "bg-emerald-600 hover:bg-emerald-500",
      href: "https://wa.me/94751513131?text=Hello%20K.M%20SOUNDS%2C%20I%20would%20like%20to%20get%20more%20information.",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-5 h-5" />,
      color: "bg-blue-600 hover:bg-blue-500",
      href: "https://www.facebook.com/share/195bkUQB8X/?mibextid=wwXIfr",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="w-5 h-5" />,
      color: "bg-neutral-800 hover:bg-neutral-700 border border-neutral-700",
      href: "https://www.tiktok.com/@k.m.sound",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="w-5 h-5" />,
      color: "bg-red-600 hover:bg-red-500",
      href: "https://youtube.com/@k.msounds?si=mPS3GYOnklaatL0R",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-3 items-center"
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95 ${item.color}`}
                title={item.name}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full shadow-2xl border-2 border-amber-300 backdrop-blur-md transition-colors"
        aria-label="Toggle Social Links"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}