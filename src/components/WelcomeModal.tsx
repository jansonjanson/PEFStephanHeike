import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, HeartHandshake, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const WelcomeModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    studentName,
    setStudentName,
    setIsOnboardingActive,
    soundEnabled,
    setSoundEnabled,
  } = useApp();

  if (activeModal !== 'welcome') return null;

  const handleStart = (withTour: boolean) => {
    sounds.playClick();
    setActiveModal('none');
    if (withTour) {
      setTimeout(() => {
        setIsOnboardingActive(true);
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Partnerschaftliche Entscheidungsfindung
              </h2>
              <p className="text-xs text-teal-400">Pflegeausbildung • Fall Stephan & Heike</p>
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? 'Ton an' : 'Ton aus'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Required Mandatory Intro Text */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal shadow-inner space-y-3">
          <p className="italic text-teal-100 font-serif">
            „Jeder begegnet im Leben Situationen, in denen es darum geht Entscheidungen zu treffen. Manche sind banal und einfach zu treffen - andere sind kompliziert und fast nicht auszusprechen. Jeder von uns stand mindestens einmal im Leben vor einer unbeschreiblich schweren Entscheidung - vielleicht so schwer, dass alle Handlungsalternativen unpassend oder unmöglich wirkten. Heike und Stephan befanden sich vor unzähligen solcher Entscheidungen. Doch während sie sprechen und sich bewegen kann, ist Stephan durch einen Unfall so schwer verändert, dass er sich nicht mehr verbal ausdrücken kann. Wie gelingen so Entscheidungen als Lebenspartner? Wie können alle Parteien einbezogen werden? Hunderte Fragen ergeben sich in diesem Moment. Die folgenden Kapitel und Filmausschnitte skizzieren das Leben von Heike und Stephan und ihren Weg zu Entscheidungen zu finden.“
          </p>
        </div>

        {/* Student Name Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <span>Name der/des Auszubildenden (für Dokumentenexport & Zertifikat):</span>
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="z.B. Alex Schmidt (Pflegefachkraft im 2. Ausbildungsjahr)"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={() => handleStart(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Kurze Einführungstour starten</span>
          </button>

          <button
            onClick={() => handleStart(false)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Direkt zur Lern-Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
