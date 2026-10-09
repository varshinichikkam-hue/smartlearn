'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { downloadResourceFile } from '@/lib/downloadHelper';
import {
  FileText,
  Video,
  Download,
  Bookmark,
  Heart,
  Eye,
  Calendar,
  ArrowLeft,
  Share2,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  School,
  ExternalLink,
  MessageSquare,
  Send,
} from 'lucide-react';
import { ResourceCard } from './ResourceCard';

export function ResourceDetailView() {
  const {
    resources,
    channels,
    selectedResourceId,
    navigateTo,
    isResourceSaved,
    toggleSaveResource,
    isChannelFavourited,
    toggleFavouriteChannel,
    currentUser,
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);

  // PDF Viewer State
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Student Comments Section State
  const [comments, setComments] = useState<
    { id: string; author: string; avatar: string; text: string; time: string }[]
  >([
    {
      id: 'c-1',
      author: 'Alex Henderson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80',
      text: 'The derivation on page 3 cleared up Dijkstra edge relaxation for me! Great breakdown.',
      time: '2 hours ago',
    },
    {
      id: 'c-2',
      author: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&q=80',
      text: 'Is this covered in the 4th semester syllabus or midterms? Highly recommending to our study group.',
      time: '1 day ago',
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const resource = resources.find((r) => r.id === selectedResourceId);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Resource not found</h2>
        <p className="text-sm text-slate-600 mt-2">
          The requested study resource could not be found or may have been deleted.
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

  const channel = channels.find((c) => c.id === resource.channelId);
  const isSaved = isResourceSaved(resource.id);
  const isTellerFav = channel ? isChannelFavourited(channel.id) : false;

  // Related resources from same subject (excluding current)
  const relatedResources = resources
    .filter((r) => r.subject === resource.subject && r.id !== resource.id)
    .slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const authorName = currentUser?.name || 'Fellow Student';
    const authorAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80';

    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author: authorName,
        avatar: authorAvatar,
        text: newCommentText.trim(),
        time: 'Just now',
      },
      ...prev,
    ]);
    setNewCommentText('');
  };

  const totalPages = resource.pageCount || 24;

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Resources</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => toggleSaveResource(resource.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved to Library' : 'Save Resource'}</span>
            </button>
          </div>
        </div>

        {/* Resource Header & Metadata */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              {resource.subject}
            </span>
            <span className="font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
              {resource.topic}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">
              Published {new Date(resource.createdAt).toLocaleDateString()}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 tabular-nums">{resource.views.toLocaleString()} views</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {resource.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            {resource.description}
          </p>

          {/* Action Row: Real Download & Author Pill */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {/* Author info & Channel quick link */}
            <div className="flex items-center gap-3">
              <img
                src={resource.tellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                alt={resource.tellerName}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-purple-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <button
                  onClick={() => navigateTo('channel-detail', { channelId: resource.channelId })}
                  className="text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>{resource.tellerName}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <p className="text-xs text-slate-500">Student Knowledge Teller</p>
              </div>

              {channel && (
                <button
                  onClick={() => toggleFavouriteChannel(channel.id)}
                  className={`ml-2 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isTellerFav
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 inline mr-1 ${isTellerFav ? 'fill-current text-rose-600' : ''}`} />
                  {isTellerFav ? 'Favourited' : 'Favourite Teller'}
                </button>
              )}
            </div>

            {/* Prominent Working Download Button */}
            <button
              onClick={() => downloadResourceFile(resource)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Permitted File ({resource.fileSize})</span>
            </button>
          </div>
        </div>

        {/* Primary Interactive Viewer Stage: Video or PDF */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {resource.type === 'video' ? (
            /* =================== VIDEO PLAYER =================== */
            <div className="space-y-0">
              <div className="relative aspect-16/9 bg-slate-950 w-full overflow-hidden flex items-center justify-center">
                <video
                  src={
                    resource.videoUrl ||
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  }
                  controls
                  className="w-full h-full object-contain"
                  poster={resource.thumbnailUrl || '/images/coding_study_thumb_1791559434489.jpg'}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Player Helper Toolbar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Duration:</span>
                  <span>{resource.duration || '20:00'}</span>
                  <span>·</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    1080p Full HD
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Need the slides & guide?</span>
                  <button
                    onClick={() => downloadResourceFile(resource)}
                    className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Lecture Package</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* =================== PDF / NOTES VIEWER =================== */
            <div className="space-y-0">
              {/* PDF Toolbar */}
              <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-800 truncate max-w-[240px]">
                    {resource.fileName}
                  </span>
                </div>

                {/* Page Navigation Controls */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-medium text-slate-700 tabular-nums">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-40"
                    title="Next page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Zoom Controls & Download */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-medium text-slate-700 w-12 text-center tabular-nums">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => downloadResourceFile(resource)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* PDF Document Canvas / Content Display */}
              <div className="p-6 sm:p-12 bg-slate-200/60 min-h-[500px] flex justify-center overflow-auto">
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-slate-300 p-8 sm:p-12 transition-transform duration-150 text-slate-800 space-y-6"
                >
                  <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-blue-600">
                        SmartLearn Academic Notes · {resource.subject}
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                        {resource.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Author: {resource.tellerName} · Topic: {resource.topic}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Page {currentPage}</span>
                  </div>

                  {/* Formatted Notes Body */}
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line font-mono bg-slate-50/80 p-5 rounded-xl border border-slate-200">
                    {resource.contentPreview || `
1. CORE DEFINITIONS & THEORETICAL INVARIANTS
This document contains lecture summaries transcribed for ${resource.subject}: ${resource.topic}.
Key concepts include operational bounds, state invariants, and step-by-step problem reduction.

2. WORKED METHODOLOGIES & FORMULAS
- Asymptotic efficiency bounds.
- Memory layout and cache-friendly data arrangements.
- Boundary condition handling during exams.

3. COMMON MIDTERM QUESTIONS & DERIVATIONS
- Prove that invariant holds for base case n = 1.
- Inductive hypothesis step: assume true for k, show for k + 1.
- Deduce worst-case scenario execution profile.
                    `}
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
                    <span>Verified Peer Study Material</span>
                    <span>SmartLearn Student Network</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Discussion / Q&A Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Student Discussions & Questions ({comments.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Ask questions or share exam tips</span>
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Post a question or note about this resource..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Post</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4 pt-2">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <img
                  src={c.avatar}
                  alt={c.author}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{c.author}</span>
                    <span className="text-[11px] text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Resources from the same subject */}
        {relatedResources.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-slate-900">
              More in {resource.subject}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedResources.map((rel) => (
                <ResourceCard key={rel.id} resource={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
