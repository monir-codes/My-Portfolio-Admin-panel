"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Edit, Loader2, Image as ImageIcon, UploadCloud, X, FolderKanban } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Image Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [live, setLive] = useState("");
  const [repo, setRepo] = useState("");
  const [image, setImage] = useState("");

  const fetchProjects = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/my-projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch projects");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setTech("");
    setLive("");
    setRepo("");
    setImage("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: any) => {
    setTitle(p.title || "");
    setDesc(p.desc || "");
    setTech(p.tech?.join(", ") || "");
    setLive(p.live || p.link || "");
    setRepo(p.repo || p.github || "");
    setImage(p.image || "");
    setEditingId(p._id);
    setShowForm(true);
    // scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadToImgBB = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB API key is missing. Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImage(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error?.message || "Failed to upload image");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadToImgBB(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadToImgBB(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const projectData = {
      title,
      desc,
      tech: tech.split(",").map(t => t.trim()).filter(Boolean),
      live,
      repo,
      image,
    };

    try {
      if (editingId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/my-projects/${editingId}`, {
          method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        },
          body: JSON.stringify(projectData),
        });
        if (res.ok) {
          toast.success("Project updated successfully");
          fetchProjects();
          resetForm();
        } else {
          throw new Error("Failed to update");
        }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/my-projects`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        },
          body: JSON.stringify(projectData),
        });
        if (res.ok) {
          toast.success("Project added successfully");
          fetchProjects();
          resetForm();
        } else {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to add");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00FF00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#111",
      color: "#fff",
      customClass: {
        popup: "glass-panel rounded-3xl border border-white/10",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/my-projects/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your project has been deleted.",
              icon: "success",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#00FF00",
              customClass: {
                popup: "glass-panel rounded-3xl border border-white/10",
              }
            });
            fetchProjects();
          }
        } catch (error) {
          toast.error("Failed to delete project");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Projects</h1>
          <p className="text-white/50 tracking-wide">Manage your portfolio projects here.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-black font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,0,0.2)]"
          >
            <Plus size={18} />
            Add Project
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="glass-panel p-6 md:p-8 rounded-3xl mb-10 overflow-hidden border border-primary/20 shadow-[0_0_30px_rgba(0,255,0,0.05)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={resetForm} className="text-white/50 hover:text-white transition-all text-sm uppercase tracking-widest font-semibold flex items-center gap-1">
                <X size={16} /> Cancel
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Project Title</label>
                <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10" placeholder="e.g. E-Commerce Platform" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Technologies (comma separated)</label>
                <input required value={tech} onChange={e=>setTech(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10" placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-white/70">Description</label>
                <textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10" placeholder="Short description of the project..." />
              </div>
              
              {/* Drag and Drop Image Upload */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-white/70">Project Image</label>
                
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all overflow-hidden ${
                    isDragging ? "border-primary bg-primary/10" : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                  } ${image ? 'h-64' : 'h-48'}`}
                >
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-3 text-primary">
                      <Loader2 className="w-10 h-10 animate-spin" />
                      <p className="font-semibold tracking-wide text-sm animate-pulse">Uploading to ImgBB...</p>
                    </div>
                  ) : image ? (
                    <>
                      <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="relative z-20 flex flex-col items-center gap-2 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 pointer-events-none">
                        <ImageIcon className="w-8 h-8 text-primary" />
                        <p className="text-sm font-semibold text-white">Image Uploaded Successfully</p>
                        <p className="text-xs text-white/50">Drop a new image to replace</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white/60 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <UploadCloud className="w-8 h-8 text-white/40" />
                      </div>
                      <p className="font-semibold tracking-wide">Drag & Drop an image here</p>
                      <p className="text-xs text-white/40">or click to browse files</p>
                    </div>
                  )}
                </div>
                
                {/* Fallback Manual URL Input */}
                <div className="mt-2 relative">
                  <input value={image} onChange={e=>setImage(e.target.value)} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-primary/50 transition-all text-xs text-white/50" placeholder="Or enter image URL manually..." />
                  {image && (
                    <button type="button" onClick={() => setImage("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-400">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">Live Link</label>
                <input value={live} onChange={e=>setLive(e.target.value)} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10" placeholder="https://" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70">GitHub Link</label>
                <input value={repo} onChange={e=>setRepo(e.target.value)} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10" placeholder="https://github.com/..." />
              </div>
              
              <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-white/10">
                <button disabled={formLoading || uploadingImage} type="submit" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-70 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : (editingId ? "Save Changes" : "Publish Project")}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel rounded-3xl h-[420px] overflow-hidden flex flex-col border border-white/5">
              <div className="h-48 bg-white/5 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="h-6 w-3/4 bg-white/5 rounded-md animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-full bg-white/5 rounded-md animate-pulse" />
                  <div className="h-4 w-5/6 bg-white/5 rounded-md animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/5 rounded-md animate-pulse" />
                  <div className="h-6 w-20 bg-white/5 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 border-dashed">
          <FolderKanban className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No projects found</h3>
          <p className="text-white/50 mb-6">You haven't added any portfolio projects yet.</p>
          <button onClick={() => setShowForm(true)} className="text-primary font-bold hover:underline">Add your first project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              layout
              className="glass-panel rounded-3xl overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.1)] hover:-translate-y-1"
            >
              <div className="h-48 bg-white/5 relative overflow-hidden">
                {project.image ? (
                  <>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 bg-gradient-to-br from-white/5 to-transparent">No Image</div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <button onClick={() => handleEdit(project)} className="p-3 bg-white/10 hover:bg-primary/20 hover:text-primary backdrop-blur-md rounded-xl text-white transition-all hover:scale-110 shadow-xl">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-3 bg-white/10 hover:bg-red-500/20 hover:text-red-400 backdrop-blur-md rounded-xl text-white transition-all hover:scale-110 shadow-xl">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col relative z-10 bg-black/20">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-white/60 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/80 shadow-sm">
                      {t}
                    </span>
                  ))}
                  {project.tech?.length > 3 && (
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/50">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
