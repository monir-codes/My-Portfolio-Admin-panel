"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Activity, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/my-projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjectsCount(data.length || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: "Total Projects", value: projectsCount, icon: FolderKanban, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: "group-hover:shadow-[0_0_30px_rgba(0,255,0,0.15)]" },
    { label: "Profile Views", value: "1.2k", icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]" },
    { label: "Messages", value: "48", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]" },
    { label: "Reviews", value: "4.9", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-white/50 tracking-wide">Welcome to your portfolio control center.</p>
        </div>
        <Link 
          href="/projects"
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all font-semibold tracking-wide flex items-center gap-2 w-fit shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          Manage Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            key={i}
            className={`glass-panel p-6 rounded-3xl relative overflow-hidden group border border-white/5 hover:${stat.border} transition-all duration-300 ${stat.glow}`}
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out`} />
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <div className="mt-auto">
                {loading ? (
                  <div className="h-10 w-16 bg-white/10 rounded-lg animate-pulse mb-1" />
                ) : (
                  <h3 className="text-4xl font-black tracking-tighter mb-1">{stat.value}</h3>
                )}
                <p className="text-white/50 text-sm font-semibold tracking-wider uppercase">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-8 rounded-3xl mt-8 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        <h3 className="text-xl font-bold tracking-tight mb-6">System Status</h3>
        <div className="flex items-center gap-4 text-white/70 bg-black/20 p-4 rounded-xl border border-white/5 w-fit">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <p className="font-medium tracking-wide">All systems are operating normally.</p>
        </div>
      </motion.div>
    </div>
  );
}
