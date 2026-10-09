'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { POPULAR_SUBJECTS } from '@/data/seedData';
import {
  Code2,
  Binary,
  Database,
  Sigma,
  Cpu,
  Globe,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Binary: <Binary className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Sigma: <Sigma className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

export function SubjectBrowse() {
  const { navigateTo, resources } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Curriculum Taxonomy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular College Subjects
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Select a core engineering or science discipline to browse peer notes, formula sheets, and video solutions.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View all subjects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SUBJECTS.map((sub) => {
            // Count actual resources in store matching this subject
            const actualCount = resources.filter(
              (r) => r.subject.toLowerCase() === sub.name.toLowerCase()
            ).length;

            return (
              <button
                key={sub.name}
                onClick={() => navigateTo('explore', { subject: sub.name })}
                className="group p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col justify-between focus:outline-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 group-hover:text-purple-600 group-hover:scale-105 transition-all">
                      {ICON_MAP[sub.iconName] || <BookOpen className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 tabular-nums">
                      {actualCount > 0 ? `${actualCount} resources` : `${sub.count} items`}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                  <span>Explore topics & notes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
