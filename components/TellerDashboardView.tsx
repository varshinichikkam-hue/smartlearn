'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResourceType, Resource } from '@/types';
import { POPULAR_SUBJECTS } from '@/data/seedData';
import {
  Upload,
  Plus,
  FileText,
  Video,
  Edit,
  Trash2,
  Eye,
  Heart,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Settings,
  X,
  FileCheck,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react';

export function TellerDashboardView() {
  const {
    currentUser,
    getUserChannel,
    updateChannel,
    resources,
    addResource,
    updateResource,
    deleteResource,
    navigateTo,
  } = useApp();

  const channel = getUserChannel();

  // Modal states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editChannelModalOpen, setEditChannelModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadSubject, setUploadSubject] = useState(POPULAR_SUBJECTS[0].name);
  const [uploadTopic, setUploadTopic] = useState('');
  const [uploadType, setUploadType] = useState<ResourceType>('pdf');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Edit Channel Form State
  const [channelName, setChannelName] = useState(channel?.name || '');
  const [channelBio, setChannelBio] = useState(channel?.bio || '');
  const [channelUniv, setChannelUniv] = useState(channel?.university || '');

  // Filter tellers own resources
  const myResources = resources.filter(
    (r) => (channel && r.channelId === channel.id) || (currentUser && r.tellerId === currentUser.id)
  );

  const totalViews = myResources.reduce((acc, curr) => acc + curr.views, 0);
  const totalFavs = myResources.reduce((acc, curr) => acc + curr.favouritesCount, 0);

  // File selection & validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    // Validate size (max 50MB for video, 20MB for PDF in demo)
    const maxSize = uploadType === 'video' ? 50 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(
        `File is too large. Maximum size for ${uploadType === 'video' ? 'videos is 50MB' : 'PDFs is 20MB'}.`
      );
      setSelectedFile(null);
      return;
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (uploadType === 'pdf') {
      if (!['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext || '')) {
        setFileError('Please select a valid document format (.pdf, .doc, .docx, .txt)');
        setSelectedFile(null);
        return;
      }
    } else {
      if (!['mp4', 'webm', 'mov', 'mkv'].includes(ext || '')) {
        setFileError('Please select a valid video format (.mp4, .webm, .mov)');
        setSelectedFile(null);
        return;
      }
    }

    setSelectedFile(file);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      setFileError('Please enter a descriptive title for your resource.');
      return;
    }
    if (!uploadTopic.trim()) {
      setFileError('Please enter a specific topic (e.g., Tree Traversals, Normalization).');
      return;
    }
    if (!selectedFile) {
      setFileError('Please choose a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    // Simulate realistic upload progress
    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 95;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(timer);
      setUploadProgress(100);

      // Create an object URL so the uploaded file can be actually downloaded or played!
      const fileUrl = URL.createObjectURL(selectedFile);
      const formattedSize = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;

      const newRes = addResource({
        title: uploadTitle.trim(),
        description: uploadDesc.trim() || 'Uploaded study guide and peer reference notes.',
        subject: uploadSubject,
        topic: uploadTopic.trim(),
        type: uploadType,
        fileName: selectedFile.name,
        fileSize: formattedSize,
        fileUrl: fileUrl,
        pageCount: uploadType === 'pdf' ? Math.floor(Math.random() * 25) + 12 : undefined,
        duration: uploadType === 'video' ? '18:30' : undefined,
        thumbnailUrl:
          uploadType === 'pdf'
            ? '/images/notes_study_desk_1791559417026.jpg'
            : '/images/coding_study_thumb_1791559434489.jpg',
      });

      setIsUploading(false);
      setUploadModalOpen(false);
      setUploadSuccessMessage(`Successfully published "${newRes.title}" to SmartLearn!`);
      setTimeout(() => setUploadSuccessMessage(null), 5000);

      // Reset form
      setUploadTitle('');
      setUploadDesc('');
      setUploadTopic('');
      setSelectedFile(null);
      setUploadProgress(0);
      setFileError(null);
    }, 1200);
  };

  const handleSaveChannelProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateChannel({
      name: channelName.trim() || channel?.name,
      bio: channelBio.trim() || channel?.bio,
      university: channelUniv.trim() || channel?.university,
    });
    setEditChannelModalOpen(false);
  };

  const handleSaveEditResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;
    updateResource(editingResource.id, {
      title: editingResource.title,
      description: editingResource.description,
      subject: editingResource.subject,
      topic: editingResource.topic,
    });
    setEditingResource(null);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Alert Banner */}
        {uploadSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{uploadSuccessMessage}</span>
            </div>
            <button
              onClick={() => setUploadSuccessMessage(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Teller Welcome Banner & Channel Header */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={channel?.avatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'}
                alt={channel?.name || 'Channel'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-purple-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {channel?.name || `${currentUser?.name}'s Study Channel`}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-purple-600 font-medium">
                  {channel?.handle || '@student_teller'} · {channel?.university || 'Campus'}
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                  {channel?.bio || 'Share lecture notes, PDFs and videos with fellow students.'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setChannelName(channel?.name || '');
                  setChannelBio(channel?.bio || '');
                  setChannelUniv(channel?.university || '');
                  setEditChannelModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Edit Channel</span>
              </button>

              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs hover:shadow-sm flex items-center gap-2 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Resource</span>
              </button>
            </div>
          </div>

          {/* Teller Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 tabular-nums">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Uploaded Resources</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{myResources.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Total Resource Views</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalViews.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Student Favourites</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalFavs.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Channel Followers</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {(channel?.followerCount || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Resources List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Manage Uploaded Resources
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every published item is publicly searchable and accessible in Explore
              </p>
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Resource</span>
            </button>
          </div>

          {myResources.length === 0 ? (
            <div className="py-16 text-center space-y-4 border-2 border-dashed border-slate-200 rounded-2xl p-8">
              <Upload className="w-10 h-10 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-slate-800">No resources uploaded yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Start by uploading your first PDF notes, formula sheets, or video solutions to share with peers.
                </p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl"
              >
                Upload First Resource
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="pb-3 pr-4">Resource Details</th>
                    <th className="pb-3 px-4">Subject & Topic</th>
                    <th className="pb-3 px-4">Type</th>
                    <th className="pb-3 px-4 tabular-nums">Views</th>
                    <th className="pb-3 px-4 tabular-nums">Saves</th>
                    <th className="pb-3 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myResources.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 pr-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            {res.type === 'pdf' ? (
                              <FileText className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Video className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <button
                              onClick={() => navigateTo('resource-detail', { resourceId: res.id })}
                              className="font-bold text-slate-900 hover:text-blue-600 text-left line-clamp-1 transition-colors"
                            >
                              {res.title}
                            </button>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {res.fileName} · {res.fileSize}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-800">{res.subject}</span>
                        <p className="text-[11px] text-purple-600">{res.topic}</p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            res.type === 'pdf'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          {res.type === 'pdf' ? 'PDF' : 'Video'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap tabular-nums text-slate-600 font-medium">
                        {res.views.toLocaleString()}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap tabular-nums text-slate-600 font-medium">
                        {res.favouritesCount}
                      </td>

                      <td className="py-4 pl-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigateTo('resource-detail', { resourceId: res.id })}
                            title="View Public Resource"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingResource(res)}
                            title="Edit Resource"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(res.id)}
                            title="Delete Resource"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===================== UPLOAD RESOURCE MODAL ===================== */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Upload Educational Resource</h3>
                    <p className="text-xs text-slate-500">Publish study materials for college peers</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!isUploading) setUploadModalOpen(false);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {fileError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              <form onSubmit={handlePublish} className="space-y-4">
                {/* Resource Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Resource Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setUploadType('pdf');
                        setSelectedFile(null);
                        setFileError(null);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        uploadType === 'pdf'
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs">PDF / Notes</p>
                        <p className="text-[10px] text-slate-500">Cheat sheets & proofs</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUploadType('video');
                        setSelectedFile(null);
                        setFileError(null);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        uploadType === 'video'
                          ? 'border-purple-600 bg-purple-50/50 text-purple-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Video className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs">Educational Video</p>
                        <p className="text-[10px] text-slate-500">Walkthrough solution</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Resource Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Complete AVL Trees & Rotations Illustrated Guide"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Subject & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject *
                    </label>
                    <select
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    >
                      {POPULAR_SUBJECTS.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Topic *
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadTopic}
                      onChange={(e) => setUploadTopic(e.target.value)}
                      placeholder="e.g., Tree Traversals, Normalization"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description & Key Takeaways
                  </label>
                  <textarea
                    rows={3}
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    placeholder="Briefly describe what students will learn from this material..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* File Upload Selector & Drag Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select File ({uploadType === 'pdf' ? '.pdf, .docx, .txt' : '.mp4, .webm'}) *
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl p-4 text-center bg-slate-50/50 cursor-pointer relative transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={
                        uploadType === 'pdf'
                          ? '.pdf,.doc,.docx,.txt,.md'
                          : '.mp4,.webm,.mov,.mkv'
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-700">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-semibold">{selectedFile.name}</span>
                        <span className="text-[11px] text-slate-500">
                          ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="text-xs font-medium text-slate-700">
                          Click to browse or drag file here
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Max size: {uploadType === 'video' ? '50MB' : '20MB'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar (when uploading) */}
                {isUploading && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-slate-600 font-medium">
                      <span>Uploading & verifying file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2"
                  >
                    {isUploading ? (
                      <span>Publishing...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Publish to SmartLearn</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== EDIT CHANNEL MODAL ===================== */}
        {editChannelModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-lg font-bold text-slate-900">Edit Channel Profile</h3>
                <button
                  onClick={() => setEditChannelModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveChannelProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    required
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University / College
                  </label>
                  <input
                    type="text"
                    value={channelUniv}
                    onChange={(e) => setChannelUniv(e.target.value)}
                    placeholder="e.g., Faculty of Engineering"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Channel Description / Bio
                  </label>
                  <textarea
                    rows={3}
                    value={channelBio}
                    onChange={(e) => setChannelBio(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditChannelModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== EDIT RESOURCE MODAL ===================== */}
        {editingResource && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-lg font-bold text-slate-900">Edit Resource Details</h3>
                <button
                  onClick={() => setEditingResource(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditResource} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingResource.title}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={editingResource.subject}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, subject: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    {POPULAR_SUBJECTS.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={editingResource.topic}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, topic: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingResource.description}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingResource(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
                  >
                    Update Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== DELETE CONFIRMATION MODAL ===================== */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete this resource?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This action is permanent and will remove the file from Explore, search results, and student libraries.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteResource(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
                >
                  Delete Resource
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
