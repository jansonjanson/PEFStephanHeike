import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Unlock,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Users,
  HeartPulse,
  Scale,
  Compass,
  FileSpreadsheet,
  MessageSquare
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface EthicGameViewProps {
  onComplete: () => void;
}

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  instructions: string[];
  actionPrompt: string;
  quote?: string;
  reflectionQuestion?: string;
  phaseNote?: string;
}

const GAME_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Schritt 1: Das persönliche Werte-Fundament',
    subtitle: '10 Kärtchen für das eigene Lebensglück notieren',
    badge: 'Phase 1 • Selbstreflexion',
    instructions: [
      'Nehmen Sie sich 10 leere Zettel oder Notizkarten zur Hand.',
      'Notieren Sie auf jedem Kärtchen genau ein Ding, eine Person, eine Gewohnheit oder einen Wert, der für Ihr persönliches Lebensglück und Ihre Identität unverzichtbar ist.',
      'Beispiele: „Mein Partner/meine Kinder“, „Selbstbestimmt reisen“, „Meine Privatsphäre“, „Sport & Motorradfahren“, „Mein Beruf als Pflegekraft“, „Gutes Essen & Kaffee“, „Unabhängigkeit“, etc.',
    ],
    actionPrompt: 'Haben alle 10 Kärtchen beschrieben? Klicken Sie auf Weiter, um Schritt 2 freizuschalten.',
    phaseNote: 'Zeitrahmen: ca. 5–7 Minuten. Jeder arbeitet für sich in Stille.',
  },
  {
    id: 2,
    title: 'Schritt 2: Die erste persönliche Reduktion',
    subtitle: 'Selbst 5 von 10 Kriterien abgeben',
    badge: 'Phase 2 • Krisensimulation',
    instructions: [
      'Stellen Sie sich vor: Eine schwere Lebenskrise, ein Schicksalsschlag oder eine plötzliche Krankheit trifft Sie.',
      'Sie müssen sich von der Hälfte Ihrer Werte trennen: Streichen Sie selbst 5 Ihrer 10 Zettel durch bzw. legen Sie diese zur Seite.',
      'Welche 5 existenziellen Kriterien behalten Sie in Ihren Händen?',
    ],
    actionPrompt: 'Haben alle 5 Zettel ausgewählt? Klicken Sie auf Weiter, um Schritt 3 freizuschalten.',
    phaseNote: 'Beobachtung: Wie schwer fällt die Priorisierung? Jeder spürt den ersten Schmerz des Verzichts.',
  },
  {
    id: 3,
    title: 'Schritt 3: Der Kontrollverlust & Fremdbestimmung',
    subtitle: 'Die Nachbarperson entscheidet unerbittlich über Ihre Existenz!',
    badge: 'Phase 3 • Ethischer Schock',
    instructions: [
      'Geben Sie Ihre verbleibenden 5 Kärtchen wortlos an Ihre Sitznachbarin / Ihren Sitznachbarn weiter.',
      'Arbeitsauftrag an die Nachbarperson: Streichen Sie OHNE Rücksprache und ohne Begründung 2 weitere Kriterien von den 5 Zetteln weg!',
      'Geben Sie die verbleibenden 3 Zettel anschließend wieder zurück.',
    ],
    quote: '„Es ist mir egal, was dir wichtig war – ich habe jetzt entschieden, was für dich das Beste ist.“',
    actionPrompt: 'Haben alle die 2 Kärtchen gestrichen bekommen? Klicken Sie auf Weiter zur Auswertung.',
    phaseNote: 'Didaktischer Kernmoment: Das Gefühl von totaler Ohnmacht und Fremdbestimmung wird physisch spürbar.',
  },
  {
    id: 4,
    title: 'Schritt 4: Gefühls-Resonanz & Murmelphase',
    subtitle: 'Die Erfahrung der Fremdbestimmung reflektieren',
    badge: 'Phase 4 • Partneraustausch',
    instructions: [
      'Tauschen Sie sich 5 Minuten zu zweit mit Ihrer Nachbarperson aus:',
      '1. Wie hat es sich angefühlt, als die andere Person über Ihre 5 wertvollsten Lebensgüter bestimmt hat?',
      '2. Welche Gefühle kamen auf: Wut, Enttäuschung, Ohnmacht, Resignation?',
      '3. Welche Rechte verliert ein Mensch im Krankenhaus oder Pflegeheim, wenn er nicht mehr für sich selbst sprechen kann?',
    ],
    reflectionQuestion: 'Welche Parallele sehen Sie zum Schicksal von Stephan nach seinem Motorradunfall?',
    actionPrompt: 'Klicken Sie auf Weiter, um den Transfer zum Pflegealltag aufzudecken.',
    phaseNote: 'Murmelphase & emotionale Entlastung im Plenum.',
  },
  {
    id: 5,
    title: 'Schritt 5: Transfer zur Pflegepraxis & PEF-Fundament',
    subtitle: 'Vom Paternalismus zur Partizipativen Entscheidungsfindung',
    badge: 'Phase 5 • Ethische Synthese',
    instructions: [
      'Warum ist Paternalismus („Ich weiß, was gut für dich ist“) in der Pflege so verführerisch und gleichzeitig so gefährlich?',
      'Partizipative Entscheidungsfindung (PEF) ist kein methodisches Beiwerk, sondern die ethische Antwort auf den verletzlichen Autonomieanspruch des Patienten.',
      'Auch wenn Stephan im Wachkoma liegt oder schwerstbehindert ist: Seine Würde, seine Vorlieben und sein Restwillen müssen mit Heike partnerschaftlich erkundet werden.',
    ],
    actionPrompt: 'Doppelstunde 1 erfolgreich abgeschlossen! Bereit für DS 2 (Theorie & Modelle).',
    phaseNote: 'Grundstein für die kommenden Gameloop-Szenarien gelegt.',
  },
];

export const EthicGameView: React.FC<EthicGameViewProps> = ({ onComplete }) => {
  // Current unlocked step: starts at 1, unrolls on click
  const [unlockedStep, setUnlockedStep] = useState<number>(1);
  const [activeCards, setActiveCards] = useState<string[]>(Array(10).fill(''));

  const handleUnlockNext = (nextStep: number) => {
    sounds.playSuccess();
    setUnlockedStep(nextStep);

    setTimeout(() => {
      const el = document.getElementById(`ethic-step-${nextStep}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleCardTextChange = (index: number, val: string) => {
    const updated = [...activeCards];
    updated[index] = val;
    setActiveCards(updated);
  };

  return (
    <div className="space-y-6 text-[#2B2D42]">
      {/* Introduction Card */}
      <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#264653] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E76F51]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white">
              Doppelstunde 1 • Interaktives Ethik-Experiment
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Präsenz- &amp; Gruppenerfahrung
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white [text-wrap:balance]">
            Das Zettel-Spiel: Was bedeutet Selbstbestimmung und Fremdbestimmung?
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed [text-wrap:pretty]">
            In dieser ersten Einheit erleben die Teilnehmenden am eigenen Leib, wie sich Kontrollverlust, Bevormundung und der Entzug existenzieller Lebenskriterien anfühlen. Decken Sie die 5 Spielschritte schrittweise nacheinander auf, um die Spannung und den didaktischen Überraschungseffekt im Unterricht zu wahren.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Aktueller Stand: Schritt {unlockedStep} von 5 aufgedeckt</span>
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Unrolling Stream */}
      <div className="space-y-5">
        {GAME_STEPS.map((step) => {
          const isRevealed = step.id <= unlockedStep;
          const isCurrentActive = step.id === unlockedStep;

          if (!isRevealed) {
            return (
              <div
                key={step.id}
                className="bg-white/60 border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center space-y-2 card-soft-shadow opacity-75"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-500">
                  {step.title} – Noch verborgen
                </h4>
                <p className="text-[11px] text-slate-400">
                  Wird nach Abschluss von Schritt {step.id - 1} freigeschaltet.
                </p>
              </div>
            );
          }

          return (
            <div
              key={step.id}
              id={`ethic-step-${step.id}`}
              className={`rounded-2xl border-2 transition-all duration-300 p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in slide-in-from-top-3 ${
                isCurrentActive
                  ? 'bg-white border-[#264653] ring-2 ring-[#264653]/15'
                  : 'bg-white/95 border-emerald-500/40'
              }`}
            >
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-xs ${
                      step.id < unlockedStep
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#264653] text-white'
                    }`}
                  >
                    {step.id < unlockedStep ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-[#264653]">
                        {step.badge}
                      </span>
                      {step.phaseNote && (
                        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                          {step.phaseNote}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {step.id < unlockedStep && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Durchgeführt
                  </span>
                )}
              </div>

              {/* Step Instructions */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider">
                  Arbeitsanweisung für diesen Schritt:
                </h4>
                <ul className="space-y-2 text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed">
                  {step.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#F8FAFB] p-2.5 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-[#264653] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="[text-wrap:pretty]">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Interactive Helper for Step 1: 10 Cards Input */}
              {step.id === 1 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#264653] block">
                    Digitale Kärtchen-Notiz (optional – kann auch auf realem Papier erfolgen):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div key={idx} className="bg-amber-50/60 border border-amber-200 rounded-xl p-2 space-y-1">
                        <span className="text-[10px] font-bold text-amber-900 block font-mono">
                          Zettel {idx + 1}:
                        </span>
                        <input
                          type="text"
                          value={activeCards[idx]}
                          onChange={(e) => handleCardTextChange(idx, e.target.value)}
                          placeholder="z.B. Familie, Sport..."
                          className="w-full bg-white border border-amber-300 rounded-lg p-1.5 text-xs text-[#2B2D42] focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Shock Quote for Step 3 */}
              {step.quote && (
                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-xl text-xs sm:text-[13px] text-rose-950 font-serif italic flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0 font-bold text-rose-800">
                    !
                  </div>
                  <div>
                    <strong className="block not-italic font-sans text-rose-900 font-bold text-xs uppercase tracking-wider mb-0.5">
                      Paternalistischer Eingriff:
                    </strong>
                    {step.quote}
                  </div>
                </div>
              )}

              {/* Reflection Question for Step 4 */}
              {step.reflectionQuestion && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>Zentrale Reflexionsfrage:</span>
                  </div>
                  <p className="font-bold text-xs sm:text-[13px] leading-relaxed">
                    {step.reflectionQuestion}
                  </p>
                </div>
              )}

              {/* Reveal Next Step Button */}
              {isCurrentActive && step.id < 5 && (
                <div className="pt-2 flex justify-end border-t border-slate-100">
                  <button
                    onClick={() => handleUnlockNext(step.id + 1)}
                    className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                  >
                    <Unlock className="w-4 h-4 text-amber-400" />
                    <span>Nächsten Spielschritt aufdecken (Schritt {step.id + 1} freischalten)</span>
                    <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                  </button>
                </div>
              )}

              {/* Final Step Completion Button */}
              {isCurrentActive && step.id === 5 && (
                <div className="pt-2 flex justify-end border-t border-slate-100">
                  <button
                    onClick={onComplete}
                    className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs flex items-center gap-2.5 shadow-lg shadow-amber-500/30 transition-all cursor-pointer transform hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Doppelstunde 1 abschließen &amp; Zurück zur Gaming-Map (DS 2 freischalten)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
