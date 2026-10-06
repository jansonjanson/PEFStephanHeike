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
  FileSpreadsheet,
  Users,
  KeyRound,
  Trophy,
  Award,
};

export const BadgesModal: React.FC = () => {
  const { activeModal, setActiveModal, badges } = useApp();

  if (activeModal !== 'badges') return null;

  const unlockedCount = badges.filter((b) => b.unlockedAt).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Erfolge & Auszeichnungen (Gamification)</h2>
              <p className="text-xs text-[#2B2D42]/70">
                {unlockedCount} von {badges.length} Trophäen freigeschaltet
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;
            const IconComp = BADGE_ICONS[badge.icon] || Award;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 card-soft-shadow ${
                  isUnlocked
                    ? 'bg-white border-[#264653]/30 ring-1 ring-[#264653]/10'
                    : 'bg-[#F7F9FA] border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isUnlocked
                      ? 'bg-[#264653] text-[#E76F51]'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#264653] truncate">{badge.title}</h3>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-[#2B2D42]/70 mt-0.5 leading-relaxed">{badge.description}</p>

                  <div className="mt-2 text-[10px] font-mono">
                    {isUnlocked ? (
                      <span className="text-[#2A9D8F] font-semibold">Freigeschaltet ✓</span>
                    ) : (
                      <span className="text-slate-400">Gesperrt</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F7F9FA] flex items-center justify-between text-xs text-[#2B2D42]/70">
          <span>Sammle alle Badges, um das Dozenten-Abschlusszertifikat zu vervollständigen.</span>
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[#2B2D42] font-bold text-xs transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
