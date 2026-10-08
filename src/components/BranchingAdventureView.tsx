import React, { useState, useEffect } from 'react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
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
  HelpCircle,
  KeyRound,
  Copy,
  Unlock,
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
    showSuccessBanner,
    setActiveModal,
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
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const currentNode: AdventureNode | undefined = adventure.nodes[currentNodeId];
  const currentEnding: AdventureEnding | undefined = reachedEndingId
    ? adventure.endings[reachedEndingId]
    : undefined;

  const nextModulePasswordDef = LEVEL_PASSWORDS[moduleId + 1];

  useEffect(() => {
    if (reachedEndingId) {
      awardPasswordForNextModule(moduleId);
    }
  }, [reachedEndingId, moduleId, awardPasswordForNextModule]);

  const handleCopyPassword = (pwd: string) => {
    sounds.playSelectOption();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pwd);
    }
    setCopiedKey(true);
    showSuccessBanner(`Passwort „${pwd}“ für DS ${moduleId + 1} kopiert!`);
    setTimeout(() => setCopiedKey(false), 3000);
  };

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
    if (nameLower.includes('sohn') || nameLower.includes('philipp')) return CHARACTER_AVATARS.sohn1.imageUrl;
    return CHARACTER_AVATARS.heike.imageUrl;
  };

  const totalPoints = Math.max(1, accumulatedScores.pat + accumulatedScores.pef + accumulatedScores.inf);
  const patPercent = Math.round((accumulatedScores.pat / totalPoints) * 100);
  const pefPercent = Math.round((accumulatedScores.pef / totalPoints) * 100);
  const infPercent = Math.round((accumulatedScores.inf / totalPoints) * 100);

  return (
    <div className="space-y-6 text-[#2B2D42]">
      {/* Simulation Stage Header */}
      <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#264653] relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#E76F51] animate-ping" />
            <span className="text-xs font-bold text-[#E76F51] uppercase tracking-wider">
              Interaktives Fall-Adventure • Doppelstunde {moduleId}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-200 bg-white/15 px-3 py-1 rounded-full font-bold border border-white/20 shadow-xs">
            {adventure.roleProfile}
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-2xl font-bold text-white [text-wrap:balance]">
            {adventure.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed [text-wrap:pretty]">
            <strong className="text-amber-300 font-bold">Zentrale Leitfrage:</strong> {adventure.leitfrage}
          </p>
        </div>

        {/* Ausgangslage: deutlich größer & komfortabel lesbar */}
        <div className="p-4 sm:p-5 bg-white/10 rounded-2xl border border-white/20 text-sm sm:text-base text-slate-100 leading-relaxed [text-wrap:pretty] space-y-1.5 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono">
              Ausgangslage zu Beginn der Simulation
            </span>
          </div>
          <p className="text-sm sm:text-[15px] sm:leading-relaxed text-slate-100 font-sans">
            {adventure.ausgangslage}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE NODE (DIALOGUE & ACTION CHOICES)                                   */}
      {/* ========================================================================= */}
      {!reachedEndingId && currentNode && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Node Dialogue Box */}
          <div className="bg-white border-2 border-[#264653]/30 rounded-3xl p-6 sm:p-7 card-soft-shadow space-y-5">
            {/* Header: Node Title & Speaker */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={getAvatarUrl()}
                  alt={currentNode.speaker}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#264653] shadow-md bg-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#264653]">
                      {currentNode.speaker}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#2B2D42] border border-slate-200 font-semibold">
                      {currentNode.speakerRole}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono block mt-0.5">
                    {currentNode.title}
                  </span>
                </div>
              </div>

              {chosenHistory.length > 0 && (
                <button
                  onClick={handleRestart}
                  className="text-xs text-slate-500 hover:text-[#264653] flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="Szenario von Beginn an neu starten"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Neustart</span>
                </button>
              )}
            </div>

            {/* Scene Setting: Groß und hervorragend lesbar */}
            <div className="p-4.5 sm:p-5 bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50 rounded-2xl border-2 border-slate-200/90 text-sm sm:text-base text-[#2B2D42] leading-relaxed shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Situationsbeschreibung &amp; Szenerie:
              </span>
              <p className="font-medium [text-wrap:pretty]">
                {currentNode.sceneDescription}
              </p>
            </div>

            {/* Speech Bubble: Groß & klar lesbar */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50/50 rounded-2xl border-l-4 border-[#264653] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                <MessageSquareQuote className="w-5 h-5 text-[#E76F51]" />
                <span className="uppercase tracking-wider">O-Ton / Gesprochener Dialog:</span>
              </div>
              <p className="text-base sm:text-lg font-serif text-[#2B2D42] font-medium leading-relaxed [text-wrap:pretty]">
                {currentNode.dialogueText}
              </p>
            </div>

            {/* Dilemma Prompt */}
            <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#264653] uppercase tracking-wider">
              <Compass className="w-5 h-5 text-[#E76F51]" />
              <span>{currentNode.dilemmaPrompt}</span>
            </div>

            {/* Action Cards (Options) */}
            <div className="space-y-3.5 pt-1">
              {currentNode.options.map((opt, idx) => {
                const optionLetter = String.fromCharCode(65 + idx); // 'A', 'B', 'C'
                
                // Dynamic colorful styles per card position (pure visual appeal, not tied to fixed model)
                const cardColorStyles = [
                  {
                    border: 'border-indigo-200 hover:border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50/70',
                    badge: 'bg-indigo-600 text-white',
                    title: 'text-indigo-950',
                    handlungsBg: 'bg-indigo-100/60 border-indigo-200/80',
                    arrow: 'group-hover:text-indigo-600',
                  },
                  {
                    border: 'border-teal-200 hover:border-teal-500 bg-teal-50/30 hover:bg-teal-50/70',
                    badge: 'bg-teal-600 text-white',
                    title: 'text-teal-950',
                    handlungsBg: 'bg-teal-100/60 border-teal-200/80',
                    arrow: 'group-hover:text-teal-600',
                  },
                  {
                    border: 'border-amber-200 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/70',
                    badge: 'bg-amber-600 text-white',
                    title: 'text-amber-950',
                    handlungsBg: 'bg-amber-100/60 border-amber-200/80',
                    arrow: 'group-hover:text-amber-600',
                  },
                ][idx % 3];

                // Clean label by removing model references
                const cleanedTitle = opt.label
                  .replace(/\s*\([^)]*(paternalistisch|pef|informationsmodell|informed|pat|inf|reale annäherung|der reale weg)[^)]*\)/gi, '')
                  .trim();

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4.5 sm:p-5 rounded-2xl border-2 ${cardColorStyles.border} transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-xs space-y-2.5 group`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-lg ${cardColorStyles.badge} font-bold text-xs flex items-center justify-center shadow-xs`}>
                          {optionLetter}
                        </span>
                        <span className={`text-xs sm:text-sm font-bold ${cardColorStyles.title}`}>
                          {cleanedTitle.startsWith('Option') ? cleanedTitle : `Option ${optionLetter}: ${cleanedTitle}`}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-slate-400 ${cardColorStyles.arrow} transition-colors`} />
                    </div>

                    <p className="text-sm sm:text-base text-[#2B2D42] font-serif leading-relaxed [text-wrap:pretty]">
                      {opt.quote}
                    </p>

                    {opt.actionText && (
                      <p className={`text-xs text-slate-700 ${cardColorStyles.handlungsBg} p-2.5 rounded-xl border font-sans leading-relaxed`}>
                        <strong className="text-[#264653]">Handlungsansatz:</strong> {opt.actionText}
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

            {/* ========================================================================= */}
            {/* HERVORGEHOBENES PASSWORT FÜR DAS NÄCHSTE LEVEL                            */}
            {/* ========================================================================= */}
            {nextModulePasswordDef && (
              <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-[#264653]/10 border-2 border-amber-400/80 rounded-2xl shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/40">
                          Neuer Level-Schlüssel freigeschaltet!
                        </span>
                        <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Im Passwortbuch gespeichert
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#264653] mt-0.5">
                        Passwort für {nextModulePasswordDef.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-white rounded-xl border-2 border-amber-400 font-mono font-black text-base text-[#264653] tracking-widest shadow-inner select-all">
                      {nextModulePasswordDef.password}
                    </div>
                    <button
                      onClick={() => handleCopyPassword(nextModulePasswordDef.password)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        copiedKey
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#264653] hover:bg-[#1E3640] text-white'
                      }`}
                      title="Passwort kopieren"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-200" />
                          <span>Kopiert</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Kopieren</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveModal('passwordBook')}
                      className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Zum Passwortbuch"
                    >
                      <BookMarked className="w-4 h-4 text-amber-700" />
                      <span className="hidden sm:inline">Passwortbuch</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#2B2D42]/80 leading-relaxed">
                  Dieses Passwort schaltet die nächste Doppelstunde <strong>DS {moduleId + 1}</strong> frei. Es wurde automatisch in Ihr <strong>Passwortbuch</strong> übertragen.
                </p>
              </div>
            )}

            {/* Bottom Actions (linksbündig ausgerichtet zur Vermeidung von Kollisionen mit Netlify-Badge) */}
            <div className="pt-3 flex flex-wrap items-center justify-start gap-4 border-t border-slate-100">
              {onProceedToStep4 && (
                <button
                  onClick={onProceedToStep4}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2.5 shadow-lg shadow-amber-500/35 ring-4 ring-amber-300/60 animate-pulse transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Entscheidung abschließen &amp; weiter zu Schritt 4 (Auswertung &amp; Besprechung)</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              )}

              <span className="text-[11px] text-slate-500 font-medium">
                Entscheidungs-Adventure erfolgreich durchgespielt!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
