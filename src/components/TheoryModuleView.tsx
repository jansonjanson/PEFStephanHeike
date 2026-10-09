import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../types';
import { QuizView } from './QuizView';
import { TheoryVisualizations } from './TheoryVisualizations';
import {
  BookOpen,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Table,
  CheckCircle2,
  FileText,
  Lightbulb,
  ArrowRight,
  ArrowDown,
  Lock,
  Check,
  Stethoscope,
  Users,
  User,
  Scale,
  Activity
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TheoryModuleViewProps {
  moduleId: number;
  quizQuestions: QuizQuestion[];
}

export const TheoryModuleView: React.FC<TheoryModuleViewProps> = ({ moduleId, quizQuestions }) => {
  const { moduleStates, advanceModuleStep } = useApp();
  const state = moduleStates[moduleId];
  const stepProgress = state?.stepProgress || 1; // 1 = Text, 2 = Table, 3 = Quiz

  const [hasConfirmedArticleRead, setHasConfirmedArticleRead] = useState<boolean>(stepProgress >= 2);

  const handleConfirmRead = () => {
    sounds.playSuccess();
    setHasConfirmedArticleRead(true);
  };

  const handleCompleteStep1 = () => {
    sounds.playSuccess();
    advanceModuleStep(moduleId, 2);
    setTimeout(() => {
      document.getElementById('theory-step-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleCompleteStep2 = () => {
    sounds.playSuccess();
    advanceModuleStep(moduleId, 3);
    setTimeout(() => {
      document.getElementById('theory-step-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="space-y-8 text-[#2B2D42]">
      {/* ========================================================================= */}
      {/* SCHRITT 1: CNE-FACHARTIKEL & ARBEITSAUFTRAG                               */}
      {/* ========================================================================= */}
      <section id="theory-step-1" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 1 ? 'bg-[#264653] text-white' : 'bg-slate-200 text-slate-500'}`}>
              1
            </span>
            <span>Schritt 1: CNE-Fachartikel (Gunnar Geuter) &amp; Lektüreauftrag</span>
          </div>

          {stepProgress > 1 ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Erledigt
            </span>
          ) : (
            <span className="text-[11px] font-bold text-[#E76F51] bg-[#E76F51]/10 border border-[#E76F51]/20 px-3 py-0.5 rounded-full animate-pulse">
              Aktiver Schritt
            </span>
          )}
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-6">
          {/* Arbeitsauftrag Banner */}
          <div className="p-4 bg-gradient-to-r from-blue-50/90 via-slate-50 to-emerald-50/50 border-2 border-[#264653]/30 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#264653] text-white">
                Arbeitsauftrag • Schritt 1
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#264653]">
              CNE-Fachartikel herunterladen &amp; vollständig durchlesen
            </h3>
            <p className="text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
              Laden Sie den Thieme CNE-Fachartikel von Gunnar Geuter (<em>„Informationen teilen, gemeinsam entscheiden“</em>) über die folgende Schaltfläche herunter und lesen Sie ihn aufmerksam durch. Bestätigen Sie danach die Lektüre, um die didaktische Zusammenfassung und die Grundsäulen der PEF freizuschalten.
            </p>
          </div>

          {/* Download & Source Action Box */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
                CNE.online • Certified Nursing Education (Thieme)
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#264653] font-serif-reading mt-0.5">
                Informationen teilen, gemeinsam entscheiden
              </h2>
              <p className="text-xs text-[#2B2D42]/70">
                Autor: Gunnar Geuter • Lerneinheit: Der informierte Patient (DOI: 10.1055/s-0033-1348914)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/docs/Informationen%20teilen%20gemeinsam%20entscheiden_Thieme.pdf"
                download="Informationen_teilen_gemeinsam_entscheiden_Thieme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-4 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer transform hover:scale-[1.02]"
                title="Direkten Download des CNE-Fachartikels (.pdf) starten"
              >
                <FileText className="w-4 h-4 text-[#E76F51]" />
                <span>CNE-Fachartikel herunterladen (.pdf)</span>
              </a>

              <a
                href="https://elearn.zfg-ms.de/mod/resource/view.php?id=230710"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-[#264653]/10 hover:bg-[#264653]/20 text-[#264653] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#264653]/20 cursor-pointer"
                title="Zusätzliche Quelle auf Moodle (ZFG Münster) öffnen"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>Quelle auf Moodle</span>
              </a>
            </div>
          </div>

          {/* Locked State before reading */}
          {!hasConfirmedArticleRead && (
            <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center mx-auto shadow-xs">
                <BookOpen className="w-6 h-6 text-amber-700" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-sm font-bold text-[#264653]">
                  Zusammenfassung &amp; PEF-Grundsäulen sind noch verborgen
                </h4>
                <p className="text-xs text-[#2B2D42]/70 [text-wrap:pretty]">
                  Bitte lesen Sie zuerst den heruntergeladenen Fachartikel. Bestätigen Sie danach die Lektüre, um die inhaltliche Auswertung aufzuklappen.
                </p>
              </div>

              <div>
                <button
                  onClick={handleConfirmRead}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2.5 mx-auto shadow-lg shadow-amber-500/35 ring-4 ring-amber-300/60 animate-pulse transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Ich habe den Fachartikel vollständig gelesen (Zusammenfassung aufklappen)</span>
                </button>
              </div>
            </div>
          )}

          {/* Unlocked Summary & Pillars Content */}
          {hasConfirmedArticleRead && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="font-serif-reading text-sm sm:text-[15px] text-[#2B2D42] leading-relaxed space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 font-sans text-xs not-italic text-emerald-950 font-medium leading-relaxed">
                  <strong className="text-emerald-900">Zusammenfassung:</strong> Wer bei der Behandlung mitentscheiden kann, wird schneller gesund – so lautet die Kernbotschaft der Partizipativen Entscheidungsfindung (PEF). Fachkräfte treffen Entscheidungen noch allzu oft über die Köpfe der Patienten hinweg, ohne Werte und Lebensrealität einzubeziehen. Die Folge: Fehlentscheidungen und mangelnde Adhärenz.
                </div>

                <h4 className="font-sans font-bold text-sm text-[#264653] uppercase tracking-wider pt-2">
                  Patienten wünschen Partnerschaft
                </h4>
                <p>
                  Viele Patienten wollen Therapieentscheidungen gemeinsam mit den Behandelnden treffen. Die Partizipative Entscheidungsfindung (PEF; engl. <em>shared decision-making</em>) sieht den Patienten als gleichberechtigten Partner im therapeutischen Prozess und bezieht ihn aktiv in alle therapierelevanten Entscheidungen ein.
                </p>

                <h4 className="font-sans font-bold text-sm text-[#264653] uppercase tracking-wider pt-2">
                  Die drei Grundsäulen der PEF:
                </h4>
                <ul className="list-disc pl-6 space-y-1.5 font-sans text-xs text-[#2B2D42]">
                  <li><strong>Partizipation beider Teilnehmer:</strong> Sowohl Pflege als auch Patient/Angehörige beteiligen sich aktiv am Prozess.</li>
                  <li><strong>Gegenseitige Bereitstellung von Informationen:</strong> Pflege teilt evidenzbasiertes Fachwissen; Patient teilt persönliche Werte, Ängste und Lebensziele.</li>
                  <li><strong>Gemeinsames Einverständnis &amp; geteilte Verantwortung:</strong> Konsensfindung hinsichtlich Diagnose, Pflegeintervention und Hilfsmitteln.</li>
                </ul>

                <h4 className="font-sans font-bold text-sm text-[#264653] uppercase tracking-wider pt-2">
                  Symmetrische Interaktion auf Augenhöhe
                </h4>
                <p>
                  Als Experte steuert die Pflegekraft evidenzbasierte fachliche Informationen bei, der Patient seine Werte, Wünsche und Ressourcen. Die subjektive Seite des Patienten wird zwingend Teil der Entscheidungsfindung. PEF fördert und fordert Patientenautonomie und -souveränität (Empowerment).
                </p>
              </div>

              {/* Bestätigungsbutton für Schritt 1 */}
              <div className="pt-4 border-t border-slate-100 flex justify-start">
                <button
                  onClick={handleCompleteStep1}
                  className={`px-6 py-3.5 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer transform hover:scale-[1.01] ${
                    stepProgress > 1
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                      : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/35 ring-4 ring-amber-300/60 animate-pulse'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${stepProgress > 1 ? 'text-emerald-300' : 'text-slate-950'}`} />
                  <span>
                    {stepProgress > 1
                      ? '✓ Schritt 1 abgeschlossen – Weiter zu Schritt 2: Modellvergleich'
                      : 'Lektüreauftrag bestätigen – Weiter zu Schritt 2: Modellvergleich & Visualisierungen'}
                  </span>
                  <ArrowDown className={`w-4 h-4 ${stepProgress > 1 ? 'text-emerald-200' : 'text-slate-950'}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCHRITT 2: TAB. 1 MODELLVERGLEICH (FREIGESCHALTET AB SCHRITT 2)             */}
      {/* ========================================================================= */}
      <section id="theory-step-2" className="space-y-3 pt-4 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 2 ? 'bg-[#2A9D8F] text-white' : 'bg-slate-200 text-slate-500'}`}>
              2
            </span>
            <span>Schritt 2: Die 3 Modelle im Vergleich (Tab. 1 nach Gunnar Geuter)</span>
          </div>

          {stepProgress > 2 ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Erledigt
            </span>
          ) : stepProgress === 2 ? (
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

        {stepProgress < 2 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
            <Lock className="w-6 h-6 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-[#264653]">Schritt 2 noch gesperrt</h4>
            <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
              Bestätigen Sie oben Schritt 1 (CNE-Fachartikel gelesen), um den tabellarischen Modellvergleich und die visuellen Übersichten freizuschalten.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 card-soft-shadow space-y-7 animate-in fade-in duration-300">
            {/* Header von Schritt 2 */}
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
                Thieme CNE • Tab. 1 &amp; Visualisierungen
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#264653] mt-0.5">
                Partizipative Entscheidungsfindung eingeordnet in Modelle der Pflege-Patienten-Interaktion
              </h3>
              <p className="text-xs text-[#2B2D42]/70 mt-1">
                Grad der Patientenautonomie von niedrig nach hoch (nach Gunnar Geuter, 2021)
              </p>
            </div>

            {/* Interaktive Übersichten & Grafiken (Autonomie-Spektrum & Anwendungsassessment) */}
            <TheoryVisualizations />

            {/* Tab. 1 Detaillierter Modellvergleich in farbenfrohen Kacheln */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#264653]" />
                <h4 className="text-sm font-bold text-[#264653]">
                  Detaillierte Gegenüberstellung der 3 Dimensionen (Tab. 1)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Model 1: Paternalistisch */}
                <div className="border-2 border-blue-200 rounded-2xl p-5 bg-gradient-to-br from-blue-50/90 to-blue-100/40 space-y-3.5 shadow-xs">
                  <div className="pb-3 border-b border-blue-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-900 border border-blue-300">
                      Niedrige Autonomie
                    </span>
                    <h4 className="text-sm font-bold text-blue-950 mt-2 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>1. Paternalistic Model</span>
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs text-[#2B2D42]">
                    <div>
                      <span className="font-bold text-blue-950 block text-[11px] uppercase tracking-wider">Wer entscheidet?</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-blue-200/80 mt-1 shadow-xs">
                        Pflegekraft / Arzt bevormundet den Patienten.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-950 block text-[11px] uppercase tracking-wider">Wer kontrolliert Informationen?</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-blue-200/80 mt-1 shadow-xs">
                        Fachkraft hat alleinige Kontrolle über Informationen.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-950 block text-[11px] uppercase tracking-wider">Patientenwünsche &amp; Werte:</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-blue-200/80 mt-1 shadow-xs">
                        Werden <strong>nicht</strong> in die Entscheidung einbezogen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Model 2: Partizipative Entscheidungsfindung */}
                <div className="border-2 border-emerald-500 rounded-2xl p-5 bg-gradient-to-br from-emerald-50/90 via-emerald-100/30 to-teal-50 space-y-3.5 relative shadow-md">
                  <div className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    Empfohlenes Leitbild
                  </div>

                  <div className="pb-3 border-b border-emerald-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-700 text-white">
                      Hohe, geteilte Autonomie
                    </span>
                    <h4 className="text-sm font-bold text-emerald-950 mt-2 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>2. Partizipative Entscheidungsfindung (PEF)</span>
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs text-[#2B2D42]">
                    <div>
                      <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">Wer entscheidet?</span>
                      <p className="text-slate-900 bg-white p-2.5 rounded-xl border border-emerald-300 font-medium mt-1 shadow-xs">
                        Pflege und Patient treffen als <strong>Partner gemeinsam</strong> Entscheidungen.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">Wer kontrolliert Informationen?</span>
                      <p className="text-slate-900 bg-white p-2.5 rounded-xl border border-emerald-300 font-medium mt-1 shadow-xs">
                        Pflege und Patient haben <strong>gemeinsam</strong> die Kontrolle.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">Patientenwünsche &amp; Werte:</span>
                      <p className="text-slate-900 bg-white p-2.5 rounded-xl border border-emerald-300 font-medium mt-1 shadow-xs">
                        Werden in <strong>vollem Umfang</strong> in die Entscheidung einbezogen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Model 3: Informed Decision Making */}
                <div className="border-2 border-amber-300 rounded-2xl p-5 bg-gradient-to-br from-amber-50/90 to-orange-50/50 space-y-3.5 shadow-xs">
                  <div className="pb-3 border-b border-amber-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300">
                      Alleinige Autonomie
                    </span>
                    <h4 className="text-sm font-bold text-amber-950 mt-2 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>3. Informed Decision Making Model</span>
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs text-[#2B2D42]">
                    <div>
                      <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">Wer entscheidet?</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 mt-1 shadow-xs">
                        Pflege ist reiner Informationsgeber; Patient handelt und entscheidet allein.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">Wer kontrolliert Informationen?</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 mt-1 shadow-xs">
                        Beide haben Kontrolle über Infos; Entscheidung obliegt allein dem Patienten.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">Patientenwünsche &amp; Werte:</span>
                      <p className="text-slate-800 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 mt-1 shadow-xs">
                        Werden in <strong>vollem Umfang</strong> in die Entscheidung einbezogen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bestätigungsbutton für Schritt 2 */}
            <div className="pt-4 border-t border-slate-100 flex justify-start">
              <button
                onClick={handleCompleteStep2}
                className={`px-6 py-3.5 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer transform hover:scale-[1.01] ${
                  stepProgress >= 3
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                    : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/35 ring-4 ring-amber-300/60 animate-pulse'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${stepProgress >= 3 ? 'text-emerald-300' : 'text-slate-950'}`} />
                <span>
                  {stepProgress >= 3
                    ? '✓ Schritt 2 abgeschlossen – Weiter zum Wissens-Quiz'
                    : 'Modellvergleich & Grafiken verstanden – Weiter zu Schritt 3: Wissens-Quiz'}
                </span>
                <ArrowDown className={`w-4 h-4 ${stepProgress >= 3 ? 'text-emerald-200' : 'text-slate-950'}`} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SCHRITT 3: WISSENS-QUIZ (FREIGESCHALTET AB SCHRITT 3)                      */}
      {/* ========================================================================= */}
      <section id="theory-step-3" className="space-y-3 pt-4 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 3 ? 'bg-[#E76F51] text-white' : 'bg-slate-200 text-slate-500'}`}>
              3
            </span>
            <span>Schritt 3: Wissenssicherung ({quizQuestions.length} Fragen)</span>
          </div>

          {stepProgress >= 3 ? (
            <span className="text-[11px] font-bold text-[#E76F51] bg-[#E76F51]/10 border border-[#E76F51]/20 px-3 py-0.5 rounded-full">
              Quiz aktiv
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
            <h4 className="text-xs font-bold text-[#264653]">Schritt 3 noch gesperrt</h4>
            <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
              Bestätigen Sie oben Schritt 2 (Modellvergleich verstanden), um das Wissens-Quiz freizuschalten.
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[#264653]/10 p-4 rounded-2xl border border-[#264653]/20 text-xs text-[#264653] flex items-center gap-2.5">
              <Lightbulb className="w-5 h-5 text-[#E76F51] shrink-0" />
              <span className="[text-wrap:pretty]">
                Beantworten Sie die folgenden <strong>{quizQuestions.length} Fragen</strong>, um Ihr Verständnis der drei Entscheidungsmodelle zu festigen. Bei mindestens 75% richtigen Antworten wird Ihr Dozenten-Zertifikatspunkt gewertet.
              </span>
            </div>

            <QuizView moduleId={moduleId} questions={quizQuestions} />
          </div>
        )}
      </section>
    </div>
  );
};
