"use client";

import { useEffect, useState } from "react";
import { Loader2, UploadCloud, Image as ImageIcon, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function HeroAboutPage() {
  const [loading, setLoading] = useState(true);
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  
  // Hero State
  const [hero, setHero] = useState({
    firstName: "MD. MONIR",
    lastName: "UZZAMAN",
    title: "FullStack MERN Developer",
    description: "Professional FullStack MERN Developer. I build high-performance web applications with modern architecture and exceptional user interfaces.",
    image: "",
    resume: "",
    github: "",
    linkedin: "",
    facebook: ""
  });

  // About State
  const [about, setAbout] = useState({
    title1: "Building Modern",
    title2: "Web Experiences",
    description: "Full-stack developer specializing in Next.js, React, and the MERN stack, focused on building scalable, production-ready web applications with modern UI/UX, clean architecture, and performance optimization.",
    experienceYears: 3,
    projectsDelivered: 50
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`).then(res => res.json())
    ]).then(([heroData, aboutData]) => {
      if (Object.keys(heroData).length > 0) setHero(heroData);
      if (Object.keys(aboutData).length > 0) setAbout(aboutData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      toast.error("Failed to load data");
      setLoading(false);
    });
  }, []);

  const uploadToImgBB = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB API key is missing.");
      return;
    }
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setHero({ ...hero, image: data.data.url });
        toast.success("Image uploaded!");
      } else throw new Error(data.error?.message);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) await uploadToImgBB(e.dataTransfer.files[0]);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) await uploadToImgBB(e.target.files[0]);
  };

  const saveHero = async () => {
    setSavingHero(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hero)
      });
      if (res.ok) toast.success("Hero updated successfully!");
      else throw new Error("Failed to save");
    } catch (e) { toast.error("Error saving hero"); }
    finally { setSavingHero(false); }
  };

  const saveAbout = async () => {
    setSavingAbout(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about)
      });
      if (res.ok) toast.success("About updated successfully!");
      else throw new Error("Failed to save");
    } catch (e) { toast.error("Error saving about"); }
    finally { setSavingAbout(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Hero & About CMS</h1>
        <p className="text-white/50 tracking-wide">Manage your homepage presentation.</p>
      </div>

      {/* HERO SECTION */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          Hero Settings
          <button onClick={saveHero} disabled={savingHero} className="bg-primary text-black text-sm px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-all">
            {savingHero ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Save Hero
          </button>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">First Name</label>
              <input value={hero.firstName} onChange={e=>setHero({...hero, firstName: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Last Name</label>
              <input value={hero.lastName} onChange={e=>setHero({...hero, lastName: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Job Title</label>
              <input value={hero.title} onChange={e=>setHero({...hero, title: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Resume Link (GDrive PDF)</label>
              <input value={hero.resume} onChange={e=>setHero({...hero, resume: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Social Links</label>
              <div className="space-y-2">
                <input value={hero.github} onChange={e=>setHero({...hero, github: e.target.value})} type="url" placeholder="GitHub URL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                <input value={hero.linkedin} onChange={e=>setHero({...hero, linkedin: e.target.value})} type="url" placeholder="LinkedIn URL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                <input value={hero.facebook} onChange={e=>setHero({...hero, facebook: e.target.value})} type="url" placeholder="Facebook URL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Short Description</label>
              <textarea value={hero.description} onChange={e=>setHero({...hero, description: e.target.value})} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Profile Image (ImgBB)</label>
              <div 
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                className={`relative w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden ${isDragging ? "border-primary bg-primary/10" : "border-white/20 bg-white/5"} ${hero.image ? 'h-40' : 'h-32'}`}
              >
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {uploadingImage ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : hero.image ? (
                  <img src={hero.image} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/40">
                    <UploadCloud />
                    <span className="text-xs font-medium tracking-wide">Drop Image Here</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          About Settings
          <button onClick={saveAbout} disabled={savingAbout} className="bg-primary text-black text-sm px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-all">
            {savingAbout ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Save About
          </button>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Heading Line 1 (White)</label>
              <input value={about.title1} onChange={e=>setAbout({...about, title1: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Heading Line 2 (Green Italic)</label>
              <input value={about.title2} onChange={e=>setAbout({...about, title2: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Years Experience</label>
                <input value={about.experienceYears} onChange={e=>setAbout({...about, experienceYears: Number(e.target.value)})} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Projects Delivered</label>
                <input value={about.projectsDelivered} onChange={e=>setAbout({...about, projectsDelivered: Number(e.target.value)})} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">About Description Paragraphs</label>
              <textarea value={about.description} onChange={e=>setAbout({...about, description: e.target.value})} rows={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
