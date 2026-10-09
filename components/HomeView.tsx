'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { HeroSection } from './HeroSection';
import { SubjectBrowse } from './SubjectBrowse';
import { ResourceCard } from './ResourceCard';
import { TellerCard } from './TellerCard';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Upload,
  CheckCircle2,
  FileText,
  Video,
} from 'lucide-react';

export function HomeView() {
  const { resources, channels, navigateTo, currentUser } = useApp();

  // Sort resources by creation date for recently uploaded
  const recentResources = [...resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Popular tellers sorted by follower count
  const popularChannels = [...channels]
    .sort((a, b) => b.followerCount - a.followerCount)
    .slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Popular Subjects Carousel/Grid */}
      <SubjectBrowse />

      {/* 3. Recently Uploaded Resources Section */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Fresh Notes & Walkthroughs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Recently Uploaded Resources
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Latest student contributions across engineering, sciences, and mathematics.
              </p>
            </div>

            <button
              onClick={() => navigateTo('explore', { type: 'all' })}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Explore all resources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Tellers Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                Top Student Creators
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Popular Knowledge Tellers
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Follow top teaching assistants and students sharing curated study sheets.
              </p>
            </div>

            <button
              onClick={() => navigateTo('explore')}
              className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Discover all creators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularChannels.map((ch) => (
              <TellerCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dual Community Call to Action */}
      <section className="py-16 bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-800">
                Peer-Driven Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Empower your peers while mastering your own coursework.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Teaching a concept is the fastest way to understand it deeply. Join hundreds of students turning their semester study guides into community knowledge.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    if (!currentUser) {
                      navigateTo('auth', { authTab: 'signup', authRole: 'teller' });
                    } else {
                      navigateTo('teller-dashboard');
                    }
                  }}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Start as a Knowledge Teller</span>
                </button>
                <button
                  onClick={() => navigateTo('explore')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Browse as a Learner</span>
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>The SmartLearn Peer Covenant</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">100% Free Peer Access</strong>
                  All student-uploaded study sheets, PDF guides, and video solutions are open to everyone without paywalls.
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Author Recognition</strong>
                  Every resource visibly credits its student creator, with direct channel links and follower stats.
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Authentic Study Material</strong>
                  Notes and questions taken straight from real college labs, midterm review sessions, and campus study groups.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
