'use client';

import React from 'react';
import { Resource } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Video,
  Bookmark,
  Eye,
  Heart,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { navigateTo, isResourceSaved, toggleSaveResource } = useApp();
  const saved = isResourceSaved(resource.id);

  const handleCardClick = () => {
    navigateTo('resource-detail', { resourceId: resource.id });
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveResource(resource.id);
  };

  const handleTellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('channel-detail', { channelId: resource.channelId });
  };

  // Determine fallback or thumb image
  const displayThumb =
    resource.thumbnailUrl ||
    (resource.type === 'pdf'
      ? '/images/notes_study_desk_1791559417026.jpg'
      : '/images/coding_study_thumb_1791559434489.jpg');

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
        <img
          src={displayThumb}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback gradient if path fails
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Content Type & Duration/Pages Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs">
          {resource.type === 'pdf' ? (
            <>
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>PDF Notes</span>
              {resource.pageCount && <span>· {resource.pageCount} pgs</span>}
            </>
          ) : (
            <>
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <span>Video</span>
              {resource.duration && <span>· {resource.duration}</span>}
            </>
          )}
        </div>

        {/* Save Bookmark Action */}
        <button
          type="button"
          onClick={handleSaveToggle}
          title={saved ? 'Remove from Saved' : 'Save for later'}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
            saved
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900 hover:text-white'
          }`}
          aria-label={saved ? 'Unsave resource' : 'Save resource'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Subject tag kicker on bottom of thumb */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
          {resource.subject}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <span className="font-medium text-purple-700">{resource.topic}</span>
            <span aria-hidden="true">·</span>
            <span>{resource.fileSize}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {resource.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Bottom Author & Metrics Section */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Author avatar & link */}
          <button
            type="button"
            onClick={handleTellerClick}
            className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity min-w-0"
          >
            <img
              src={resource.tellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={resource.tellerName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-semibold text-slate-800 truncate">
              {resource.tellerName}
            </span>
          </button>

          {/* Views & Favourites Counters */}
          <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0 tabular-nums">
            <div className="flex items-center gap-1" title="Views">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{resource.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1" title="Saves / Favourites">
              <Heart className={`w-3.5 h-3.5 ${resource.favouritesCount > 0 ? 'text-rose-500 fill-rose-500/20' : 'text-slate-400'}`} />
              <span>{resource.favouritesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
