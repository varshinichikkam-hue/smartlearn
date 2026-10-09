'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Users,
  BookOpen,
  Upload,
  CheckCircle2,
  Mail,
  Send,
  HelpCircle,
  Sparkles,
  Database,
} from 'lucide-react';

export function AboutView() {
  const { navigateTo, setBackendModalOpen } = useApp();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSubmittedFeedback(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setSubmittedFeedback(false), 5000);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            <GraduationCap className="w-4 h-4" />
            <span>Peer-to-Peer Academic Commons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About SmartLearn
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            SmartLearn is built by students, for students. We believe the most effective way to grasp complex engineering, science, and mathematics concepts is learning directly from peers who just tackled the same midterm or lab assignment.
          </p>
        </div>

        {/* Two Roles Breakdown Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role 1: Teller */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Knowledge Teller</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                A student who takes pride in neat notes, clear problem-solving steps, and video explanations.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Create and brand your personal academic channel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Upload PDFs, handwritten notes, and solution walkthrough videos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Track engagement with live view counts and peer favourites.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('auth', { authTab: 'signup', authRole: 'teller' })}
              className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Become a Teller
            </button>
          </div>

          {/* Role 2: Learner */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Student Learner</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                A student looking for accessible study guides, formula sheets, and video solutions from fellow students.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Search across core subjects, specific topics, and Tellers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Read notes in an integrated document viewer and download permitted files.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Save resources to your library and favourite top student creators.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('explore')}
              className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Start Learning Now
            </button>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">Are all resources free to download?</h4>
              <p className="leading-relaxed">
                Yes! SmartLearn is committed to open peer education. All verified PDFs, summaries, and lecture packages are free to view and download for educational use.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">What file formats are supported?</h4>
              <p className="leading-relaxed">
                For notes and cheat sheets, we support PDF, DOCX, and formatted Markdown. For video walkthroughs, MP4 and WebM formats are supported up to 50MB.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">Can I switch between Learner and Teller?</h4>
              <p className="leading-relaxed">
                Absolutely. You can switch roles at any time from your profile menu in the navigation bar to either share materials or study.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-slate-900">How is data persisted?</h4>
              <p className="leading-relaxed">
                The platform includes ready-to-deploy Supabase PostgreSQL schemas, and currently preserves all your channels, uploads, and library state in client-side storage.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <span>Contact Campus Support & Feedback</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a feature suggestion or found a broken resource link? Send a message to our student admins.
              </p>
            </div>

            <button
              onClick={() => setBackendModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Database Architecture</span>
            </button>
          </div>

          {submittedFeedback && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your feedback has been received by the SmartLearn campus moderation team.</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. student@university.edu"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Question
              </label>
              <textarea
                rows={3}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your inquiry, curriculum question, or bug report..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
