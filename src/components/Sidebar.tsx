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
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RotateCcw
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
    isAdminMode,
    openModule,
  } = useApp();

  const handleSelectModule = (id: number) => {
    openModule(id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const openModal = (modalName: 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'admin' | 'resetConfirm') => {
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
        className="fixed top-0 left-0 bottom-0 z-40 w-16 bg-[#264653] text-white flex flex-col items-center py-4 justify-between transition-all duration-300 shadow-xl border-r border-[#1E3640]"
      >
        <div className="flex flex-col items-center gap-5 w-full">
          {/* Logo / Hamburger */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsOpen(!isOpen);
            }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all group"
            title="Hauptmenü öffnen"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Quick Nav Icons */}
          <div className="flex flex-col items-center gap-2.5 w-full px-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveModuleId(null);
                setIsDrawerOpen(false);
              }}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all group"
              title="Zur Roadmap / Übersicht"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('timetable')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative"
              title="Stundenplan & 7 Doppelstunden"
            >
              <CalendarDays className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('media')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative"
              title="Mediathek (Videos & CNE Fachartikel)"
            >
              <Film className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('badges')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative"
              title="Erfolge & Auszeichnungen"
            >
              <Award className="w-5 h-5" />
              {unlockedBadgesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E76F51] text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unlockedBadgesCount}
                </span>
              )}
            </button>

            {isAdminMode && (
              <button
                onClick={() => openModal('teacherGuide')}
                className="w-10 h-10 rounded-xl hover:bg-white/15 text-emerald-300 flex items-center justify-center transition-all relative"
                title="Dozenten-Leitfaden & Didaktik (Admin freigeschaltet)"
              >
                <GraduationCap className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => openModal('admin')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
                isAdminMode
                  ? 'bg-[#E76F51] text-white shadow-md'
                  : 'hover:bg-white/15 text-white/80 hover:text-white'
              }`}
              title="Admin-Bereich (Master-Passwort 'Janson')"
            >
              <ShieldCheck className="w-5 h-5" />
              {isAdminMode && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          <button
            onClick={() => openModal('resetConfirm')}
            className="w-10 h-10 rounded-xl hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 flex items-center justify-center transition-all"
            title="Training neu starten (Fortschritt zurücksetzen)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.playClick();
            }}
            className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all"
            title={soundEnabled ? 'Ton stummschalten' : 'Ton aktivieren'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-300" /> : <VolumeX className="w-5 h-5 text-white/40" />}
          </button>

          <button
            id="tour-help-btn"
            onClick={() => {
              sounds.playClick();
              setIsOnboardingActive(true);
            }}
            className="w-10 h-10 rounded-xl bg-[#E76F51] hover:bg-[#D45D40] text-white flex items-center justify-center transition-all shadow-md"
            title="Interaktive Einführung (Tutorial) starten"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Expanded Off-Canvas Sidebar Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B2D42]/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-white border-r border-slate-200 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-[#264653] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E76F51] flex items-center justify-center shadow-md">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">PFLEGE-LERNAPP</h2>
              <p className="text-[11px] text-white/80 font-medium">Fall Stephan & Heike</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Progress Overview Bar */}
          <div className="bg-[#F7F9FA] rounded-xl p-3.5 border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-[#2B2D42]/70 font-medium">Gesamtfortschritt</span>
              <span className="font-mono font-bold text-[#264653]">{overallProgressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#264653] to-[#2A9D8F] rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Module List (DS 1 - DS 7) */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#2B2D42]/60 tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>Doppelstunden (DS 1 - 7)</span>
              <span className="text-[10px] text-[#264653] font-bold">7 Einheiten</span>
            </h3>
            <div className="space-y-1.5">
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
                        ? 'bg-[#264653]/10 text-[#264653] border border-[#264653]/30 font-bold'
                        : 'text-[#2B2D42] hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                          state?.completed
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : isUnlocked
                            ? 'bg-[#264653] text-white'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {mod.id}
                      </span>
                      <div className="truncate">
                        <div className="truncate font-medium">{mod.title.split(':')[0]}</div>
                        <div className="text-[10px] text-[#2B2D42]/60 truncate">{mod.locationName}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-[#264653] translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Menu Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#2B2D42]/60 tracking-wider mb-2 px-2">
              Lernwerkzeuge
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => openModal('timetable')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-[#264653]" />
                <span>Unterrichtsverlauf & Matrix</span>
              </button>
              <button
                onClick={() => openModal('media')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors"
              >
                <Film className="w-4 h-4 text-[#264653]" />
                <span>Mediathek & Fachtexte</span>
              </button>
              <button
                onClick={() => openModal('badges')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors"
              >
                <Award className="w-4 h-4 text-[#E76F51]" />
                <span>Erfolge ({unlockedBadgesCount}/{badges.length})</span>
              </button>
              {isAdminMode && (
                <button
                  onClick={() => openModal('teacherGuide')}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium border border-emerald-200"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Dozenten-Regieplan (Admin)</span>
                </button>
              )}
              <button
                onClick={() => openModal('admin')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-[#E76F51]" />
                <span>Admin & Master-Freischaltung</span>
              </button>

              <button
                onClick={() => openModal('resetConfirm')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-rose-700 hover:bg-rose-50 transition-colors font-medium border border-rose-100"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Training neu starten (Reset)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F7F9FA] text-[11px] text-[#2B2D42]/70 flex items-center justify-between">
          <span>Generalistische Pflegeausbildung</span>
          <span className="font-mono font-bold text-[#264653]">v2.5</span>
        </div>
      </div>
    </>
  );
};
