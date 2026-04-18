import React, { memo } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Database, Code2,
  MessageSquare, Settings, X,
  ChevronRight, LogOut, Terminal,
} from "lucide-react";

// Performance Tip: Component-er baire define korle protita render-e memory allocate hoy na
const MENU_ITEMS = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { label: "Project Vault", path: "/my-projects", icon: <Database size={18} /> },
  { label: "Skill Matrix", path: "/skills", icon: <Code2 size={18} /> },
  { label: "Inquiries", path: "/messages", icon: <MessageSquare size={18} /> },
  { label: "Configuration", path: "/settings", icon: <Settings size={18} /> },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  
  // Animation Variants for smoother performance
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.aside
      initial={false}
      variants={sidebarVariants}
      animate={isOpen ? "open" : (typeof window !== "undefined" && window.innerWidth >= 1024 ? "open" : "closed")}
      className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#020617]/90 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-0 border-r border-white/5 z-[250] flex flex-col"
    >
      {/* LOGO SECTION */}
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_25px_rgba(16,185,129,0.3)] group-hover:rotate-6 transition-transform">
            <Terminal size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white italic tracking-tighter leading-none uppercase">
              RUMMAN<span className="text-emerald-500">.OS</span>
            </h1>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">
              Admin_Console
            </p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-200
              ${isActive
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black italic"
                : "text-slate-400 hover:bg-white/5 hover:text-emerald-500"}
            `}
          >
            <div className="flex items-center gap-4">
              <span className="transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-black">
                {item.label}
              </span>
            </div>
            <ChevronRight
              size={12}
              className={`opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1`}
            />
          </NavLink>
        ))}
      </nav>

      {/* FOOTER SECTION */}
      <div className="p-6 mt-auto border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-5 py-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all group">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest italic">
            Terminate_Session
          </span>
        </button>
      </div>
    </motion.aside>
  );
};

export default memo(Sidebar);