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
import { NamePromptModal } from './components/NamePromptModal';
import { OnboardingTour } from './components/OnboardingTour';
import { MediaCenterModal } from './components/MediaCenterModal';
import { TimetableModal } from './components/TimetableModal';
import { BadgesModal } from './components/BadgesModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { CertificateModal } from './components/CertificateModal';
import { AdminModal } from './components/AdminModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { PasswordBookModal } from './components/PasswordBookModal';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#F7F9FA] text-[#2B2D42] flex overflow-hidden font-sans relative">
        {/* Collapsible Left Sidebar */}
        <Sidebar />

        {/* Center Stage: Interactive Roadmap Map */}
        <main className="flex-1 ml-16 relative overflow-hidden h-screen">
          <RoadmapMap />
        </main>

        {/* Right Split-Screen: Level Workspace Drawer */}
        <DossierDrawer />

        {/* Application Modals & Overlays */}
        <OnboardingTour />
        <NamePromptModal />
        <WelcomeModal />
        <PasswordBookModal />
        <MediaCenterModal />
        <TimetableModal />
        <BadgesModal />
        <TeacherGuideModal />
        <CertificateModal />
        <AdminModal />
        <ResetConfirmModal />
      </div>
    </AppProvider>
  );
}
