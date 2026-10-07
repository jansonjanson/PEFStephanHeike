import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  KeyRound,
  Copy,
  Check,
  BookMarked
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface QuizViewProps {
  moduleId: number;
  questions: QuizQuestion[];
}

export const QuizView: React.FC<QuizViewProps> = ({ moduleId, questions }) => {
  const { saveQuizScore, awardPasswordForNextModule, setActiveModal, showSuccessBanner } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [copiedPassword, setCopiedPassword] = useState<boolean>(false);

  const currentQ = questions[currentIdx];
  const options = currentQ?.options || [];
  const selectedOptId = currentQ ? selectedAnswers[currentQ.id] : undefined;

  const nextModuleId = moduleId + 1;
  const nextPasswordDef = LEVEL_PASSWORDS[nextModuleId];

  const handleSelectOption = (optId: string) => {
    if (showExplanation) return;
    sounds.playSelectOption();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
    setShowExplanation(true);

    const isCorrect = options.find((o) => o.id === optId)?.isCorrect;
    if (isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    setShowExplanation(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final score
      const correctCount = questions.filter((q) => {
        const selId = selectedAnswers[q.id];
        return q.options?.find((o) => o.id === selId)?.isCorrect;
      }).length;

      saveQuizScore(moduleId, correctCount, questions.length);
      awardPasswordForNextModule(moduleId);
      setQuizFinished(true);
      sounds.playBadgeUnlock();
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
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

  const correctTotal = questions.filter((q) => {
    const selId = selectedAnswers[q.id];
    return q.options?.find((o) => o.id === selId)?.isCorrect;
  }).length;

  if (quizFinished) {
    const percent = Math.round((correctTotal / questions.length) * 100);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-6 card-soft-shadow animate-in fade-in duration-300 text-[#2B2D42]">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white flex items-center justify-center mx-auto shadow-lg">
          <Award className="w-9 h-9 text-amber-300" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider">
            Wissenssicherung erfolgreich absolviert
          </span>
          <h2 className="text-xl font-bold text-[#264653] mt-0.5">Ergebnisse zur Entscheidungsfindung</h2>
          <p className="text-xs text-[#2B2D42]/70 mt-1 [text-wrap:pretty]">
            Sie haben {correctTotal} von {questions.length} Fragen richtig beantwortet ({percent}%).
          </p>
        </div>

        {/* Prominente Passwort-Belohnungsbox für DS 3 */}
        {nextPasswordDef && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white border-2 border-emerald-400 shadow-xl text-left space-y-3">
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
                    Passwort für Doppelstunde {nextModuleId}:
                  </h4>
                  <p className="text-xs text-slate-300">
                    {nextPasswordDef.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="px-4 py-2 rounded-xl bg-black/50 border-2 border-amber-400 font-mono text-base font-extrabold text-amber-300 tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>{nextPasswordDef.password}</span>
                </div>

                <button
                  onClick={() => handleCopyPassword(nextPasswordDef.password)}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  title="Passwort kopieren"
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

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Geben Sie das Passwort beim Öffnen von Doppelstunde 3 ein.</span>
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

        <div className="p-4 bg-[#F7F9FA] rounded-xl border border-slate-200 max-w-sm mx-auto text-xs text-[#2B2D42] space-y-1">
          {percent >= 70 ? (
            <p className="text-[#2A9D8F] font-bold [text-wrap:pretty]">
              Hervorragend! Sie beherrschen die theoretischen Grundlagen der drei Entscheidungsmodelle nach Gunnar Geuter sicher.
            </p>
          ) : (
            <p className="text-amber-800 font-medium [text-wrap:pretty]">
              Guter Versuch! Wir empfehlen Ihnen, die Vergleichstabelle im vorherigen Reiter nochmals zu studieren.
            </p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="px-5 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Quiz wiederholen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-5 text-[#2B2D42]">
      {/* Progress & Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-[#264653]/10 text-[#264653] px-2.5 py-0.5 rounded-full">
            Frage {currentIdx + 1} von {questions.length}
          </span>
          <span className="text-xs font-bold text-[#E76F51]">Thieme CNE Wissenscheck</span>
        </div>

        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIdx
                  ? 'w-6 bg-[#264653]'
                  : idx < currentIdx
                  ? 'w-2 bg-[#2A9D8F]'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-[#264653] leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {options.map((opt, optIdx) => {
          const isSelected = selectedOptId === opt.id;
          let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-[#2B2D42]';

          if (showExplanation) {
            if (opt.isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
            } else {
              btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              disabled={showExplanation}
              onClick={() => handleSelectOption(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start justify-between gap-3 text-xs sm:text-[13px] leading-relaxed cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span>{opt.text}</span>
              </div>

              {showExplanation && (
                <span className="shrink-0 mt-0.5">
                  {opt.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="p-4 bg-[#F7F9FA] rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#264653]">
            <Sparkles className="w-4 h-4 text-[#E76F51]" />
            <span>Erklärung &amp; Pflegeethischer Kontext:</span>
          </div>
          <p className="text-[#2B2D42]/80 leading-relaxed [text-wrap:pretty]">
            {options.find((o) => o.isCorrect)?.explanation || 'Richtig! Diese Antwort spiegelt das fundierte Verständnis der Theorie wider.'}
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>{currentIdx + 1 < questions.length ? 'Nächste Frage' : 'Quiz abschließen & Auswertung'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
