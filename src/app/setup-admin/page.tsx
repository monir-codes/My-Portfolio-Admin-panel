"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Lock, Mail, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function SetupAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Admin account created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-red-500/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-panel rounded-3xl relative z-10 border border-red-500/30 shadow-[0_0_50px_rgba(255,0,0,0.05)]"
      >
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            ADMIN SETUP
          </h1>
          <p className="text-white/50 text-xs tracking-widest uppercase text-balance">
            Create your master administrator account. Only do this once. Delete this page afterwards.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wide text-white/70">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                placeholder="admin@yourdomain.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wide text-white/70">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-bold tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(255,0,0,0.3)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
