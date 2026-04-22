import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Plus, Edit3, Trash2, RefreshCw, X, Eye, 
  Wifi, WifiOff, ExternalLink, Globe,
  Database, 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { FaGithub } from 'react-icons/fa';

const API_BASE_URL = 'https://portfolio-server-ten-fawn.vercel.app/api/my-projects';

// --- STYLED UI COMPONENTS (Internal) ---
const InputField = ({ label, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
    <input 
      {...props} 
      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" 
    />
  </div>
);

// --- SKELETON LOADER (Fast UX) ---
const ProjectSkeleton = () => (
  <div className="h-[400px] rounded-[2.5rem] bg-white/5 border border-white/5 animate-pulse overflow-hidden">
    <div className="h-48 bg-white/5" />
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 bg-white/5 rounded-lg" />
      <div className="h-4 w-full bg-white/5 rounded-lg" />
      <div className="h-10 w-full bg-white/5 rounded-xl mt-4" />
    </div>
  </div>
);

// --- MEMOIZED PROJECT CARD ---
const ProjectCard = memo(({ proj, onEdit, onDelete, onView }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-[#0f172a]/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
  >
    {/* Image Container */}
    <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[1.8rem]">
      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-emerald-500 text-[9px] font-black rounded-full uppercase tracking-widest">
        {proj.category}
      </div>

      {/* Hover Action */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
        <button onClick={() => onView(proj)} className="p-4 bg-emerald-500 text-black rounded-full shadow-2xl hover:scale-110 transition-transform">
          <Eye size={22} />
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="px-7 pb-7 pt-2">
      <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2 group-hover:text-emerald-400 transition-colors truncate">
        {proj.title}
      </h3>
      <p className="text-xs text-slate-500 font-medium line-clamp-2 h-9 mb-6 leading-relaxed">
        {proj.desc}
      </p>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onEdit(proj)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 text-slate-300 rounded-2xl text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all border border-white/5 hover:border-emerald-500"
        >
          <Edit3 size={14} /> Edit_Project
        </button>
        <button 
          onClick={() => onDelete(proj._id)}
          className="w-14 h-14 flex items-center justify-center bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </motion.div>
));

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewProj, setViewProj] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState('POST');
  const [formData, setFormData] = useState({ title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });

  const Toast = useMemo(() => Swal.mixin({
    toast: true, position: 'top-end', showConfirmButton: false, timer: 2000,
    background: '#0f172a', color: '#10b981', border: '1px solid rgba(255,255,255,0.1)'
  }), []);

  const fetchProjects = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}?t=${Date.now()}`);
      const data = await res.json();
      setProjects(data);
    } catch { 
      if (!isSilent) Toast.fire({ icon: 'error', title: 'Network Link Failed' }); 
    } finally { setLoading(false); }
  }, [Toast]);

  useEffect(() => {
    fetchProjects();
    if (isLive) {
      const interval = setInterval(() => fetchProjects(true), 15000);
      return () => clearInterval(interval);
    }
  }, [isLive, fetchProjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const techArray = typeof formData.tech === 'string' ? formData.tech.split(',').map(t => t.trim()) : formData.tech;
    const url = submissionMethod === 'PATCH' ? `${API_BASE_URL}/${formData.id}` : API_BASE_URL;

    try {
      const res = await fetch(url, {
        method: submissionMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tech: techArray })
      });
      if (res.ok) { 
        Toast.fire({ icon: 'success', title: 'Kernel Updated' }); 
        fetchProjects(); 
        setIsModalOpen(false); 
      }
    } catch { Toast.fire({ icon: 'error', title: 'Commit Failed' }); }
    finally { setLoading(false); }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'TERMINATE PROJECT?',
      text: "This action cannot be undone in the current session.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CONFIRM DELETE',
      background: '#020617', color: '#fff', confirmButtonColor: '#ef4444',
      borderRadius: '2rem'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setProjects(prev => prev.filter(p => p._id !== id));
        await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        Toast.fire({ icon: 'success', title: 'Object Purged' });
      }
    });
  };

  const openForm = (proj = null) => {
    if (proj) {
      setSubmissionMethod('PATCH');
      setFormData({ ...proj, id: proj._id, tech: proj.tech.join(', ') });
    } else {
      setSubmissionMethod('POST');
      setFormData({ title: '', category: '', image: '', desc: '', tech: '', live: '', repo: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Database className="text-emerald-500" size={24} />
            <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">Project_Vault</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isLive ? 'text-emerald-500' : 'text-slate-500'}`}>
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
              {isLive ? 'Auto_Sync_Active' : 'Manual_Refresh_Only'}
            </div>
            <button onClick={() => setIsLive(!isLive)} className="text-[9px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors uppercase">
              {isLive ? 'Disable Sync' : 'Enable Sync'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button onClick={() => fetchProjects()} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-emerald-500">
            <RefreshCw size={22} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => openForm()} className="flex-1 md:flex-none px-10 py-5 bg-emerald-500 text-black font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all uppercase text-xs tracking-tighter">
            + Deploy New Node
          </button>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {loading && projects.length === 0 ? (
          [...Array(4)].map((_, i) => <ProjectSkeleton key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {projects.map((proj) => (
              <ProjectCard key={proj._id} proj={proj} onEdit={openForm} onDelete={handleDelete} onView={setViewProj} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* VIEW MODAL (Detail View) */}
      <AnimatePresence>
        {viewProj && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-5xl bg-[#020617] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl">
              <button onClick={() => setViewProj(null)} className="absolute top-8 right-8 z-50 p-3 bg-black/50 text-white rounded-2xl border border-white/10 hover:bg-emerald-500 hover:text-black transition-all">
                <X size={20}/>
              </button>
              
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto">
                <img src={viewProj.image} className="w-full h-full object-cover" alt="Preview" />
              </div>

              <div className="p-10 md:p-16 md:w-1/2 space-y-8 overflow-y-auto max-h-[90vh]">
                <div className="space-y-2">
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] italic">// {viewProj.category}</span>
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{viewProj.title}</h2>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{viewProj.desc}</p>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technological_Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewProj.tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 text-[10px] font-bold rounded-xl text-emerald-400 border border-white/5 tracking-wider">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {viewProj.live && (
                    <a href={viewProj.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-2xl hover:scale-105 transition-all">
                      <Globe size={16} /> Live_Preview
                    </a>
                  )}
                  {viewProj.repo && (
                    <a href={viewProj.repo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 text-white text-[10px] font-black uppercase rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <FaGithub size={16} /> Source_Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-[#0a0f1e] rounded-[3rem] p-10 border border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={24} /></button>
              
              <h2 className="text-2xl font-black text-white mb-10 uppercase italic tracking-tighter text-center">
                {submissionMethod === 'POST' ? 'Initial_Deployment' : 'Re-Configure_Node'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Project Name" placeholder="e.g. EcoTrack" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  <InputField label="Category" placeholder="e.g. Web App" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
                </div>
                
                <InputField label="Thumbnail URL" placeholder="Direct image link..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Live Endpoint" placeholder="https://..." value={formData.live} onChange={(e) => setFormData({...formData, live: e.target.value})} />
                  <InputField label="Repository" placeholder="Github link..." value={formData.repo} onChange={(e) => setFormData({...formData, repo: e.target.value})} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">System_Description</label>
                  <textarea required value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-32 text-sm font-bold text-white outline-none focus:border-emerald-500/50 resize-none transition-all" />
                </div>

                <InputField label="Technological Stack (Comma Separated)" placeholder="React, Tailwind, Node.js" value={formData.tech} onChange={(e) => setFormData({...formData, tech: e.target.value})} required />

                <div className="flex gap-4 pt-6">
                  <button type="submit" disabled={loading} className="flex-1 py-5 bg-emerald-500 text-black font-black rounded-2xl uppercase text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
                    {loading ? 'Processing...' : 'Execute_Deployment'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 bg-white/5 text-slate-400 font-black rounded-2xl text-[11px] uppercase border border-white/5 hover:text-white transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default memo(Projects);