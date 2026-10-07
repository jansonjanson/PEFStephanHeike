import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ABEDL_DEFINITIONS } from '../utils/docxExport';
import {
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  Sparkles,
  HeartPulse,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AbedlFormProps {
  moduleId: number;
}

// Visual color themes for ABEDL categories to avoid grey-on-grey
const CATEGORY_THEMES: { [key: number]: { bg: string; border: string; accent: string; badgeBg: string; badgeText: string } } = {
  1: { bg: 'bg-emerald-50/40', border: 'border-emerald-200', accent: 'bg-emerald-600', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-900' },
  2: { bg: 'bg-teal-50/40', border: 'border-teal-200', accent: 'bg-teal-600', badgeBg: 'bg-teal-100', badgeText: 'text-teal-900' },
  3: { bg: 'bg-cyan-50/40', border: 'border-cyan-200', accent: 'bg-cyan-600', badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-900' },
  4: { bg: 'bg-sky-50/40', border: 'border-sky-200', accent: 'bg-sky-600', badgeBg: 'bg-sky-100', badgeText: 'text-sky-900' },
  5: { bg: 'bg-blue-50/40', border: 'border-blue-200', accent: 'bg-blue-600', badgeBg: 'bg-blue-100', badgeText: 'text-blue-900' },
  6: { bg: 'bg-indigo-50/40', border: 'border-indigo-200', accent: 'bg-indigo-600', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-900' },
  7: { bg: 'bg-violet-50/40', border: 'border-violet-200', accent: 'bg-violet-600', badgeBg: 'bg-violet-100', badgeText: 'text-violet-900' },
  8: { bg: 'bg-purple-50/40', border: 'border-purple-200', accent: 'bg-purple-600', badgeBg: 'bg-purple-100', badgeText: 'text-purple-900' },
  9: { bg: 'bg-fuchsia-50/40', border: 'border-fuchsia-200', accent: 'bg-fuchsia-600', badgeBg: 'bg-fuchsia-100', badgeText: 'text-fuchsia-900' },
  10: { bg: 'bg-rose-50/40', border: 'border-rose-200', accent: 'bg-rose-600', badgeBg: 'bg-rose-100', badgeText: 'text-rose-900' },
  11: { bg: 'bg-amber-50/40', border: 'border-amber-200', accent: 'bg-amber-600', badgeBg: 'bg-amber-100', badgeText: 'text-amber-900' },
  12: { bg: 'bg-orange-50/40', border: 'border-orange-200', accent: 'bg-orange-600', badgeBg: 'bg-orange-100', badgeText: 'text-orange-900' },
  13: { bg: 'bg-emerald-50/50', border: 'border-emerald-300', accent: 'bg-[#264653]', badgeBg: 'bg-[#264653]/15', badgeText: 'text-[#264653]' },
};

export const AbedlForm: React.FC<AbedlFormProps> = ({ moduleId }) => {
  const { moduleStates, updateAbedl } = useApp();
  const state = moduleStates[moduleId];
  const abedlData = state?.abedl || {};

  const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    13: true,
  });

  const toggleCategory = (catId: number) => {
    sounds.playClick();
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleInfoChange = (catId: number, value: string) => {
    updateAbedl(moduleId, catId, 'info', value);
  };

  const filledCount = Object.values(abedlData).filter(
    (item) => item.info && item.info.trim().length > 0
  ).length;

  return (
    <div className="bg-white border-2 border-[#264653]/20 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-6">
      {/* Header with warm care gradient */}
      <div className="border-b border-slate-200 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white flex items-center justify-center shadow-md">
            <FileSpreadsheet className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#264653] text-white">
                Strukturmodell Anamnese
              </span>
              <span className="text-xs font-semibold text-[#2A9D8F]">
                nach Monika Krohwinkel
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
              13 ABEDL Pflegeanamnese &amp; Informationssammlung
            </h3>
            <p className="text-xs text-[#2B2D42]/70 [text-wrap:pretty]">
              Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens – Erfassen Sie pflegerelevante Beobachtungen, Einschränkungen und Ressourcen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#264653] text-white px-3.5 py-1.5 rounded-xl font-bold shadow-xs">
            {filledCount} von 13 erfasst
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-mono flex items-center gap-1.5 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Auto-Save aktiv
          </span>
        </div>
      </div>

      {/* Accordion Categories List */}
      <div className="space-y-3">
        {ABEDL_DEFINITIONS.map((cat) => {
          const isExpanded = !!expandedCategories[cat.id];
          const entry = abedlData[cat.id] || { info: '' };
          const hasContent = !!(entry.info && entry.info.trim().length > 0);
          const theme = CATEGORY_THEMES[cat.id] || CATEGORY_THEMES[1];

          return (
            <div
              key={cat.id}
              className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                hasContent
                  ? `${theme.border} ${theme.bg} shadow-sm`
                  : 'border-slate-200 bg-[#F8FAFB] hover:border-slate-300'
              }`}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full text-left p-3.5 sm:p-4 flex items-center justify-between transition-colors cursor-pointer ${
                  isExpanded ? 'bg-white/90 border-b border-slate-200' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs ${
                      hasContent
                        ? `${theme.accent} text-white`
                        : 'bg-slate-200 text-[#2B2D42]'
                    }`}
                  >
                    {cat.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#264653] block">
                        {cat.name}
                      </span>
                      {hasContent && (
                        <span className="hidden sm:inline-flex text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                          Erfasst
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#2B2D42]/70 line-clamp-1">
                      {cat.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  {hasContent && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Category Body Form */}
              {isExpanded && (
                <div className="p-4 sm:p-5 bg-white space-y-3.5 animate-in fade-in duration-200">
                  {/* Category Guide Box */}
                  <div className={`p-3 rounded-xl border ${theme.border} ${theme.bg} text-xs text-[#2B2D42] flex items-start gap-2.5`}>
                    <Info className="w-4 h-4 text-[#264653] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#264653] block font-bold mb-0.5">
                        Pflegerischer Fokus für ABEDL {cat.id} ({cat.name}):
                      </strong>
                      <span className="leading-relaxed [text-wrap:pretty]">{cat.desc}</span>
                    </div>
                  </div>

                  {/* Input Textarea with distinct warm styling */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#264653] flex items-center justify-between">
                      <span>Ihre Erfassung &amp; pflegerelevanten Informationen:</span>
                      {hasContent ? (
                        <span className="text-[10px] text-emerald-700 font-semibold font-mono">
                          Gespeichert ({entry.info.length} Zeichen)
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Noch keine Eingabe
                        </span>
                      )}
                    </label>
                    <textarea
                      rows={3}
                      value={entry.info || ''}
                      onChange={(e) => handleInfoChange(cat.id, e.target.value)}
                      placeholder={`Halten Sie pflegerelevante Beobachtungen, Befunde, Ressourcen und Einschränkungen im Fall Stefan & Heike zu "${cat.name}" fest...`}
                      className={`w-full rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2D42] placeholder-slate-400 focus:outline-none transition-all resize-y leading-relaxed font-sans ${
                        hasContent
                          ? 'bg-white border-2 border-emerald-500/50 focus:border-[#264653] focus:ring-2 focus:ring-[#264653]/15'
                          : 'bg-[#F4F7F8] border border-slate-300 focus:border-[#264653] focus:bg-white focus:ring-2 focus:ring-[#264653]/15'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
