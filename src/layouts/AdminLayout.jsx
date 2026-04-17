import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 transition-colors duration-700">
      
      {/* --- GPU ACCELERATED BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-600/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full" 
        />
      </div>

      <div className="relative z-10 flex min-h-screen p-4 md:p-6 lg:gap-6">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar onMenuOpen={() => setSidebarOpen(true)} />
          <main className="flex-1 py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;