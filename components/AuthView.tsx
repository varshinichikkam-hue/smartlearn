'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Upload,
  BookOpen,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export function AuthView() {
  const {
    login,
    register,
    quickLogin,
    authInitialTab,
    authInitialRole,
    navigateTo,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup'>(authInitialTab);
  const [role, setRole] = useState<UserRole>(authInitialRole);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (tab === 'login') {
      const res = login(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Login failed. Please check credentials.');
      }
    } else {
      const res = register(name, email, password, role);
      if (!res.success) {
        setErrorMessage(res.error || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {tab === 'login' ? 'Sign in to SmartLearn' : 'Create your Student Account'}
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {tab === 'login'
              ? 'Access your bookmarked study notes, favourite tellers, and shared materials.'
              : 'Join fellow college students sharing knowledge and exam preparation guides.'}
          </p>
        </div>

        {/* Quick Test Demo Account Strip for Easy Testing */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Instant Demo Logins (1-Click Test):</span>
          </div>
          <p className="text-[11px] text-blue-700">
            Select a pre-configured student profile to test the role instantly without typing:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => quickLogin('user-teller-1')}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-center transition-colors shadow-xs"
            >
              Teller: Dr. Priya Sharma
            </button>
            <button
              type="button"
              onClick={() => quickLogin('user-learner-1')}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-center transition-colors shadow-xs"
            >
              Learner: Jordan Lee
            </button>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <>
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Your Role *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('learner')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        role === 'learner'
                          ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs">Learner</p>
                        <p className="text-[10px] text-slate-500 font-normal">
                          Read notes, watch videos, save resources
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('teller')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        role === 'teller'
                          ? 'border-purple-600 bg-purple-50/60 text-purple-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Upload className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs">Teller</p>
                        <p className="text-[10px] text-slate-500 font-normal">
                          Upload PDFs, lecture notes and study videos
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College or Personal Email *
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., student@university.edu"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{tab === 'login' ? 'Sign In to Dashboard' : 'Register & Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch tab text link */}
          <div className="text-center pt-2 border-t border-slate-100">
            {tab === 'login' ? (
              <p className="text-xs text-slate-500">
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setTab('signup');
                    setErrorMessage(null);
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMessage(null);
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
