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
  FileSpreadsheet
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

  const handleDecisionInputChange = (val: string) => {
    updateZusatzdoc(module.id, {
      decisionMomentsIdentified: val,
      decisionsMade: val,
    });
  };

  return (
    <div className="space-y-8 text-[#2B2D42]">
      {/* ========================================================================= */}
      {/* [BLOCK 1] VIDEO-PLAYER: SEQUENZ ANSCHAUEN (DIREKT EINGEBETTET)             */}
      {/* ========================================================================= */}
      <section id={`block-1-video-${module.id}`} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              1
            </span>
            <span>[Block 1] Video-Player: Sequenz anschauen</span>
          </div>

          {module.videoDuration && (
            <span className="text-[11px] font-mono text-[#2B2D42]/70 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
              Dauer: {module.videoDuration}
            </span>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#264653]/10 text-[#264653] flex items-center justify-center">
                <Film className="w-4 h-4 text-[#E76F51]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#264653]">
                  {module.videoTitle || `Videosequenz zu Doppelstunde ${module.id}`}
                </h3>
                <p className="text-xs text-[#2B2D42]/70 font-medium">{module.subtitle}</p>
              </div>
            </div>

            {module.videoUrl && (
              <a
                href={module.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#264653] hover:text-[#E76F51] flex items-center gap-1 transition-colors"
                title="In separatem Fenster / Tab öffnen"
              >
                <span>Im neuen Tab öffnen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Direct Embedded SlidePresenter Video Player */}
          {module.videoUrl ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-md">
              <iframe
                src={module.videoUrl}
                title={module.videoTitle || `Videosequenz ${module.id}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-8 bg-[#F7F9FA] rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Kein Video-Link für diese Einheit hinterlegt.
            </div>
          )}

          <p className="text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
            {module.videoDescription}
          </p>
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
                    <span>▶ Zusammenfassung zum Nachlesen einblenden (narrativer Text)</span>
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
              <span>13 ABEDL Pflegeanamnese bestätigen ➔ Weiter zur Entscheidungsanalyse (Block 3B)</span>
              <ArrowDown className="w-4 h-4 text-[#E76F51]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 3B] 2. ZENTRALE ENTSCHEIDUNGSMOMENTE IDENTIFIZIEREN (PROGREDIENT)   */}
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
              Bestätigen Sie oben Block 3A (13 ABEDL Pflegeanamnese), um die Eingabemaske für zentrale Entscheidungsmomente freizuschalten.
            </p>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 card-soft-shadow space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#264653] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <HelpCircle className="w-5 h-5 text-[#E76F51]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-bold text-[#264653] block leading-snug [text-wrap:balance]">
                  „Welche zentralen Entscheidungsmomente konnten Sie in dieser Phase identifizieren und wer hat sie getroffen?“
                </label>
                <p className="text-xs text-[#2B2D42]/70 leading-relaxed [text-wrap:pretty]">
                  Halten Sie hier stichpunktartig oder im Fließtext fest: Welche Weichenstellungen wurden vorgenommen? Wer war die handelnde Person (z.&nbsp;B. Heike, Ärzteteam, Pflegekraft, Stephan, Söhne)? Welche Handlungsalternativen bestanden?
                </p>
              </div>
            </div>

            <textarea
              rows={5}
              value={zusatzdoc.decisionMomentsIdentified || zusatzdoc.decisionsMade || ''}
              onChange={(e) => handleDecisionInputChange(e.target.value)}
              placeholder="Beispiel: 
1. Notoperation & Akutversorgung (Ärzteteam)
2. Häusliche Übernahme statt Pflegeheim (Heike gemeinsam mit Söhnen)
3. Berufsaufgabe als Physiotherapeutin für die 24h-Pflege (Heike)..."
              className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white transition-all resize-y leading-relaxed font-sans"
            />

            {/* ========================================================================= */}
            {/* [BLOCK 4] BUTTON: EINGABE BESTÄTIGEN & AUSWERTUNG FREISCHALTEN             */}
            {/* ========================================================================= */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-[11px] text-[#2B2D42]/70">
                {isDecisionConfirmed ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Auswertung freigeschaltet – siehe Gegenüberstellung in Block 5 unten!
                  </span>
                ) : (
                  <span>Klicken Sie auf Bestätigen, um den fachlichen Musterabgleich (Block 5) freizuschalten.</span>
                )}
              </div>

              <button
                onClick={handleConfirmDecisionInput}
                className="px-6 py-3.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>[Block 4] Eingabe bestätigen &amp; Auswertung freischalten</span>
                <ArrowDown className="w-4 h-4 text-[#E76F51]" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 5] AUFLÖSUNGS-PANEL (DYNAMISCH EINGEBLENDET)                        */}
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
            <span>[Block 5] Auflösungs-Panel: Gegenüberstellung & Fachliche Ableitungen</span>
          </div>

          <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#264653]">
                    Gegenüberstellung: Eigene Eingabe vs. Unsere Fachlichen Ableitungen
                  </h3>
                  <p className="text-xs text-[#2B2D42]/70">Pädagogische Differenzierung nach 3 Evidenz-Ebenen</p>
                </div>
              </div>
            </div>

            {/* Box: Eigene erfasste Eingabe */}
            <div className="p-4 bg-[#F7F9FA] rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-[#264653] uppercase tracking-wider block">
                Ihre erfassten Entscheidungsmomente:
              </span>
              <p className="text-xs text-[#2B2D42] italic whitespace-pre-line leading-relaxed">
                {zusatzdoc.decisionMomentsIdentified || zusatzdoc.decisionsMade || 'Keine eigene Notiz hinterlegt.'}
              </p>
            </div>

            {/* Category 1: Ableitbare Entscheidungsmomente (im Film explizit sichtbar) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] uppercase tracking-wide">
                  1. Ableitbare Entscheidungsmomente (im Film explizit sichtbar &amp; belegt)
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {decisionData.derivable.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-[#2B2D42]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <span className="text-emerald-700 font-mono">•</span>
                        <span>{item.title}</span>
                      </span>
                      {item.person && (
                        <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-900 font-semibold text-[10px]">
                          Person: {item.person}
                        </span>
                      )}
                    </div>
                    <p className="text-[#2B2D42]/90 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Wahrscheinliche Entscheidungsmomente (hochgradig naheliegend) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] uppercase tracking-wide">
                  2. Wahrscheinliche Entscheidungsmomente (hochgradig naheliegend)
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {decisionData.probable.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5 text-xs text-[#2B2D42]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="font-bold text-amber-950 flex items-center gap-1.5">
                        <span className="text-amber-700 font-mono">•</span>
                        <span>{item.title}</span>
                      </span>
                      {item.person && (
                        <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold text-[10px]">
                          Person: {item.person}
                        </span>
                      )}
                    </div>
                    <p className="text-[#2B2D42]/90 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Hypothetische Entscheidungsmomente (pädagogische Weggabelungen) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] uppercase tracking-wide">
                  3. Hypothetische Entscheidungsmomente (pädagogische Weggabelungen für das Adventure)
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {decisionData.hypothetical.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1 text-xs text-[#2B2D42]"
                  >
                    <span className="font-bold text-purple-950 block">
                      • {item.title}
                    </span>
                    <p className="text-[#2B2D42]/90 leading-relaxed [text-wrap:pretty]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflexionsimpuls */}
            {decisionData.reflectionPrompt && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#264653]/10 to-[#2A9D8F]/10 border border-[#264653]/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                  <Lightbulb className="w-4 h-4 text-[#E76F51]" />
                  <span>Didaktischer Reflexionsimpuls:</span>
                </div>
                <p className="text-xs text-[#2B2D42] leading-relaxed font-medium [text-wrap:pretty]">
                  {decisionData.reflectionPrompt}
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
