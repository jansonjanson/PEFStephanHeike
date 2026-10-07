import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Activity,
  HeartPulse,
  Bot,
  Home,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  HelpCircle,
  Crosshair,
  Info,
  CheckCircle,
  RotateCcw,
  Lightbulb,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { CHARACTER_AVATARS } from '../data/avatarsData';
import { sounds } from '../utils/soundEffects';
import { LevelUnlockModal } from './LevelUnlockModal';

const NODE_ICONS: { [key: string]: React.ElementType } = {
  Compass,
  GraduationCap,
  Activity,
  HeartPulse,
  Bot,
  Home,
  Trophy,
};

export const RoadmapMap: React.FC = () => {
  const {
    activeModuleId,
    openModule,
    moduleStates,
    customBgUrl,
    setIsOnboardingActive,
    setActiveModal,
    successBanner,
  } = useApp();

  const [unlockModalModuleId, setUnlockModalModuleId] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F7F9FA] select-none text-[#2B2D42]">
      {/* Background Layer: Gaming Map Image (Map.jpg) */}
      <div className="absolute inset-0 transition-all duration-700">
        <div
          className="w-full h-full bg-cover bg-center transition-all filter brightness-[0.98] contrast-[1.02]"
          style={{ backgroundImage: `url(${customBgUrl})` }}
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-[#264653]/5 pointer-events-none" />
      </div>

      {/* SVG Path: Warm Connecting Thread connecting Nodes 1 -> 7 */}
      <svg
        id="tour-roadmap"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="roadmapPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#264653" />
            <stop offset="50%" stopColor="#2A9D8F" />
            <stop offset="100%" stopColor="#E76F51" />
          </linearGradient>
        </defs>

        {/* Soft Background Track */}
        <path
          d="M 14 72 Q 20 60 26 50 T 42 32 T 58 55 T 74 40 T 86 65 T 92 30"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeDasharray="2 1.5"
          opacity="0.85"
        />

        {/* Primary Pathway */}
        <path
          d="M 14 72 Q 20 60 26 50 T 42 32 T 58 55 T 74 40 T 86 65 T 92 30"
          fill="none"
          stroke="url(#roadmapPathGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Success Notification Banner (Toast) */}
      {successBanner && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-[#264653] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-emerald-400/60 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xs font-bold tracking-wide">{successBanner}</span>
        </div>
      )}

      {/* Top Header Floating Glassbar */}
      <header className="absolute top-4 left-20 right-4 z-30 flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveModal('welcome');
          }}
          className="flex items-center gap-3.5 bg-white/95 hover:bg-amber-50/90 active:bg-amber-100 backdrop-blur-md border border-slate-200 hover:border-amber-300 rounded-2xl px-4 py-2 shadow-md transition-all text-left cursor-pointer group"
          title="Fall-Einführung, Zitat und alle Charaktere anzeigen"
        >
          {/* Couple Avatars: Heike & Stefan */}
          <div className="flex items-center -space-x-2.5 shrink-0" title="Fall Stefan & Heike">
            <img
              src={CHARACTER_AVATARS.heike.imageUrl}
              alt="Heike"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#264653] shadow-sm z-10 group-hover:scale-105 transition-transform"
            />
            <img
              src={CHARACTER_AVATARS.stephan.imageUrl}
              alt="Stefan"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#E76F51] shadow-sm z-0 group-hover:scale-105 transition-transform"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <h1 className="text-xs sm:text-sm font-bold text-[#264653] tracking-tight group-hover:text-[#1E3640]">
                Partnerschaftliche Entscheidungsfindung
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E76F51]/15 text-[#E76F51] font-semibold shrink-0">
                Fall Stefan &amp; Heike
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] text-[#2B2D42]/70 font-medium">Gaming-Roadmap • 7 Doppelstunden</p>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold flex items-center gap-1 border border-amber-200">
                <span>Fall-Einführung &amp; Charaktere ➔</span>
              </span>
            </div>
          </div>
        </button>

        {/* Action Widgets */}
        <div className="flex items-center gap-2">
          {/* Reset / Restart Training Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              setActiveModal('resetConfirm');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all border border-slate-200 bg-white hover:bg-rose-50 text-rose-700 cursor-pointer"
            title="Training neu starten (Fortschritt zurücksetzen)"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span className="hidden md:inline">Neu starten</span>
          </button>

          {/* Quick Help / Tour */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOnboardingActive(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#E76F51]" />
            <span className="hidden sm:inline">Tour starten</span>
          </button>
        </div>
      </header>

      {/* Interactive Map Nodes (DS 1 - DS 7) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {(() => {
          // Exactly one level gets the pulsating ping effect: the next unlocked, uncompleted level in sequence!
          const activeNextPlayable = MODULES_DATA.find((m) => {
            const isUnlocked = moduleStates[m.id]?.unlockedWithPassword || m.id === 1;
            const isCompleted = moduleStates[m.id]?.completed;
            return isUnlocked && !isCompleted;
          });

          return MODULES_DATA.map((mod) => {
            const state = moduleStates[mod.id];
            const isSelected = activeModuleId === mod.id;
            const isCompleted = state?.completed;
            const isUnlocked = state?.unlockedWithPassword || mod.id === 1;
            const isPlayableNext = activeNextPlayable?.id === mod.id;
            const IconComponent = NODE_ICONS[mod.icon] || Compass;

            return (
            <div
              key={mod.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300"
              style={{
                left: `${mod.mapCoordinates.x}%`,
                top: `${mod.mapCoordinates.y}%`,
              }}
            >
              {/* "PING"-EFFEKT: Pulsierender Ripple-Ring für das aktuell freigeschaltete, noch nicht abgeschlossene Level! */}
              {isPlayableNext && (
                <div className="absolute -inset-2.5 rounded-2xl bg-[#E76F51]/35 border border-[#E76F51] animate-ping pointer-events-none" />
              )}

              {/* Selected Node Ring */}
              {isSelected && (
                <div className="absolute -inset-2 rounded-2xl bg-[#264653]/30 ring-2 ring-[#264653] pointer-events-none" />
              )}

              {/* Node Button Card */}
              <button
                id={mod.id === 1 ? 'tour-first-node' : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isUnlocked) {
                    sounds.playError();
                    setUnlockModalModuleId(mod.id);
                  } else {
                    openModule(mod.id);
                  }
                }}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 cursor-pointer ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                {/* Visual Pin Card */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md relative ${
                    isSelected
                      ? 'bg-[#264653] text-white ring-4 ring-[#264653]/30 shadow-lg'
                      : isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isUnlocked
                      ? 'bg-white border-2 border-[#264653] text-[#264653] hover:bg-[#264653]/5'
                      : 'bg-white/90 border border-slate-300 text-slate-400'
                  }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />

                  {/* Status Indicator Icon Badge */}
                  <div className="absolute -top-2 -right-2">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-5 h-5 rounded-full bg-[#E76F51] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {mod.id}
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center shadow-sm border border-slate-400">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Node Label Tooltip Badge Below */}
                <div
                  className={`mt-2 px-3 py-1.5 rounded-xl text-center border transition-all duration-200 pointer-events-none max-w-[170px] shadow-sm backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#264653] border-[#264653] text-white'
                      : 'bg-white/95 border-slate-200 text-[#2B2D42] group-hover:border-[#264653]/50'
                  }`}
                >
                  <div className={`text-[10px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1 ${isSelected ? 'text-[#E76F51]' : 'text-[#264653]'}`}>
                    <span>DS {mod.id}</span>
                    <span>•</span>
                    <span className={isSelected ? 'text-white/80' : 'text-[#2B2D42]/60'}>{mod.timeEstimate}</span>
                  </div>
                  <div className="text-xs font-semibold truncate mt-0.5">{mod.locationName}</div>
                </div>
              </button>
            </div>
          );
        });
      })()}
      </div>

      {/* Bottom Floating Legend Bar */}
      <div className="absolute bottom-4 left-20 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-4 text-xs pointer-events-auto">
          <span className="text-[#2B2D42]/70 font-semibold">Legende:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-[#2B2D42]">Abgeschlossen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F51] animate-ping" />
            <span className="text-[#2B2D42] font-semibold text-[#E76F51]">Freigeschaltet (Ping)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400" />
            <span className="text-[#2B2D42]/60">Gesperrt</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('passwordBook');
            }}
            className="bg-white/95 backdrop-blur-md border border-amber-300 hover:bg-amber-50 rounded-2xl px-3.5 py-2 text-xs font-bold text-amber-950 shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <KeyRound className="w-4 h-4 text-amber-600" />
            <span>Passwortbuch öffnen</span>
          </button>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 text-[11px] text-[#264653] font-medium shadow-sm hidden sm:flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-[#E76F51] shrink-0" />
            <span>Das aktuell spielbare Level pulsiert mit Ping-Effekt auf der Karte.</span>
          </div>
        </div>
      </div>

      {/* Level Unlock Modal */}
      {unlockModalModuleId && (
        <LevelUnlockModal
          moduleId={unlockModalModuleId}
          onClose={() => setUnlockModalModuleId(null)}
          onSuccess={(modId) => {
            setUnlockModalModuleId(null);
            openModule(modId);
          }}
        />
      )}
    </div>
  );
};
