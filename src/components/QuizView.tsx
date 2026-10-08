import React, { useState } from 'react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import { QuizQuestion } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
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
  const {
    unlockBadge,
    saveQuizScore,
    awardPasswordForNextModule,
    showSuccessBanner,
    setActiveModal,
  } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({}); // questionId -> optionId
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const nextModulePasswordDef = LEVEL_PASSWORDS[moduleId + 1];

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center text-xs text-[#2B2D42]/70 card-soft-shadow">
        Keine Quizfragen für diese Lerneinheit hinterlegt.
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const options = currentQ.options || [];
  const chosenOptionId = selectedAnswers[currentQ.id];
  const chosenOpt = options.find((opt) => opt.id === chosenOptionId);
  const isCorrect = !!chosenOpt?.isCorrect;

  const handleCopyPassword = (pwd: string) => {
    sounds.playSelectOption();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pwd);
    }
    setCopiedKey(true);
    showSuccessBanner(`Passwort „${pwd}“ für DS ${moduleId + 1} kopiert!`);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleSelect = (optionId: string) => {
    sounds.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
    setShowExplanation(true);
    const opt = options.find((o) => o.id === optionId);
    if (opt?.isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      const totalCorrect = questions.filter((q) => {
        const selId = selectedAnswers[q.id];
        return q.options?.find((o) => o.id === selId)?.isCorrect;
      }).length;
      saveQuizScore(moduleId, totalCorrect, questions.length);
      awardPasswordForNextModule(moduleId);
      unlockBadge('badge_quiz_master');
      sounds.playBadgeUnlock();
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const correctTotal = questions.filter((q) => {
    const selId = selectedAnswers[q.id];
    return q.options?.find((o) => o.id === selId)?.isCorrect;
  }).length;

  if (quizFinished) {
    const percent = Math.round((correctTotal / questions.length) * 100);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-5 card-soft-shadow animate-in fade-in duration-300 text-[#2B2D42]">
        <div className="w-16 h-16 rounded-3xl bg-[#264653] text-white flex items-center justify-center mx-auto shadow-md">
          <Award className="w-9 h-9 text-[#E76F51]" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#E76F51] uppercase tracking-wider">
            Wissenssicherung abgeschlossen
          </span>
          <h2 className="text-xl font-bold text-[#264653] mt-0.5">Ergebnisse zur Entscheidungsfindung</h2>
          <p className="text-xs text-[#2B2D42]/70 mt-1 [text-wrap:pretty]">
            Sie haben {correctTotal} von {questions.length} Fragen richtig beantwortet ({percent}%).
          </p>
        </div>

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

        {/* Level Password Reward Card */}
        {nextModulePasswordDef && (
          <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-[#264653]/10 border-2 border-amber-400/80 rounded-2xl shadow-md space-y-3 text-left animate-in fade-in zoom-in-95 duration-300">
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
          const isSelected = chosenOptionId === opt.id;
          const isThisCorrect = opt.isCorrect;

          let btnStyle = 'bg-[#F7F9FA] border-slate-200 hover:border-[#264653]/40 text-[#2B2D42]';

          if (showExplanation) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 opacity-50 text-[#2B2D42]';
            }
          }

          return (
            <button
              key={opt.id}
              disabled={showExplanation}
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-[#264653]">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed">{opt.text}</span>
              </div>

              {showExplanation && (
                <div className="shrink-0 ml-2">
                  {isThisCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Rationale Panel */}
      {showExplanation && (
        <div
          className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="font-bold flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Richtig gelöst!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Nicht ganz korrekt:</span>
              </>
            )}
          </div>
          <p className="leading-relaxed">{chosenOpt?.explanation || 'Beachte die Schlüsselunterschiede in Bezug auf Informationskontrolle und Verantwortung.'}</p>

          <div className="pt-2 flex justify-start">
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>{currentIdx + 1 === questions.length ? 'Quiz beenden' : 'Nächste Frage'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
