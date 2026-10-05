import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  targetId?: string;
  tip: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: '1. Die Collapsible Sidebar & Navigation',
    description: 'Auf der linken Leiste findest du Schnellzugriffe auf den Timetable (7 Doppelstunden), die Mediathek mit allen Videolinks & CNE Artikeln, deine erspielten Badges sowie den Dozenten-Regieplan.',
    icon: Compass,
    targetId: 'tour-sidebar',
    tip: 'Klicke jederzeit auf das Fragezeichen links unten, um dieses Tutorial erneut zu öffnen.',
  },
  {
    title: '2. Die interaktive Roadmap (Homescreen)',
    description: 'Die Karte verbindet die 7 Stationen (Rennstrecke, Seminar, Akutklinik, Weaning, Frühreha, Zuhause, Finale) mit einem chronologischen leuchtenden Faden. Ein Klick auf einen Knotenpunkt öffnet den Arbeitsbereich.',
    icon: Sparkles,
    targetId: 'tour-first-node',
    tip: 'Du kannst auch jederzeit dein eigenes individuelles Hintergrundbild über den Button oben rechts einfügen!',
  },
  {
    title: '3. Die "Split-Screen" Mechanik (Das Dossier)',
    description: 'Beim Klick auf einen Knotenpunkt slidet von rechts eine digitale Ermittler-Akte herein, während die Karte als räumlicher Anker im Hintergrund abgedunkelt bleibt.',
    icon: FileSpreadsheet,
    tip: 'In Tab 1 findest du die Videolinks sowie die digitalen Formulare für Zusatzdoc V.2 und die 13 ABEDL.',
  },
  {
    title: '4. Digitale Formulare & Word-Export (.docx)',
    description: 'Alle deine Eintragungen in die 13 ABEDL nach Krohwinkel und das Zusatzdoc V.2 werden automatisch im Browser gespeichert und können mit einem Klick als originalgetreues Word-Dokument exportiert werden.',
    icon: Download,
    tip: 'Nutze die PESR-Struktur (Problem, Ursache, Symptome, Ressourcen) für präzise Pflegediagnosen.',
  },
  {
    title: '5. Der Gameloop & Das Mini-Adventure',
    description: 'In Tab 2 triffst du als Pflegekraft existenzielle Entscheidungen. Deine Wahl zwischen Paternalismus, Partizipativer Entscheidungsfindung (PEF) und Informed Decision Making beeinflusst die versteckten Stats.',
    icon: Gamepad2,
    tip: 'Am Ende jeder Simulation erhältst du ein Passwort-Fragment zur Freischaltung der offiziellen Musterlösung!',
  },
  {
    title: '6. Passwort-Tresor & Badges',
    description: 'Löse die Rätsel und schalte nach und nach alle 7 Doppelstunden und verborgenen Achievements frei, um am Ende dein persönliches Pflegeethik-Zertifikat zu erhalten.',
    icon: Award,
    tip: 'Viel Erfolg auf deiner Lernreise mit Stephan & Heike!',
  },
];

export const OnboardingTour: React.FC = () => {
  const { isOnboardingActive, setIsOnboardingActive, unlockBadge } = useApp();
  const [stepIndex, setStepIndex] = useState<number>(0);

  if (!isOnboardingActive) return null;

  const currentStep = TOUR_STEPS[stepIndex];
  const Icon = currentStep.icon;

  const handleNext = () => {
    sounds.playClick();
    if (stepIndex + 1 < TOUR_STEPS.length) {
      setStepIndex((prev) => prev + 1);
    } else {
      setIsOnboardingActive(false);
      setStepIndex(0);
      unlockBadge('badge_onboarding');
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
    setIsOnboardingActive(false);
    setStepIndex(0);
    unlockBadge('badge_onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-teal-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-teal-950/80 space-y-5 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Interaktive App-Tour ({stepIndex + 1} / {TOUR_STEPS.length})
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">{currentStep.title}</h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="p-3 bg-teal-950/40 border border-teal-800/40 rounded-xl text-xs text-teal-200">
            💡 <strong className="text-teal-300">Praxistipp:</strong> {currentStep.tip}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === stepIndex ? 'w-6 bg-teal-400' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Tour überspringen
          </button>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zurück</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/20 transition-all"
            >
              <span>{stepIndex + 1 === TOUR_STEPS.length ? 'Tour beenden & Loslegen' : 'Weiter'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
