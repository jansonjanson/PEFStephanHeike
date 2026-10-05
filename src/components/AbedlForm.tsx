import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ABEDL_DEFINITIONS } from '../utils/docxExport';
import {
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Layers,
  Save,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AbedlFormProps {
  moduleId: number;
}

export const AbedlForm: React.FC<AbedlFormProps> = ({ moduleId }) => {
  const { moduleStates, updateAbedl } = useApp();
  const state = moduleStates[moduleId];
  const abedlData = state?.abedl || {};

  const [expandedIds, setExpandedIds] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    5: true,
    12: true,
    13: true,
  });

  const toggleExpand = (id: number) => {
    sounds.playClick();
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (expand: boolean) => {
    sounds.playClick();
    const map: { [key: number]: boolean } = {};
    ABEDL_DEFINITIONS.forEach((item) => {
      map[item.id] = expand;
    });
    setExpandedIds(map);
  };

  const filledCount = ABEDL_DEFINITIONS.filter((item) => {
    const entry = abedlData[item.id];
    return entry && (entry.info || entry.pesr?.p || entry.pesr?.e || entry.pesr?.s || entry.pesr?.r);
  }).length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
      {/* Form Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Checkliste Pflegeanamnese (13 ABEDL)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold">
                {filledCount}/13 erfasst
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Nach Monika Krohwinkel mit PESR-Pflegediagnosen
            </p>
          </div>
        </div>

        {/* Expand / Collapse Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleAll(true)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
          >
            Alle öffnen
          </button>
          <button
            type="button"
            onClick={() => toggleAll(false)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
          >
            Alle schließen
          </button>
        </div>
      </div>

      {/* Info Pill */}
      <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/40 text-xs text-teal-200/90 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-teal-300">Strukturierter Pflegeprozess:</span> Trage in die jeweilige Kategorie pflegerelevante Beobachtungen ein. Nutze bei Handlungsbedarf die PESR-Felder (
          <strong className="text-white">P</strong>roblem, <strong className="text-white">E</strong>tiology/Ursache, <strong className="text-white">S</strong>ymptome, <strong className="text-white">R</strong>essourcen).
        </div>
      </div>

      {/* 13 ABEDL Cards List */}
      <div className="space-y-3">
        {ABEDL_DEFINITIONS.map((item) => {
          const entry = abedlData[item.id] || { info: '', pesr: { p: '', e: '', s: '', r: '' } };
          const isExpanded = !!expandedIds[item.id];
          const hasContent = entry.info || entry.pesr?.p || entry.pesr?.e || entry.pesr?.s || entry.pesr?.r;

          return (
            <div
              key={item.id}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                hasContent
                  ? 'bg-slate-950/70 border-teal-500/40'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                      hasContent
                        ? 'bg-teal-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.id}
                  </span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white tracking-wide block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {hasContent && (
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Card Body (when expanded) */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800/80 space-y-4 bg-slate-900/40">
                  {/* General Info */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Pflegerelevante Informationen & Beobachtungen
                    </label>
                    <textarea
                      rows={2}
                      value={entry.info || ''}
                      onChange={(e) => updateAbedl(moduleId, item.id, 'info', e.target.value)}
                      placeholder={`Beobachtungen zu ${item.name} aus der Videosituation...`}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-all resize-y"
                    />
                  </div>

                  {/* PESR Grid */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>PESR-Pflegediagnose</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* P: Problem */}
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <label className="text-[10px] font-bold text-rose-400 uppercase block mb-1">
                          P - Pflegediagnose / Problem
                        </label>
                        <input
                          type="text"
                          value={entry.pesr?.p || ''}
                          onChange={(e) => updateAbedl(moduleId, item.id, 'p', e.target.value)}
                          placeholder="z.B. Eingeschränkte Kommunikationsfähigkeit"
                          className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      {/* E: Etiology / Ursache */}
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <label className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
                          E - Ursache / Ätiologie
                        </label>
                        <input
                          type="text"
                          value={entry.pesr?.e || ''}
                          onChange={(e) => updateAbedl(moduleId, item.id, 'e', e.target.value)}
                          placeholder="z.B. Schädel-Hirn-Trauma und Trachealkanüle"
                          className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* S: Symptome */}
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <label className="text-[10px] font-bold text-cyan-400 uppercase block mb-1">
                          S - Symptome / Kennzeichen
                        </label>
                        <input
                          type="text"
                          value={entry.pesr?.s || ''}
                          onChange={(e) => updateAbedl(moduleId, item.id, 's', e.target.value)}
                          placeholder="z.B. Fehlende Lautsprache, motorische Unruhe"
                          className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* R: Ressourcen */}
                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
                          R - Ressourcen & Fähigkeiten
                        </label>
                        <input
                          type="text"
                          value={entry.pesr?.r || ''}
                          onChange={(e) => updateAbedl(moduleId, item.id, 'r', e.target.value)}
                          placeholder="z.B. Blickkontakt, Ja-Blinzeln, Heikes Nähe"
                          className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
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
