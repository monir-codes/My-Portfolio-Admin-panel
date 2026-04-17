import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderGit2, Cpu, MessageSquare, Settings, X, Terminal } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FolderGit2, label: 'Projects', path: '/projects' },
    { icon: Cpu, label: 'Skill Matrix', path: '/skills' },
    { icon: MessageSquare, label: 'Inbox', path: '/messages' },
    { icon: Settings, label: 'Config', path: '/settings' }
  ];

  return (
    <>
      <aside className={`fixed lg:sticky top-0 left-0 h-[calc(100vh-3rem)] w-72 
        bg-white/20 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/40 dark:border-white/10 
        rounded-[2.5rem] shadow-2xl z-50 transition-all duration-500 lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'}`}>
        
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center rotate-6 shadow-lg shadow-emerald-500/20">
              <Terminal className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter">PORTFOLIO<span className="text-emerald-500">.</span></h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto"><X /></button>
          </div>

          <nav className="space-y-3">
            {menu.map((item, idx) => (
              <motion.button 
                key={idx} whileHover={{ x: 10, scale: 1.02 }}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-slate-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-white/5 transition-all border border-transparent hover:border-white/20 shadow-sm"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;