import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Bell, Search, LogOut, Settings, 
  ShieldCheck, Mail, Cpu, Globe, Zap
} from 'lucide-react';

const Navbar = ({ onMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sysTime, setSysTime] = useState(new Date().toLocaleTimeString());

  // Real-time system clock functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const user = {
    name: "MD. Moniruzzaman",
    email: "moniruzzaman.dev@gmail.com",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rumman",
    status: "Online"
  };

  return (
    <nav className="relative z-[150] flex items-center justify-between px-6 py-4 bg-[#0a0f1e]/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
      
      {/* LEFT: SYSTEM TELEMETRY & SEARCH */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuOpen}
          className="lg:hidden p-3.5 bg-emerald-500 text-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Menu size={20} />
        </button>
        
        {/* System Time & Node Status (New Functionality) */}
        <div className="hidden xl:flex items-center gap-6 border-r border-white/10 pr-6">
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">System_Clock</p>
            <p className="text-xs font-mono font-black text-emerald-500 tracking-widest">{sysTime}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Server_Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <p className="text-[10px] font-black text-white uppercase italic">Active_Stable</p>
            </div>
          </div>
        </div>

        {/* Dynamic Search */}
        <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-white/[0.03] rounded-2xl border border-white/5 group focus-within:border-emerald-500/40 transition-all w-64 lg:w-80">
          <Search size={16} className="text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence..." 
            className="bg-transparent outline-none text-[10px] font-black uppercase tracking-widest text-slate-200 placeholder:text-slate-600 w-full"
          />
          <kbd className="hidden lg:block px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-slate-500">⌘K</kbd>
        </div>
      </div>

      {/* RIGHT: SYSTEM ACTIONS & PROFILE */}
      <div className="flex items-center gap-4">
        
        {/* Quick Action Icons */}
        <div className="hidden sm:flex items-center gap-2">
          <button title="Global View" className="p-3 text-slate-500 hover:text-emerald-500 hover:bg-white/5 rounded-xl transition-all">
            <Globe size={18} />
          </button>
          <button title="System Load" className="p-3 text-slate-500 hover:text-blue-500 hover:bg-white/5 rounded-xl transition-all">
            <Cpu size={18} />
          </button>
        </div>

        {/* Notification Hub */}
        <button className="relative p-3.5 bg-white/5 rounded-2xl text-slate-400 hover:text-emerald-500 transition-all border border-white/5 group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-[3px] border-[#0a0f1e]" />
        </button>

        {/* User Command Center */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-all relative">
              <img src={user.photo} alt="profile" className="w-full h-full object-cover shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none italic group-hover:text-emerald-400 transition-colors">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Zap size={8} className="text-emerald-500 fill-emerald-500" />
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Master_Admin</p>
              </div>
            </div>
          </button>

          {/* DROPDOWN MENU */}
          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-[120%] right-0 w-80 bg-[#0a0f1e] border border-white/10 rounded-[2.5rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />
                  
                  <div className="relative z-10 space-y-8">
                    {/* Header Info */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-[2rem] border-2 border-emerald-500/30 p-1.5 rotate-3">
                          <img src={user.photo} className="w-full h-full rounded-[1.5rem] object-cover -rotate-3 transition-transform hover:rotate-0 duration-500" alt="User" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 p-1.5 bg-[#0a0f1e] rounded-full border border-white/10">
                          <ShieldCheck size={14} className="text-emerald-500" />
                        </div>
                      </div>
                      <h4 className="text-base font-black text-white uppercase italic tracking-tighter">Root_Access: Rumman</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">moniruzzaman.dev@gmail.com</p>
                    </div>

                    {/* Menu Actions */}
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.08] transition-all group">
                        <div className="flex items-center gap-4">
                          <Settings size={18} className="text-slate-500 group-hover:text-emerald-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">System_Config</span>
                        </div>
                        <Zap size={12} className="text-slate-700 group-hover:text-emerald-500" />
                      </button>

                      <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 transition-all text-red-500 group">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Terminate_Session</span>
                      </button>
                    </div>

                    {/* Quick Stats Overlay (Functional Flair) */}
                    <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-[8px] font-black text-slate-600 uppercase">Uptime</p>
                        <p className="text-[10px] font-black text-emerald-500">14:22:04</p>
                      </div>
                      <div className="text-center border-l border-white/5">
                        <p className="text-[8px] font-black text-slate-600 uppercase">Latency</p>
                        <p className="text-[10px] font-black text-blue-500">24ms</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </nav>
  );
};

export default memo(Navbar);