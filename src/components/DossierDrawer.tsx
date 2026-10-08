import React, { useState, useRef } from 'react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { ZusatzdocForm } from './ZusatzdocForm';
import { AbedlForm } from './AbedlForm';
import { SimulationView } from './SimulationView';
import { QuizView } from './QuizView';
import { TheoryModuleView } from './TheoryModuleView';
import { DecisionMomentsWorkflow } from './DecisionMomentsWorkflow';
import { EthicGameView } from './EthicGameView';
import { FinalEvaluationView } from './FinalEvaluationView';
import { exportNursingDossierDocx } from '../utils/docxExport';
import { CHARACTER_AVATARS } from '../data/avatarsData';
import {
  X,
  FileText,
  Gamepad2,
  CheckSquare,
  GraduationCap,
  Download,
  ExternalLink,
  Play,
  KeyRound,
  Unlock,
  Lock,
  Sparkles,
  Users,
  Film,
  Award,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Star,
  HeartHandshake,
  Copy,
  Check,
  BookMarked
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const DossierDrawer: React.FC = () => {
  const {
    activeModuleId,
    isDrawerOpen,
    setIsDrawerOpen,
    moduleStates,
    advanceModuleStep,
    unlockModuleWithPassword,
    markModuleCompleted,
    studentName,
    setActiveModal,
    isAdminMode,
  } = useApp();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [copiedRewardPassword, setCopiedRewardPassword] = useState<boolean>(false);

  // Section references for smooth auto-scroll
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  if (!isDrawerOpen || activeModuleId === null) return null;

  const currentModule = MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];
  const state = moduleStates[currentModule.id] || {
    stepProgress: 1,
    zusatzdoc: {
      who: '',
      whatHappened: '',
      decisionsMade: '',
      ethicalDilemmas: '',
    },
    abedl: {},
    simulationAnswers: {},
    simulationStats: { pefScore: 0, paternalisticScore: 0, informedScore: 0, autonomyScore: 0 },
    unlockedWithPassword: false,
    completed: false,
  };

  const stepProgress = state.stepProgress || 1;
  const isUnlocked = state.unlockedWithPassword || false;
  const isCompleted = state.completed || false;

  const handleClose = () => {
    sounds.playClick();
    setIsDrawerOpen(false);
  };

  const handleExport = async () => {
    sounds.playClick();
    setIsExporting(true);
    try {
      await exportNursingDossierDocx(
        currentModule.title,
        currentModule.id,
        state.zusatzdoc,
        state.abedl,
        studentName
      );
    } catch (e) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockModuleWithPassword(currentModule.id, passwordInput);
    if (!success) {
      setPasswordError(true);
      sounds.playError();
    } else {
      setPasswordError(false);
      setPasswordInput('');
      sounds.playSuccess();
    }
  };

  const proceedToStep = (targetStep: number) => {
    sounds.playSuccess();
    advanceModuleStep(currentModule.id, targetStep);

    setTimeout(() => {
      if (targetStep === 2) {
        step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetStep === 3) {
        step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetStep === 4) {
        step4Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleFinishLevelAndReturnToMap = () => {
    sounds.playLevelComplete();
    markModuleCompleted(currentModule.id);
    setIsDrawerOpen(false);
  };

  const isStandardGameloop = currentModule.id >= 3 && currentModule.id <= 6;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity animate-in fade-in duration-300"
      />

      {/* Slide-over Workspace Drawer */}
      <div
        id="tour-dossier"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-[#F7F9FA] shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300 ease-out"
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#264653] to-[#1E3640] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-base border border-white/20">
              {currentModule.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E76F51] text-white">
                  Doppelstunde {currentModule.id}
                </span>
                <span className="text-xs text-slate-300 hidden sm:inline">
                  {currentModule.timeEstimate}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight truncate max-w-md">
                {currentModule.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Word Export Button */}
            {isStandardGameloop && (
              <button
                id="tour-export-btn"
                onClick={handleExport}
                disabled={isExporting}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer disabled:opacity-50"
                title="Erfasste Daten als Word (.docx) exportieren"
              >
                <Download className="w-3.5 h-3.5 text-[#E76F51]" />
                <span className="hidden sm:inline">Word (.docx) Export</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Workspace schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sticky Linear Progress Indicator (Step 1 -> Step 2 -> Step 3 -> Step 4) - ONLY FOR DS 3, DS 4, DS 5, DS 6 */}
        {isStandardGameloop && (
          <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shadow-xs shrink-0 text-xs">
            <div className="flex items-center gap-2 min-w-max">
              <span className="font-bold text-[#264653] uppercase tracking-wider text-[11px]">Level-Schritte:</span>

              {/* Step 1 Chip */}
              <button
                onClick={() => {
                  const el = document.getElementById(`block-1-video-${currentModule.id}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  stepProgress >= 1 ? 'bg-[#264653] text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Film className="w-3 h-3" />
                <span>1. Video</span>
                {stepProgress > 1 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 2 Chip */}
              <button
                onClick={() => {
                  if (stepProgress >= 2) step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  stepProgress >= 2
                    ? 'bg-[#264653] text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>2. Doku &amp; ABEDL</span>
                {stepProgress > 2 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {stepProgress < 2 && <Lock className="w-2.5 h-2.5" />}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 3 Chip */}
              <button
                onClick={() => {
                  if (stepProgress >= 3) step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  stepProgress >= 3
                    ? 'bg-[#264653] text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Gamepad2 className="w-3 h-3 text-[#E76F51]" />
                <span>3. Simulation</span>
                {stepProgress > 3 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {stepProgress < 3 && <Lock className="w-2.5 h-2.5" />}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 4 Chip */}
              <button
                onClick={() => {
                  if (stepProgress >= 4) step4Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  stepProgress >= 4
                    ? 'bg-amber-500 text-white font-bold cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckSquare className="w-3 h-3" />
                <span>4. Abschluss</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                {stepProgress < 4 && <Lock className="w-2.5 h-2.5" />}
              </button>
            </div>

            {/* Dozenten-Regie: Nur sichtbar, wenn Admin-Modus aktiviert ist! */}
            {isAdminMode && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowTeacherGuide(!showTeacherGuide)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold flex items-center gap-1 transition-colors border border-emerald-300 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Dozenten-Regie (Admin)</span>
                  {showTeacherGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Seamless Vertical Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Collapsible Teacher Guide (Admin only) */}
          {isAdminMode && showTeacherGuide && (
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-5 card-soft-shadow space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-emerald-900 text-sm">Dozenten-Regieplan für Doppelstunde {currentModule.id}</h3>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                  {currentModule.teacherGuide.duration}
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">{currentModule.teacherGuide.topic}</p>
              
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-emerald-900 uppercase">Phasenablauf:</h4>
                {currentModule.teacherGuide.schedule.map((sch, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs">
                    <div className="font-bold text-emerald-900 flex justify-between">
                      <span>{sch.phase} ({sch.timeMinutes} Min.)</span>
                      <span className="text-[10px] text-emerald-700">{sch.socialForm}</span>
                    </div>
                    <p className="text-emerald-950 mt-0.5">{sch.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SPECIAL VIEW FOR DS 1: ETHIK-SPIEL & PROGRESSIVER AUFBAU                  */}
          {/* ========================================================================= */}
          {currentModule.id === 1 && (
            <EthicGameView onComplete={handleFinishLevelAndReturnToMap} />
          )}

          {/* ========================================================================= */}
          {/* SPECIAL VIEW FOR DS 2: THEORIE & ONBOARDING                               */}
          {/* ========================================================================= */}
          {currentModule.id === 2 && (
            <div className="space-y-6">
              <TheoryModuleView moduleId={2} quizQuestions={currentModule.quiz || []} />

              <div className="pt-4 border-t border-slate-200 flex justify-start">
                <button
                  onClick={handleFinishLevelAndReturnToMap}
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                >
                  <Star className="w-4 h-4 text-amber-200 fill-current" />
                  <span>Doppelstunde 2 abschließen &amp; Zurück zur Gaming-Map (DS 3 freischalten)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SPECIAL VIEW FOR DS 7: FINALE DOKUMENTATION & METHODISCHES DEBRIEFING     */}
          {/* ========================================================================= */}
          {currentModule.id === 7 && (
            <FinalEvaluationView
              module={currentModule}
              onFinishModule={handleFinishLevelAndReturnToMap}
            />
          )}

          {/* ========================================================================= */}
          {/* STANDARD GAMELOOP FLOW FOR DS 3, DS 4, DS 5, DS 6                         */}
          {/* ========================================================================= */}
          {isStandardGameloop && (
            <div className="space-y-8">
              {/* ------------------------------------------------------------------- */}
              {/* CASE HEADER & CHARACTERS                                            */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 card-soft-shadow flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex -space-x-2">
                    <img
                      src={CHARACTER_AVATARS.heike.imageUrl}
                      alt="Heike"
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#264653] shadow-sm"
                    />
                    <img
                      src={CHARACTER_AVATARS.stephan.imageUrl}
                      alt="Stefan"
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#E76F51] shadow-sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#264653]">Heike (42) &amp; Stefan (48)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#2B2D42] font-medium border border-slate-200">
                        {currentModule.locationName}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2B2D42]/70 line-clamp-1">
                      {currentModule.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActiveModal('welcome');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer transform hover:scale-[1.02]"
                    title="Fall-Einführung, Zitat und alle Charaktere anzeigen"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#E76F51]" />
                    <span>Fall-Einführung &amp; Charaktere</span>
                  </button>

                  <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono flex items-center gap-1.5 border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Gameloop aktiv
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* BLOCK 1 & 2 & 3: DECISION MOMENTS & ABEDL WORKFLOW                  */}
              {/* ------------------------------------------------------------------- */}
              <div ref={step2Ref}>
                <DecisionMomentsWorkflow
                  module={currentModule}
                  onProceedToSimulation={() => proceedToStep(3)}
                />
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* SCHRITT 3: INTERAKTIVE SIMULATION                                   */}
              {/* ------------------------------------------------------------------- */}
              <section ref={step3Ref} className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 3 ? 'bg-[#264653] text-white' : 'bg-slate-200 text-slate-500'}`}>
                      3
                    </span>
                    <span>Schritt 3: Simulation (Adventure-Entscheidung &amp; Dialog)</span>
                  </div>

                  {stepProgress > 3 ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Simulation abgeschlossen
                    </span>
                  ) : stepProgress === 3 ? (
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

                {stepProgress < 3 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
                    <Lock className="w-6 h-6 text-slate-400 mx-auto" />
                    <h4 className="text-xs font-bold text-[#264653]">Simulation noch gesperrt</h4>
                    <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
                      Schließen Sie oben Block 3 (13 ABEDL und Entscheidungsmomente) ab, um in die Simulation einzutreten.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <SimulationView
                      moduleId={currentModule.id}
                      simulation={currentModule.simulation}
                      onProceedToStep4={() => proceedToStep(4)}
                    />

                    {/* Bestätigungsbutton für Schritt 3 */}
                    <div className="pt-3 border-t border-slate-100 flex justify-start">
                      <button
                        onClick={() => proceedToStep(4)}
                        className="px-5 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Entscheidung abgeschlossen – Weiter zur Gameloop-Auswertung &amp; Besprechung</span>
                        <ArrowDown className="w-4 h-4 text-[#E76F51]" />
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ------------------------------------------------------------------- */}
              {/* SCHRITT 4: AUSWERTUNG & GEMEINSAME LIVE-BESPRECHUNG IM PLENUM        */}
              {/* ------------------------------------------------------------------- */}
              <section ref={step4Ref} className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${stepProgress >= 4 ? 'bg-amber-500 text-white font-bold' : 'bg-slate-200 text-slate-500'}`}>
                    4
                  </span>
                  <span>Schritt 4: Auswertung, Gameloop-Statistik &amp; Live-Besprechung</span>
                </div>

                {stepProgress < 4 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
                    <Lock className="w-6 h-6 text-slate-400 mx-auto" />
                    <h4 className="text-xs font-bold text-[#264653]">Auswertung noch gesperrt</h4>
                    <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
                      Schließen Sie die Simulation in Schritt 3 ab, um die Auswertung und gemeinsame Besprechung freizuschalten.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Gameloop Statistics Summary */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#E76F51]" />
                        <span>Ihre getroffenen Entscheidungen in diesem Durchlauf:</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                          <div className="text-base sm:text-lg font-bold text-emerald-800">
                            {state.simulationStats?.pef || 0}
                          </div>
                          <div className="text-[10px] text-emerald-900 font-semibold uppercase">PEF-Punkte</div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-base sm:text-lg font-bold text-slate-800">
                            {state.simulationStats?.paternalistic || 0}
                          </div>
                          <div className="text-[10px] text-slate-600 font-semibold uppercase">Paternalistisch</div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-base sm:text-lg font-bold text-slate-800">
                            {state.simulationStats?.informed || 0}
                          </div>
                          <div className="text-[10px] text-slate-600 font-semibold uppercase">Informed Consent</div>
                        </div>
                      </div>
                    </div>

                    {/* LIVE-BESPRECHUNG IM PLENUM */}
                    <div className="bg-gradient-to-br from-[#264653] to-[#1E3640] text-white rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 border border-[#264653]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            Gemeinsame Auswertung &amp; Live-Besprechung im Plenum
                          </h4>
                          <p className="text-xs text-slate-300">
                            Wir besprechen die Ergebnisse, Anamnese-Erfassungen und ethischen Entscheidungen nun gemeinsam live im Kurs.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 text-xs space-y-1">
                          <span className="font-bold text-amber-300 block">1. ABEDL-Beobachtungen:</span>
                          <p className="text-slate-200 text-[11px] leading-relaxed">
                            Welche physischen und psychosozialen Ressourcen wurden erfasst?
                          </p>
                        </div>
                        <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 text-xs space-y-1">
                          <span className="font-bold text-amber-300 block">2. Entscheidungsdilemma:</span>
                          <p className="text-slate-200 text-[11px] leading-relaxed">
                            Welche Weichenstellung war für Stefan &amp; Heike existenziell?
                          </p>
                        </div>
                        <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 text-xs space-y-1">
                          <span className="font-bold text-amber-300 block">3. Praxistransfer:</span>
                          <p className="text-slate-200 text-[11px] leading-relaxed">
                            Wie lässt sich das PEF-Modell in ähnlichen Pflegesituationen anwenden?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Prominente Passwort-Belohnungsbox für das nächste Level */}
                    {LEVEL_PASSWORDS[currentModule.id + 1] && currentModule.id < 7 && (
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white border-2 border-emerald-400 shadow-xl space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-[#E76F51] text-slate-950 flex items-center justify-center shadow-md shrink-0">
                              <KeyRound className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-mono">
                                  Level-Passwort freigespielt
                                </span>
                                <span className="text-xs text-emerald-200 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  Im Passwortbuch gespeichert
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white mt-1">
                                Passwort für Doppelstunde {currentModule.id + 1}:
                              </h4>
                              <p className="text-xs text-slate-300">
                                {LEVEL_PASSWORDS[currentModule.id + 1].title}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center">
                            <div className="px-4 py-2 rounded-xl bg-black/50 border-2 border-amber-400 font-mono text-base font-extrabold text-amber-300 tracking-wider flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                              <span>{LEVEL_PASSWORDS[currentModule.id + 1].password}</span>
                            </div>

                            <button
                              onClick={() => {
                                const pwd = LEVEL_PASSWORDS[currentModule.id + 1].password;
                                sounds.playSelectOption();
                                if (navigator.clipboard) {
                                  navigator.clipboard.writeText(pwd);
                                }
                                setCopiedRewardPassword(true);
                                setTimeout(() => setCopiedRewardPassword(false), 3000);
                              }}
                              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                              title="Passwort kopieren"
                            >
                              {copiedRewardPassword ? (
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

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                          <span>Geben Sie dieses Passwort ein, wenn Sie Doppelstunde {currentModule.id + 1} auf der Map öffnen.</span>
                          <button
                            onClick={() => setActiveModal('passwordBook')}
                            className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 underline cursor-pointer"
                          >
                            <BookMarked className="w-3.5 h-3.5" />
                            <span>Passwortbuch öffnen</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* AMBER-FARBENDER ABSCHLUSS-BUTTON: Schließt den Workspace & bringt den TN zurück zur Map */}
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={handleFinishLevelAndReturnToMap}
                        className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm shadow-xl shadow-amber-500/30 ring-2 ring-amber-400/50 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Star className="w-5 h-5 text-amber-100 fill-current" />
                        <span>Doppelstunde {currentModule.id} abschließen &amp; Zurück zur Gaming-Map</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
