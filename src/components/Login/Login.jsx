import React, { useState, memo, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Terminal, ShieldCheck, Zap, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router'; 
import { AuthContext } from '../../Auth/Context/AuthContext';
// AuthContext import koro (Path ta thik kore nio)

const Login = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Jodi user age thekei logged in thake, take dashboard-e pathiye dao
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Apnar context theke value call hobe
      await signInWithGoogle();
      
      // Success hole navigate hobe (useEffect handle korche, kintu eikhaneo deya safe)
      navigate('/'); 

    } catch (err) {
      setError("Authorization failed. Ensure your Google account is verified.");
      console.error("Auth Handshake Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-hidden flex items-center justify-center">
      
      {/* Background Simulation Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-500/20 blur-[150px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[460px] px-6">
        
        {/* Navigation Home */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-emerald-500 uppercase tracking-widest transition-all mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            System Home
          </Link>
        </motion.div>

        {/* Auth Module */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0f1e]/80 border border-white/10 rounded-[3.5rem] p-10 md:p-14 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
            {isLoading && (
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '100%' }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
              />
            )}
          </div>

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_10px_30px_rgba(16,185,129,0.3)] mx-auto mb-6 rotate-3">
              <Terminal size={32} />
            </div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
              SECURE<span className="text-emerald-500">.LOGIN</span>
            </h1>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Auth_Protocol: Active</p>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[11px] font-bold"
                >
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-slate-400 text-sm font-medium leading-relaxed italic">
              Authorized Root access only. Handshake via <span className="text-white font-bold">Google Cloud Identity</span>.
            </p>

            <motion.button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`w-full flex items-center justify-center gap-4 py-5 rounded-2xl font-black transition-all group relative overflow-hidden
                ${isLoading 
                  ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5" 
                  : "bg-white text-black shadow-2xl hover:bg-emerald-50"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 size={18} className="animate-spin text-emerald-500" />
                  <span className="text-[10px] uppercase tracking-widest">Verifying Node...</span>
                </div>
              ) : (
                <>
                  <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs uppercase tracking-tighter italic">Launch Google Auth</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Infrastructure Metrics */}
          <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-10">
            <div className="text-center">
              <ShieldCheck size={16} className="text-emerald-500 opacity-60 mx-auto mb-1" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Encrypted</span>
            </div>
            <div className="text-center border-l border-white/5 pl-10">
              <Zap size={16} className="text-blue-500 opacity-60 mx-auto mb-1" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Sync_Ready</span>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Metadata */}
        <p className="text-center mt-10 text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] opacity-40">
          PORTFOLIO_OS // 2026_BUILD_STABLE
        </p>
      </div>
    </div>
  );
};

export default memo(Login);