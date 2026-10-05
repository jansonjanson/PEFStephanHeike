import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Award,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface QuizViewProps {
  moduleId: number;
  questions: QuizQuestion[];
}

export const QuizView: React.FC<QuizViewProps> = ({ moduleId, questions }) => {
  const { moduleStates, saveQuizScore, unlockBadge } = useApp();
  const state = moduleStates[moduleId];
  const savedScore = state?.quizScore;

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(savedScore?.score || 0);
  const [isFinished, setIsFinished] = useState<boolean>(savedScore?.completed || false);

  const question = questions[currentIdx];

  const handleSelect = (optionId: string) => {
    if (isAnswerChecked) return;
    sounds.playSelectOption();
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || !question.options) return;
    setIsAnswerChecked(true);

    const chosen = question.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      sounds.playSuccess();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playError();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      // Finished
      const finalScore = correctCount + (question.options?.find((o) => o.id === selectedOptionId)?.isCorrect ? 0 : 0);
      saveQuizScore(moduleId, correctCount, questions.length);
      setIsFinished(true);
      if (correctCount / questions.length >= 0.75) {
        unlockBadge('badge_quiz_master');
      }
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percent = Math.round((correctCount / questions.length) * 100);
    const isPassed = percent >= 75;

    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-5">
        <div
          className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-xl ${
            isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}
        >
          {isPassed ? '🏆' : '📚'}
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            {isPassed ? 'Quiz erfolgreich bestanden!' : 'Guter Versuch!'}
          </h3>
          <p className="text-xs text-slate-400">
            Du hast {correctCount} von {questions.length} Fragen richtig beantwortet ({percent}%).
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isPassed ? 'bg-emerald-500' : 'bg-amber-500'}`}
            style={{ width: `${percent}%` }}
          />
        </div>

        {isPassed && (
          <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-200">
            ✨ Hervorragend! Du beherrschst die theoretischen Grundlagen der drei Entscheidungsmodelle.
          </div>
        )}

        <button
          onClick={handleRestart}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 mx-auto transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Quiz wiederholen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header with question progress */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Wissens-Check: Frage {currentIdx + 1} von {questions.length}
          </span>
        </div>
        <span className="text-xs font-mono text-teal-400 font-semibold">
          Punkte: {correctCount}
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-sm font-bold text-slate-100 leading-relaxed">
        {question.question}
      </h3>

      {/* Options List */}
      <div className="space-y-2.5">
        {question.options?.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let optionStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300';

          if (isSelected) {
            optionStyle = 'bg-teal-950/40 border-teal-500 text-teal-200 ring-1 ring-teal-500/50';
          }

          if (isAnswerChecked) {
            if (option.isCorrect) {
              optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
            } else if (isSelected && !option.isCorrect) {
              optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
            } else {
              optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={option.id}
              disabled={isAnswerChecked}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-3 ${optionStyle}`}
            >
              <span>{option.text}</span>
              {isAnswerChecked && option.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswerChecked && isSelected && !option.isCorrect && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (when checked) */}
      {isAnswerChecked && (
        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1 animate-in fade-in">
          <span className="font-bold text-teal-400 uppercase text-[10px]">Didaktische Erläuterung:</span>
          <p>
            {question.options?.find((o) => o.id === selectedOptionId)?.explanation ||
              question.options?.find((o) => o.isCorrect)?.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        {!isAnswerChecked ? (
          <button
            disabled={!selectedOptionId}
            onClick={handleCheckAnswer}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:hover:bg-teal-600 text-white font-bold text-xs shadow-md transition-all"
          >
            Antwort prüfen
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/20 transition-all"
          >
            <span>{currentIdx + 1 < questions.length ? 'Nächste Frage' : 'Quiz abschließen'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
