import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlyingItem {
  id: number;
  x: number;
  y: number;
}

interface FlyingCartAnimationProps {
  flyingItems: FlyingItem[];
  cartPosition: { x: number; y: number };
}

export default function FlyingCartAnimation({
  flyingItems,
  cartPosition,
}: FlyingCartAnimationProps) {
  return (
    <AnimatePresence>
      {flyingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ x: item.x, y: item.y, scale: 1, opacity: 1 }}
          animate={{
            x: cartPosition.x,
            y: cartPosition.y,
            scale: 0.2,
            opacity: 0.8,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-8 h-8 bg-cyan-400 rounded-full z-50 pointer-events-none shadow-lg shadow-cyan-400/50 flex items-center justify-center text-black font-black text-[10px]"
        >
          🔊
        </motion.div>
      ))}
    </AnimatePresence>
  );
}