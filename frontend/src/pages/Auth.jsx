import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, LogIn, Gift, AlertCircle } from 'lucide-react';

const Auth = () => {
  const { login, register, authError } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [refCode, setRefCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLocalError('Please fill in all credentials.');
      return;
    }
    setLoading(true);
    setLocalError('');
    try {
      const loggedUser = await login(loginEmail, loginPassword);
      if (loggedUser.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Error is stored in authError and local context
      setLocalError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setLocalError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setLocalError('');
    try {
      await register(regName, regEmail, regPassword, refCode);
      navigate('/');
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 sm:px-6">
      <div className="bg-cream-light dark:bg-darkCard rounded-[40px] border border-cream dark:border-darkBg-light shadow-xl overflow-hidden p-8 space-y-6">
        
        {/* Logo and Greeting */}
        <div className="text-center space-y-2">
          <span className="text-4xl">🍩</span>
          <h2 className="text-2xl font-black text-textColor-light dark:text-textColor-dark">
            {isLoginTab ? 'Welcome Back!' : 'Join the Donut Family'}
          </h2>
          <p className="text-xs text-textColor-light/60 dark:text-textColor-dark/60">
            {isLoginTab ? 'Log in to place orders and track loyalty points.' : 'Register to earn welcome rewards and referral bonuses.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-cream dark:bg-darkBg p-1.5 rounded-full border border-cream-dark/20 dark:border-darkBg-light">
          <button
            onClick={() => { setIsLoginTab(true); setLocalError(''); }}
            className={`flex-1 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              isLoginTab
                ? 'bg-primary text-white shadow-sm'
                : 'text-textColor-light/50 dark:text-textColor-dark/50 hover:text-primary'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setLocalError(''); }}
            className={`flex-1 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              !isLoginTab
                ? 'bg-primary text-white shadow-sm'
                : 'text-textColor-light/50 dark:text-textColor-dark/50 hover:text-primary'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Notifications */}
        {(localError || authError) && (
          <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-2xl text-xs font-semibold flex items-start space-x-2 animate-fade-in border border-red-500/10">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{localError || authError}</span>
          </div>
        )}

        {/* FORMS */}
        {isLoginTab ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <Mail size={12} className="text-primary" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <Lock size={12} className="text-primary" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 text-xs"
            >
              <span>{loading ? 'Logging in...' : 'Sign In'}</span>
              <LogIn size={14} />
            </button>
            
            <p className="text-[10px] text-center text-textColor-light/50 dark:text-textColor-dark/50">
              Demo credentials: <span className="font-bold">admin@donuts.com</span> / <span className="font-bold">admin123</span>
            </p>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <User size={12} className="text-primary" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <Mail size={12} className="text-primary" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <Lock size={12} className="text-primary" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                <Gift size={12} className="text-primary" />
                <span>Referral Code (Optional)</span>
              </label>
              <input
                type="text"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                placeholder="e.g. DONUTS-ABC12"
                className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold uppercase font-mono"
              />
              <span className="text-[9px] text-textColor-light/50 dark:text-textColor-dark/50 leading-relaxed block pt-1">
                Earn 100 extra loyalty points if a friend referred you!
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 text-xs"
            >
              <span>{loading ? 'Creating Account...' : 'Register'}</span>
              <UserPlus size={14} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Auth;
