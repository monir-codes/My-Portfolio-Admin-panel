"use client";

import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 glass-panel border-b border-x-0 border-t-0 flex items-center justify-between px-6 md:px-8">
      <div className="md:hidden">
        <h2 className="text-xl font-black tracking-tighter">
          ADMIN<span className="text-primary">.</span>
        </h2>
      </div>
      
      <div className="hidden md:block">
        <h3 className="text-white/50 text-sm uppercase tracking-widest font-semibold">
          Overview
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold">{user?.email}</p>
          <p className="text-xs text-primary">Administrator</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/40 to-blue-500/40 border border-white/10 flex items-center justify-center text-lg font-bold shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
