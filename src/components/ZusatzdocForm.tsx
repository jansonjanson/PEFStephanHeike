import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, AlertCircle, CheckCircle, Scale, ExternalLink, FileText } from 'lucide-react';

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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-6">
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#264653] uppercase tracking-wider">
              Entscheidungen Videosequenzen (Situationsanalyse)
            </h3>
            <p className="text-xs text-[#2B2D42]/70">
              Strukturierte Erfassung der Beobachtungen und Entscheidungsmomente aus der Videosequenz
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/jansonjanson/PEFStephanHeike/blob/main/3.%20Entscheidungsidentifikation.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] px-3 py-1 rounded-full bg-[#264653]/10 hover:bg-[#264653]/20 text-[#264653] font-semibold border border-[#264653]/20 flex items-center gap-1.5 transition-colors"
            title="Original-Vorlage '3. Entscheidungsidentifikation.docx' auf GitHub öffnen"
          >
            <FileText className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>Vorlage (.docx)</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono flex items-center gap-1.5 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Auto-Save
          </span>
        </div>
      </div>

      {/* Field 1: Wer war zu sehen/zu hören? */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#264653] flex items-center gap-2">
          <Users className="w-4 h-4 text-[#264653]" />
          <span>1. Wer war zu sehen / zu hören? (Beteiligte Personen & Rollen)</span>
        </label>
        <textarea
          rows={3}
          value={data.who}
          onChange={(e) => handleChange('who', e.target.value)}
          placeholder="z.B. Stephan (Patient, beatmet), Heike (Lebenspartnerin), Pflegekraft, Stationsarzt..."
          className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl p-3 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y"
        />
      </div>

      {/* Field 2: Was ist passiert? */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#264653] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#2A9D8F]" />
          <span>2. Was ist passiert? (Situationsablauf, pflegerische Herausforderung)</span>
        </label>
        <textarea
          rows={3}
          value={data.whatHappened}
          onChange={(e) => handleChange('whatHappened', e.target.value)}
          placeholder="Beschreibe präzise die Handlung: Welche Interventionen fanden statt? Welche Reaktionen zeigten sich?"
          className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl p-3 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y"
        />
      </div>

      {/* Field 3: Welche Entscheidungen wurden getroffen? */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#264653] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#264653]" />
          <span>3. Welche Entscheidungen wurden getroffen? (und wer hat sie getroffen?)</span>
        </label>
        <textarea
          rows={3}
          value={data.decisionsMade}
          onChange={(e) => handleChange('decisionsMade', e.target.value)}
          placeholder="Wurden Entscheidungen paternalistisch über Stephans/Heikes Kopf hinweg gefällt oder partizipativ gemeinsam beraten?"
          className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl p-3 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y"
        />
      </div>

      {/* Field 4: Ethische Dilemmata / Haltungen */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#264653] flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#E76F51]" />
          <span>4. Ethische Dilemmata & Haltungen (Fürsorge vs. Autonomie)</span>
        </label>
        <textarea
          rows={3}
          value={data.ethicalDilemmas}
          onChange={(e) => handleChange('ethicalDilemmas', e.target.value)}
          placeholder="Welche Werte standen im Konflikt (z. B. Sicherheit vs. Lebensqualität)? Welche Haltung zeigte das Pflegeteam?"
          className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl p-3 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y"
        />
      </div>
    </div>
  );
};
