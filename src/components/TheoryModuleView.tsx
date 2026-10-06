import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../types';
import { QuizView } from './QuizView';
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
  Check
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TheoryModuleViewProps {
  moduleId: number;
  quizQuestions: QuizQuestion[];
}

export const TheoryModuleView: React.FC<TheoryModuleViewProps> = ({ moduleId, quizQuestions }) => {
  const { setIsOnboardingActive, moduleStates, advanceModuleStep } = useApp();
  const state = moduleStates[moduleId];
  const stepProgress = state?.stepProgress || 1; // 1 = Text, 2 = Table, 3 = Quiz

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
      {/* Onboarding & Tutorial Prompt Card */}
      <div className="bg-gradient-to-br from-[#264653]/10 via-[#264653]/5 to-[#F7F9FA] border border-[#264653]/20 rounded-2xl p-5 card-soft-shadow flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#264653] text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6 text-[#E76F51]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
              Onboarding &amp; Theoriefundament
            </span>
            <h3 className="text-base font-bold text-[#264653] [text-wrap:balance]">
              Willkommen bei „Modelle der Entscheidung“
            </h3>
            <p className="text-xs text-[#2B2D42]/80 mt-0.5 [text-wrap:pretty]">
              Erarbeiten Sie hier die 3 Entscheidungsmodelle aus dem Thieme CNE-Fachartikel Schritt für Schritt von oben nach unten.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            setIsOnboardingActive(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-[#E76F51]" />
          <span>App-Tutorial starten</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SCHRITT 1: CNE-FACHARTIKEL                                                */}
      {/* ========================================================================= */}
      <section id="theory-step-1" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 1 ? 'bg-[#264653] text-white' : 'bg-slate-200 text-slate-500'}`}>
              1
            </span>
            <span>Schritt 1: CNE-Fachartikel (Gunnar Geuter)</span>
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

        <div className="bg-white border border-slate-200 rounded-2xl p-6 card-soft-shadow space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
                CNE.online • Certified Nursing Education (Thieme)
              </span>
              <h2 className="text-lg font-bold text-[#264653] font-serif-reading mt-0.5">
                Informationen teilen, gemeinsam entscheiden
              </h2>
              <p className="text-xs text-[#2B2D42]/70">
                Autor: Gunnar Geuter • Lerneinheit: Der informierte Patient (DOI: 10.1055/s-0033-1348914)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://github.com/jansonjanson/PEFStephanHeike/raw/main/Informationen%20teilen%20gemeinsam%20entscheiden_Thieme.pdf"
                download="Informationen_teilen_gemeinsam_entscheiden_Thieme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Direkten Download des CNE-Fachartikels (.pdf) starten"
              >
                <FileText className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>CNE-Fachartikel herunterladen (.pdf)</span>
              </a>

              <a
                href="https://elearn.zfg-ms.de/mod/resource/view.php?id=230710"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#264653]/10 hover:bg-[#264653]/20 text-[#264653] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#264653]/20 cursor-pointer"
                title="Zusätzliche Quelle auf Moodle (ZFG Münster) öffnen"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>Quelle auf Moodle</span>
              </a>
            </div>
          </div>

          {/* Text Content */}
          <div className="font-serif-reading text-sm sm:text-[15px] text-[#2B2D42] leading-relaxed space-y-4">
            <div className="p-4 rounded-xl bg-[#F7F9FA] border border-slate-200 font-sans text-xs not-italic text-[#264653] font-medium leading-relaxed">
              <strong>Zusammenfassung:</strong> Wer bei der Behandlung mitentscheiden kann, wird schneller gesund – so lautet die Kernbotschaft der Partizipativen Entscheidungsfindung (PEF). Ärzte, Therapeuten und Pflegende treffen Entscheidungen noch allzu oft über die Köpfe der Patienten hinweg, ohne Werte und Lebensrealität einzubeziehen. Die Folge: Fehlentscheidungen und mangelnde Adhärenz.
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
            <ul className="list-disc pl-6 space-y-1 font-sans text-xs text-[#2B2D42]">
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
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCompleteStep1}
              className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CNE-Fachartikel gelesen ➔ Weiter zu Schritt 2: Modellvergleich</span>
              <ArrowDown className="w-4 h-4 text-[#E76F51]" />
            </button>
          </div>
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
              Bestätigen Sie oben Schritt 1 (CNE-Fachartikel gelesen), um den tabellarischen Modellvergleich freizuschalten.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 card-soft-shadow space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider block">
                Thieme CNE • Tab. 1 Übersicht
              </span>
              <h3 className="text-base font-bold text-[#264653] mt-0.5">
                Partizipative Entscheidungsfindung eingeordnet in Modelle der Pflege-Patienten-Interaktion
              </h3>
              <p className="text-xs text-[#2B2D42]/70">
                Grad der Patientenautonomie von niedrig nach hoch (nach Gunnar Geuter, 2021)
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Model 1: Paternalistisch */}
              <div className="border border-slate-200 rounded-xl p-5 bg-[#F7F9FA] space-y-3.5">
                <div className="pb-3 border-b border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-[#2B2D42]">
                    Niedrige Autonomie
                  </span>
                  <h4 className="text-sm font-bold text-[#264653] mt-2">
                    1. Paternalistic Model (Paternalistisch)
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-[#2B2D42]">
                  <div>
                    <span className="font-bold text-[#264653] block">Wer entscheidet?</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Pflege bevormundet den Patienten.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Wer kontrolliert Informationen?</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Pflege hat alleinige Kontrolle über Informationen.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Patientenwünsche &amp; Werte:</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Werden <strong>nicht</strong> in die Entscheidung einbezogen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Model 2: Partizipative Entscheidungsfindung */}
              <div className="border-2 border-[#264653] rounded-xl p-5 bg-[#264653]/5 space-y-3.5 relative shadow-sm">
                <div className="absolute -top-2.5 right-3 bg-[#E76F51] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  Empfohlenes Leitbild
                </div>

                <div className="pb-3 border-b border-[#264653]/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#264653] text-white">
                    Hohe, geteilte Autonomie
                  </span>
                  <h4 className="text-sm font-bold text-[#264653] mt-2">
                    2. Partizipative Entscheidungsfindung (PEF)
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-[#2B2D42]">
                  <div>
                    <span className="font-bold text-[#264653] block">Wer entscheidet?</span>
                    <p className="text-slate-800 bg-white p-2 rounded-lg border border-[#264653]/30 font-medium mt-1">
                      Pflege und Patient treffen als <strong>Partner gemeinsam</strong> Entscheidungen.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Wer kontrolliert Informationen?</span>
                    <p className="text-slate-800 bg-white p-2 rounded-lg border border-[#264653]/30 font-medium mt-1">
                      Pflege und Patient haben <strong>gemeinsam</strong> die Kontrolle.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Patientenwünsche &amp; Werte:</span>
                    <p className="text-slate-800 bg-white p-2 rounded-lg border border-[#264653]/30 font-medium mt-1">
                      Werden in <strong>vollem Umfang</strong> in die Entscheidung einbezogen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Model 3: Informed Decision Making */}
              <div className="border border-slate-200 rounded-xl p-5 bg-[#F7F9FA] space-y-3.5">
                <div className="pb-3 border-b border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-[#2B2D42]">
                    Alleinige Autonomie
                  </span>
                  <h4 className="text-sm font-bold text-[#264653] mt-2">
                    3. Informed Decision Making Model
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-[#2B2D42]">
                  <div>
                    <span className="font-bold text-[#264653] block">Wer entscheidet?</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Pflege ist reiner Informationsgeber; Patient handelt und entscheidet allein.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Wer kontrolliert Informationen?</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Beide haben Kontrolle über Infos; Entscheidung obliegt allein dem Patienten.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#264653] block">Patientenwünsche &amp; Werte:</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      Werden in <strong>vollem Umfang</strong> in die Entscheidung einbezogen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bestätigungsbutton für Schritt 2 */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleCompleteStep2}
                className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Modellvergleich verstanden ➔ Weiter zu Schritt 3: Wissens-Quiz</span>
                <ArrowDown className="w-4 h-4 text-[#E76F51]" />
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
