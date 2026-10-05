import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, AlertCircle, CheckCircle, Scale, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ZusatzdocFormProps {
  moduleId: number;
}

export const ZusatzdocForm: React.FC<ZusatzdocFormProps> = ({ moduleId }) => {
  const { moduleStates, updateZusatzdoc } = useApp();
  const state = moduleStates[moduleId];
  const data = state?.zusatzdoc || {
    who: '',
    whatHappened: '',
    decisionsMade: '',
    ethicalDilemmas: '',
  };

  const handleChange = (field: 'who' | 'whatHappened' | 'decisionsMade' | 'ethicalDilemmas', value: string) => {
    updateZusatzdoc(moduleId, { [field]: value });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
      {/* Form Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Zusatzdoc V.2 – Situationsanalyse
            </h3>
            <p className="text-xs text-slate-400">
              Strukturierte Erfassung der Beobachtungen aus der Videosequenz
            </p>
          </div>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-teal-300 font-mono flex items-center gap-1.5 border border-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Auto-Save aktiv
        </span>
      </div>

      {/* Field 1: Wer war zu sehen/zu hören? */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-teal-300 flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-400" />
          <span>1. Wer war zu sehen / zu hören? (Beteiligte Personen & Rollen)</span>
        </label>
        <textarea
          rows={3}
          value={data.who}
          onChange={(e) => handleChange('who', e.target.value)}
          placeholder="z.B. Stephan (Patient, beatmet), Heike (Lebenspartnerin), Pflegekraft, Stationsarzt..."
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all resize-y"
        />
      </div>

      {/* Field 2: Was ist passiert? */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cyan-400" />
          <span>2. Was ist passiert? (Situationsablauf, pflegerische Herausforderung)</span>
        </label>
        <textarea
          rows={3}
          value={data.whatHappened}
          onChange={(e) => handleChange('whatHappened', e.target.value)}
          placeholder="Beschreibe präzise die Handlung: Welche Interventionen fanden statt? Welche Reaktionen zeigten sich?"
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-y"
        />
      </div>

      {/* Field 3: Welche Entscheidungen wurden getroffen? */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-indigo-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-400" />
          <span>3. Welche Entscheidungen wurden getroffen? (und wer hat sie getroffen?)</span>
        </label>
        <textarea
          rows={3}
          value={data.decisionsMade}
          onChange={(e) => handleChange('decisionsMade', e.target.value)}
          placeholder="Wurden Entscheidungen paternalistisch über Stephans/Heikes Kopf hinweg gefällt oder partizipativ gemeinsam beraten?"
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-y"
        />
      </div>

      {/* Field 4: Ethische Dilemmata / Haltungen */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-amber-300 flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>4. Ethische Dilemmata & Haltungen (Fürsorge vs. Autonomie)</span>
        </label>
        <textarea
          rows={3}
          value={data.ethicalDilemmas}
          onChange={(e) => handleChange('ethicalDilemmas', e.target.value)}
          placeholder="Welche Werte standen im Konflikt (z. B. Sicherheit vs. Lebensqualität)? Welche Haltung zeigte das Pflegeteam?"
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all resize-y"
        />
      </div>
    </div>
  );
};
