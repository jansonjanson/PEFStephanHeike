import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SimulationScenario, DecisionOption } from '../types';
import { CHARACTER_AVATARS } from '../data/avatarsData';
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
  const [imageError, setImageError] = useState<boolean>(false);

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

  // Determine avatar image URL
  const getSpeakerAvatarUrl = () => {
    if (currentStep.speakerAvatar?.startsWith('http')) {
      return currentStep.speakerAvatar;
    }
    const nameLower = currentStep.speaker.toLowerCase();
    if (nameLower.includes('heike')) return CHARACTER_AVATARS.heike.imageUrl;
    if (nameLower.includes('stephan')) return CHARACTER_AVATARS.stephan.imageUrl;
    if (nameLower.includes('leon')) return CHARACTER_AVATARS.sohn2_leon.imageUrl;
    if (nameLower.includes('lukas')) return CHARACTER_AVATARS.sohn3_lukas.imageUrl;
    if (nameLower.includes('sohn')) return CHARACTER_AVATARS.sohn1.imageUrl;
    return CHARACTER_AVATARS.heike.imageUrl;
  };

  const avatarUrl = getSpeakerAvatarUrl();

  return (
    <div className="space-y-6">
      {/* Simulation Stage Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F51] animate-ping" />
            <span className="text-xs font-bold text-[#E76F51] uppercase tracking-wider">
              Interaktive Pflege-Simulation • Flaschenhals-Adventure
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#264653] bg-[#264653]/10 px-2.5 py-0.5 rounded-full font-bold">
            DS {moduleId} Fallentscheidung
          </span>
        </div>

        <h2 className="text-base font-bold text-[#264653] mb-1">{simulation.title}</h2>
        <p className="text-xs text-[#2B2D42]/80 leading-relaxed">{simulation.initialDescription}</p>
      </div>

      {/* Character Dialogue Box (Visual Novel / Chat Interface) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4">
        {/* Character Portrait & Tag */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              {!imageError ? (
                <img
                  src={avatarUrl}
                  alt={currentStep.speaker}
                  onError={() => setImageError(true)}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#264653] shadow-md bg-slate-100"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#264653] text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {currentStep.speaker.charAt(0)}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                ✓
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-[#264653] flex items-center gap-2">
                <span>{currentStep.speaker}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#2B2D42] border border-slate-200 font-medium">
                  {currentStep.speakerRole}
                </span>
              </div>
              <div className="text-[11px] text-[#2B2D42]/70 italic mt-0.5">
                {currentStep.sceneDescription}
              </div>
            </div>
          </div>

          {/* Stephan companion preview thumbnail */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F7F9FA] border border-slate-200 px-3 py-1.5 rounded-2xl shrink-0">
            <img
              src={CHARACTER_AVATARS.stephan.imageUrl}
              alt="Stephan"
              className="w-9 h-9 rounded-xl object-cover border border-slate-300"
            />
            <div className="text-left">
              <div className="text-[10px] font-bold text-[#264653]">Stephan</div>
              <div className="text-[9px] text-[#2B2D42]/60">Im Rollstuhl / Bett</div>
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="relative bg-[#F7F9FA] border border-[#264653]/20 rounded-2xl p-4">
          <p className="text-sm text-[#264653] font-medium leading-relaxed font-serif-reading">
            „{currentStep.dialogueText}“
          </p>
        </div>

        {/* Dilemma Prompt */}
        <div className="p-3 bg-[#E76F51]/10 border border-[#E76F51]/20 rounded-xl text-xs text-[#2B2D42] flex items-center gap-2 font-medium">
          <HelpCircle className="w-4 h-4 text-[#E76F51] shrink-0" />
          <span><strong>Dilemma-Frage:</strong> {currentStep.dilemmaPrompt}</span>
        </div>
      </div>

      {/* 3 Action Cards (Paternalistisch, PEF, Informed) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#2B2D42]/70 uppercase tracking-wider px-1 flex items-center justify-between">
          <span>Wählen Sie Ihre pflegerische Haltung:</span>
          <span className="text-[11px] text-[#264653] font-bold">3 Handlungsoptionen</span>
        </h3>

        <div className="grid grid-cols-1 gap-3.5">
          {currentStep.options.map((option) => {
            const isChosen = selectedOpt?.id === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                  isChosen
                    ? option.model === 'pef'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                      : option.model === 'paternalistic'
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/30 shadow-md'
                      : 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-white border-slate-200 hover:border-[#264653]/40 hover:bg-slate-50 card-soft-shadow'
                }`}
              >
                {/* Header Tag of Option */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      option.model === 'pef'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : option.model === 'paternalistic'
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {option.modelLabel}
                  </span>

                  {isChosen && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#264653] font-mono">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Ausgewählt
                    </span>
                  )}
                </div>

                {/* Direct Nurse Dialogue Quote */}
                <p className="text-xs font-bold text-[#264653] mb-1.5 leading-relaxed font-serif-reading">
                  „{option.quote}“
                </p>

                {/* Action summary */}
                <p className="text-[11px] text-[#2B2D42]/80 leading-normal">
                  <strong className="text-[#2B2D42]">Handlung:</strong> {option.actionText}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Consequence & Feedback Panel (when an option is selected) */}
      {selectedOpt && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-soft-shadow space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h4 className="text-xs font-bold text-[#264653] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E76F51]" />
              <span>Konsequenz deiner Entscheidung</span>
            </h4>
            <button
              onClick={handleReset}
              className="text-[11px] text-[#264653] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Andere Option testen
            </button>
          </div>

          {/* Reaction from Patient/Angehörige */}
          <div className="p-3.5 bg-[#F7F9FA] rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold text-[#264653] uppercase block">Reaktion von Heike & Stephan:</span>
            <p className="text-[#2B2D42] italic font-serif-reading">{selectedOpt.immediateReaction}</p>
          </div>

          {/* Didactic Rationale */}
          <div className="p-3.5 bg-[#264653]/5 rounded-xl border border-[#264653]/15 text-xs space-y-1">
            <span className="text-[10px] font-bold text-[#264653] uppercase block">Pflegepädagogische Einordnung:</span>
            <p className="text-[#2B2D42] leading-relaxed">{selectedOpt.explanation}</p>
          </div>

          {/* Next Step / Password Fragment Alert */}
          <div className="p-4 rounded-xl bg-[#264653] text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#E76F51]" />
                <span>Passwort-Fragment für Musterlösung freigespielt:</span>
              </div>
              <div className="font-mono text-sm font-bold text-[#E76F51] tracking-wider mt-0.5 bg-white/10 px-2 py-0.5 rounded inline-block">
                {simulation.passwordFragment}
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveDrawerTab('auswertung');
              }}
              className="px-4 py-2 rounded-xl bg-[#E76F51] hover:bg-[#D45D40] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
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
