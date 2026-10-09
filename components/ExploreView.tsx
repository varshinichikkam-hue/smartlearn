'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { POPULAR_SUBJECTS } from '@/data/seedData';
import {
  Search,
  SlidersHorizontal,
  X,
  FileText,
  Video,
  BookOpen,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { ResourceCard } from './ResourceCard';

export function ExploreView() {
  const {
    resources,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
  } = useApp();

  // Real-time filtering against actual resources state
  const filteredResources = resources.filter((res) => {
    // Subject filter
    if (selectedSubject && res.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && res.type !== selectedType) {
      return false;
    }

    // Search query filter (matches title, description, subject, topic, or tellerName)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchSubject = res.subject.toLowerCase().includes(q);
      const matchTopic = res.topic.toLowerCase().includes(q);
      const matchTeller = res.tellerName.toLowerCase().includes(q);

      if (!matchTitle && !matchDesc && !matchSubject && !matchTopic && !matchTeller) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'views') {
      return b.views - a.views;
    }
    if (sortBy === 'favourites') {
      return b.favouritesCount - a.favouritesCount;
    }
    return 0;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSubject(null);
    setSelectedType('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    Boolean(searchQuery) || Boolean(selectedSubject) || selectedType !== 'all';

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Academic Commons
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Study Materials
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Browse handwritten notes, formula cheat sheets, and video explanations uploaded by students.
              </p>
            </div>

            {/* Total Results Count */}
            <div className="text-xs text-slate-500 tabular-nums self-start sm:self-auto">
              Found <strong className="text-slate-900">{sortedResources.length}</strong> matching resources
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative bg-white rounded-2xl shadow-xs border border-slate-200 p-2 flex items-center">
            <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, subject, topic (e.g. Graph, Normalization), or student author..."
              className="w-full pl-3 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg mr-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          {/* Subject Pills Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">Filter by Subject:</span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedSubject === null
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Subjects
              </button>

              {POPULAR_SUBJECTS.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() =>
                    setSelectedSubject(selectedSubject === sub.name ? null : sub.name)
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedSubject === sub.name
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter & Sort Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {/* Content Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Content Type:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedType === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setSelectedType('pdf')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    selectedType === 'pdf'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>PDF Notes</span>
                </button>
                <button
                  onClick={() => setSelectedType('video')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    selectedType === 'video'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-purple-600" />
                  <span>Videos</span>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="newest">Newest First</option>
                <option value="views">Most Viewed</option>
                <option value="favourites">Most Favourited</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {sortedResources.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">No matching study resources found</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We couldn&apos;t find any materials matching your search &ldquo;{searchQuery}&rdquo; and active filters.
                Try adjusting your search terms or clearing your filters.
              </p>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
