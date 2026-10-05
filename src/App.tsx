/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { RoadmapMap } from './components/RoadmapMap';
import { DossierDrawer } from './components/DossierDrawer';
import { WelcomeModal } from './components/WelcomeModal';
import { OnboardingTour } from './components/OnboardingTour';
import { MediaCenterModal } from './components/MediaCenterModal';
import { TimetableModal } from './components/TimetableModal';
import { BadgesModal } from './components/BadgesModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans relative">
        {/* Collapsible Off-Canvas Sidebar (Left Rail) */}
        <Sidebar />

        {/* Center Stage: Interactive Roadmap with glowing thread */}
        <main className="flex-1 ml-16 relative overflow-hidden h-screen">
          <RoadmapMap />
        </main>

        {/* Right Split-Screen: Slide-In Investigator Dossier Drawer */}
        <DossierDrawer />

        {/* Application Modals & Overlays */}
        <WelcomeModal />
        <OnboardingTour />
        <MediaCenterModal />
        <TimetableModal />
        <BadgesModal />
        <TeacherGuideModal />
        <CertificateModal />
      </div>
    </AppProvider>
  );
}
