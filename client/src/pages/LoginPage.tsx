import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  KeyRound
} from 'lucide-react';

export const LoginPage: React.FC<{
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}> = ({ onShowToast }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const user = await login(email, password);
      onShowToast('success', 'Authentication Successful', `Logged in as ${user.name} (${user.role.toUpperCase()})`);
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
      onShowToast('error', 'Login Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (roleType: 'user' | 'admin') => {
    setErrorMessage(null);
    const demoEmail = roleType === 'admin' ? 'admin@floodsafe.lk' : 'citizen@floodsafe.lk';
    const demoPassword = roleType === 'admin' ? 'Admin@123' : 'Citizen@123';

    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      setIsSubmitting(true);
      const user = await login(demoEmail, demoPassword);
      onShowToast('success', 'Demo Login Successful', `Logged in as ${user.name} (${user.role.toUpperCase()})`);
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/25">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Sign In to Flood-Safe-LK
        </h1>
        <p className="text-xs text-slate-400">
          Access your community reporting dashboard or emergency admin portal.
        </p>
      </div>

      {/* Quick Demo Credentials Banner for Examiner/Grading */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/50 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>1-Click Evaluator Demo Logins</span>
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">Pre-configured</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('user')}
            disabled={isSubmitting}
            className="flex flex-col items-start p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-left transition"
          >
            <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Citizen Login</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">citizen@floodsafe.lk</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            disabled={isSubmitting}
            className="flex flex-col items-start p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-left transition"
          >
            <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin DMC Login</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">admin@floodsafe.lk</span>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. citizen@floodsafe.lk or admin@floodsafe.lk"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating with MongoDB...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Don't have a volunteer or citizen account?{' '}
          <Link to="/register" className="text-cyan-400 hover:underline font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
