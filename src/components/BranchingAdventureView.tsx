import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdventureData, AdventureNode, AdventureOption, AdventureEnding } from '../types';
import { CHARACTER_AVATARS } from '../data/avatarsData';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Compass,
  Scale,
  Award,
  BookOpen,
  MessageSquareQuote,
  Check,
  Flag,
  HelpCircle
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface BranchingAdventureViewProps {
  moduleId: number;
  adventure: AdventureData;
  onProceedToStep4?: () => void;
}

export const BranchingAdventureView: React.FC<BranchingAdventureViewProps> = ({
  moduleId,
  adventure,
  onProceedToStep4,
}) => {
  const { moduleStates, recordSimulationChoice } = useApp();

  const [currentNodeId, setCurrentNodeId] = useState<string>(adventure.startNodeId);
  const [accumulatedScores, setAccumulatedScores] = useState<{ pat: number; pef: number; inf: number }>({
    pat: 0,
    pef: 0,
    inf: 0,
  });
  const [chosenHistory, setChosenHistory] = useState<{ nodeId: string; option: AdventureOption }[]>([]);
  const [reachedEndingId, setReachedEndingId] = useState<string | null>(null);
  const [reflectionNote, setReflectionNote] = useState<string>('');

  const currentNode: AdventureNode | undefined = adventure.nodes[currentNodeId];
  const currentEnding: AdventureEnding | undefined = reachedEndingId
    ? adventure.endings[reachedEndingId]
    : undefined;

  const handleSelectOption = (option: AdventureOption) => {
    sounds.playSelectOption();

    const newScores = {
      pat: accumulatedScores.pat + option.scores.pat,
      pef: accumulatedScores.pef + option.scores.pef,
      inf: accumulatedScores.inf + option.scores.inf,
    };
    setAccumulatedScores(newScores);

    const newHistory = [...chosenHistory, { nodeId: currentNodeId, option }];
    setChosenHistory(newHistory);

    // Sync with AppContext simulation stats
    recordSimulationChoice(moduleId, currentNodeId, option.id, {
      pefScore: option.scores.pef,
      paternalisticScore: option.scores.pat,
      informedScore: option.scores.inf,
    });

    if (option.targetEndingId) {
      sounds.playSuccess();
      setReachedEndingId(option.targetEndingId);
    } else if (option.targetNodeId && adventure.nodes[option.targetNodeId]) {
      setCurrentNodeId(option.targetNodeId);
    } else {
      // Fallback ending if reached leaf
      const defaultEndingKey = Object.keys(adventure.endings)[0];
      setReachedEndingId(defaultEndingKey);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentNodeId(adventure.startNodeId);
    setAccumulatedScores({ pat: 0, pef: 0, inf: 0 });
    setChosenHistory([]);
    setReachedEndingId(null);
  };

  // Determine avatar
  const getAvatarUrl = () => {
    if (currentNode?.speakerAvatar) return currentNode.speakerAvatar;
    const nameLower = (currentNode?.speaker || '').toLowerCase();
    if (nameLower.includes('heike')) return CHARACTER_AVATARS.heike.imageUrl;
    if (nameLower.includes('stefan') || nameLower.includes('stephan')) return CHARACTER_AVATARS.stephan.imageUrl;
    if (nameLower.includes('leon')) return CHARACTER_AVATARS.sohn2_leon.imageUrl;
    if (nameLower.includes('lukas')) return CHARACTER_AVATARS.sohn3_lukas.imageUrl;
    if (nameLower.includes('sohn') || nameLower.includes('philipp') || nameLower.includes('pascal')) return CHARACTER_AVATARS.sohn1.imageUrl;
    return CHARACTER_AVATARS.heike.imageUrl;
  };

  const totalPoints = Math.max(1, accumulatedScores.pat + accumulatedScores.pef + accumulatedScores.inf);
  const patPercent = Math.round((accumulatedScores.pat / totalPoints) * 100);
  const pefPercent = Math.round((accumulatedScores.pef / totalPoints) * 100);
  const infPercent = Math.round((accumulatedScores.inf / totalPoints) * 100);

  return (
    <div className="space-y-6 text-[#2B2D42]">
      {/* Simulation Stage Header */}
      <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#264653] relative overflow-hidden space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F51] animate-ping" />
            <span className="text-xs font-bold text-[#E76F51] uppercase tracking-wider">
              Interaktives Fall-Adventure • Doppelstunde {moduleId}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full font-bold border border-white/10">
            {adventure.roleProfile}
          </span>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-white [text-wrap:balance]">
            {adventure.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed [text-wrap:pretty]">
            <strong className="text-amber-300">Zentrale Leitfrage:</strong> {adventure.leitfrage}
          </p>
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 leading-relaxed [text-wrap:pretty]">
          <strong className="text-white block mb-0.5 font-bold">Ausgangslage:</strong>
          {adventure.ausgangslage}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE NODE (DIALOGUE & ACTION CHOICES)                                   */}
      {/* ========================================================================= */}
      {!reachedEndingId && currentNode && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Node Dialogue Box */}
          <div className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-4">
            {/* Header: Node Title & Speaker */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={getAvatarUrl()}
                  alt={currentNode.speaker}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-[#264653] shadow-md bg-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#264653]">
                      {currentNode.speaker}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#2B2D42] border border-slate-200 font-medium">
                      {currentNode.speakerRole}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block">
                    {currentNode.title}
                  </span>
                </div>
              </div>

              {chosenHistory.length > 0 && (
                <button
                  onClick={handleRestart}
                  className="text-xs text-slate-500 hover:text-[#264653] flex items-center gap-1 font-semibold p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Szenario von Beginn an neu starten"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Neustart</span>
                </button>
              )}
            </div>

            {/* Scene Setting */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-[#2B2D42]/80 italic">
              {currentNode.sceneDescription}
            </div>

            {/* Speech Bubble */}
            <div className="p-4.5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border-l-4 border-[#264653] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#264653] mb-1">
                <MessageSquareQuote className="w-4 h-4 text-[#E76F51]" />
                <span>O-Ton / Situations-Dialog:</span>
              </div>
              <p className="text-xs sm:text-sm font-serif text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
                {currentNode.dialogueText}
              </p>
            </div>

            {/* Dilemma Prompt */}
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#E76F51]" />
              <span>{currentNode.dilemmaPrompt}</span>
            </div>

            {/* Action Cards (Options) */}
            <div className="space-y-3 pt-1">
              {currentNode.options.map((opt) => {
                const isPef = opt.model === 'pef';
                const isPat = opt.model === 'paternalistic';

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-xs space-y-2 ${
                      isPef
                        ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-500'
                        : isPat
                        ? 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-[#264653]'
                        : 'border-amber-300 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isPef ? 'bg-emerald-500' : isPat ? 'bg-[#264653]' : 'bg-amber-500'
                          }`}
                        />
                        <span className="text-xs font-bold text-[#264653]">
                          {opt.label}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#264653]" />
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#2B2D42] font-serif leading-relaxed [text-wrap:pretty]">
                      {opt.quote}
                    </p>

                    {opt.actionText && (
                      <p className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-200 font-sans">
                        <strong className="text-slate-800">Handlungsauswirkung:</strong> {opt.actionText}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REACHED ENDING SCENARIO & COMPREHENSIVE PEDAGOGICAL EVALUATION            */}
      {/* ========================================================================= */}
      {reachedEndingId && currentEnding && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Ending Result Card */}
          <div className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                    currentEnding.isRealDocumentaryOutcome
                      ? 'bg-amber-500'
                      : currentEnding.badge.includes('PEF')
                      ? 'bg-emerald-600'
                      : 'bg-[#264653]'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-[#264653]">
                      {currentEnding.badge}
                    </span>
                    {currentEnding.isRealDocumentaryOutcome && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                        Reale Dokumentation
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#264653] mt-0.5">
                    {currentEnding.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="text-xs text-slate-500 hover:text-[#264653] flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Szenario erneut spielen</span>
              </button>
            </div>

            {/* Ending Description */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#264653] uppercase tracking-wider block">
                Entwicklung des Familiensystems:
              </span>
              <p className="text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
                {currentEnding.resultDescription}
              </p>
            </div>

            {/* Pedagogical Reflection */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                Pflegepädagogische Reflexion:
              </span>
              <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:pretty]">
                {currentEnding.reflectionText}
              </p>
            </div>

            {/* ========================================================================= */}
            {/* AUSWERTUNG & DIMENSIONEN (PAT vs. PEF vs. INF)                            */}
            {/* ========================================================================= */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#264653]" />
                <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider">
                  Entscheidungs-Profil Ihres Beratungsverlaufs:
                </h4>
              </div>

              <div className="space-y-2.5">
                {/* PAT Score */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-[#264653]">
                    <span>1. Paternalismus (PAT): Wie stark haben Sie fachlich bevormundet?</span>
                    <span>{patPercent}% ({accumulatedScores.pat} Pkt.)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#264653] transition-all duration-500"
                      style={{ width: `${patPercent}%` }}
                    />
                  </div>
                </div>

                {/* PEF Score */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-emerald-950">
                    <span>2. Partizipative Entscheidungsfindung (PEF): Partnerschaft auf Augenhöhe</span>
                    <span>{pefPercent}% ({accumulatedScores.pef} Pkt.)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${pefPercent}%` }}
                    />
                  </div>
                </div>

                {/* INF Score */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-amber-950">
                    <span>3. Informationsmodell (INF): Verantwortung auf Angehörige abgewälzt</span>
                    <span>{infPercent}% ({accumulatedScores.inf} Pkt.)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-amber-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${infPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Final Question with Reflection Textarea */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <label className="text-xs font-bold text-[#264653] block leading-relaxed [text-wrap:pretty]">
                {adventure.finalQuestion}
              </label>
              <textarea
                rows={3}
                value={reflectionNote}
                onChange={(e) => setReflectionNote(e.target.value)}
                placeholder="Halten Sie Ihre Reflexion zur Weggabelung und zum realen Verlauf der Doku fest..."
                className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white resize-y"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Entscheidungs-Adventure erfolgreich durchgespielt!
              </span>

              {onProceedToStep4 && (
                <button
                  onClick={onProceedToStep4}
                  className="px-6 py-3.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Entscheidung abschließen &amp; weiter zu Schritt 4 (Auswertung &amp; Musterlösung)</span>
                  <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
