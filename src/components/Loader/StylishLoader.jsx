import React from 'react';
import { motion } from 'framer-motion';

const StylishLoader = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="relative w-24 h-24">
        {/* Outer Ring - Pulsing */}
        <motion.div
          className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Middle Spinning Hexagon-like ring */}
        <motion.div
          className="absolute inset-2 border-t-2 border-b-2 border-emerald-400 rounded-full shadow-[0_0_15px_#10b981]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Counter-spinning Ring */}
        <motion.div
          className="absolute inset-6 border-l-2 border-r-2 border-blue-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Core Glowing Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#10b981]"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Scanning Line Effect */}
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent w-full h-1/2"
          animate={{ y: ['0%', '200%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default StylishLoader;