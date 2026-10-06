import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Compass,
  FileSpreadsheet,
  Gamepad2,
  Download,
  KeyRound,
  Award,
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  targetId?: string;
  actionRequired?: 'open_dossier' | 'close_dossier';
  preferredSide?: 'left' | 'right' | 'top' | 'bottom';
  tip: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: '1. Die Navigationsleiste & Lernwerkzeuge',
    description: 'Auf der linken Leiste finden Sie die Navigation: Stundenplan (7 Doppelstunden), Mediathek mit allen Filmausschnitten & CNE Fachartikeln, Auszeichnungen, den Dozenten-Regieplan und den Admin-Bereich (PW: Janson).',
    icon: Compass,
    targetId: 'tour-sidebar',
    actionRequired: 'close_dossier',
    preferredSide: 'right',
    tip: 'Klicken Sie jederzeit auf das Fragezeichen links unten, um dieses Tutorial erneut zu starten.',
  },
  {
    title: '2. Die interaktive Gaming-Map',
    description: 'Die Gaming-Roadmap führt durch die 7 Stationen von der Notfallaufnahme bis zum neuen Zuhause. Klicken Sie auf einen Knotenpunkt, um die Einheit zu öffnen und von oben nach unten zu bearbeiten.',
    icon: Sparkles,
    targetId: 'tour-first-node',
    actionRequired: 'close_dossier',
    preferredSide: 'top',
    tip: 'Über den Button „Positionen anpassen“ können Sie jederzeit die Koordinaten auf der Karte einsehen.',
  },
  {
    title: '3. Nahtloser Gameloop-Ablauf (Workspace)',
    description: 'Beim Klick auf eine Station öffnet sich die Einheit. Die Inhalte werden schrittweise von oben nach unten freigeschaltet: 1. Video ➔ 2. Dokumentation ➔ 3. Simulation ➔ 4. Auswertung & Musterlösung.',
    icon: FileSpreadsheet,
    targetId: 'tour-dossier',
    actionRequired: 'open_dossier',
    preferredSide: 'left',
    tip: 'Bestätigen Sie nach jedem Schritt die Erfüllung, um den nächsten Bereich nahtlos freizuschalten.',
  },
  {
    title: '4. Formulare & Word-Export (.docx)',
    description: 'Ihre Eintragungen in „Entscheidungen Videosequenzen“ und die 13 ABEDL nach Krohwinkel werden automatisch lokal gespeichert und können jederzeit mit einem Klick als originalgetreues Word-Dokument (.docx) exportiert werden.',
    icon: Download,
    targetId: 'tour-export-btn',
    actionRequired: 'open_dossier',
    preferredSide: 'left',
    tip: 'Erfassen Sie in den 13 ABEDL-Kategorien wichtige Beobachtungen, Einschränkungen und Ressourcen.',
  },
  {
    title: '5. Flaschenhals-Simulation & Entscheidung',
    description: 'In der Simulation treffen Sie als Pflegefachkraft existenzielle Entscheidungen. Wählen Sie zwischen dem paternalistischen Modell, der Partizipativen Entscheidungsfindung (PEF) und dem Informed Consent. Jede Wahl schaltet ein Passwort-Fragment frei!',
    icon: Gamepad2,
    actionRequired: 'open_dossier',
    preferredSide: 'left',
    tip: 'Mit dem freigespielten Passwort entsperren Sie im Anschluss die offizielle Musterlösung.',
  },
  {
    title: '6. Auswertung, Admin-Zugang & Zertifikat',
    description: 'Am Ende jeder Szene erfahren Sie, zu wie viel Prozent Sie partizipativ oder paternalistisch entschieden haben. Mit dem Admin-Passwort „Janson“ können Sie bei Bedarf alle Inhalte sofort freischalten.',
    icon: ShieldCheck,
    actionRequired: 'close_dossier',
    preferredSide: 'bottom',
    tip: 'Viel Erfolg beim Lernen und Erproben der partizipativen Pflegeethik im Fall Stephan & Heike!',
  },
];

export const OnboardingTour: React.FC = () => {
  const {
    isOnboardingActive,
    setIsOnboardingActive,
    unlockBadge,
    setActiveModuleId,
    setIsDrawerOpen,
    setActiveModal,
    studentName,
  } = useApp();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [highlightRect, setHighlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const currentStep = TOUR_STEPS[stepIndex];
  const Icon = currentStep.icon;

  // Handle tour actions safely without triggering welcome modal popups
  useEffect(() => {
    if (!isOnboardingActive) return;

    if (currentStep.actionRequired === 'open_dossier') {
      setActiveModuleId(3);
      setIsDrawerOpen(true);
    } else if (currentStep.actionRequired === 'close_dossier') {
      setIsDrawerOpen(false);
    }

    const timer = setTimeout(() => {
      if (currentStep.targetId) {
        const el = document.getElementById(currentStep.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          setHighlightRect({
            top: Math.max(0, rect.top - 6),
            left: Math.max(0, rect.left - 6),
            width: rect.width + 12,
            height: rect.height + 12,
          });
          return;
        }
      }
      setHighlightRect(null);
    }, 180);

    return () => clearTimeout(timer);
  }, [stepIndex, isOnboardingActive, currentStep, setActiveModuleId, setIsDrawerOpen]);

  if (!isOnboardingActive) return null;

  const handleFinish = () => {
    setIsOnboardingActive(false);
    setIsDrawerOpen(false);
    setStepIndex(0);
    unlockBadge('badge_onboarding');
    if (typeof window !== 'undefined') {
      localStorage.setItem('pflege_app_stephan_heike_v2_seen_tour', 'true');
    }

    // Prompt for student name after onboarding tour completes!
    if (!studentName || studentName.trim().length === 0) {
      setTimeout(() => {
        setActiveModal('namePrompt');
      }, 200);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (stepIndex + 1 < TOUR_STEPS.length) {
      setStepIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    sounds.playClick();
    handleFinish();
  };

  // Determine smart non-overlapping modal placement
  const getModalPositionStyle = (): React.CSSProperties => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      return {
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: 'calc(100vw - 32px)',
      };
    }

    if (!highlightRect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
      };
    }

    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Target is on the right side of the screen (Dossier, tabs, export btn)
    if (highlightRect.left > winW * 0.35) {
      return {
        top: '50%',
        left: '84px',
        transform: 'translateY(-50%)',
        maxWidth: '420px',
      };
    }

    // Target is on the far left sidebar (Sidebar)
    if (highlightRect.left < 100 && highlightRect.width < 120) {
      return {
        top: '50%',
        left: '88px',
        transform: 'translateY(-50%)',
        maxWidth: '460px',
      };
    }

    // Target is in the bottom half of the screen (e.g. Node 1)
    if (highlightRect.top > winH * 0.5) {
      return {
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '480px',
      };
    }

    // Default: bottom-center
    return {
      bottom: '36px',
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '480px',
    };
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden">
      {/* 4-Quadrant Backdrop Dimming: Target area remains 100% unblurred and crystal clear */}
      {highlightRect ? (
        <>
          {/* Top block */}
          <div
            className="fixed left-0 right-0 top-0 bg-[#2B2D42]/60 backdrop-blur-xs z-40 transition-all duration-300 pointer-events-none"
            style={{ height: `${highlightRect.top}px` }}
          />

          {/* Bottom block */}
          <div
            className="fixed left-0 right-0 bottom-0 bg-[#2B2D42]/60 backdrop-blur-xs z-40 transition-all duration-300 pointer-events-none"
            style={{ top: `${highlightRect.top + highlightRect.height}px` }}
          />

          {/* Left block */}
          <div
            className="fixed left-0 bg-[#2B2D42]/60 backdrop-blur-xs z-40 transition-all duration-300 pointer-events-none"
            style={{
              top: `${highlightRect.top}px`,
              height: `${highlightRect.height}px`,
              width: `${highlightRect.left}px`,
            }}
          />

          {/* Right block */}
          <div
            className="fixed right-0 bg-[#2B2D42]/60 backdrop-blur-xs z-40 transition-all duration-300 pointer-events-none"
            style={{
              top: `${highlightRect.top}px`,
              height: `${highlightRect.height}px`,
              left: `${highlightRect.left + highlightRect.width}px`,
            }}
          />

          {/* Highlight Box directly over the clear target element */}
          <div
            className="fixed pointer-events-none rounded-2xl border-3 border-[#264653] shadow-[0_0_25px_rgba(38,70,83,0.45)] z-50 transition-all duration-300"
            style={{
              top: `${highlightRect.top}px`,
              left: `${highlightRect.left}px`,
              width: `${highlightRect.width}px`,
              height: `${highlightRect.height}px`,
            }}
          >
            <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#E76F51] text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
              {stepIndex + 1}
            </div>
          </div>
        </>
      ) : (
        <div className="fixed inset-0 bg-[#2B2D42]/60 backdrop-blur-xs z-40 transition-opacity pointer-events-none" />
      )}

      {/* Floating Explanatory Tour Modal Card placed dynamically to NEVER overlap the highlight */}
      <div
        className="fixed z-50 transition-all duration-300 pointer-events-auto"
        style={getModalPositionStyle()}
      >
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden text-[#2B2D42]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E76F51]" />
              <span className="text-xs font-bold text-[#264653] uppercase tracking-wider">
                Interaktive Einführung ({stepIndex + 1} / {TOUR_STEPS.length})
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#264653] text-white flex items-center justify-center shadow-sm shrink-0">
                <Icon className="w-5 h-5 text-[#E76F51]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#264653] leading-tight">{currentStep.title}</h3>
            </div>

            <p className="text-xs text-[#2B2D42] leading-relaxed">
              {currentStep.description}
            </p>

            <div className="p-2.5 bg-[#F7F9FA] border border-slate-200 rounded-xl text-[11px] text-[#2B2D42]">
              💡 <strong className="text-[#264653]">Tipp:</strong> {currentStep.tip}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-1.5 py-0.5">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === stepIndex ? 'w-6 bg-[#264653]' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={handleClose}
              className="text-xs text-[#2B2D42]/60 hover:text-[#2B2D42] transition-colors font-medium cursor-pointer"
            >
              Tour beenden
            </button>

            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2B2D42] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Zurück</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>{stepIndex + 1 === TOUR_STEPS.length ? 'Tour abschließen' : 'Weiter'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
