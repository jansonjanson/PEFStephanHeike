import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ABEDL_DEFINITIONS } from '../utils/docxExport';
import {
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Info,
  Layers
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AbedlFormProps {
  moduleId: number;
}

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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#264653]/10 border border-[#264653]/20 flex items-center justify-center text-[#264653]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#264653] uppercase tracking-wider">
              13 ABEDL Pflegeanamnese nach Monika Krohwinkel
            </h3>
            <p className="text-xs text-[#2B2D42]/70 [text-wrap:pretty]">
              Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens – Erfassen Sie pflegerelevante Informationen &amp; Ressourcen
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#264653]/10 text-[#264653] px-3 py-1 rounded-full font-bold">
            {filledCount} von 13 Kategorien erfasst
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono flex items-center gap-1.5 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Auto-Save
          </span>
        </div>
      </div>

      {/* Accordion Categories List */}
      <div className="space-y-3">
        {ABEDL_DEFINITIONS.map((cat) => {
          const isExpanded = !!expandedCategories[cat.id];
          const entry = abedlData[cat.id] || { info: '' };
          const hasContent = !!(entry.info && entry.info.trim().length > 0);

          return (
            <div
              key={cat.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                hasContent
                  ? 'bg-white border-[#264653]/30 shadow-xs'
                  : 'bg-[#F7F9FA] border-slate-200'
              }`}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      hasContent
                        ? 'bg-[#264653] text-white'
                        : 'bg-slate-200 text-[#2B2D42]'
                    }`}
                  >
                    {cat.id}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#264653] block">{cat.name}</span>
                    <span className="text-[11px] text-[#2B2D42]/60 line-clamp-1">{cat.desc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {hasContent && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium font-mono">
                      Erfasst
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Category Body Form */}
              {isExpanded && (
                <div className="p-4 bg-white border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                  <div className="p-2.5 bg-[#F7F9FA] rounded-lg border border-slate-200 text-[11px] text-[#2B2D42]/80 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#264653] shrink-0" />
                    <span><strong>Fokus in dieser Kategorie:</strong> {cat.desc}</span>
                  </div>

                  {/* Field 1: Situationsbeschreibung & Ressourcen */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#264653] block">
                      Informationen, Ressourcen &amp; Einschränkungen zu ABEDL {cat.id} ({cat.name}):
                    </label>
                    <textarea
                      rows={3}
                      value={entry.info || ''}
                      onChange={(e) => handleInfoChange(cat.id, e.target.value)}
                      placeholder={`Beobachtungen, pflegerelevante Befunde und Ressourcen im Fall Stephan & Heike zu "${cat.name}"...`}
                      className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y leading-relaxed"
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
