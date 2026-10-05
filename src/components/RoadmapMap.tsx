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
  Play,
  Sparkles,
  Image as ImageIcon,
  HelpCircle,
  FileSpreadsheet,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { sounds } from '../utils/soundEffects';

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
    setActiveModuleId,
    setIsDrawerOpen,
    setActiveDrawerTab,
    moduleStates,
    customBgUrl,
    setCustomBgUrl,
    totalPefScore,
    totalPaternalisticScore,
    totalInformedScore,
    overallProgressPercent,
    setIsOnboardingActive,
    setActiveModal,
  } = useApp();

  const [showBgInput, setShowBgInput] = useState<boolean>(false);
  const [bgInputText, setBgInputText] = useState<string>(customBgUrl);

  const handleNodeClick = (moduleId: number) => {
    sounds.playClick();
    setActiveModuleId(moduleId);
    setActiveDrawerTab('akte');
    setIsDrawerOpen(true);
  };

  const handleSaveBg = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomBgUrl(bgInputText.trim());
    setShowBgInput(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 select-none">
      {/* Background Layer: Custom Image OR Rich Built-in SVG Aesthetic Map */}
      <div className="absolute inset-0 transition-all duration-700">
        {customBgUrl ? (
          <div
            className="w-full h-full bg-cover bg-center transition-all filter brightness-75 contrast-110"
            style={{ backgroundImage: `url(${customBgUrl})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Ambient Lighting & Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Grid Lines */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #14b8a6 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Stylized Landscape SVG Contours */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background contour terrain */}
              <path
                d="M-100,600 Q200,450 500,580 T1200,480 T1920,620 L1920,1080 L-100,1080 Z"
                fill="#0f172a"
                opacity="0.6"
              />
              <path
                d="M-100,750 Q350,620 800,700 T1600,650 T2100,750 L2100,1080 L-100,1080 Z"
                fill="#0b1120"
                opacity="0.9"
              />
            </svg>
          </div>
        )}
      </div>

      {/* SVG Path: The Glowing Thread connecting Nodes 1 -> 7 */}
      <svg
        id="tour-roadmap"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Glow Outline */}
        <path
          d="M 14 72 Q 20 60 26 50 T 42 32 T 58 55 T 74 40 T 86 65 T 92 30"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          opacity="0.4"
          className="animate-pulse"
        />

        {/* Primary Glowing Thread */}
        <path
          d="M 14 72 Q 20 60 26 50 T 42 32 T 58 55 T 74 40 T 86 65 T 92 30"
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Header Floating Glassbar */}
      <header className="absolute top-4 left-20 right-4 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl px-4 py-2.5 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
            P
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span>Partnerschaftliche Entscheidungsfindung</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-normal">
                Fall Stephan & Heike
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Blended Learning • 7 Doppelstunden Lern-Roadmap</p>
          </div>
        </div>

        {/* Action Widgets & Stats */}
        <div className="flex items-center gap-2">
          {/* Decision Balance Badge */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl px-4 py-2 shadow-lg text-xs">
            <div className="flex items-center gap-1.5" title="Partizipative Entscheidungen">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span className="text-slate-400">PEF-Score:</span>
              <span className="font-mono font-bold text-teal-300">{totalPefScore}</span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-1.5" title="Paternalistische Haltungen">
              <span className="text-slate-400">Paternal.:</span>
              <span className="font-mono font-bold text-rose-400">{totalPaternalisticScore}</span>
            </div>
          </div>

          {/* Background Toggle Button */}
          <button
            onClick={() => setShowBgInput(!showBgInput)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs backdrop-blur-md shadow-lg transition-all"
            title="Eigenes Hintergrundbild einfügen oder anpassen"
          >
            <ImageIcon className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Hintergrundbild</span>
          </button>

          {/* Quick Help */}
          <button
            onClick={() => setIsOnboardingActive(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs backdrop-blur-md shadow-lg transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Tour starten</span>
          </button>
        </div>
      </header>

      {/* Custom Background Input Modal Dropdown */}
      {showBgInput && (
        <div className="absolute top-20 right-4 z-40 w-96 bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Hintergrundbild anpassen</span>
            <button
              onClick={() => setShowBgInput(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </h3>
          <p className="text-[11px] text-slate-400 mb-3">
            Füge hier den Link zu deinem individuellen Roadmap-Hintergrundbild ein (z. B. Rennstrecke, Klinik-Campus).
          </p>
          <form onSubmit={handleSaveBg} className="space-y-3">
            <input
              type="url"
              placeholder="https://images.unsplash.com/... oder Bild-URL"
              value={bgInputText}
              onChange={(e) => setBgInputText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setBgInputText('');
                  setCustomBgUrl('');
                  setShowBgInput(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Zurücksetzen
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md shadow-teal-600/30"
              >
                Speichern
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactive Map Nodes (DS 1 - DS 7) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {MODULES_DATA.map((mod, index) => {
          const state = moduleStates[mod.id];
          const isSelected = activeModuleId === mod.id;
          const isCompleted = state?.completed;
          const isUnlocked = state?.unlockedWithPassword || mod.id === 1;
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
              {/* Pulse ripple for active/current node */}
              {(isSelected || (!isCompleted && isUnlocked)) && (
                <div className="absolute -inset-3 rounded-full bg-teal-500/20 animate-ping pointer-events-none" />
              )}

              {/* Node Button Card */}
              <button
                id={mod.id === 1 ? 'tour-first-node' : undefined}
                onClick={() => handleNodeClick(mod.id)}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${
                  isSelected ? 'scale-115 z-30' : 'hover:scale-105'
                }`}
              >
                {/* Visual Pin / Halo */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-teal-400 to-emerald-600 text-white ring-4 ring-teal-400/50 shadow-teal-500/40'
                      : isCompleted
                      ? 'bg-slate-900 border-2 border-emerald-500/80 text-emerald-400 shadow-emerald-900/40'
                      : isUnlocked
                      ? 'bg-slate-900 border-2 border-teal-500/60 text-teal-300 hover:border-teal-400 shadow-teal-950/80'
                      : 'bg-slate-950/90 border border-slate-800 text-slate-500'
                  }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />

                  {/* Status Indicator Icon Badge */}
                  <div className="absolute -top-2 -right-2">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-mono text-[10px] font-bold flex items-center justify-center shadow-md">
                        {mod.id}
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shadow-md border border-slate-700">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Node Label Tooltip Badge Below */}
                <div
                  className={`mt-2 px-3 py-1.5 rounded-xl text-center backdrop-blur-md border transition-all duration-200 pointer-events-none max-w-[170px] ${
                    isSelected
                      ? 'bg-teal-950/90 border-teal-500/60 text-teal-200 shadow-lg'
                      : 'bg-slate-900/85 border-slate-800 text-slate-300 group-hover:bg-slate-800 group-hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-teal-400 flex items-center justify-center gap-1">
                    <span>DS {mod.id}</span>
                    <span>•</span>
                    <span className="text-slate-400">{mod.timeEstimate}</span>
                  </div>
                  <div className="text-xs font-semibold text-white truncate">{mod.locationName}</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Legend / Quick Bar */}
      <div className="absolute bottom-4 left-20 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800/80 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-4 text-xs pointer-events-auto">
          <span className="text-slate-400 font-medium">Legende:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Abgeschlossen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-300">Bereit / In Arbeit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="text-slate-400">Passwortgesichert</span>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('welcome')}
          className="bg-slate-900/85 hover:bg-slate-800/95 text-slate-300 hover:text-white border border-slate-800 rounded-2xl px-4 py-2.5 text-xs backdrop-blur-md shadow-xl transition-all flex items-center gap-2 pointer-events-auto"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Fall-Einleitung lesen</span>
        </button>
      </div>
    </div>
  );
};
