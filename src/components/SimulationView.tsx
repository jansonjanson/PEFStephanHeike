import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SimulationScenario, DecisionOption } from '../types';
import {
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Users
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SimulationViewProps {
  moduleId: number;
  simulation: SimulationScenario;
}

export const SimulationView: React.FC<SimulationViewProps> = ({ moduleId, simulation }) => {
  const { moduleStates, recordSimulationChoice, setActiveDrawerTab } = useApp();
  const state = moduleStates[moduleId];
  const answers = state?.simulationAnswers || {};
  const currentStep = simulation.steps[0]; // Active dilemma step

  const chosenOptionId = answers[currentStep?.id];
  const chosenOption = currentStep?.options.find((opt) => opt.id === chosenOptionId);

  const [selectedOpt, setSelectedOpt] = useState<DecisionOption | null>(chosenOption || null);

  const handleSelectOption = (option: DecisionOption) => {
    setSelectedOpt(option);
    recordSimulationChoice(moduleId, currentStep.id, option.id, {
      pefScore: option.statsImpact.pefScore,
      paternalisticScore: option.statsImpact.paternalisticScore,
      informedScore: option.statsImpact.informedScore,
    });
  };

  const handleReset = () => {
    sounds.playClick();
    setSelectedOpt(null);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Stage Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Interaktive Pflege-Simulation • Flaschenhals-Adventure
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
            DS {moduleId} Fallentscheidung
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-2">{simulation.title}</h2>
        <p className="text-xs text-slate-300 leading-relaxed">{simulation.initialDescription}</p>
      </div>

      {/* Character Dialogue Box (Visual Novel / Chat Interface) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        {/* Character Portrait & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-2xl shadow-lg border border-teal-400/30">
            {currentStep.speakerAvatar}
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{currentStep.speaker}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700 font-normal">
                {currentStep.speakerRole}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              {currentStep.sceneDescription}
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="relative bg-slate-950/90 border border-teal-500/30 rounded-2xl p-4 shadow-inner">
          <p className="text-sm text-teal-100 font-medium leading-relaxed">
            {currentStep.dialogueText}
          </p>
        </div>

        {/* Dilemma Prompt */}
        <div className="p-3 bg-teal-950/30 border border-teal-800/30 rounded-xl text-xs text-teal-200 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="font-semibold">{currentStep.dilemmaPrompt}</span>
        </div>
      </div>

      {/* 3 Action Cards (Paternalistisch, PEF, Informed) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
          <span>Wähle deine pflegerische Haltung:</span>
          <span className="text-[11px] text-teal-400">3 Handlungsoptionen</span>
        </h3>

        <div className="grid grid-cols-1 gap-3.5">
          {currentStep.options.map((option, idx) => {
            const isChosen = selectedOpt?.id === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group ${
                  isChosen
                    ? option.model === 'pef'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
                      : option.model === 'paternalistic'
                      ? 'bg-rose-950/30 border-rose-500/80 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/50'
                      : 'bg-amber-950/30 border-amber-500/80 ring-2 ring-amber-500/30 shadow-lg shadow-amber-950/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-md'
                }`}
              >
                {/* Header Tag of Option */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      option.model === 'pef'
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                        : option.model === 'paternalistic'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {option.modelLabel}
                  </span>

                  {isChosen && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-teal-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      Ausgewählt
                    </span>
                  )}
                </div>

                {/* Direct Nurse Dialogue Quote */}
                <p className="text-xs font-semibold text-white mb-2 leading-relaxed">
                  {option.quote}
                </p>

                {/* Action summary */}
                <p className="text-[11px] text-slate-400 leading-normal">
                  <span className="text-slate-500">Handlung:</span> {option.actionText}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Consequence & Feedback Panel (when an option is selected) */}
      {selectedOpt && (
        <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Konsequenz deiner Entscheidung</span>
            </h4>
            <button
              onClick={handleReset}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Andere Option testen
            </button>
          </div>

          {/* Reaction from Patient/Angehörige */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase">Reaktion von Heike & Stephan:</span>
            <p className="text-slate-200 italic">{selectedOpt.immediateReaction}</p>
          </div>

          {/* Didactic Rationale */}
          <div className="p-3.5 bg-teal-950/20 rounded-xl border border-teal-800/30 text-xs space-y-1">
            <span className="text-[10px] font-bold text-teal-300 uppercase">Pflegepädagogische Einordnung:</span>
            <p className="text-teal-100/90 leading-relaxed">{selectedOpt.explanation}</p>
          </div>

          {/* Next Step / Password Fragment Alert */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 to-emerald-950/60 border border-teal-500/40 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Passwort-Fragment für Musterlösung freigespielt:</span>
              </div>
              <div className="font-mono text-sm font-bold text-amber-300 tracking-wider mt-0.5">
                {simulation.passwordFragment}
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveDrawerTab('auswertung');
              }}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
            >
              <span>Zur Auswertung & Musterlösung</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
