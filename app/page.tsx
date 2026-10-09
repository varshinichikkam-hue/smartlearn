'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomeView } from '@/components/HomeView';
import { ExploreView } from '@/components/ExploreView';
import { SubjectBrowse } from '@/components/SubjectBrowse';
import { TellerDashboardView } from '@/components/TellerDashboardView';
import { LearnerDashboardView } from '@/components/LearnerDashboardView';
import { ResourceDetailView } from '@/components/ResourceDetailView';
import { ChannelDetailView } from '@/components/ChannelDetailView';
import { AuthView } from '@/components/AuthView';
import { AboutView } from '@/components/AboutView';
import { BackendModal } from '@/components/BackendModal';

function AppContent() {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'explore' && <ExploreView />}
        {activeView === 'subjects' && (
          <div className="py-8 bg-slate-50/40 min-h-[calc(100vh-16rem)]">
            <SubjectBrowse />
          </div>
        )}
        {activeView === 'teller-dashboard' && <TellerDashboardView />}
        {activeView === 'learner-dashboard' && <LearnerDashboardView />}
        {activeView === 'resource-detail' && <ResourceDetailView />}
        {activeView === 'channel-detail' && <ChannelDetailView />}
        {activeView === 'auth' && <AuthView />}
        {activeView === 'about' && <AboutView />}
      </main>

      <Footer />
      <BackendModal />
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
