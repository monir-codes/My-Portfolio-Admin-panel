import React, { useState, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {  Cpu, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Logic to get dynamic year and random build hash for that "Industrial" feel
  const currentYear = new Date().getFullYear();
  const [buildHash] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  return (
    <footer className="relative mt-auto overflow-hidden rounded-[2.5rem] bg-[#0a0f1e]/40 backdrop-blur-3xl border border-white/5 p-8 transition-all duration-500">
      
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* --- SYSTEM TELEMETRY (LEFT) --- */}
        <div className="flex flex-col sm:flex-row items-center gap-6 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
              Runtime_Status: <span className="text-emerald-500">Stable</span>
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
            <Cpu size={12} className="text-blue-500" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Build_ID: <span className="text-slate-300">R-{buildHash}</span>
            </span>
          </div>
        </div>
        
        {/* --- BRANDING & COPYRIGHT (CENTER) --- */}
        <div className="text-center order-1 lg:order-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Designed & Engineered By
          </p>
          <h3 className="text-lg font-black text-white italic tracking-tighter leading-none">
            MD. <span className="text-emerald-500">MONIRUZZAMAN</span>
          </h3>
          <p className="text-[9px] font-medium text-slate-600 uppercase tracking-[0.4em] mt-2">
            © {currentYear} • All Rights Reserved
          </p>
        </div>

        {/* --- CONNECT & VERSION (RIGHT) --- */}
        <div className="flex flex-col sm:flex-row items-center gap-6 order-3">
          <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2 hidden sm:flex">
            <a href="https://github.com" target="_blank" className="text-slate-500 hover:text-white transition-colors">
              <FaGithub size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-slate-500 hover:text-emerald-500 transition-colors">
              <FaLinkedin size={16} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10">
              v4.2.0_LATEST
            </span>
          </div>
        </div>
      </div>

      {/* Background Subtle Label */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-[0.02] text-[80px] font-black pointer-events-none select-none tracking-tighter italic">
        MONIRUZZAMAN
      </div>
    </footer>
  );
};

export default memo(Footer);