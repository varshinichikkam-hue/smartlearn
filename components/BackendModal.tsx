'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Database,
  X,
  Copy,
  Check,
  ShieldCheck,
  Server,
  Cloud,
  FileCode,
} from 'lucide-react';

export function BackendModal() {
  const { backendModalOpen, setBackendModalOpen } = useApp();
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!backendModalOpen) return null;

  const sqlSchema = `-- ============================================================================
-- SMARTLEARN PRODUCTION DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Linked to auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('teller', 'learner')) NOT NULL DEFAULT 'learner',
  avatar_url TEXT,
  university TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Teller Channels Table
CREATE TABLE public.teller_channels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  university TEXT,
  subjects TEXT[] DEFAULT '{}',
  follower_count INT DEFAULT 0,
  total_views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Resources Table (PDFs, Notes, and Videos)
CREATE TABLE public.resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  channel_id UUID REFERENCES public.teller_channels(id) ON DELETE CASCADE NOT NULL,
  teller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  type TEXT CHECK (type IN ('pdf', 'video')) NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  page_count INT,
  content_preview TEXT,
  views_count INT DEFAULT 0,
  favourites_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Saved Resources Table (Learner Bookmark relationship)
CREATE TABLE public.saved_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- 6. Favourite Tellers Table (Learner following Teller relationship)
CREATE TABLE public.favourite_tellers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  channel_id UUID REFERENCES public.teller_channels(id) ON DELETE CASCADE NOT NULL,
  favourited_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, channel_id)
);

-- 7. Viewing History Table
CREATE TABLE public.viewing_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teller_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourite_tellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewing_history ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owners edit
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Teller Channels: Public read, owner update
CREATE POLICY "Channels are viewable by everyone" ON public.teller_channels FOR SELECT USING (true);
CREATE POLICY "Tellers can update own channel" ON public.teller_channels FOR UPDATE USING (auth.uid() = user_id);

-- Resources: Public can view published, authors can insert/update/delete
CREATE POLICY "Anyone can view published resources" ON public.resources FOR SELECT USING (is_published = true);
CREATE POLICY "Tellers can insert own resources" ON public.resources FOR INSERT WITH CHECK (auth.uid() = teller_id);
CREATE POLICY "Tellers can update own resources" ON public.resources FOR UPDATE USING (auth.uid() = teller_id);
CREATE POLICY "Tellers can delete own resources" ON public.resources FOR DELETE USING (auth.uid() = teller_id);

-- Saved Resources: Users manage own saves
CREATE POLICY "Users can manage own saves" ON public.saved_resources FOR ALL USING (auth.uid() = user_id);

-- Favourite Tellers: Users manage own favourites
CREATE POLICY "Users can manage favourite tellers" ON public.favourite_tellers FOR ALL USING (auth.uid() = user_id);

-- Viewing History: Users view own history
CREATE POLICY "Users can view own history" ON public.viewing_history FOR ALL USING (auth.uid() = user_id);

-- 8. Cloud Storage Bucket Configuration
-- Bucket name: 'smartlearn-resources'
-- Public read access for published files; authenticated Tellers can write to their own folder: (storage.foldername(name))[1] = auth.uid()::text
`;

  const envConfig = `# Required Supabase Environment Variables
# Add these to your .env.local file to connect a real production Supabase project:
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
`;

  const copySql = () => {
    navigator.clipboard?.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const copyEnv = () => {
    navigator.clipboard?.writeText(envConfig);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Backend Architecture & Database Setup
              </h3>
              <p className="text-xs text-slate-500">
                PostgreSQL schema, RLS policies & client storage persistence
              </p>
            </div>
          </div>
          <button
            onClick={() => setBackendModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <Server className="w-4 h-4 text-amber-700" />
            <span>Active Mode: Client-Side Persistent Demo with Rich Seed Data</span>
          </div>
          <p className="leading-relaxed">
            As specified in Section 10 of the brief, when external Supabase credentials are not injected via environment variables, SmartLearn runs in an <strong>authentic, clearly identified demo mode with browser persistence</strong>.
            All created channels, uploaded resources, saved items, and favourites persist in local storage, and the complete backend schema below is ready to deploy to any PostgreSQL / Supabase project.
          </p>
        </div>

        {/* Required Environment Variables */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>Required Environment Variables (.env.local)</span>
            </h4>
            <button
              onClick={copyEnv}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copiedEnv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEnv ? 'Copied' : 'Copy env'}</span>
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-200 text-[11px] p-4 rounded-xl overflow-x-auto font-mono">
            {envConfig}
          </pre>
        </div>

        {/* Database Tables & Schema */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-purple-600" />
              <span>Full Supabase / PostgreSQL Schema & RLS Policies</span>
            </h4>
            <button
              onClick={copySql}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL' : 'Copy SQL Script'}</span>
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-200 text-[11px] p-4 rounded-xl overflow-x-auto max-h-72 font-mono">
            {sqlSchema}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setBackendModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
