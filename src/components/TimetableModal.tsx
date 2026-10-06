import React from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import {
  CalendarDays,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpenCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TimetableModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    moduleStates,
    openModule,
  } = useApp();

  if (activeModal !== 'timetable') return null;

  const handleOpenModule = (id: number) => {
    setActiveModal('none');
    openModule(id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <CalendarDays className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Unterrichtsreihe: 7 Doppelstunden</h2>
              <p className="text-xs text-[#2B2D42]/70">Curriculare Matrix & Fortschrittsübersicht (je 90 Minuten)</p>
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

        {/* Timetable Matrix Grid */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {MODULES_DATA.map((mod) => {
            const state = moduleStates[mod.id];
            const isCompleted = state?.completed;
            const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

            return (
              <div
                key={mod.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : isUnlocked
                    ? 'bg-[#F7F9FA] border-slate-200 hover:border-[#264653]/40'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                {/* Module Info */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isUnlocked
                        ? 'bg-[#264653] text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    DS {mod.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#264653]">{mod.title}</h3>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-[#2B2D42]">
                        {mod.timeEstimate}
                      </span>
                    </div>

                    <p className="text-xs text-[#2B2D42]/80 mt-0.5">{mod.subtitle}</p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-[#2B2D42]/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#264653]" />
                        90 Minuten
                      </span>
                      <span>•</span>
                      <span>Schwerpunkt: <strong className="text-[#264653]">{mod.locationName}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <div>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Abgeschlossen
                      </span>
                    ) : isUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#264653]/10 text-[#264653] text-xs font-bold">
                        Bereit / In Arbeit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                        <Lock className="w-3 h-3" />
                        Gesperrt
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenModule(mod.id)}
                    className="px-4 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Öffnen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F7F9FA] flex items-center justify-between text-xs text-[#2B2D42]/70">
          <span>Struktur: Blended-Learning-Curriculum mit 7 Doppelstunden</span>
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
