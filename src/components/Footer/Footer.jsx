import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 px-6 sm:px-10 rounded-[2rem] 
      bg-white/5 dark:bg-white/[0.02] backdrop-blur-xl 
      border border-slate-200 dark:border-white/10 
      flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      
      {/* --- STATUS INDICATOR --- */}
      <div className="flex items-center gap-3 order-2 md:order-1">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
          System_Active
        </span>
      </div>
      
      {/* --- COPYRIGHT TEXT --- */}
      <div className="order-1 md:order-2">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight leading-loose">
          © 2026 <span className="text-slate-900 dark:text-white font-black italic tracking-tighter mx-1">MD. MONIRUZZAMAN</span> 
          <span className="hidden sm:inline-block opacity-30 mx-2">|</span> 
          <br className="sm:hidden" />
          <span className="opacity-60">Crafted for Excellence</span>
        </p>
      </div>

      {/* --- VERSION & BUILD --- */}
      <div className="flex items-center gap-4 text-[10px] font-black text-emerald-500 uppercase tracking-widest order-3">
        <span className="px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-sm">
          v4.0.2
        </span>
        <span className="opacity-40 italic hidden xs:block">STABLE_BUILD</span>
      </div>
    </footer>
  );
};

export default Footer;