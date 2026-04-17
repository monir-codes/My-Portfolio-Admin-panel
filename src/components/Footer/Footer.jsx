import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 py-6 px-10 rounded-[2rem] 
      bg-white/5 dark:bg-white/[0.01] backdrop-blur-md 
      border border-white/10 dark:border-white/5 
      flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Live</span>
      </div>
      
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
        © 2026 <span className="text-slate-900 dark:text-white">RUMMAN.OS</span> — Crafted for Excellence
      </p>

      <div className="flex gap-4 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
        <span>v4.0.0</span>
        <span>Stable</span>
      </div>
    </footer>
  );
};

export default Footer;