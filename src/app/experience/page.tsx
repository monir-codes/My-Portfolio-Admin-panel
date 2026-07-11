"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Loader2, X, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");

  const fetchExperiences = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/experience`)
      .then((res) => res.json())
      .then((data) => { setExperiences(data); setLoading(false); })
      .catch(() => { toast.error("Failed to fetch experiences"); setLoading(false); });
  };

  useEffect(() => { fetchExperiences(); }, []);

  const resetForm = () => {
    setRole(""); setCompany(""); setDuration(""); setDescription(""); setTech("");
    setEditingId(null); setShowForm(false);
  };

  const handleEdit = (p: any) => {
    setRole(p.role); setCompany(p.company); setDuration(p.duration); 
    setDescription(p.description); setTech(p.tech?.join(", ") || "");
    setEditingId(p._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const data = { 
        role, company, duration, description, 
        tech: tech.split(",").map(t => t.trim()).filter(Boolean) 
    };
    try {
      if (editingId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/experience/${editingId}`, {
          method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Experience updated!"); fetchExperiences(); resetForm(); }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/experience`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Experience added!"); fetchExperiences(); resetForm(); }
      }
    } catch (error) { toast.error("Error saving experience"); }
    finally { setFormLoading(false); }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#00FF00", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!", background: "#111", color: "#fff", customClass: { popup: "glass-panel rounded-3xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/experience/${id}`, { method: "DELETE", headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` } });
          if (res.ok) { toast.success("Deleted!"); fetchExperiences(); }
        } catch (error) { toast.error("Failed to delete"); }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Experience</h1>
          <p className="text-white/50 tracking-wide">Manage your career timeline.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-primary text-black font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
            <Plus size={18} /> Add Experience
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass-panel p-6 md:p-8 rounded-3xl mb-10 border border-primary/20 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Experience" : "Add Experience"}</h2>
              <button onClick={resetForm} className="text-white/50 hover:text-white uppercase tracking-widest font-semibold flex items-center gap-1 text-sm"><X size={16} /> Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Job Role</label>
                <input required value={role} onChange={e=>setRole(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="Senior Frontend Developer" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Company</label>
                <input required value={company} onChange={e=>setCompany(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="Google" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Duration</label>
                <input required value={duration} onChange={e=>setDuration(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="Jan 2022 - Present" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Description</label>
                <textarea required value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="Describe your responsibilities..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Technologies (comma separated)</label>
                <input required value={tech} onChange={e=>setTech(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="React, Node.js, MongoDB" />
              </div>
              
              <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-white/10">
                <button disabled={formLoading} type="submit" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:scale-105 transition-all">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Experience"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp: any) => (
            <motion.div key={exp._id} layout className="glass-panel p-6 rounded-3xl border border-white/5 group hover:border-primary/30 transition-all flex flex-col relative">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(exp)} className="p-2 bg-white/10 rounded-lg hover:text-primary"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(exp._id)} className="p-2 bg-white/10 rounded-lg hover:text-red-400"><Trash2 size={16} /></button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10"><Briefcase className="text-primary" size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-4">{exp.duration}</p>
              <p className="text-white/70 text-sm mb-6 flex-1">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tech?.map((t: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
