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
  FileCheck,
  MessageSquare,
  Activity,
  Utensils,
  Droplet,
  Shirt,
  Moon,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AbedlFormProps {
  moduleId: number;
}

// Soft, gentle, harmonized palette for the 13 ABEDL categories
const CATEGORY_THEMES: {
  [key: number]: {
    bg: string;
    border: string;
    borderActive: string;
    accent: string;
    pillBg: string;
    pillText: string;
    icon: any;
    area: string;
  };
} = {
  1: {
    bg: 'bg-[#F4FAF6]',
    border: 'border-emerald-100',
    borderActive: 'border-emerald-300',
    accent: 'bg-emerald-600',
    pillBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200/60',
    pillText: 'text-emerald-900',
    icon: MessageSquare,
    area: 'Kommunikation & Kognition',
  },
  2: {
    bg: 'bg-[#F3FAF8]',
    border: 'border-teal-100',
    borderActive: 'border-teal-300',
    accent: 'bg-teal-600',
    pillBg: 'bg-teal-50 text-teal-800 border border-teal-200/60',
    pillText: 'text-teal-900',
    icon: Activity,
    area: 'Mobilität & Bewegung',
  },
  3: {
    bg: 'bg-[#F3F7FB]',
    border: 'border-blue-100',
    borderActive: 'border-blue-300',
    accent: 'bg-blue-600',
    pillBg: 'bg-blue-50 text-blue-800 border border-blue-200/60',
    pillText: 'text-blue-900',
    icon: HeartPulse,
    area: 'Vitale Funktionen & Atmung',
  },
  4: {
    bg: 'bg-[#FAF5FB]',
    border: 'border-fuchsia-100',
    borderActive: 'border-fuchsia-300',
    accent: 'bg-fuchsia-600',
    pillBg: 'bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200/60',
    pillText: 'text-fuchsia-900',
    icon: Sparkles,
    area: 'Körperpflege & Hygiene',
  },
  5: {
    bg: 'bg-[#FAF7F2]',
    border: 'border-amber-100',
    borderActive: 'border-amber-300',
    accent: 'bg-amber-600',
    pillBg: 'bg-amber-50 text-amber-800 border border-amber-200/60',
    pillText: 'text-amber-900',
    icon: Utensils,
    area: 'Ernährung & PEG-Sonde',
  },
  6: {
    bg: 'bg-[#F2F8FB]',
    border: 'border-sky-100',
    borderActive: 'border-sky-300',
    accent: 'bg-sky-600',
    pillBg: 'bg-sky-50 text-sky-800 border border-sky-200/60',
    pillText: 'text-sky-900',
    icon: Droplet,
    area: 'Ausscheidung & Katheter',
  },
  7: {
    bg: 'bg-[#F7F5FA]',
    border: 'border-purple-100',
    borderActive: 'border-purple-300',
    accent: 'bg-purple-600',
    pillBg: 'bg-purple-50 text-purple-800 border border-purple-200/60',
    pillText: 'text-purple-900',
    icon: Shirt,
    area: 'Kleiden & Erscheinungsbild',
  },
  8: {
    bg: 'bg-[#F8F9FA]',
    border: 'border-slate-200',
    borderActive: 'border-slate-300',
    accent: 'bg-slate-700',
    pillBg: 'bg-slate-100 text-slate-800 border border-slate-200',
    pillText: 'text-slate-900',
    icon: Moon,
    area: 'Ruhe, Schlaf & 4h-Takt',
  },
  9: {
    bg: 'bg-[#FAF6F2]',
    border: 'border-orange-100',
    borderActive: 'border-orange-300',
    accent: 'bg-orange-600',
    pillBg: 'bg-orange-50 text-orange-800 border border-orange-200/60',
    pillText: 'text-orange-900',
    icon: BookOpen,
    area: 'Tagesstruktur & Beschäftigung',
  },
  10: {
    bg: 'bg-[#FAF3F4]',
    border: 'border-rose-100',
    borderActive: 'border-rose-300',
    accent: 'bg-rose-600',
    pillBg: 'bg-rose-50 text-rose-800 border border-rose-200/60',
    pillText: 'text-rose-900',
    icon: UserCheck,
    area: 'Rollenidentität & Würde',
  },
  11: {
    bg: 'bg-[#FAF8F2]',
    border: 'border-yellow-100',
    borderActive: 'border-yellow-300',
    accent: 'bg-yellow-600',
    pillBg: 'bg-yellow-50 text-yellow-800 border border-yellow-200/60',
    pillText: 'text-yellow-900',
    icon: ShieldCheck,
    area: 'Sicherheit & Fachwerkhaus-Stufen',
  },
  12: {
    bg: 'bg-[#F3FAF8]',
    border: 'border-teal-100',
    borderActive: 'border-teal-300',
    accent: 'bg-teal-700',
    pillBg: 'bg-teal-50 text-teal-800 border border-teal-200/60',
    pillText: 'text-teal-950',
    icon: Users,
    area: 'Familie & Young Carers',
  },
  13: {
    bg: 'bg-[#F4F6F8]',
    border: 'border-slate-200',
    borderActive: 'border-[#264653]/40',
    accent: 'bg-[#264653]',
    pillBg: 'bg-[#264653]/10 text-[#264653] border border-[#264653]/20',
    pillText: 'text-[#264653]',
    icon: Compass,
    area: 'Existenzielle Erfahrungen & Schicksal',
  },
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
    <div className="bg-white border-2 border-[#264653]/20 rounded-3xl p-5 sm:p-6 card-soft-shadow space-y-6">
      {/* Header with warm care gradient */}
      <div className="border-b border-slate-200 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#1E3640] text-white flex items-center justify-center shadow-md">
            <FileSpreadsheet className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#264653] text-white">
                Strukturmodell Anamnese
              </span>
              <span className="text-xs font-semibold text-[#2A9D8F]">
                nach Monika Krohwinkel
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#264653] mt-0.5">
              13 ABEDL Pflegeanamnese &amp; Informationssammlung
            </h3>
            <p className="text-xs text-[#2B2D42]/75 [text-wrap:pretty]">
              Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens – Erfassen Sie pflegerelevante Beobachtungen, Einschränkungen und Ressourcen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono bg-[#264653] text-white px-3.5 py-1.5 rounded-xl font-bold shadow-xs">
            {filledCount} von 13 erfasst
          </span>
          <span className="text-[11px] px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-mono flex items-center gap-1.5 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Auto-Save aktiv
          </span>
        </div>
      </div>

      {/* Accordion Categories List */}
      <div className="space-y-3.5">
        {ABEDL_DEFINITIONS.map((cat) => {
          const isExpanded = !!expandedCategories[cat.id];
          const entry = abedlData[cat.id] || { info: '' };
          const hasContent = !!(entry.info && entry.info.trim().length > 0);
          const theme = CATEGORY_THEMES[cat.id] || CATEGORY_THEMES[1];
          const IconComp = theme.icon || Info;

          return (
            <div
              key={cat.id}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                hasContent
                  ? `${theme.borderActive} ${theme.bg} shadow-xs ring-1 ring-emerald-500/30`
                  : isExpanded
                  ? `${theme.borderActive} ${theme.bg} shadow-xs`
                  : `${theme.border} ${theme.bg} hover:shadow-xs hover:brightness-[0.98]`
              }`}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full text-left p-3.5 sm:p-4 flex items-center justify-between transition-colors cursor-pointer ${
                  isExpanded ? 'bg-white/80 border-b ' + theme.border + ' backdrop-blur-xs' : 'hover:bg-white/40'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs transition-transform ${
                      hasContent
                        ? `${theme.accent} text-white scale-105`
                        : `${theme.pillBg} ${theme.pillText} border ${theme.border}`
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#264653]/70">
                        ABEDL {cat.id}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#264653] truncate">
                        {cat.name}
                      </span>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${theme.pillBg} ${theme.pillText} shadow-2xs`}>
                        {theme.area}
                      </span>
                      {hasContent && (
                        <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                          ✓ Erfasst
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#2B2D42]/75 line-clamp-1 mt-0.5">
                      {cat.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 shrink-0 ml-2">
                  {hasContent && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <div className={`w-7 h-7 rounded-lg bg-white/90 border ${theme.border} flex items-center justify-center ${theme.pillText} shadow-xs`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Category Body Form */}
              {isExpanded && (
                <div className="p-4 sm:p-5 bg-white/95 space-y-3.5 animate-in fade-in duration-200">
                  {/* Category Guide Box */}
                  <div className={`p-3.5 rounded-xl border ${theme.border} ${theme.bg} text-xs text-[#2B2D42] flex items-start gap-3 shadow-xs`}>
                    <Info className="w-4 h-4 text-[#264653] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#264653] block font-bold mb-0.5">
                        Pflegerischer Fokus für ABEDL {cat.id} ({cat.name}):
                      </strong>
                      <span className="leading-relaxed text-slate-800 [text-wrap:pretty]">{cat.desc}</span>
                    </div>
                  </div>

                  {/* Input Textarea with distinct warm styling */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#264653] flex items-center justify-between">
                      <span>Ihre Erfassung &amp; pflegerelevanten Informationen:</span>
                      {hasContent ? (
                        <span className="text-[10px] text-emerald-700 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
                          ? 'bg-white border-2 border-emerald-500/60 focus:border-[#264653] focus:ring-2 focus:ring-[#264653]/15'
                          : 'bg-[#F9FAFB] border border-slate-300 focus:border-[#264653] focus:bg-white focus:ring-2 focus:ring-[#264653]/15'
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
