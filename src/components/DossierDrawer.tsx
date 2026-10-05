import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { ZusatzdocForm } from './ZusatzdocForm';
import { AbedlForm } from './AbedlForm';
import { SimulationView } from './SimulationView';
import { QuizView } from './QuizView';
import { exportNursingDossierDocx } from '../utils/docxExport';
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
  ChevronRight,
  FileSpreadsheet,
  Users,
  Film,
  Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const DossierDrawer: React.FC = () => {
  const {
    activeModuleId,
    setActiveModuleId,
    isDrawerOpen,
    setIsDrawerOpen,
    activeDrawerTab,
    setActiveDrawerTab,
    moduleStates,
    unlockModuleWithPassword,
    markModuleCompleted,
    studentName,
  } = useApp();

  const [formSubTab, setFormSubTab] = useState<'zusatzdoc' | 'abedl'>('zusatzdoc');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isDrawerOpen || activeModuleId === null) return null;

  const currentModule = MODULES_DATA.find((m) => m.id === activeModuleId);
  if (!currentModule) return null;

  const state = moduleStates[currentModule.id];
  const isUnlocked = state?.unlockedWithPassword || currentModule.id === 1;

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

  return (
    <>
      {/* Background Overlay with Dimming & Blur effect */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300"
        onClick={() => {
          sounds.playClick();
          setIsDrawerOpen(false);
        }}
      />

      {/* Slide-In Dossier Panel (65%-70% width on desktop) */}
      <div
        id="tour-dossier"
        className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[70%] lg:w-[65%] xl:w-[60%] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform translate-x-0"
      >
        {/* Drawer Header (Investigator Dossier Style) */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              DS {currentModule.id}
            </div>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-2">
                <span>{currentModule.title}</span>
              </h2>
              <p className="text-xs text-teal-400 truncate">{currentModule.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Word Export Shortcut */}
            <button
              id="tour-export-btn"
              onClick={handleExportDocx}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50"
              title="Aktuelle Formulare als Word-Dokument (.docx) exportieren"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isExporting ? 'Exportiert...' : 'Word-Export (.docx)'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setIsDrawerOpen(false);
              }}
              className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-4 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveDrawerTab('akte');
            }}
            className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeDrawerTab === 'akte'
                ? 'border-teal-500 text-teal-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Tab 1: Die Akte & Formulare</span>
          </button>

          <button
            id="tour-simulation-tab"
            onClick={() => {
              sounds.playClick();
              setActiveDrawerTab('simulation');
            }}
            className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeDrawerTab === 'simulation'
                ? 'border-teal-500 text-teal-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>Tab 2: {currentModule.quiz ? 'Theorie-Quiz' : 'Die Simulation'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveDrawerTab('auswertung');
            }}
            className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeDrawerTab === 'auswertung'
                ? 'border-teal-500 text-teal-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>Tab 3: Auswertung & Musterlösung</span>
            {!isUnlocked && <Lock className="w-3 h-3 text-slate-500 ml-0.5" />}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveDrawerTab('didaktik');
            }}
            className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeDrawerTab === 'didaktik'
                ? 'border-teal-500 text-teal-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Tab 4: Dozenten-Regie</span>
          </button>
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ==================================================== */}
          {/* TAB 1: DIE AKTE (Video & Formulare)                  */}
          {/* ==================================================== */}
          {activeDrawerTab === 'akte' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Video Player Card */}
              {currentModule.videoUrl && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        {currentModule.videoTitle || 'Videosequenz'}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {currentModule.videoDuration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    {currentModule.videoDescription}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">SlidePresenter / Video-Player</div>
                        <div className="text-[11px] text-slate-400">Direkter Zugriff auf den originalen Filmausschnitt</div>
                      </div>
                    </div>

                    <a
                      href={currentModule.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                    >
                      <span>Video im Player öffnen</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Formular Sub-Navigation */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setFormSubTab('zusatzdoc');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      formSubTab === 'zusatzdoc'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-transparent'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>1. Zusatzdoc V.2</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setFormSubTab('abedl');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      formSubTab === 'abedl'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-transparent'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>2. 13 ABEDL (Krohwinkel)</span>
                  </button>
                </div>

                <button
                  onClick={handleExportDocx}
                  disabled={isExporting}
                  className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Als .docx herunterladen</span>
                </button>
              </div>

              {/* Active Form Display */}
              {formSubTab === 'zusatzdoc' ? (
                <ZusatzdocForm moduleId={currentModule.id} />
              ) : (
                <AbedlForm moduleId={currentModule.id} />
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: DIE SIMULATION / QUIZ                         */}
          {/* ==================================================== */}
          {activeDrawerTab === 'simulation' && (
            <div className="animate-in fade-in duration-200">
              {currentModule.simulation ? (
                <SimulationView moduleId={currentModule.id} simulation={currentModule.simulation} />
              ) : currentModule.quiz ? (
                <QuizView moduleId={currentModule.id} questions={currentModule.quiz} />
              ) : (
                <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  In DS 1 wird die Zettel-Streichen-Übung im Präsenzseminar durchgeführt.
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: AUSWERTUNG & GATED MUSTERLÖSUNG               */}
          {/* ==================================================== */}
          {activeDrawerTab === 'auswertung' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Decision Statistics Snapshot */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Diagnose: Deine pflegerische Haltung in dieser Einheit</span>
                  <span className="text-[11px] text-teal-400">Hidden Stats Analyse</span>
                </h3>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800/40">
                    <div className="text-[10px] text-teal-400 uppercase font-bold">PEF-Score</div>
                    <div className="text-xl font-bold font-mono text-teal-300">
                      {state?.simulationStats?.pef || 0}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/30">
                    <div className="text-[10px] text-rose-400 uppercase font-bold">Paternalistisch</div>
                    <div className="text-xl font-bold font-mono text-rose-300">
                      {state?.simulationStats?.paternalistic || 0}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/30">
                    <div className="text-[10px] text-amber-400 uppercase font-bold">Informed Model</div>
                    <div className="text-xl font-bold font-mono text-amber-300">
                      {state?.simulationStats?.informed || 0}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentModule.sampleSolution.decisionAnalysis}
                </p>
              </div>

              {/* Password Gate for Musterlösung */}
              {!isUnlocked ? (
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">Musterlösung ist gesperrt</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Spiele die Simulation in Tab 2 durch oder gib das im Unterricht generierte Passwort ein, um die offizielle Musterlösung für Zusatzdoc und ABEDL freizuschalten.
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
                        placeholder="z.B. PEF-ETHIK-3"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono tracking-wider uppercase focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    {passwordError && (
                      <p className="text-[11px] text-rose-400">
                        Ungültiges Passwort. Hinweis: {currentModule.sampleSolution.passwordHint}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                    >
                      Musterlösung entsperren
                    </button>
                  </form>
                </div>
              ) : (
                /* Unlocked Musterlösung */
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs text-emerald-300 font-bold">
                      <Unlock className="w-4 h-4" />
                      <span>Offizielle Musterlösung & Fachanamnese freigeschaltet</span>
                    </div>
                    <button
                      onClick={handleExportDocx}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Als Word (.docx) exportieren</span>
                    </button>
                  </div>

                  {/* Musterlösung Zusatzdoc */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Musterlösung: Zusatzdoc V.2
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-400 block mb-1">Wer war zu sehen / zu hören?</span>
                        <p className="text-slate-200">{currentModule.sampleSolution.zusatzdoc.who}</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-400 block mb-1">Was ist passiert?</span>
                        <p className="text-slate-200">{currentModule.sampleSolution.zusatzdoc.whatHappened}</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-400 block mb-1">Entscheidungen & Dilemmata</span>
                        <p className="text-slate-200">{currentModule.sampleSolution.zusatzdoc.decisionsMade}</p>
                      </div>
                    </div>
                  </div>

                  {/* Musterlösung ABEDL */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Musterlösung: ABEDL Schwerpunkte & PESR
                    </h4>

                    <div className="space-y-3">
                      {Object.entries(currentModule.sampleSolution.abedl).map(([key, val]) => (
                        <div key={key} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                          <span className="font-bold text-teal-300">ABEDL Kategorie {key}:</span>
                          <p className="text-slate-300">{val.info}</p>
                          <div className="p-2 rounded bg-slate-900 text-[11px] font-mono text-emerald-300 border border-slate-800">
                            {val.pesr}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complete Module Button */}
                  <button
                    onClick={() => markModuleCompleted(currentModule.id)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Doppelstunde {currentModule.id} als abgeschlossen markieren</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: DOZENTEN-REGIE & DIDAKTIK                     */}
          {/* ==================================================== */}
          {activeDrawerTab === 'didaktik' && (
            <div className="space-y-6 animate-in fade-in duration-200 text-xs">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Regieplan: {currentModule.teacherGuide.topic}</span>
                  </h3>
                  <span className="font-mono text-emerald-400 font-semibold">{currentModule.teacherGuide.duration}</span>
                </div>

                {/* Goals */}
                <div>
                  <h4 className="font-bold text-teal-400 uppercase text-[11px] mb-2">Pädagogische Lernziele</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    {currentModule.teacherGuide.pedagogicalGoals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>

                {/* Schedule Table */}
                <div>
                  <h4 className="font-bold text-teal-400 uppercase text-[11px] mb-2">90-Minuten Phasenablauf</h4>
                  <div className="space-y-2">
                    {currentModule.teacherGuide.schedule.map((sch, i) => (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-200">
                          <span className="text-teal-300">{sch.phase} ({sch.timeMinutes} Min.)</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                            {sch.socialForm} • {sch.media}
                          </span>
                        </div>
                        <p className="text-slate-300">{sch.activity}</p>
                        <p className="text-[11px] text-slate-400 italic">💡 Didaktik: {sch.didacticNotes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blackboard Summary */}
                <div>
                  <h4 className="font-bold text-teal-400 uppercase text-[11px] mb-2">Tafelbild / Visualisierung</h4>
                  <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-teal-200 whitespace-pre-wrap leading-relaxed">
                    {currentModule.teacherGuide.blackboardSummary}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
