import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Send, Code2, Globe, 
  Terminal, Activity, Zap, HardDrive, 
  Settings2, ArrowUpRight
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-8">
      
      {/* --- ROW 1: API STATUS & QUICK OVERVIEW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API Endpoint Control */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-10 rounded-[3rem] bg-white/10 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/20 dark:border-white/10 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">API Production Live</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
              PORTFOLIO <br /> <span className="text-emerald-500">CORE_V4</span>
            </h1>
            
            <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold max-w-md text-lg">
              Manage your live portfolio data, system endpoints, and REST resources from one unified glass interface.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-[#020617] dark:bg-emerald-500 text-white dark:text-black font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
                <Settings2 size={20} /> MANAGE ENDPOINTS
              </button>
              <a href="https://your-portfolio.com" target="_blank" className="flex items-center gap-2 px-8 py-4 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 font-black rounded-2xl hover:bg-white/20 transition-all">
                VIEW LIVE SITE <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          
          <Terminal size={240} className="absolute bottom-[-60px] right-[-40px] text-emerald-500/[0.03] -rotate-12 pointer-events-none" />
        </motion.div>

        {/* Database Real-time Health */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-[3rem] bg-white/10 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/20 dark:border-white/10 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-black italic flex items-center gap-2 mb-8 text-slate-800 dark:text-white">
              <Database size={22} className="text-emerald-500" /> CLUSTER
            </h3>
            <div className="space-y-6">
              <div className="group">
                <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest text-slate-500">
                  <span>Storage (Used)</span>
                  <span className="text-emerald-500 italic font-black">74%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '74%' }} className="h-full bg-emerald-500" />
                </div>
              </div>
              <div className="group">
                <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest text-slate-500">
                  <span>Requests (24h)</span>
                  <span className="text-blue-500 italic font-black">1.2k</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-2xl border border-white/5 font-mono text-[9px] text-emerald-400/60 leading-relaxed uppercase tracking-tighter">
            &gt; db_cluster: atlas_pro <br />
            &gt; region: ap-southeast-1 <br />
            &gt; status: healthy
          </div>
        </motion.div>
      </div>

      {/* --- ROW 2: DATA SEGMENTS (BENTO GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Projects', count: '14', icon: <HardDrive />, color: 'emerald' },
          { label: 'Skill Nodes', count: '28', icon: <Code2 />, color: 'blue' },
          { label: 'Messages', count: '09', icon: <Send />, color: 'purple' },
          { label: 'Uptime', count: '100%', icon: <Zap />, color: 'orange' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-8 rounded-[2.5rem] bg-white/20 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl group text-center flex flex-col items-center"
          >
            <div className={`p-4 bg-${item.color}-500/10 text-${item.color}-500 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all`}>
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</p>
            <h3 className="text-4xl font-black mt-2 text-slate-800 dark:text-white">{item.count}</h3>
          </motion.div>
        ))}
      </div>

      {/* --- ROW 3: LOGS / ACTIVITY --- */}
      <div className="p-10 rounded-[3rem] bg-white/10 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/20 dark:border-white/10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-black italic flex items-center gap-3">
            <Activity size={22} className="text-emerald-500" /> RECENT API TRAFFIC
          </h3>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full border border-emerald-500/20 uppercase tracking-widest">GET</div>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black rounded-full border border-blue-500/20 uppercase tracking-widest">POST</div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { action: 'Updated Project Data', path: '/api/v1/projects/skillswap', time: '2m ago', type: 'POST' },
            { action: 'Fetched Skills Matrix', path: '/api/v1/skills', time: '14m ago', type: 'GET' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-5">
                <div className={`w-2 h-2 rounded-full ${log.type === 'POST' ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
                <div>
                  <h4 className="font-black text-sm">{log.action}</h4>
                  <p className="font-mono text-[10px] text-slate-500 group-hover:text-emerald-500 transition-colors">{log.path}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase italic">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;