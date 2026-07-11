"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Loader2, X, Award } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const fetchCertificates = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/certificates`)
      .then((res) => res.json())
      .then((data) => { setCertificates(data); setLoading(false); })
      .catch(() => { toast.error("Failed to fetch certificates"); setLoading(false); });
  };

  useEffect(() => { fetchCertificates(); }, []);

  const resetForm = () => {
    setTitle(""); setIssuer(""); setDate(""); setLink(""); setImage("");
    setEditingId(null); setShowForm(false);
  };

  const handleEdit = (p: any) => {
    setTitle(p.title); setIssuer(p.issuer); setDate(p.date); setLink(p.link); setImage(p.image || "");
    setEditingId(p._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const data = { title, issuer, date, link, image };
    try {
      if (editingId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/certificates/${editingId}`, {
          method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Certificate updated!"); fetchCertificates(); resetForm(); }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/certificates`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (res.ok) { toast.success("Certificate added!"); fetchCertificates(); resetForm(); }
      }
    } catch (error) { toast.error("Error saving certificate"); }
    finally { setFormLoading(false); }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#00FF00", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!", background: "#111", color: "#fff", customClass: { popup: "glass-panel rounded-3xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/certificates/${id}`, { method: "DELETE" });
          if (res.ok) { toast.success("Deleted!"); fetchCertificates(); }
        } catch (error) { toast.error("Failed to delete"); }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Certificates</h1>
          <p className="text-white/50 tracking-wide">Manage your credentials and awards.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-primary text-black font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
            <Plus size={18} /> Add Certificate
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass-panel p-6 md:p-8 rounded-3xl mb-10 border border-primary/20 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Certificate" : "Add Certificate"}</h2>
              <button onClick={resetForm} className="text-white/50 hover:text-white uppercase tracking-widest font-semibold flex items-center gap-1 text-sm"><X size={16} /> Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Certificate Title</label>
                <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="AWS Certified Developer" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Issuer</label>
                <input required value={issuer} onChange={e=>setIssuer(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="Amazon Web Services" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Date/Year</label>
                <input required value={date} onChange={e=>setDate(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="2023" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Credential Link</label>
                <input required value={link} onChange={e=>setLink(e.target.value)} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="https://..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Image URL (Optional)</label>
                <input value={image} onChange={e=>setImage(e.target.value)} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" placeholder="https://..." />
              </div>
              
              <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-white/10">
                <button disabled={formLoading} type="submit" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:scale-105 transition-all">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Certificate"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: any) => (
            <motion.div key={cert._id} layout className="glass-panel p-6 rounded-3xl border border-white/5 group hover:border-primary/30 transition-all flex flex-col relative">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(cert)} className="p-2 bg-white/10 rounded-lg hover:text-primary"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(cert._id)} className="p-2 bg-white/10 rounded-lg hover:text-red-400"><Trash2 size={16} /></button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 w-fit"><Award className="text-primary" size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                  <p className="text-primary font-medium text-sm">{cert.issuer}</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-2">{cert.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
