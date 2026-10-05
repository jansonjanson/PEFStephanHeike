import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  X,
  Flag,
  Compass,
  FileSpreadsheet,
  Users,
  KeyRound,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const BADGE_ICONS: { [key: string]: React.ElementType } = {
  Flag,
  Compass,
  Award,
  FileSpreadsheet,
  Users,
  KeyRound,
  Trophy,
};

export const BadgesModal: React.FC = () => {
  const { activeModal, setActiveModal, badges, setActiveModal: openModal } = useApp();

  if (activeModal !== 'badges') return null;

  const unlockedCount = badges.filter((b) => b.unlockedAt).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Erfolge & Achievements</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {unlockedCount} / {badges.length} freigeschaltet
                </span>
              </h2>
              <p className="text-xs text-slate-400">Versteckte Belohnungen für partizipative Pflegekompetenz</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon] || Award;
            const isUnlocked = !!badge.unlockedAt;

            return (
              <div
                key={badge.id}
                className={`border rounded-2xl p-4 flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-slate-950/90 border-amber-500/50 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-white tracking-wide truncate">
                      {badge.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] text-amber-400 font-mono shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Erreicht
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{badge.description}</p>
                  {badge.unlockedAt && (
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      Freigeschaltet am: {new Date(badge.unlockedAt).toLocaleDateString('de-DE')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Tipp: Spiele alle 7 Simulationen partizipativ durch, um alle Badges zu sammeln!</span>
          <button
            onClick={() => setActiveModal('certificate')}
            className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Abschluss-Zertifikat ansehen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
