import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ModuleData } from '../types';
import { AbedlForm } from './AbedlForm';
import {
  Film,
  Play,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
  Users,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Lock,
  Scale,
  MessageSquareQuote,
  Lightbulb,
  FileCheck2,
  FileText,
  Check,
  FileSpreadsheet,
  Table,
  Compass
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DecisionMomentsWorkflowProps {
  module: ModuleData;
  onProceedToSimulation: () => void;
}

export const DecisionMomentsWorkflow: React.FC<DecisionMomentsWorkflowProps> = ({
  module,
  onProceedToSimulation,
}) => {
  const { moduleStates, updateZusatzdoc, advanceModuleStep } = useApp();
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  const state = moduleStates[module.id];
  const zusatzdoc = state?.zusatzdoc || {
    who: '',
    whatHappened: '',
    decisionsMade: '',
    ethicalDilemmas: '',
    decisionMomentsIdentified: '',
    derivableInput: '',
    probableInput: '',
    hypotheticalInput: '',
    decisionMomentsConfirmed: false,
    abedlConfirmed: false,
  };

  const isAbedlConfirmed = !!(zusatzdoc as any).abedlConfirmed;
  const isDecisionConfirmed = !!zusatzdoc.decisionMomentsConfirmed;
  const decisionData = module.decisionMoments;

  const handleConfirmAbedl = () => {
    sounds.playSuccess();
    updateZusatzdoc(module.id, {
      abedlConfirmed: true,
    } as any);

    setTimeout(() => {
      const el = document.getElementById(`block-3b-decisions-${module.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleConfirmDecisionInput = () => {
    sounds.playSuccess();
    updateZusatzdoc(module.id, {
      decisionMomentsConfirmed: true,
      abedlConfirmed: true,
    } as any);
    advanceModuleStep(module.id, 2);

    setTimeout(() => {
      const resEl = document.getElementById(`resolution-panel-${module.id}`);
      resEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleDerivableChange = (val: string) => {
    updateZusatzdoc(module.id, {
      derivableInput: val,
      decisionsMade: val,
    } as any);
  };

  const handleProbableChange = (val: string) => {
    updateZusatzdoc(module.id, {
      probableInput: val,
    } as any);
  };

  const handleHypotheticalChange = (val: string) => {
    updateZusatzdoc(module.id, {
      hypotheticalInput: val,
    } as any);
  };

  const derivableText = (zusatzdoc.derivableInput || zusatzdoc.decisionMomentsIdentified || zusatzdoc.decisionsMade || '').trim();
  const probableText = (zusatzdoc.probableInput || '').trim();
  const hypotheticalText = (zusatzdoc.hypotheticalInput || '').trim();

  return (
    <div className="space-y-8 text-[#2B2D42]">
      {/* ========================================================================= */}
      {/* [BLOCK 1] VIDEO-PLAYER: HOCHWERTIGE SCHALTFLÄCHE (SLIDEPRESENTER)         */}
      {/* ========================================================================= */}
      <section id={`block-1-video-${module.id}`} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              1
            </span>
            <span>[Block 1] Video: Filmsequenz anschauen</span>
          </div>

          {module.videoDuration && (
            <span className="text-[11px] font-mono text-[#2B2D42]/70 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
              Dauer: {module.videoDuration}
            </span>
          )}
        </div>

        {/* High-End Video Launch Card */}
        <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-[#264653]">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E76F51]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white">
                  SlidePresenter Originalaufnahme
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {module.subtitle}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white [text-wrap:balance]">
                {module.videoTitle || `Videosequenz zu Doppelstunde ${module.id}`}
              </h3>

              <p className="text-xs text-slate-200/90 leading-relaxed [text-wrap:pretty]">
                {module.videoDescription}
              </p>
            </div>

            {module.videoUrl && (
              <a
                href={module.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-full md:w-auto shrink-0 px-6 py-4 rounded-xl bg-[#E76F51] hover:bg-[#D65F42] active:bg-[#C25237] text-white font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-[#E76F51]/30 transition-all transform hover:scale-[1.02] cursor-pointer"
                title="Videosequenz im gesicherten SlidePresenter-Player in neuem Tab öffnen"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Video auf SlidePresenter öffnen</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span>Öffnet sich in einem neuen Browser-Tab. Nach dem Anschauen kehren Sie hierher zurück.</span>
            <span className="hidden sm:inline text-slate-400 font-mono">Status: Bereit</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 2] TEXT-AKKORDEON (OPTIONAL): ZUSAMMENFASSUNG ZUM NACHLESEN        */}
      {/* ========================================================================= */}
      {module.narrativeSummary && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              2
            </span>
            <span>[Block 2] Text-Akkordeon (optional)</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden card-soft-shadow transition-all">
            <button
              onClick={() => {
                sounds.playClick();
                setIsAccordionOpen(!isAccordionOpen);
              }}
              className="w-full p-4.5 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#264653] flex items-center gap-2 [text-wrap:balance]">
                    <span>Zusammenfassung zum Nachlesen einblenden (narrativer Text)</span>
                  </span>
                  <span className="text-[11px] text-[#2B2D42]/60 block mt-0.5">
                    {isAccordionOpen ? 'Klicken Sie zum Einklappen' : 'Ausführliche Schilderung der Sequenz mit O-Tönen nachlesen'}
                  </span>
                </div>
              </div>

              <div className="p-1 rounded-lg bg-white border border-slate-200 text-[#264653]">
                {isAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {isAccordionOpen && (
              <div className="p-5 sm:p-6 bg-[#FDFEFE] border-t border-slate-200 animate-in fade-in duration-300">
                <div className="prose prose-sm max-w-none text-xs sm:text-[13px] leading-relaxed font-serif text-[#2B2D42] space-y-4">
                  {module.narrativeSummary.split('\n\n').map((para, i) => (
                    <p key={i} className="leading-relaxed whitespace-pre-line text-[#2B2D42] [text-wrap:pretty]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* [BLOCK 3A] PROGREDIENTER ARBEITSBEREICH: 1. ERST 13 ABEDL PFLEGEANAMNESE    */}
      {/* ========================================================================= */}
      <section id={`block-3a-abedl-${module.id}`} className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${isAbedlConfirmed ? 'bg-emerald-600 text-white' : 'bg-[#264653] text-white'}`}>
              3A
            </span>
            <span>[Block 3A] 13 ABEDL Pflegeanamnese nach Monika Krohwinkel</span>
          </div>

          {isAbedlConfirmed ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              ABEDL bestätigt
            </span>
          ) : (
            <span className="text-[11px] font-bold text-[#E76F51] bg-[#E76F51]/10 border border-[#E76F51]/20 px-3 py-0.5 rounded-full animate-pulse">
              Aktiver Schritt
            </span>
          )}
        </div>

        {/* The 13 ABEDL Form (without PESR) */}
        <div className="space-y-4">
          <AbedlForm moduleId={module.id} />

          {/* Confirmation Button for Step 3A */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleConfirmAbedl}
              className="px-6 py-3.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>13 ABEDL Pflegeanamnese bestätigen und weiter zur Entscheidungsanalyse (Block 3B)</span>
              <ArrowDown className="w-4 h-4 text-[#E76F51]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 3B] 2. ZENTRALE ENTSCHEIDUNGSMOMENTE IDENTIFIZIEREN (3 FARBIGE BOXEN)*/}
      {/* ========================================================================= */}
      <section id={`block-3b-decisions-${module.id}`} className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${isDecisionConfirmed ? 'bg-emerald-600 text-white' : isAbedlConfirmed ? 'bg-[#E76F51] text-white' : 'bg-slate-200 text-slate-500'}`}>
              3B
            </span>
            <span>[Block 3B] Zentrale Entscheidungsmomente identifizieren</span>
          </div>

          {isDecisionConfirmed ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Entscheidungen bestätigt
            </span>
          ) : isAbedlConfirmed ? (
            <span className="text-[11px] font-bold text-[#E76F51] bg-[#E76F51]/10 border border-[#E76F51]/20 px-3 py-0.5 rounded-full animate-pulse">
              Aktiver Schritt
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Gesperrt
            </span>
          )}
        </div>

        {!isAbedlConfirmed ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
            <Lock className="w-6 h-6 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-[#264653]">Block 3B noch gesperrt</h4>
            <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
              Bestätigen Sie oben Block 3A (13 ABEDL Pflegeanamnese), um die 3 farbigen Eingabeboxen für die Entscheidungsmomente freizuschalten.
            </p>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-6 animate-in fade-in duration-300">
            {/* Structured Arbeitsauftrag with 3 perspective tiers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#E76F51]" />
                <h3 className="text-sm sm:text-base font-bold text-[#264653]">
                  Arbeitsauftrag: Entscheidungen identifizieren
                </h3>
              </div>

              <p className="text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
                Lesen Sie bei Bedarf die Zusammenfassung oben quer und halten Sie in den drei farbigen Eingabeboxen fest, welche Entscheidungen in dieser Sequenz eine Rolle spielen. Berücksichtigen Sie dabei die jeweiligen Ebenen:
              </p>
            </div>

            {/* 3 DISTINCT COLOR-CODED INPUT BOXES */}
            <div className="grid grid-cols-1 gap-5">
              {/* Box 1: Grün - Belegte Entscheidungen (Direkt ableitbar) */}
              <div className="border-2 border-emerald-400 bg-emerald-50/40 rounded-2xl p-4.5 sm:p-5 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider">
                      Ebene 1 • Grün
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                      Belegte Entscheidungen (Direkt ableitbar)
                    </h4>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md font-medium">
                    Explizit im Video / Text getroffen
                  </span>
                </div>

                <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Leitfrage:</strong> Welche Entscheidungen wurden im Video / Text explizit so getroffen und von wem?
                </p>

                <textarea
                  rows={4}
                  value={zusatzdoc.derivableInput || zusatzdoc.decisionMomentsIdentified || zusatzdoc.decisionsMade || ''}
                  onChange={(e) => handleDerivableChange(e.target.value)}
                  placeholder={`Halten Sie direkt belegte Entscheidungen fest (inkl. handelnder Personen):
• z.B. Wer hat welche Entscheidung im Video explizit getroffen?
• z.B. Welche Maßnahmen wurden angeordnet oder durchgeführt?`}
                  className="w-full bg-white border-2 border-emerald-300 rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-y leading-relaxed font-sans"
                />
              </div>

              {/* Box 2: Gelb/Orange - Hintergrund-Entscheidungen (Wahrscheinlich) */}
              <div className="border-2 border-amber-400 bg-amber-50/40 rounded-2xl p-4.5 sm:p-5 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider">
                      Ebene 2 • Gelb / Orange
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                      Hintergrund-Entscheidungen (Wahrscheinlich)
                    </h4>
                  </div>
                  <span className="text-[10px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md font-medium">
                    Plausible Rahmenentscheidungen
                  </span>
                </div>

                <p className="text-xs text-amber-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Leitfrage:</strong> Welche Weichen wurden vermutlich im Hintergrund gestellt, auch wenn sie nicht direkt ausgesprochen werden?
                </p>

                <textarea
                  rows={4}
                  value={zusatzdoc.probableInput || ''}
                  onChange={(e) => handleProbableChange(e.target.value)}
                  placeholder={`Halten Sie Hintergrund-Entscheidungen fest:
• z.B. Welche unausgesprochenen Rahmenbedingungen wurden gesetzt?
• z.B. Welche Absprachen mit Ärzten, Kassen oder Angehörigen fanden mutmaßlich statt?`}
                  className="w-full bg-white border-2 border-amber-300 rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all resize-y leading-relaxed font-sans"
                />
              </div>

              {/* Box 3: Lila - Alternative Weichenstellungen (Hypothetisch) */}
              <div className="border-2 border-purple-400 bg-purple-50/40 rounded-2xl p-4.5 sm:p-5 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0" />
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[10px] uppercase tracking-wider">
                      Ebene 3 • Lila
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-purple-950">
                      Alternative Weichenstellungen (Hypothetisch)
                    </h4>
                  </div>
                  <span className="text-[10px] text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md font-medium">
                    Alternativpfade &amp; Dilemmata
                  </span>
                </div>

                <p className="text-xs text-purple-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Leitfrage:</strong> An welchen Punkten hätte man (medizinisch, pflegerisch oder familiär) ganz anders entscheiden können?
                </p>

                <textarea
                  rows={4}
                  value={zusatzdoc.hypotheticalInput || ''}
                  onChange={(e) => handleHypotheticalChange(e.target.value)}
                  placeholder={`Halten Sie hypothetische Alternativen & Dilemmata fest:
• z.B. Welche Alternativpfade bestanden (z.B. Heimunterbringung, Verzicht auf Reha)?
• z.B. Wo lagen ethische oder pflegerische Spannungsfelder?`}
                  className="w-full bg-white border-2 border-purple-300 rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all resize-y leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* [BLOCK 4] BUTTON: EINGABE BESTÄTIGEN & AUSWERTUNG FREISCHALTEN             */}
            {/* ========================================================================= */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-[11px] text-[#2B2D42]/70">
                {isDecisionConfirmed ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Auswertung freigeschaltet – siehe Synopse &amp; Expertenabgleich unten in Block 5!
                  </span>
                ) : (
                  <span>Klicken Sie auf Bestätigen, um den pädagogischen Musterabgleich (Block 5) freizuschalten.</span>
                )}
              </div>

              <button
                onClick={handleConfirmDecisionInput}
                className="px-6 py-3.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>[Block 4] 3 Entscheidungsebenen bestätigen &amp; Auswertung freischalten</span>
                <ArrowDown className="w-4 h-4 text-[#E76F51]" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 5] AUFLÖSUNGS-PANEL (TABELLARISCHE GEGENÜBERSTELLUNG & SYNOPSE)      */}
      {/* ========================================================================= */}
      {isDecisionConfirmed && decisionData && (
        <section
          id={`resolution-panel-${module.id}`}
          className="space-y-5 pt-4 border-t-2 border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              5
            </span>
            <span>[Block 5] Auflösungs-Panel: Tabellarische Gegenüberstellung &amp; Synopse</span>
          </div>

          <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-6">
            {/* 1. Kurze pädagogische Validierung */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pflegepädagogische Würdigung Ihrer Analyse:</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:pretty]">
                Vielen Dank für Ihre sorgfältige Auseinandersetzung mit der Situation. Sie haben wesentliche Weichenstellungen und ethische Spannungsfelder im Fall Stephan &amp; Heike auf allen drei Ebenen strukturiert erfasst. Im Folgenden sehen Sie den 1:1 Abgleich Ihrer 3 Eingabefelder mit den Expertenperspektiven.
              </p>
            </div>

            {/* 2. Synopse / Gegenüberstellung in 3 Blöcken als strukturierte Tabelle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#264653]" />
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] uppercase tracking-wider">
                  Synopse: Ihre 3 Eingabefelder im Vergleich zur Expertenperspektive
                </h4>
              </div>

              <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#264653] text-white text-[11px] uppercase tracking-wider">
                      <th className="p-3 font-bold w-[24%] sm:w-[22%] border-r border-[#264653]/40">Ebene</th>
                      <th className="p-3 font-bold w-[38%] sm:w-[39%] border-r border-[#264653]/40">Ihre Eingabe (Aus Eingabebox)</th>
                      <th className="p-3 font-bold w-[38%] sm:w-[39%]">Musterlösung / Expertenperspektive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-[#2B2D42]">
                    {/* Block 1: Direkt belegt (Grün) */}
                    <tr className="bg-emerald-50/40 hover:bg-emerald-50/70 transition-colors">
                      <td className="p-3.5 align-top border-r border-slate-200 font-bold text-emerald-950">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>1. Direkt belegt</span>
                        </div>
                        <span className="text-[10px] text-emerald-800 font-normal block">(Grüne Box: Explizit im Film)</span>
                      </td>
                      <td className="p-3.5 align-top border-r border-slate-200 bg-white/70 text-[#2B2D42]">
                        {derivableText ? (
                          <div className="whitespace-pre-line text-xs leading-relaxed text-slate-800 font-medium">
                            {derivableText}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">— Keine grüne Eingabe erfasst —</span>
                        )}
                      </td>
                      <td className="p-3.5 align-top space-y-2">
                        {decisionData.derivable.map((item, idx) => (
                          <div key={idx} className="space-y-0.5 border-b border-emerald-100 last:border-0 pb-1.5 last:pb-0">
                            <div className="font-bold text-emerald-950 flex items-center justify-between gap-1 text-[11px]">
                              <span>• {item.title}</span>
                              {item.person && (
                                <span className="px-1.5 py-0.2 rounded bg-white border border-emerald-200 text-emerald-800 text-[9px] font-semibold shrink-0">
                                  {item.person}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                          </div>
                        ))}
                      </td>
                    </tr>

                    {/* Block 2: Im Hintergrund (Gelb/Orange) */}
                    <tr className="bg-amber-50/40 hover:bg-amber-50/70 transition-colors">
                      <td className="p-3.5 align-top border-r border-slate-200 font-bold text-amber-950">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span>2. Im Hintergrund</span>
                        </div>
                        <span className="text-[10px] text-amber-800 font-normal block">(Gelbe Box: Wahrscheinlich)</span>
                      </td>
                      <td className="p-3.5 align-top border-r border-slate-200 bg-white/70 text-[#2B2D42]">
                        {probableText ? (
                          <div className="whitespace-pre-line text-xs leading-relaxed text-slate-800 font-medium">
                            {probableText}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">— Keine gelbe Eingabe erfasst —</span>
                        )}
                      </td>
                      <td className="p-3.5 align-top space-y-2">
                        {decisionData.probable.map((item, idx) => (
                          <div key={idx} className="space-y-0.5 border-b border-amber-100 last:border-0 pb-1.5 last:pb-0">
                            <div className="font-bold text-amber-950 flex items-center justify-between gap-1 text-[11px]">
                              <span>• {item.title}</span>
                              {item.person && (
                                <span className="px-1.5 py-0.2 rounded bg-white border border-amber-200 text-amber-800 text-[9px] font-semibold shrink-0">
                                  {item.person}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                          </div>
                        ))}
                      </td>
                    </tr>

                    {/* Block 3: Weichenstellung (Lila) */}
                    <tr className="bg-purple-50/40 hover:bg-purple-50/70 transition-colors">
                      <td className="p-3.5 align-top border-r border-slate-200 font-bold text-purple-950">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                          <span>3. Weichenstellung</span>
                        </div>
                        <span className="text-[10px] text-purple-800 font-normal block">(Lila Box: Hypothetisch)</span>
                      </td>
                      <td className="p-3.5 align-top border-r border-slate-200 bg-white/70 text-[#2B2D42]">
                        {hypotheticalText ? (
                          <div className="whitespace-pre-line text-xs leading-relaxed text-slate-800 font-medium">
                            {hypotheticalText}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">— Keine lila Eingabe erfasst —</span>
                        )}
                      </td>
                      <td className="p-3.5 align-top space-y-2">
                        {decisionData.hypothetical.map((item, idx) => (
                          <div key={idx} className="space-y-0.5 border-b border-purple-100 last:border-0 pb-1.5 last:pb-0">
                            <div className="font-bold text-purple-950 text-[11px]">
                              <span>• {item.title}</span>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Zentrale Leitfrage & Impuls für das Fall-Adventure */}
            {decisionData.centralQuestion && (
              <div className="p-4 rounded-xl bg-[#264653]/10 border border-[#264653]/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                  <Compass className="w-4 h-4 text-[#E76F51]" />
                  <span>Die zentrale Leitfrage dieser Phase:</span>
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-[#264653] font-serif-reading leading-relaxed">
                  {decisionData.centralQuestion}
                </p>
                {decisionData.contextDescription && (
                  <p className="text-xs text-[#2B2D42]/80 leading-relaxed [text-wrap:pretty]">
                    {decisionData.contextDescription}
                  </p>
                )}
              </div>
            )}

            {/* Impuls für das Fall-Adventure */}
            {decisionData.adventureTeaser && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#E76F51]/15 to-[#2A9D8F]/15 border border-[#E76F51]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                  <Lightbulb className="w-4 h-4 text-[#E76F51]" />
                  <span>Impuls für das kommende Fall-Adventure:</span>
                </div>
                <p className="text-xs text-[#2B2D42] leading-relaxed font-medium [text-wrap:pretty]">
                  {decisionData.adventureTeaser}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* [BLOCK 6] WEITERLEITUNG / ÜBERLEITUNG: ZUM VERZWEIGUNGS-SZENARIO           */}
      {/* ========================================================================= */}
      <section className="pt-2 border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
                6
              </span>
              <span>[Block 6] Überleitung zum Verzweigungs-Szenario</span>
            </div>
            <p className="text-xs text-[#2B2D42]/70 [text-wrap:pretty]">
              Treten Sie nun in die Chat-Simulation ein und erproben Sie die 3 Entscheidungsmodelle (Paternalistisch, PEF, Informed Consent).
            </p>
          </div>

          <button
            onClick={onProceedToSimulation}
            className="px-6 py-3.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <span>Weiter zur Simulation (Flaschenhals-Adventure)</span>
            <ArrowRight className="w-4 h-4 text-[#E76F51]" />
          </button>
        </div>
      </section>
    </div>
  );
};
