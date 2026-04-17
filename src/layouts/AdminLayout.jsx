import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Route change hole mobile-e sidebar automatic bondho hoye jabe
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen relative bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 transition-colors duration-700">
      
      {/* --- PREMIUM ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, 80, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full" 
        />
      </div>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen p-0 md:p-6 lg:gap-6">
        {/* Sidebar z-index ensure kora jate overlay-r upore thake */}
        <div className="z-[50]">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
        
        <div className="flex-1 flex flex-col min-w-0 px-4 md:px-0">
          <Navbar onMenuOpen={() => setSidebarOpen(true)} />
          
          <main className="flex-1 py-8">
            {/* Page transition-er jonno motion.div use kora jete pare */}
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          </main>
          
        </div>
      </div>
          <Footer />
    </div>
  );
};

export default AdminLayout;