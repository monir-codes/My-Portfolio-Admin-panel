import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit3, Trash2, Database, RefreshCw, 
  X, Hash, Eye, Image as ImageIcon, Wifi, WifiOff,
  ExternalLink, LayoutDashboard, MessageSquare, Settings, 
  ChevronRight, Code2, Menu
} from 'lucide-react';
import Swal from 'sweetalert2';

const API_BASE_URL = 'https://portfolio-server-ten-fawn.vercel.app/api/my-projects';

// --- SUB-COMPONENT: SIDEBAR ITEM ---
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
      active 
      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
      : 'text-slate-400 hover:bg-white/5 hover:text-emerald-500'
    }`}
  >
    <Icon size={18} className={active ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
    <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState('Projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProj, setViewProj] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState('POST');
  const [formData, setFormData] = useState({ id: '', title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });

  const Toast = useMemo(() => Swal.mixin({
    toast: true, position: 'top-end', showConfirmButton: false, timer: 2000,
    background: '#0f172a', color: '#10b981'
  }), []);

  const fetchProjects = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}?t=${Date.now()}`);
      const data = await res.json();
      setProjects(data);
    } catch (err) { 
      if (!isSilent) Toast.fire({ icon: 'error', title: 'Fetch failed' }); 
    } finally { setLoading(false); }
  }, [Toast]);

  useEffect(() => {
    fetchProjects();
    let interval;
    if (isLive) interval = setInterval(() => fetchProjects(true), 10000);
    return () => clearInterval(interval);
  }, [isLive, fetchProjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const techArray = typeof formData.tech === 'string' ? formData.tech.split(',').map(t => t.trim()) : formData.tech;
    const payload = { ...formData, tech: techArray };
    const url = submissionMethod === 'PATCH' ? `${API_BASE_URL}/${formData.id}` : API_BASE_URL;

    try {
      const res = await fetch(url, {
        method: submissionMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) { 
        Toast.fire({ icon: 'success', title: 'Updated' }); 
        fetchProjects(); 
        closeModal(); 
      }
    } catch (err) { Toast.fire({ icon: 'error', title: 'Action failed' }); }
    finally { setLoading(false); }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Purge Project?',
      icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete', background: '#0a0f1e', color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setProjects(prev => prev.filter(p => p._id !== id));
        try { await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' }); Toast.fire({ icon: 'success', title: 'Deleted' }); }
        catch (err) { fetchProjects(); }
      }
    });
  };

  const openModal = (proj = null) => {
    if (proj) {
      setSubmissionMethod('PATCH');
      setFormData({ id: proj._id, title: proj.title, category: proj.category, image: proj.image, desc: proj.desc, tech: proj.tech.join(', '), live: proj.live || '', repo: proj.repo || '' });
    } else {
      setSubmissionMethod('POST');
      setFormData({ id: '', title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setIsViewOpen(false); };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-300 overflow-x-hidden">
      
      {/* --- RESPONSIVE SIDEBAR --- */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth > 1024) && (
          <motion.aside 
            initial={{ x: -300 }} 
            animate={{ x: 0 }} 
            exit={{ x: -300 }}
            className={`fixed lg:static inset-y-0 left-0 w-72 border-r border-white/5 bg-[#0a0f1e] lg:bg-[#0a0f1e]/50 backdrop-blur-xl p-8 flex flex-col z-[200] transition-all`}
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black not-italic text-sm">M</div>
                Monir's<span className="text-emerald-500">_OS</span>
              </h1>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500"><X /></button>
            </div>

            <nav className="space-y-2 flex-1">
              <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
              <NavItem icon={Database} label="Projects" active={activeTab === 'Projects'} onClick={() => setActiveTab('Projects')} />
              <NavItem icon={Code2} label="Skills" active={activeTab === 'Skills'} onClick={() => setActiveTab('Skills')} />
              <NavItem icon={MessageSquare} label="Messages" active={activeTab === 'Messages'} onClick={() => setActiveTab('Messages')} />
              <NavItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            </nav>

            <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">● System Live</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden" />}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full flex flex-col min-w-0">
        
        {/* TOP MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0f1e]/80 sticky top-0 z-[100]">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/5 rounded-lg"><Menu size={20}/></button>
           <h2 className="text-sm font-black text-white uppercase tracking-tighter italic">{activeTab}</h2>
           <button onClick={() => fetchProjects()} className="p-2 bg-white/5 rounded-lg"><RefreshCw size={18} className={loading ? 'animate-spin' : ''}/></button>
        </div>

        <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto w-full">
          
          {/* DESKTOP HEADER */}
          <header className="hidden lg:flex justify-between items-center mb-12 bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem]">
            <div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{activeTab}_Manager</h2>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{isLive ? 'Auto-Syncing Active' : 'Manual Control Mode'}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsLive(!isLive)} className={`px-4 py-2 rounded-xl border text-[10px] font-black transition-all ${isLive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                LIVE SYNC {isLive ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => openModal()} className="px-8 py-4 bg-emerald-500 text-black font-black rounded-2xl text-sm uppercase shadow-lg shadow-emerald-500/20">
                + New Entry
              </button>
            </div>
          </header>

          {/* MOBILE ADD BUTTON (FAB) */}
          <button onClick={() => openModal()} className="lg:hidden fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 text-black rounded-full shadow-2xl z-[100] flex items-center justify-center animate-bounce">
            <Plus size={28} />
          </button>

          {/* GRID: ADAPTIVE --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((proj) => (
                <motion.div 
                  key={proj._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-5 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="relative aspect-video rounded-[1.5rem] overflow-hidden mb-5">
                    <img src={proj.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                    <button onClick={() => { setViewProj(proj); setIsViewOpen(true); }} className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Eye className="text-white" size={24} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-emerald-500">
                      <span>{proj.category}</span>
                    </div>
                    <h3 className="text-lg font-black text-white uppercase italic truncate">{proj.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{proj.desc}</p>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button onClick={() => openModal(proj)} className="flex-1 py-3 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-emerald-500 hover:text-black transition-all">Edit</button>
                    <button onClick={() => handleDelete(proj._id)} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* --- MODAL: FORM (Responsive) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-[#0a0f1e] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/10 shadow-2xl overflow-y-auto max-h-[95vh]">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-white uppercase italic">{submissionMethod === 'POST' ? 'System_Create' : 'System_Update'}</h2>
                  <button onClick={closeModal} className="text-slate-500 hover:text-white"><X /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                    <input required placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                  </div>
                  <input required placeholder="Image Direct URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input placeholder="Live Demo Link" value={formData.live} onChange={(e) => setFormData({...formData, live: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                    <input placeholder="GitHub Repo" value={formData.repo} onChange={(e) => setFormData({...formData, repo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                  </div>

                  <textarea required placeholder="Description..." value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-28 text-sm font-bold text-white outline-none focus:border-emerald-500 resize-none" />
                  <input required placeholder="Tech: React, Node, Tailwind..." value={formData.tech} onChange={(e) => setFormData({...formData, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500" />
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="submit" className="flex-1 py-4 bg-emerald-500 text-black font-black rounded-xl uppercase text-xs hover:shadow-lg hover:shadow-emerald-500/20 transition-all">Execute Commit</button>
                    <button type="button" onClick={closeModal} className="py-4 px-8 bg-white/5 text-white font-black rounded-xl text-xs uppercase border border-white/10">Cancel</button>
                  </div>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;