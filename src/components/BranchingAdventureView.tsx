import React, { useState, useEffect } from 'react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import { AdventureData, AdventureNode, AdventureOption, AdventureEnding } from '../types';
import { CHARACTER_AVATARS } from '../data/avatarsData';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Scale,
  Check,
  Flag,
  KeyRound,
  Copy,
  BookMarked
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
  const {
    moduleStates,
    recordSimulationChoice,
    awardPasswordForNextModule,
    setActiveModal,
    showSuccessBanner,
  } = useApp();

  const [currentNodeId, setCurrentNodeId] = useState<string>(adventure.startNodeId);
  const [accumulatedScores, setAccumulatedScores] = useState<{ pat: number; pef: number; inf: number }>({
    pat: 0,
    pef: 0,
    inf: 0,
  });
  const [chosenHistory, setChosenHistory] = useState<{ nodeId: string; option: AdventureOption }[]>([]);
  const [reachedEndingId, setReachedEndingId] = useState<string | null>(null);
  const [reflectionNote, setReflectionNote] = useState<string>('');
  const [copiedPassword, setCopiedPassword] = useState<boolean>(false);

  const currentNode: AdventureNode | undefined = adventure.nodes[currentNodeId];
  const currentEnding: AdventureEnding | undefined = reachedEndingId
    ? adventure.endings[reachedEndingId]
    : undefined;

  const nextModuleId = moduleId + 1;
  const nextPasswordDef = LEVEL_PASSWORDS[nextModuleId];

  // Auto-award password when ending is reached
  useEffect(() => {
    if (reachedEndingId) {
      awardPasswordForNextModule(moduleId);
    }
  }, [reachedEndingId, moduleId]);

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
    setCopiedPassword(false);
  };

  const handleCopyPassword = (pwd: string) => {
    sounds.playSelectOption();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pwd);
    }
    setCopiedPassword(true);
    showSuccessBanner(`Passwort „${pwd}“ in die Zwischenablage kopiert!`);
    setTimeout(() => setCopiedPassword(false), 3000);
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
                  className="text-xs text-slate-500 hover:text-[#264653] flex items-center gap-1 font-semibold p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Szenario von Beginn an neu starten"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Neustart</span>
                </button>
              )}
            </div>

            {/* Scene Setting */}
            <div className="p-3.5 bg-slate-50 border-l-4 border-[#264653] rounded-r-xl text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
              <strong className="text-[#264653] block mb-0.5">Szene:</strong>
              {currentNode.sceneDescription}
            </div>

            {/* Spoken Dialogue */}
            <div className="p-4 bg-[#F7F9FA] rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Direkte Aussage von {currentNode.speaker}:
              </span>
              <p className="text-sm font-serif italic text-[#1E3640] leading-relaxed [text-wrap:pretty]">
                {currentNode.dialogueText}
              </p>
            </div>

            {/* Dilemma Prompt */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E76F51]" />
                <span>{currentNode.dilemmaPrompt}</span>
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-1">
              {currentNode.options.map((opt, idx) => {
                const optColors = [
                  {
                    border: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/40',
                    badge: 'bg-blue-100 text-blue-900 border border-blue-200',
                  },
                  {
                    border: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/40',
                    badge: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
                  },
                  {
                    border: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50/40',
                    badge: 'bg-amber-100 text-amber-900 border border-amber-200',
                  },
                ][idx % 3];

                const cleanLabel = opt.label.split('[')[0].trim();

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all bg-white shadow-xs hover:shadow-md cursor-pointer group space-y-2.5 ${optColors.border}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-mono ${optColors.badge}`}>
                        {cleanLabel}
                      </span>
                      <span className="text-[11px] font-bold text-[#264653] group-hover:text-[#E76F51] flex items-center gap-1">
                        <span>Auswählen</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#2B2D42] font-medium leading-relaxed [text-wrap:pretty]">
                      {opt.quote}
                    </p>

                    {opt.actionText && (
                      <p className="text-[11px] text-slate-500 italic border-t border-slate-100 pt-1.5">
                        Handlung: {opt.actionText}
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
      {/* ENDING SCREEN WITH PROMINENT PASSWORD REWARD BOX                         */}
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
                className="text-xs text-slate-500 hover:text-[#264653] flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
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
            {/* PROMINENTE PASSWORT-BELOHNUNGSBOX (IMMER HERVORRAGEND SICHTBAR)             */}
            {/* ========================================================================= */}
            {nextPasswordDef && nextModuleId <= 7 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white border-2 border-emerald-400/80 shadow-xl relative overflow-hidden space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-[#E76F51] text-slate-950 flex items-center justify-center shadow-lg shrink-0">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-mono">
                          Level-Passwort freigespielt
                        </span>
                        <span className="text-xs text-emerald-200 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Im Passwortbuch gespeichert
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                        Passwort für Doppelstunde {nextModuleId}:
                      </h4>
                      <p className="text-xs text-slate-300">
                        {nextPasswordDef.title}
                      </p>
                    </div>
                  </div>

                  {/* Password Badge & Copy Button */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="px-5 py-2.5 rounded-2xl bg-black/50 border-2 border-amber-400 font-mono text-base sm:text-lg font-extrabold text-amber-300 tracking-wider flex items-center gap-2 shadow-inner">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>{nextPasswordDef.password}</span>
                    </div>

                    <button
                      onClick={() => handleCopyPassword(nextPasswordDef.password)}
                      className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer transform hover:scale-105"
                      title="Passwort in die Zwischenablage kopieren"
                    >
                      {copiedPassword ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span>Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Kopieren</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                  <span>
                    Geben Sie <strong>{nextPasswordDef.password}</strong> beim Klick auf Doppelstunde {nextModuleId} ein, um das nächste Level zu betreten.
                  </span>

                  <button
                    onClick={() => setActiveModal('passwordBook')}
                    className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer underline"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Zum Passwortbuch</span>
                  </button>
                </div>
              </div>
            )}

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
                  <span>Entscheidung abschließen &amp; weiter zu Schritt 4 (Auswertung &amp; Besprechung)</span>
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
