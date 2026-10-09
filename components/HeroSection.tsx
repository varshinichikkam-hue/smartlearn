'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  ArrowRight,
  Upload,
  Users,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection() {
  const { navigateTo, currentUser } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('explore', { search: localSearch.trim() });
  };

  const handleBecomeTeller = () => {
    if (!currentUser) {
      navigateTo('auth', { authTab: 'signup', authRole: 'teller' });
    } else if (currentUser.role === 'teller') {
      navigateTo('teller-dashboard');
    } else {
      // Prompt learner or switch role
      navigateTo('teller-dashboard');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-12 lg:py-20 border-b border-slate-100">
      {/* Subtle background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/20 via-purple-200/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Search, Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mission Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Peer-to-Peer Academic Commons</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Learn Together.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Share Knowledge.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Discover notes, PDFs, and educational videos shared by fellow students.
              Study faster with semester-tested summaries and exam preparation materials.
            </p>

            {/* Working Prominent Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-2xl bg-white p-2 rounded-2xl shadow-md border border-slate-200 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search by subject, topic (e.g., BFS, Normalization, Python)..."
                  className="w-full pl-3 pr-2 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular Quick Searches */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Quick explore:</span>
              {['Data Structures', 'DBMS Normalization', 'Linear Algebra', 'Microcontrollers'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => navigateTo('explore', { search: term })}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Two Main Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('explore')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Learning</span>
              </button>

              <button
                onClick={handleBecomeTeller}
                className="px-6 py-3.5 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 font-semibold text-sm rounded-xl border border-purple-200 hover:border-purple-300 transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-purple-600" />
                <span>Become a Teller</span>
              </button>
            </div>

            {/* Social Proof / Metrics adjacent to value proposition */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">1,450+</p>
                <p className="text-xs text-slate-500">Student Notes & Videos</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">280+</p>
                <p className="text-xs text-slate-500">Verified Tellers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">12,000+</p>
                <p className="text-xs text-slate-500">Active Learners</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/images/smartlearn_hero_1791559402386.jpg"
                  alt="College students studying together with laptops and notes in campus library"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Floating highlight card 1: PDF notes verified */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Handwritten Notes</p>
                    <p className="text-[11px] text-slate-500">PDFs, Formulas & Proofs</p>
                  </div>
                </div>

                {/* Floating highlight card 2: Peer Videos */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Curated Explanations</p>
                    <p className="text-[11px] text-slate-500">Step-by-step walkthroughs</p>
                  </div>
                </div>
              </div>

              {/* Bottom tag strip */}
              <div className="p-3 bg-slate-50/80 rounded-xl mt-2 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>College-vetted peer study community</span>
                </div>
                <span className="text-[11px] text-slate-400">Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
