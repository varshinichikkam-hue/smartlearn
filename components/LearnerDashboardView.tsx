'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { POPULAR_SUBJECTS } from '@/data/seedData';
import { downloadResourceFile } from '@/lib/downloadHelper';
import {
  Search,
  BookOpen,
  Bookmark,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  Video,
  Download,
  Trash2,
  ExternalLink,
  School,
  Compass,
} from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { TellerCard } from './TellerCard';

export function LearnerDashboardView() {
  const {
    currentUser,
    resources,
    channels,
    savedResourceIds,
    favouriteChannelIds,
    viewingHistory,
    navigateTo,
    toggleSaveResource,
    toggleFavouriteChannel,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'saved' | 'favourites' | 'history' | 'recommended'
  >('saved');

  const [searchQuery, setSearchQuery] = useState('');

  // 1. Saved Resources list
  const savedResources = resources.filter((r) => savedResourceIds.includes(r.id));

  // 2. Favourite Tellers list
  const favouriteTellers = channels.filter((c) => favouriteChannelIds.includes(c.id));

  // 3. Recently Viewed Resources list (ordered by most recent)
  const historyResources = viewingHistory
    .map((h) => {
      const found = resources.find((r) => r.id === h.resourceId);
      return found ? { ...found, viewedAt: h.viewedAt } : null;
    })
    .filter(Boolean) as (typeof resources[0] & { viewedAt: string })[];

  // 4. Rule-based recommendations:
  // Find subjects that the user has saved or viewed
  const preferredSubjects = Array.from(
    new Set([
      ...savedResources.map((r) => r.subject),
      ...historyResources.map((r) => r.subject),
    ])
  );

  // Recommend popular resources in these subjects (excluding already saved ones),
  // or fall back to overall most viewed resources
  const recommendedResources = resources
    .filter((r) => !savedResourceIds.includes(r.id))
    .sort((a, b) => {
      const aMatches = preferredSubjects.includes(a.subject) ? 1 : 0;
      const bMatches = preferredSubjects.includes(b.subject) ? 1 : 0;
      if (bMatches !== aMatches) return bMatches - aMatches;
      return b.views - a.views;
    })
    .slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('explore', { search: searchQuery.trim() });
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80'}
                alt={currentUser?.name || 'Learner'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Learner Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, {currentUser?.name || 'Student'}!
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Access your bookmarked study notes, favourite tellers, and recent lecture reviews.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('explore')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 self-start sm:self-auto transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Materials</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <div className="flex-1 flex items-center pl-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search subjects, lecture notes, or Tellers..."
                className="w-full pl-3 pr-2 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Search
            </button>
          </form>

          {/* Subject Quick Jump Bar */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-500 mb-2">Browse Subjects:</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SUBJECTS.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => navigateTo('explore', { subject: sub.name })}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium transition-colors"
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'saved'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>My Saved Resources ({savedResources.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('favourites')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'favourites'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favourite Tellers ({favouriteTellers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'history'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Recently Viewed ({historyResources.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'recommended'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Recommended ({recommendedResources.length})</span>
            </button>
          </div>

          {/* TAB 1: SAVED RESOURCES */}
          {activeTab === 'saved' && (
            <div>
              {savedResources.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                  <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">No saved resources yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When browsing Explore or subject pages, click the bookmark icon on any card to save it here for quick exam revision.
                  </p>
                  <button
                    onClick={() => navigateTo('explore')}
                    className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl"
                  >
                    Browse Study Resources
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FAVOURITE TELLERS */}
          {activeTab === 'favourites' && (
            <div>
              {favouriteTellers.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                  <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">No favourite tellers yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Follow senior students, TAs, and peer creators whose notes and videos help you understand difficult concepts.
                  </p>
                  <button
                    onClick={() => navigateTo('explore')}
                    className="px-5 py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-xl"
                  >
                    Discover Top Tellers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favouriteTellers.map((channel) => (
                    <TellerCard key={channel.id} channel={channel} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECENTLY VIEWED */}
          {activeTab === 'history' && (
            <div>
              {historyResources.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">No viewing history yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Open any study guide, PDF, or video solution, and it will be recorded here so you can easily resume studying.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {historyResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RECOMMENDED FOR YOU (RULE-BASED) */}
          {activeTab === 'recommended' && (
            <div className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between text-xs text-blue-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Recommendations are selected using transparent subject-matching rules based on your saved and viewed topics: {' '}
                    <strong>{preferredSubjects.slice(0, 3).join(', ') || 'Core Engineering Subjects'}</strong>.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
