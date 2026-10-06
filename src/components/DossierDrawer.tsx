import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { ZusatzdocForm } from './ZusatzdocForm';
import { AbedlForm } from './AbedlForm';
import { SimulationView } from './SimulationView';
import { QuizView } from './QuizView';
import { TheoryModuleView } from './TheoryModuleView';
import { DecisionMomentsWorkflow } from './DecisionMomentsWorkflow';
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
  Star
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

  // Section references for smooth auto-scroll
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  if (!isDrawerOpen || activeModuleId === null) return null;

  const currentModule = MODULES_DATA.find((m) => m.id === activeModuleId);
  if (!currentModule) return null;

  const state = moduleStates[currentModule.id];
  const stepProgress = state?.stepProgress || 1;
  const isUnlocked = state?.unlockedWithPassword || currentModule.id === 1;
  const isCompleted = state?.completed;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockModuleWithPassword(currentModule.id, passwordInput);
    if (!success) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPasswordInput('');
    }
  };

  const handleExportDocx = async () => {
    sounds.playClick();
    setIsExporting(true);
    try {
      await exportNursingDossierDocx(
        currentModule.title,
        currentModule.id,
        state?.zusatzdoc || { who: '', whatHappened: '', decisionsMade: '', ethicalDilemmas: '' },
        state?.abedl || {},
        studentName
      );
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const proceedToStep = (targetStep: number) => {
    sounds.playSuccess();
    advanceModuleStep(currentModule.id, targetStep);
    setTimeout(() => {
      if (targetStep === 2 && step2Ref.current) {
        step2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetStep === 3 && step3Ref.current) {
        step3Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetStep === 4 && step4Ref.current) {
        step4Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleFinishLevelAndReturnToMap = () => {
    sounds.playSuccess();
    markModuleCompleted(currentModule.id);
    setIsDrawerOpen(false); // Slides workspace out and returns student to the gaming map!
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-[#2B2D42]/40 backdrop-blur-xs transition-all duration-300"
        onClick={() => {
          sounds.playClick();
          setIsDrawerOpen(false);
        }}
      />

      {/* Seamless Vertical Step-by-Step Workspace */}
      <div
        id="tour-dossier"
        className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[75%] lg:w-[70%] xl:w-[65%] bg-[#F7F9FA] text-[#2B2D42] border-l border-slate-200 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform translate-x-0"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#264653] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#E76F51] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-sm">
              DS {currentModule.id}
            </div>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {currentModule.title}
              </h2>
              <p className="text-xs text-white/80 truncate font-medium">{currentModule.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="tour-export-btn"
              onClick={handleExportDocx}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#264653] hover:bg-slate-100 font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              title="Formulare als Word-Dokument (.docx) exportieren"
            >
              <Download className="w-3.5 h-3.5 text-[#E76F51]" />
              <span className="hidden sm:inline">{isExporting ? 'Exportiert...' : 'Word-Export (.docx)'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setIsDrawerOpen(false);
              }}
              className="w-9 h-9 rounded-xl hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sticky Linear Progress Indicator (Step 1 -> Step 2 -> Step 3 -> Step 4) */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shadow-xs shrink-0 text-xs">
          <div className="flex items-center gap-2 min-w-max">
            <span className="font-bold text-[#264653] uppercase tracking-wider text-[11px]">Level-Schritte:</span>

            {/* Step 1 Chip */}
            <button
              onClick={() => {
                const el = document.getElementById('step-1-video');
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

            <span className="text-slate-300">➔</span>

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
              <span>2. Doku & ABEDL</span>
              {stepProgress > 2 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              {stepProgress < 2 && <Lock className="w-2.5 h-2.5" />}
            </button>

            <span className="text-slate-300">➔</span>

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

            <span className="text-slate-300">➔</span>

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
          {/* SPECIAL VIEW FOR DS 1: OFFLINE PRÄSENZUNTERRICHT                          */}
          {/* ========================================================================= */}
          {currentModule.id === 1 && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-[#264653] rounded-2xl p-6 card-soft-shadow space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#264653] text-white flex items-center justify-center font-bold text-lg shadow-md">
                    DS 1
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
                      Präsenzunterricht (Offline im Klassenverband)
                    </span>
                    <h2 className="text-lg font-bold text-[#264653]">
                      Unsere Entscheidung? – Ethisches Fundament & Selbsterfahrung
                    </h2>
                  </div>
                </div>

                <div className="p-4 bg-[#F7F9FA] rounded-xl border border-slate-200 space-y-3 text-xs text-[#2B2D42] leading-relaxed">
                  <p>
                    <strong>Wichtiger didaktischer Hinweis:</strong> Diese Doppelstunde findet vollständig im Klassenverband in Präsenz statt.
                    Es gibt hierfür keine digitalen Aufgaben in der App.
                  </p>
                  <p>
                    Im Mittelpunkt steht die <strong>Zettel-Streichen-Übung</strong>: Die Lernenden notieren 10 für sie unverzichtbare Dinge auf Kärtchen. Zunächst streichen sie selbst 5 davon, anschließend streicht die/der Sitznachbar/in ohne Rücksprache 2 weitere existentielle Kriterien.
                  </p>
                  <p>
                    Durch diese Übung wird das Gefühl von <em>Fremdbestimmung, Machtlosigkeit und Autonomieverlust</em> am eigenen Leib spürbar – das emotionale Fundament für den weiteren Fall von Stephan und Heike.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleFinishLevelAndReturnToMap}
                    className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                  >
                    <Star className="w-4 h-4 text-amber-200 fill-current" />
                    <span>Doppelstunde 1 abschließen & Zurück zur Gaming-Map (DS 2 freischalten)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SPECIAL VIEW FOR DS 2: THEORIE & ONBOARDING                               */}
          {/* ========================================================================= */}
          {currentModule.id === 2 && (
            <div className="space-y-6">
              <TheoryModuleView moduleId={2} quizQuestions={currentModule.quiz || []} />

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleFinishLevelAndReturnToMap}
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                >
                  <Star className="w-4 h-4 text-amber-200 fill-current" />
                  <span>Doppelstunde 2 abschließen & Zurück zur Gaming-Map (DS 3 freischalten)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* GAMELOOP FLOW FOR DS 3, DS 4, DS 5, DS 6, DS 7                           */}
          {/* ========================================================================= */}
          {currentModule.id >= 3 && (
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
                      alt="Stephan"
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#E76F51] shadow-sm"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264653]">
                      Fall Stephan & Heike • {currentModule.title}
                    </div>
                    <div className="text-[11px] text-[#2B2D42]/70 font-medium">
                      Schwerpunkt: {currentModule.locationName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModal('welcome')}
                    className="text-xs text-[#264653] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-[#E76F51]" />
                    <span>Charaktere & Fallintro</span>
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* BLOCKS 1 TO 6: DECISION MOMENTS WORKFLOW                            */}
              {/* ------------------------------------------------------------------- */}
              <DecisionMomentsWorkflow
                module={currentModule}
                onProceedToSimulation={() => proceedToStep(3)}
              />

              {/* ------------------------------------------------------------------- */}
              {/* SCHRITT 3: FLASCHENHALS-SIMULATION (DIE ENTSCHEIDUNG)               */}
              {/* ------------------------------------------------------------------- */}
              <section ref={step3Ref} id={`step-3-sim-${currentModule.id}`} className="space-y-4 pt-6 border-t-2 border-dashed border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${stepProgress >= 3 ? 'bg-[#E76F51] text-white' : 'bg-slate-200 text-slate-500'}`}>
                    3
                  </span>
                  <span>Simulation: Flaschenhals-Adventure & Verzweigungs-Szenario</span>
                </div>

                {stepProgress < 3 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
                    <Lock className="w-6 h-6 text-slate-400 mx-auto" />
                    <h4 className="text-xs font-bold text-[#264653]">Simulation noch gesperrt</h4>
                    <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
                      Bestätigen Sie oben in Block 4 Ihre erfassten Entscheidungsmomente, um die interaktive Entscheidungssimulation freizuschalten.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {currentModule.simulation && (
                      <SimulationView moduleId={currentModule.id} simulation={currentModule.simulation} />
                    )}

                    {/* Bestätigungsbutton für Schritt 3 */}
                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => proceedToStep(4)}
                        className="px-5 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Entscheidung abgeschlossen ➔ Weiter zur Gameloop-Auswertung & Musterlösung</span>
                        <ArrowDown className="w-4 h-4 text-[#E76F51]" />
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ------------------------------------------------------------------- */}
              {/* SCHRITT 4: AUSWERTUNG & MUSTERLÖSUNG                                 */}
              {/* ------------------------------------------------------------------- */}
              <section ref={step4Ref} className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] ${stepProgress >= 4 ? 'bg-amber-500 text-white font-bold' : 'bg-slate-200 text-slate-500'}`}>
                    4
                  </span>
                  <span>Schritt 4: Auswertung, Gameloop-Statistik & Musterlösung</span>
                </div>

                {stepProgress < 4 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
                    <Lock className="w-6 h-6 text-slate-400 mx-auto" />
                    <h4 className="text-xs font-bold text-[#264653]">Schritt 4 gesperrt</h4>
                    <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
                      Treffen Sie in Schritt 3 eine Entscheidung in der Simulation, um Ihre Auswertung freizuschalten.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Decision Statistics Snapshot */}
                    {state?.simulationStats && (
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
                        <h3 className="text-xs font-bold text-[#264653] uppercase tracking-wider border-b border-slate-100 pb-2">
                          Ergebnis: Ihre pflegerische Haltung in dieser Szene
                        </h3>

                        {/* Percentage calculation */}
                        {(() => {
                          const pef = state.simulationStats.pef || 0;
                          const pat = state.simulationStats.paternalistic || 0;
                          const inf = state.simulationStats.informed || 0;
                          const total = pef + pat + inf;
                          const pefPercent = total > 0 ? Math.round((pef / total) * 100) : 0;
                          const patPercent = total > 0 ? Math.round((pat / total) * 100) : 0;
                          const infPercent = total > 0 ? Math.round((inf / total) * 100) : 0;

                          return (
                            <div className="space-y-3">
                              <div className="p-3.5 bg-[#F7F9FA] rounded-xl border border-slate-200 text-xs text-[#2B2D42] font-medium [text-wrap:pretty]">
                                Auswertung: Sie haben in dieser Szene zu <strong className="text-[#2A9D8F] font-bold">{pefPercent}% partizipativ (PEF)</strong>, zu <strong className="text-rose-600 font-bold">{patPercent}% paternalistisch</strong> und zu <strong className="text-amber-600 font-bold">{infPercent}% informed</strong> gehandelt.
                              </div>

                              <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="p-3 rounded-xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/20">
                                  <div className="text-[10px] text-[#2A9D8F] uppercase font-bold">Partizipativ (PEF)</div>
                                  <div className="text-xl font-bold font-mono text-[#2A9D8F]">{pefPercent}%</div>
                                </div>
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                                  <div className="text-[10px] text-rose-600 uppercase font-bold">Paternalistisch</div>
                                  <div className="text-xl font-bold font-mono text-rose-600">{patPercent}%</div>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                                  <div className="text-[10px] text-amber-700 uppercase font-bold">Informed Consent</div>
                                  <div className="text-xl font-bold font-mono text-amber-700">{infPercent}%</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        <p className="text-xs text-[#2B2D42] leading-relaxed">
                          {currentModule.sampleSolution.decisionAnalysis}
                        </p>
                      </div>
                    )}

                    {/* Password Gate for Musterlösung */}
                    {!isUnlocked ? (
                      <div className="bg-white border-2 border-[#E76F51]/40 rounded-2xl p-6 card-soft-shadow space-y-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center mx-auto shadow-sm">
                          <Lock className="w-6 h-6" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-[#264653]">Offizielle Musterlösung ist geschützt</h3>
                          <p className="text-xs text-[#2B2D42]/70 max-w-md mx-auto mt-1">
                            Gib das in Schritt 3 freigespielte Passwort ein (z. B. <span className="font-mono font-bold text-[#264653]">{currentModule.simulation?.passwordFragment}</span>), um die Musterlösung freizuschalten.
                          </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="max-w-sm mx-auto space-y-3">
                          <div className="relative">
                            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="text"
                              value={passwordInput}
                              onChange={(e) => {
                                setPasswordInput(e.target.value);
                                setPasswordError(false);
                              }}
                              placeholder="Passwort eingeben..."
                              className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2B2D42] font-mono tracking-wider uppercase focus:outline-none focus:border-[#264653]"
                            />
                          </div>

                          {passwordError && (
                            <p className="text-[11px] text-rose-600 font-medium">
                              Ungültiges Passwort. Hinweis: {currentModule.sampleSolution.passwordHint}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                          >
                            Musterlösung entsperren
                          </button>
                        </form>
                      </div>
                    ) : (
                      /* Unlocked Musterlösung */
                      <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                            <Unlock className="w-4 h-4 text-emerald-600" />
                            <span>Offizielle Musterlösung freigeschaltet</span>
                          </div>
                          <button
                            onClick={handleExportDocx}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Word-Export (.docx)</span>
                          </button>
                        </div>

                        {/* Musterlösung Entscheidungen Videosequenzen */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
                          <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider border-b border-slate-100 pb-2">
                            Musterlösung: Entscheidungen Videosequenzen
                          </h4>

                          <div className="space-y-3 text-xs">
                            <div className="bg-[#F7F9FA] p-3.5 rounded-xl border border-slate-200">
                              <span className="font-bold text-[#264653] block mb-1">Wer war zu sehen / zu hören?</span>
                              <p className="text-[#2B2D42]">{currentModule.sampleSolution.zusatzdoc.who}</p>
                            </div>
                            <div className="bg-[#F7F9FA] p-3.5 rounded-xl border border-slate-200">
                              <span className="font-bold text-[#264653] block mb-1">Was ist passiert?</span>
                              <p className="text-[#2B2D42]">{currentModule.sampleSolution.zusatzdoc.whatHappened}</p>
                            </div>
                            <div className="bg-[#F7F9FA] p-3.5 rounded-xl border border-slate-200">
                              <span className="font-bold text-[#264653] block mb-1">Entscheidungen & Dilemmata</span>
                              <p className="text-[#2B2D42]">{currentModule.sampleSolution.zusatzdoc.decisionsMade}</p>
                            </div>
                          </div>
                        </div>

                        {/* Musterlösung ABEDL */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
                          <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider border-b border-slate-100 pb-2">
                            Musterlösung: 13 ABEDL Schwerpunkte &amp; Beobachtungen
                          </h4>

                          <div className="space-y-3">
                            {Object.entries(currentModule.sampleSolution.abedl).map(([key, val]) => (
                              <div key={key} className="bg-[#F7F9FA] p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                                <span className="font-bold text-[#264653]">ABEDL Kategorie {key}:</span>
                                <p className="text-[#2B2D42]">{val.info}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Special Evaluation & Certificate for DS 7 */}
                        {currentModule.id === 7 && (
                          <div className="p-5 bg-gradient-to-br from-[#264653]/10 to-[#E76F51]/10 rounded-2xl border border-[#264653]/20 space-y-3">
                            <h4 className="text-sm font-bold text-[#264653] flex items-center gap-2">
                              <Award className="w-5 h-5 text-[#E76F51]" />
                              <span>Abschluss-Evaluation & Ethik-Zertifikat</span>
                            </h4>
                            <p className="text-xs text-[#2B2D42] [text-wrap:pretty]">
                              Herzlichen Glückwunsch zum Abschluss aller 7 Doppelstunden! Drucken Sie Ihr offizielles Kompetenz-Zertifikat aus.
                            </p>
                            <button
                              onClick={() => setActiveModal('certificate')}
                              className="px-4 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                            >
                              <Award className="w-4 h-4 text-[#E76F51]" />
                              <span>Offizielles Abschluss-Zertifikat öffnen</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* AMBER-FARBENDER ABSCHLUSS-BUTTON: Schließt den Workspace & bringt den TN zurück zur Map */}
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={handleFinishLevelAndReturnToMap}
                        className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm shadow-xl shadow-amber-500/30 ring-2 ring-amber-400/50 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Star className="w-5 h-5 text-amber-100 fill-current" />
                        <span>Doppelstunde {currentModule.id} abschließen & Zurück zur Gaming-Map</span>
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
