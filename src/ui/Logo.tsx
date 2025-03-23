import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
        <motion.div 
          className="absolute inset-0 rounded-full bg-pink-300/30"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
      <span className="font-display text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        CoupleBoard
      </span>
    </motion.div>
  );
};
