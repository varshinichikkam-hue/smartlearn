'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Heart,
  Database,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const { navigateTo, quickLogin, setBackendModalOpen, currentUser } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Quick Test Bar for Evaluators / Testers */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-300">Quick Test Switcher:</span>
            <span className="hidden sm:inline text-slate-400">
              Test SmartLearn as either role instantly without manual typing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => quickLogin('user-teller-1')}
              className="px-2.5 py-1 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/50 transition-colors"
            >
              Test as Teller (Dr. Priya)
            </button>
            <button
              onClick={() => quickLogin('user-learner-1')}
              className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 transition-colors"
            >
              Test as Learner (Jordan)
            </button>
            <button
              onClick={() => setBackendModalOpen(true)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <Database className="w-3 h-3 text-purple-400" />
              <span>Backend Schema</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Smart<span className="text-blue-400">Learn</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The student-to-student learning network where collegiate peers share handwritten lecture notes,
              curated cheat sheets, and technical walkthrough videos.
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
              <span>Made for college students worldwide</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Explore All Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('subjects')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Browse by Subject
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (currentUser?.role === 'teller') {
                      navigateTo('teller-dashboard');
                    } else {
                      navigateTo('auth', { authTab: 'signup', authRole: 'teller' });
                    }
                  }}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors text-left flex items-center gap-1"
                >
                  <span>Become a Teller</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Subjects */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Popular Subjects
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('explore', { subject: 'Programming' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Programming & Algorithms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore', { subject: 'Data Structures' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Data Structures
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore', { subject: 'DBMS' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Database Management (DBMS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore', { subject: 'Mathematics' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Engineering Mathematics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore', { subject: 'Electronics' })}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Electronics & Microcontrollers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Docs */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Community & Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  About SmartLearn
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Student FAQ & Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => setBackendModalOpen(true)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Supabase / PostgreSQL Schema</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact & Campus Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SmartLearn Platform. All student notes and video rights belong to their student authors.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Peer-Verified</span>
            <span>·</span>
            <span>Zero AI Distractions</span>
            <span>·</span>
            <span>Open Study Commons</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
