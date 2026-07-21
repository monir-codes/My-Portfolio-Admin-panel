"use client";

import { useAuth } from "./AuthProvider";
import { LogOut, LayoutDashboard, FolderKanban, User, Code2, Briefcase, Award, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen?: boolean, setIsMobileMenuOpen?: (val: boolean) => void }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Hero & About", href: "/hero-about", icon: User },
    { name: "Skills", href: "/skills", icon: Code2 },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Certificates", href: "/certificates", icon: Award },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 glass-panel border-r border-y-0 border-l-0 flex flex-col h-full shrink-0
        fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tighter">
            ADMIN<span className="text-primary">.</span>
          </h2>
          {isMobileMenuOpen && (
            <button onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)} className="lg:hidden text-white/50 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-primary" : ""} />
                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all font-medium tracking-widest uppercase text-sm border border-transparent hover:border-red-400/20"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
