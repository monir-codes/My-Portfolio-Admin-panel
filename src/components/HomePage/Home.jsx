import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Send, Code2, Globe, 
  Terminal as TerminalIcon, Activity, Zap, HardDrive, 
  Settings2, ArrowUpRight, ShieldCheck, Cpu
} from 'lucide-react';

const Home = () => {
  // --- REAL-TIME DATA SIMULATION ---
  const [cpuUsage, setCpuUsage] = useState(45);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(Math.max(prev + (Math.random() * 10 - 5), 30), 85).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Projects', count: '14', icon: <HardDrive size={22} />, color: 'emerald' },
    { label: 'Skill Matrix Nodes', count: '28', icon: <Code2 size={22} />, color: 'blue' },
    { label: 'Inbound Inquiries', count: '09', icon: <Send size={22} />, color: 'purple' },
    { label: 'System Uptime', count: '99.9%', icon: <Zap size={22} />, color: 'orange' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* --- ROW 1: MISSION CONTROL & CLUSTER HEALTH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API Command Center */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-10 rounded-[3.5rem] bg-[#0a0f1e]/40 backdrop-blur-3xl border border-white/10 relative overflow-hidden group shadow-2xl"
        >
          {/* Animated Background Element */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500">System_Live: v4.0.2</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] text-white">
              COMMAND <br /> <span className="text-emerald-500 underline decoration-white/10 underline-offset-8">INTERFACE</span>
            </h1>
            
            <p className="mt-8 text-slate-400 font-bold max-w-md text-lg leading-relaxed">
              Orchestrate your MERN stack resources, track API telemetry, and manage deployment nodes in real-time.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <button className="group flex items-center gap-3 px-8 py-5 bg-emerald-500 text-black font-black rounded-[1.5rem] shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all">
                <Settings2 size={20} className="group-hover:rotate-90 transition-transform duration-500" /> 
                ACCESS ENDPOINTS
              </button>
              <button className="flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 text-white font-black rounded-[1.5rem] hover:bg-white/10 transition-all">
                DEPLOY LOGS <ArrowUpRight size={18} className="text-emerald-500" />
              </button>
            </div>
          </div>
          
          <TerminalIcon size={300} className="absolute bottom-[-80px] right-[-50px] text-emerald-500/[0.02] -rotate-12 pointer-events-none" />
        </motion.div>

        {/* Database Cluster Diagnostic */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-[3.5rem] bg-[#0a0f1e]/40 backdrop-blur-3xl border border-white/10 flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-xl font-black italic flex items-center gap-3 text-white">
                <Database size={22} className="text-emerald-500" /> CLUSTER_OS
              </h3>
              <ShieldCheck size={20} className="text-emerald-500/50" />
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Server_Load</span>
                  <span className="text-emerald-500">{cpuUsage}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                  <motion.div 
                    animate={{ width: `${cpuUsage}%` }} 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_15px_#10b98155]" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Memory_Alloc</span>
                  <span className="text-blue-500">421MB / 512MB</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_15px_#3b82f655]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-5 bg-black/40 rounded-2xl border border-white/5 font-mono text-[9px] text-emerald-400/50 leading-relaxed uppercase tracking-widest">
            <div className="flex items-center gap-2 mb-1 text-emerald-500/80">
              <Cpu size={10} /> <span>Intel_Xeon_E5</span>
            </div>
            &gt; node: cluster-bg-01 <br />
            &gt; region: Bogura_Edge_v2 <br />
            &gt; status: high_performance
          </div>
        </motion.div>
      </div>

      {/* --- ROW 2: BENTO STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-[2.5rem] bg-[#0a0f1e]/40 backdrop-blur-3xl border border-white/5 shadow-xl flex flex-col items-center text-center overflow-hidden"
          >
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className={`p-5 bg-white/5 text-emerald-500 rounded-[1.5rem] mb-6 group-hover:bg-emerald-500 group-hover:text-black group-hover:rotate-[360deg] transition-all duration-700`}>
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{item.label}</p>
            <h3 className="text-4xl font-black text-white italic tracking-tighter">{item.count}</h3>
          </motion.div>
        ))}
      </div>

      {/* --- ROW 3: LIVE TELEMETRY LOGS --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 rounded-[3.5rem] bg-[#0a0f1e]/40 backdrop-blur-3xl border border-white/10 relative shadow-2xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Activity size={20} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Live_Traffic_Monitor</h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time API Endpoint Requests</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-[9px] font-black rounded-xl text-slate-400 uppercase tracking-widest">Active Streams: 04</span>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { action: 'Updated Skill Matrix Node', path: '/api/v4/skills/react-js', time: 'Just Now', type: 'POST', status: '201' },
            { action: 'Inquiry Buffer Streamed', path: '/api/v4/messages/inbound', time: '12m ago', type: 'GET', status: '200' },
            { action: 'Project Cache Purged', path: '/api/v4/projects/flush', time: '45m ago', type: 'DELETE', status: '204' },
          ].map((log, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-pointer">
              <div className="flex items-center gap-6">
                <div className={`text-[9px] font-black px-3 py-1 rounded-lg border ${
                  log.type === 'POST' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' : 
                  log.type === 'DELETE' ? 'border-red-500/30 text-red-500 bg-red-500/5' : 
                  'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                }`}>
                  {log.type}
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-200 group-hover:text-white transition-colors uppercase tracking-tight italic">{log.action}</h4>
                  <p className="font-mono text-[9px] text-slate-500 mt-1">{log.path} <span className="ml-2 text-emerald-500/40">HTTP_{log.status}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block h-[1px] w-12 bg-white/5" />
                <span className="text-[9px] font-black text-slate-600 uppercase italic tracking-widest">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Home);