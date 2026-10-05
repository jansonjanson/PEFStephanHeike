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
    setActiveModuleId,
    setIsDrawerOpen,
    overallProgressPercent,
  } = useApp();

  if (activeModal !== 'timetable') return null;

  const handleOpenModule = (id: number) => {
    sounds.playClick();
    setActiveModal('none');
    setActiveModuleId(id);
    setIsDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Curriculum & Unterrichts-Timetable</h2>
              <p className="text-xs text-slate-400">7 Doppelstunden (à 90 Min.) zur partnerschaftlichen Entscheidungsfindung</p>
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

        {/* Overall Progress Banner */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-200">Gesamter Lernfortschritt</div>
            <div className="text-[11px] text-slate-400">Chronologischer Durchlauf von DS 1 bis DS 7</div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-64">
            <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-teal-400 text-xs">{overallProgressPercent}%</span>
          </div>
        </div>

        {/* 7 Doppelstunden List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {MODULES_DATA.map((mod) => {
            const state = moduleStates[mod.id];
            const isCompleted = state?.completed;
            const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

            return (
              <div
                key={mod.id}
                className={`border rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-slate-950/90 border-emerald-500/40'
                    : isUnlocked
                    ? 'bg-slate-950/70 border-teal-500/30'
                    : 'bg-slate-950/40 border-slate-800 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isUnlocked
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    DS {mod.id}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white tracking-wide">{mod.title}</h3>
                      {isCompleted && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Abgeschlossen
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-teal-400">{mod.subtitle}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{mod.locationName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>90 Min.</span>
                  </div>

                  <button
                    onClick={() => handleOpenModule(mod.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      isUnlocked
                        ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{isCompleted ? 'Wiederholen' : isUnlocked ? 'Öffnen' : 'Öffnen'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Gesamtumfang: 14 Unterrichtsstunden (7 Doppelstunden)</span>
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
