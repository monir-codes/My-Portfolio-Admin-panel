"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Loader2, X, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [name, setName] = useState("");
  const [level, setLevel] = useState(90);
  const [category, setCategory] = useState("Frontend");
  const [icon, setIcon] = useState("Code2");

  const categories = ["Frontend", "Backend", "Tools", "Design"];

  const fetchSkills = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch skills");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setName(""); setLevel(90); setCategory("Frontend"); setIcon("Code2");
    setEditingId(null); setShowForm(false);
  };

  const handleEdit = (p: any) => {
    setName(p.name); setLevel(p.level); setCategory(p.category); setIcon(p.icon);
    setEditingId(p._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const data = { name, level, category, icon };
    try {
      if (editingId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${editingId}`, {
          method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Skill updated!"); fetchSkills(); resetForm(); }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Skill added!"); fetchSkills(); resetForm(); }
      }
    } catch (error) { toast.error("Error saving skill"); }
    finally { setFormLoading(false); }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#00FF00", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!", background: "#111", color: "#fff", customClass: { popup: "glass-panel rounded-3xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, { method: "DELETE" });
          if (res.ok) { toast.success("Deleted!"); fetchSkills(); }
        } catch (error) { toast.error("Failed to delete"); }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Skills</h1>
          <p className="text-white/50 tracking-wide">Manage your technical arsenal.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-primary text-black font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
            <Plus size={18} /> Add Skill
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass-panel p-6 md:p-8 rounded-3xl mb-10 border border-primary/20 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Skill" : "Add Skill"}</h2>
              <button onClick={resetForm} className="text-white/50 hover:text-white uppercase tracking-widest font-semibold flex items-center gap-1 text-sm"><X size={16} /> Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Skill Name</label>
                <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="React.js" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Proficiency Level (1-100)</label>
                <input required value={level} onChange={e=>setLevel(Number(e.target.value))} type="number" min="1" max="100" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Category</label>
                <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Lucide Icon Name</label>
                <input required value={icon} onChange={e=>setIcon(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Code2, Layout, Database" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-white/10">
                <button disabled={formLoading} type="submit" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:scale-105 transition-all">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Skill"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill: any) => (
            <motion.div key={skill._id} layout className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col hover:border-primary/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10"><Code2 className="text-primary" size={24} /></div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(skill)} className="p-2 bg-white/10 rounded-lg hover:text-primary"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(skill._id)} className="p-2 bg-white/10 rounded-lg hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">{skill.category}</p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-auto">
                <div className="bg-primary h-full" style={{ width: `${skill.level}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
