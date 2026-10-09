'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  BookOpen,
  Eye,
  School,
  ArrowLeft,
  FileText,
  Video,
  Share2,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { ResourceCard } from './ResourceCard';

export function ChannelDetailView() {
  const {
    channels,
    resources,
    selectedChannelId,
    navigateTo,
    isChannelFavourited,
    toggleFavouriteChannel,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'pdf'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const channel = channels.find((c) => c.id === selectedChannelId);

  if (!channel) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Channel not found</h2>
        <p className="text-sm text-slate-600 mt-2">
          The requested Teller channel does not exist or has been removed.
        </p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const isFav = isChannelFavourited(channel.id);

  // Resources belonging to this channel
  const channelResources = resources.filter((r) => r.channelId === channel.id);

  const filteredResources = channelResources.filter((r) => {
    if (activeTab === 'all') return true;
    return r.type === activeTab;
  });

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('explore')}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Resources</span>
        </button>

        {/* Channel Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Subtle stylized background header */}
          <div className="h-36 sm:h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative p-6 flex items-end">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md transition-colors flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Profile details strip */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-md bg-white shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {channel.name}
                    </h1>
                    <span title="Verified Student Teller">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-purple-600">{channel.handle}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <School className="w-4 h-4 text-slate-400" />
                    <span>{channel.university}</span>
                  </div>
                </div>
              </div>

              {/* Working Favourite Action Button */}
              <button
                onClick={() => toggleFavouriteChannel(channel.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  isFav
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-sm'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-600' : ''}`} />
                <span>{isFav ? 'Favourited Teller' : 'Favourite Channel'}</span>
              </button>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {channel.bio}
            </p>

            {/* Subject Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs font-semibold text-slate-500">Focus Subjects:</span>
              {channel.subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => navigateTo('explore', { subject: sub })}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Channel Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 max-w-lg tabular-nums">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {channelResources.length}
                </p>
                <p className="text-xs text-slate-500">Published Resources</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {channel.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">Total Views</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {channel.followerCount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">Student Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section & Filter Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Uploaded Study Materials
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredResources.length} verified notes & videos
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({channelResources.length})
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'pdf'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>PDF Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'video'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-purple-600" />
                <span>Videos</span>
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No resources in this filter</p>
              <p className="text-xs text-slate-500">
                This teller hasn&apos;t uploaded items of this type yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
