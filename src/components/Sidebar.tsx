import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  CalendarDays,
  Film,
  Award,
  BookOpenCheck,
  HelpCircle,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { sounds } from '../utils/soundEffects';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    activeModuleId,
    setActiveModuleId,
    setIsDrawerOpen,
    setActiveModal,
    setIsOnboardingActive,
    soundEnabled,
    setSoundEnabled,
    overallProgressPercent,
    moduleStates,
    badges,
  } = useApp();

  const handleSelectModule = (id: number) => {
    sounds.playClick();
    setActiveModuleId(id);
    setIsDrawerOpen(true);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const openModal = (modalName: 'timetable' | 'media' | 'badges' | 'teacherGuide') => {
    sounds.playClick();
    setActiveModal(modalName);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const unlockedBadgesCount = badges.filter((b) => b.unlockedAt).length;

  return (
    <>
      {/* Mini Collapsed Sidebar (Left Rail) */}
      <aside
        id="tour-sidebar"
        className="fixed top-0 left-0 bottom-0 z-40 w-16 bg-slate-900/95 border-r border-slate-800 backdrop-blur-md flex flex-col items-center py-4 justify-between transition-all duration-300 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Logo / Hamburger */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsOpen(!isOpen);
            }}
            className="w-10 h-10 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center transition-all group"
            title="Hauptmenü öffnen"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Quick Nav Icons */}
          <div className="flex flex-col items-center gap-3 w-full px-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveModuleId(null);
                setIsDrawerOpen(false);
              }}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all group relative"
              title="Zur Roadmap / Übersicht"
            >
              <Home className="w-5 h-5" />
              <span className="sr-only">Home Roadmap</span>
            </button>

            <button
              onClick={() => openModal('timetable')}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all relative"
              title="Stundenplan & 7 Doppelstunden"
            >
              <CalendarDays className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('media')}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all relative"
              title="Mediathek (Videos & CNE Fachartikel)"
            >
              <Film className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('badges')}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-300 flex items-center justify-center transition-all relative"
              title="Erfolge & Badges"
            >
              <Award className="w-5 h-5" />
              {unlockedBadgesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unlockedBadgesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => openModal('teacherGuide')}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-300 flex items-center justify-center transition-all relative"
              title="Dozenten-Leitfaden & Didaktik"
            >
              <GraduationCap className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.playClick();
            }}
            className="w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all"
            title={soundEnabled ? 'Ton stummschalten' : 'Ton aktivieren'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>

          <button
            id="tour-help-btn"
            onClick={() => {
              sounds.playClick();
              setIsOnboardingActive(true);
            }}
            className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 flex items-center justify-center transition-all"
            title="Interaktive Einführung (Tutorial) starten"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Expanded Off-Canvas Sidebar Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">PFLEGE-LERNAPP</h2>
              <p className="text-[11px] text-teal-400 font-medium">Fall Stephan & Heike</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Progress Overview Bar */}
          <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400">Gesamtfortschritt</span>
              <span className="font-mono font-bold text-teal-400">{overallProgressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Module List (DS 1 - DS 7) */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>Doppelstunden (DS 1 - 7)</span>
              <span className="text-[10px] text-teal-400">7 Module</span>
            </h3>
            <div className="space-y-1">
              {MODULES_DATA.map((mod) => {
                const state = moduleStates[mod.id];
                const isActive = activeModuleId === mod.id;
                const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                          state?.completed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isUnlocked
                            ? 'bg-teal-500/20 text-teal-400'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {mod.id}
                      </span>
                      <div className="truncate">
                        <div className="truncate font-medium">{mod.title.split(':')[0]}</div>
                        <div className="text-[10px] text-slate-400 truncate">{mod.locationName}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-teal-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Menu Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2 px-2">
              Lernwerkzeuge
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => openModal('timetable')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-teal-400" />
                <span>Unterrichtsverlauf & Matrix</span>
              </button>
              <button
                onClick={() => openModal('media')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Film className="w-4 h-4 text-cyan-400" />
                <span>Mediathek & Fachtexte</span>
              </button>
              <button
                onClick={() => openModal('badges')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Erfolge ({unlockedBadgesCount}/{badges.length})</span>
              </button>
              <button
                onClick={() => openModal('teacherGuide')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Dozenten-Regieplan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Generalistische Pflegeausbildung</span>
          <span className="font-mono text-teal-500">v2.4</span>
        </div>
      </div>
    </>
  );
};
