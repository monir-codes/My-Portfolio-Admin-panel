import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Terminal, ShieldCheck, Zap, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  // --- FUNCTIONAL STATES ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- LOGIN HANDLER ---
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting Auth Handshake...");
      
      // Eikhane apni apnar Firebase/Auth0 logic add korben
      // Example: const user = await signInWithGoogle();
      
      // Simulation for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Authentication Successful!");
      
      // Redirect to Dashboard after success
      navigate('/'); 

    } catch (err) {
      setError("Authorization failed. Please check your credentials.");
      console.error("Auth Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-hidden flex items-center justify-center">
      
      {/* Background Animated Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-500/20 blur-[150px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[460px] px-6">
        
        {/* Navigation Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-emerald-500 uppercase tracking-widest transition-all mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Public System
          </Link>
        </motion.div>

        {/* Main Auth Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0f1e]/60 border border-white/10 rounded-[3.5rem] p-10 md:p-14 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Top Status Bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
            {isLoading && (
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '100%' }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
              />
            )}
          </div>

          {/* Branding */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] mx-auto mb-6">
              <Terminal size={32} />
            </div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
              ADMIN<span className="text-emerald-500">.ACCESS</span>
            </h1>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3 italic">Protocol_v4.0.2</p>
          </div>

          {/* Action Area */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold"
                >
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-slate-400 text-sm leading-relaxed mb-4">
              Authorized personnel only. Secure OAuth handshake required for <span className="text-white font-bold tracking-tight">Root Privileges</span>.
            </p>

            <motion.button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`w-full flex items-center justify-center gap-4 py-5 rounded-2xl font-black transition-all group relative overflow-hidden
                ${isLoading 
                  ? "bg-white/5 text-slate-500 cursor-not-allowed" 
                  : "bg-white text-black shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] hover:bg-emerald-50"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin text-emerald-500" />
                  <span className="text-[11px] uppercase tracking-widest italic">Authenticating...</span>
                </>
              ) : (
                <>
                  <FcGoogle size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm uppercase tracking-tighter italic">Google Workspace Login</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Security Metrics */}
          <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500 opacity-60" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">RSA_256</span>
            </div>
            <div className="flex flex-col items-center gap-2 border-l border-white/5 pl-10">
              <Zap size={16} className="text-blue-500 opacity-60" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Instant_Sync</span>
            </div>
          </div>
        </motion.div>

        {/* System Footer */}
        <div className="mt-10 flex flex-col items-center gap-1 opacity-20">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Bogura_Edge_Server // Cluster_Ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);