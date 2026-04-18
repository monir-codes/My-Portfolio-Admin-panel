import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Route switch hole auto-scroll to top & close mobile sidebar
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- NEURAL BACKGROUND ENGINE (GPU Accelerated) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* --- CORE STRUCTURE --- */}
      <div className="relative z-10 flex min-h-screen max-w-[1920px] mx-auto overflow-hidden">
        
        {/* SIDEBAR WRAPPER (Responsive Optimized) */}
        <div className={`
          fixed lg:sticky lg:top-0 h-screen z-[200] transition-transform duration-500 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        {/* MAIN VIEWPORT */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar relative">
          
          {/* STICKY HEADER */}
          <header className="sticky top-0 z-[150] p-4 md:p-6 pb-0 backdrop-blur-md bg-[#020617]/50">
            <Navbar onMenuOpen={() => setSidebarOpen(true)} />
          </header>

          {/* DYNAMIC CONTENT AREA */}
          <main className="flex-1 px-4 md:px-8 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.99, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* FOOTER - Minimalist Integration */}
          <footer className="px-4 md:px-8 pb-8">
            <Footer></Footer>
          </footer>

        </div>
      </div>

      {/* MOBILE BACKDROP (Fast UX) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[180] lg:hidden"
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default memo(AdminLayout);