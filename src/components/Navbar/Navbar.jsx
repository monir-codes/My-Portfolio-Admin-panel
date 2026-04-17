import React from 'react';
import { Menu, Search, Bell, User, Zap } from 'lucide-react';

const Navbar = ({ onMenuOpen }) => {
  return (
    <header className="h-20 md:h-24 px-8 rounded-[2rem] bg-white/20 dark:bg-white/[0.03] backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-between">
      <button onClick={onMenuOpen} className="lg:hidden p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-white/20">
        <Menu size={22} />
      </button>

      <div className="hidden md:flex items-center gap-4 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <Zap size={14} className="text-emerald-500 fill-current" />
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">API_CORE: PRODUCTION_READY</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Admin Node</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">MD. Monir</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-blue-500 p-[2px] shadow-lg shadow-emerald-500/20">
          <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#020617] flex items-center justify-center font-black italic">R</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;