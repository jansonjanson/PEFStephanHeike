import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import {
  GraduationCap,
  X,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  HelpCircle,
  KeyRound,
  FileText,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TeacherGuideModal: React.FC = () => {
  const { activeModal, setActiveModal, isAdminMode } = useApp();
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);

  if (activeModal !== 'teacherGuide' || !isAdminMode) return null;

  const currentMod = MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];
  const guide = currentMod.teacherGuide;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-[92vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Dozenten-Regieplan & Didaktischer Leitfaden</h2>
              <p className="text-xs text-[#2B2D42]/70">Curriculare Phasenplanung für alle 7 Doppelstunden (à 90 Minuten)</p>
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

        {/* 2-Column Workspace: Left Module Selector, Right Detailed Script */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Module Selector Strip */}
          <div className="w-full md:w-64 bg-[#F7F9FA] border-r border-slate-200 p-3 space-y-1.5 overflow-y-auto">
            <div className="text-[10px] font-bold text-[#2B2D42]/60 uppercase tracking-wider px-2 py-1">
              Doppelstunde wählen
            </div>
            {MODULES_DATA.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedModuleId(mod.id);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                  selectedModuleId === mod.id
                    ? 'bg-[#264653] text-white font-bold shadow-xs'
                    : 'text-[#2B2D42] hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-xs font-bold">DS {mod.id}</span>
                  <span className="truncate">{mod.title.split(':')[0]}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            ))}
          </div>

          {/* Right Detailed Script Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-white">
            {/* Topic Header Card */}
            <div className="bg-[#F7F9FA] border border-slate-200 rounded-2xl p-4 card-soft-shadow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold bg-[#264653]/10 text-[#264653] px-2.5 py-0.5 rounded-full">
                  Doppelstunde {guide.doppelstunde} • {guide.duration}
                </span>
                <span className="text-xs text-[#2B2D42]/60">Schwerpunkt: {currentMod.locationName}</span>
              </div>
              <h3 className="text-base font-bold text-[#264653]">{guide.topic}</h3>
            </div>

            {/* Pedagogical Goals */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#264653] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E76F51]" />
                <span>Pädagogische Kompetenz- und Lernziele</span>
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {guide.pedagogicalGoals.map((goal, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-[#2B2D42] flex items-start gap-2.5 card-soft-shadow"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#264653]/10 text-[#264653] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule Table (90 min Phase Schedule) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#264653] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#264653]" />
                <span>Phasenverlauf (90 Minuten Zeitmatrix)</span>
              </h4>

              <div className="space-y-2.5">
                {guide.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#F7F9FA] rounded-xl border border-slate-200 space-y-2 card-soft-shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-[#264653] text-white px-2 py-0.5 rounded">
                          {item.timeMinutes} Min.
                        </span>
                        <span className="text-xs font-bold text-[#264653]">{item.phase}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#2B2D42]/70">
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">{item.socialForm}</span>
                        <span>•</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{item.media}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#2B2D42] leading-relaxed">{item.activity}</p>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-[#2B2D42]/80">
                      <div className="flex items-center gap-1.5 font-bold text-[#264653] mb-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#E76F51]" />
                        <span>Didaktischer Kommentar:</span>
                      </div>
                      <p className="italic">{item.didacticNotes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blackboard Visualization */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#264653] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#264653]" />
                <span>Tafelbild & Visualisierungs-Matrix</span>
              </h4>
              <pre className="p-4 bg-[#F7F9FA] rounded-xl border border-slate-200 text-xs font-mono text-[#264653] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {guide.blackboardSummary}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F7F9FA] flex items-center justify-between text-xs text-[#2B2D42]/70">
          <span>Pflegedidaktischer Leitfaden • Vollständig operationalisiert</span>
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
