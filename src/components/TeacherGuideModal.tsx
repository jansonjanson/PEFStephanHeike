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
  Download
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TeacherGuideModal: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [selectedDs, setSelectedDs] = useState<number>(1);

  if (activeModal !== 'teacherGuide') return null;

  const currentMod = MODULES_DATA.find((m) => m.id === selectedDs) || MODULES_DATA[0];
  const guide = currentMod.teacherGuide;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Dozenten-Leitfaden & Didaktischer Regieplan
              </h2>
              <p className="text-xs text-slate-400">
                Generalistische Pflegeausbildung • 7 Doppelstunden (à 90 Min.) Blended Learning
              </p>
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

        {/* DS Selector Tabs */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {MODULES_DATA.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                sounds.playClick();
                setSelectedDs(mod.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedDs === mod.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
              }`}
            >
              <span>DS {mod.id}</span>
              <span className="text-[10px] opacity-75 font-normal">({mod.title.split(':')[0]})</span>
            </button>
          ))}
        </div>

        {/* Guide Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Module Title & Duration */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                Themenschwerpunkt Doppelstunde {selectedDs}
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">{guide.topic}</h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                Dauer: {guide.duration}
              </span>
              {currentMod.requiredPassword && (
                <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  Passwort: {currentMod.requiredPassword}
                </span>
              )}
            </div>
          </div>

          {/* Pedagogical Goals */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Pädagogische Kompetenz- und Lernziele</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              {guide.pedagogicalGoals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>
          </div>

          {/* 90-Minute Detailed Phasenablauf */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Detail-Ablaufplan (90 Minuten)</span>
            </h4>

            <div className="space-y-2.5">
              {guide.schedule.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-teal-300">
                      {idx + 1}. {step.phase} ({step.timeMinutes} Min.)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {step.socialForm}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                        {step.media}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-200">{step.activity}</p>
                  <p className="text-[11px] text-slate-400 italic">
                    💡 <strong className="text-emerald-400 font-semibold">Didaktischer Hinweis:</strong> {step.didacticNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blackboard / Visualisation */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
              Tafelbild / Visualisierung
            </h4>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-200 whitespace-pre-wrap leading-relaxed">
              {guide.blackboardSummary}
            </pre>
          </div>

          {/* Padlet Questions (if any) */}
          {guide.padletQuestions && guide.padletQuestions.length > 0 && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">
                Padlet- / Diskussionsleitfragen für das Plenum
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {guide.padletQuestions.map((q, idx) => (
                  <li key={idx} className="italic text-amber-100/90">{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Pflegepädagogisches Konzept für Lehrkräfte & Praxisanleitende</span>
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
