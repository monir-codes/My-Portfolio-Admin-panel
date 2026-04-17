import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit3, Trash2, Database, RefreshCw, 
  X, Hash, Eye, Layers, Image as ImageIcon, Wifi, WifiOff,
  ExternalLink, Menu, LayoutDashboard, MessageSquare, Settings, Code2
} from 'lucide-react';
import Swal from 'sweetalert2';
import { FaGithub } from 'react-icons/fa';

const API_BASE_URL = 'https://portfolio-server-ten-fawn.vercel.app/api/my-projects';

// --- NAV ITEM (Responsive Helper) ---
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

// --- OPTIMIZED PROJECT CARD ---
const ProjectCard = memo(({ proj, onEdit, onDelete, onView }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full cursor-pointer"
    onClick={() => onView(proj)}
  >
    <div className="relative aspect-video overflow-hidden">
      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
          <Eye className="text-white" size={20} />
        </div>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-black text-[9px] font-black rounded-full uppercase">
        {proj.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-bold dark:text-white uppercase truncate mb-1 italic tracking-tighter">{proj.title}</h3>
      <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 h-8">{proj.desc}</p>
      
      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(proj); }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-white/5 dark:text-white rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all"
        >
          <Edit3 size={14} /> Edit
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(proj._id); }}
          className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </motion.div>
));

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProj, setViewProj] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState('POST');
  const [formData, setFormData] = useState({ title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });

  const Toast = useMemo(() => Swal.mixin({
    toast: true, position: 'top-end', showConfirmButton: false, timer: 2000,
    background: '#1e293b', color: '#10b981'
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
        Toast.fire({ icon: 'success', title: 'Database Updated' }); 
        fetchProjects(); 
        closeModal(); 
      }
    } catch (err) { Toast.fire({ icon: 'error', title: 'Action failed' }); }
    finally { setLoading(false); }
  };

  const handleDelete = useCallback((id) => {
    Swal.fire({
      title: 'If you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Delete',
      background: '#0f172a', color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setProjects(prev => prev.filter(p => p._id !== id));
        try {
          const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
          if (res.ok) Toast.fire({ icon: 'success', title: 'Deleted' });
          else fetchProjects();
        } catch (err) { fetchProjects(); }
        finally { setLoading(false); }
      }
    });
  }, [fetchProjects, Toast]);

  const openModal = (proj = null) => {
    if (proj) {
      setSubmissionMethod('PATCH');
      setFormData({ 
        id: proj._id, title: proj.title, category: proj.category, 
        image: proj.image, desc: proj.desc, tech: proj.tech.join(', '),
        live: proj.live || '', repo: proj.repo || ''
      });
    } else {
      setSubmissionMethod('POST');
      setFormData({ id: '', title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setIsViewOpen(false); };
  const openView = (proj) => { setViewProj(proj); setIsViewOpen(true); };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-300 overflow-x-hidden">
      
      {/* --- SIDEBAR (Desktop: Permanent, Mobile: Overlay) --- */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth > 1024)) && (
          <motion.aside 
            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
            className="fixed lg:static inset-y-0 left-0 w-72 border-r border-white/5 bg-[#0a0f1e] lg:bg-[#0a0f1e]/50 backdrop-blur-xl p-8 flex flex-col z-[200]"
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black not-italic text-sm">R</div>
                Vault<span className="text-emerald-500">_OS</span>
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
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden" />}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full flex flex-col min-w-0">
        
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0f1e]/80 sticky top-0 z-[100] backdrop-blur-md">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-emerald-500"><Menu size={20}/></button>
           <h2 className="text-xs font-black text-white uppercase tracking-widest italic">Project_Vault</h2>
           <button onClick={() => fetchProjects()} className="p-2 bg-white/5 rounded-lg border border-white/10"><RefreshCw size={18} className={loading ? 'animate-spin' : ''}/></button>
        </div>

        <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto w-full">
          
          {/* DESKTOP HEADER */}
          <header className="hidden lg:flex justify-between items-center mb-12 bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem]">
            <div className="space-y-2">
              <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">Project_Vault</h2>
              <div className="flex items-center gap-3">
                 <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${isLive ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {isLive ? <Wifi size={14} className="animate-pulse" /> : <WifiOff size={14} />} 
                    {isLive ? 'Live Refresh Active' : 'Manual Refresh'}
                 </div>
                 <button onClick={() => setIsLive(!isLive)} className={`text-[9px] px-2 py-0.5 rounded-full border transition-all font-black ${isLive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 border-slate-500/20 text-slate-500'}`}>
                   {isLive ? 'DISABLE' : 'ENABLE'}
                 </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => fetchProjects()} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all">
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
              <button onClick={() => openModal()} className="px-8 py-4 bg-emerald-500 text-black font-black rounded-2xl text-sm uppercase tracking-tight hover:scale-105 transition-all shadow-lg shadow-emerald-500/10">
                + New Project
              </button>
            </div>
          </header>

          {/* MOBILE FAB */}
          <button onClick={() => openModal()} className="lg:hidden fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 text-black rounded-full shadow-2xl z-[100] flex items-center justify-center animate-bounce">
            <Plus size={28} />
          </button>

          {/* GRID: ADAPTIVE --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((proj) => (
                <ProjectCard key={proj._id} proj={proj} onEdit={openModal} onDelete={handleDelete} onView={openView} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* --- VIEW MODAL --- */}
      <AnimatePresence>
        {isViewOpen && viewProj && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-5xl bg-white dark:bg-[#020617] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-white/10">
              <button onClick={closeModal} className="absolute top-6 right-6 z-20 p-2 bg-black/50 text-white rounded-full"><X size={20}/></button>
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto h-52 md:h-auto overflow-hidden">
                <img src={viewProj.image} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-12 md:w-1/2 flex flex-col justify-center overflow-y-auto">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-4 italic">// {viewProj.category}</span>
                <h2 className="text-2xl md:text-4xl font-black dark:text-white uppercase italic tracking-tighter mb-4">{viewProj.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{viewProj.desc}</p>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {viewProj.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 text-[10px] font-bold rounded-lg text-emerald-500 border border-white/10">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {viewProj.live && (
                      <a href={viewProj.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-xl hover:bg-emerald-400 transition-all">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {viewProj.repo && (
                      <a href={viewProj.repo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 text-white text-[10px] font-black uppercase rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                        <FaGithub size={14} /> Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-white dark:bg-[#0a0f1e] rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl relative max-h-[95vh] overflow-y-auto">
              <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X /></button>
              <h2 className="text-xl md:text-2xl font-black dark:text-white mb-8 uppercase italic tracking-tighter text-center sm:text-left">
                {submissionMethod === 'POST' ? 'Add_New_Project' : 'Edit_Project_Meta'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50 w-full" />
                  <input required placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50 w-full" />
                </div>
                <input required placeholder="Image Direct URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Live Link" value={formData.live} onChange={(e) => setFormData({...formData, live: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50" />
                  <input placeholder="Repo Link" value={formData.repo} onChange={(e) => setFormData({...formData, repo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50" />
                </div>
                <textarea required placeholder="Description..." value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-24 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50 resize-none" />
                <input required placeholder="Tech: React, Node, etc." value={formData.tech} onChange={(e) => setFormData({...formData, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold dark:text-white outline-none focus:border-emerald-500/50" />
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <button type="submit" disabled={loading} className="flex-1 py-4 bg-emerald-500 text-black font-black rounded-xl uppercase text-xs hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                    {loading ? 'Executing...' : (submissionMethod === 'POST' ? 'Create Project' : 'Commit Changes')}
                  </button>
                  <button type="button" onClick={closeModal} className="px-8 py-4 bg-white/5 text-white font-black rounded-xl text-xs uppercase border border-white/10">Cancel</button>
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