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
  RotateCcw,
  KeyRound,
  Unlock
} from 'lucide-react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { sounds } from '../utils/soundEffects';
import { LevelUnlockModal } from './LevelUnlockModal';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unlockModalModuleId, setUnlockModalModuleId] = useState<number | null>(null);
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
    earnedPasswords,
    openModule,
  } = useApp();

  const handleSelectModule = (id: number) => {
    const state = moduleStates[id];
    const isUnlocked = state?.unlockedWithPassword || id <= 2;
    if (!isUnlocked) {
      sounds.playError();
      setUnlockModalModuleId(id);
      return;
    }

    openModule(id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const openModal = (modalName: 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'admin' | 'resetConfirm' | 'passwordBook') => {
    sounds.playClick();
    setActiveModal(modalName);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const unlockedBadgesCount = badges.filter((b) => b.unlockedAt).length;
  const earnedPasswordsCount = Object.keys(earnedPasswords).length;

  return (
    <>
      {/* Mini Collapsed Sidebar (Left Rail) */}
      <aside
        id="tour-sidebar"
        className="fixed top-0 left-0 bottom-0 z-40 w-16 bg-[#264653] text-white flex flex-col items-center py-4 justify-between transition-all duration-300 shadow-xl border-r border-[#1E3640]"
      >
        <div className="flex flex-col items-center gap-3.5 w-full">
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
          <div className="flex flex-col items-center gap-2 w-full px-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveModuleId(null);
                setIsDrawerOpen(false);
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${
                activeModuleId === null
                  ? 'bg-white/25 text-white shadow-inner font-bold'
                  : 'hover:bg-white/15 text-white/80 hover:text-white'
              }`}
              title="Zur Roadmap / Übersicht"
            >
              <Home className="w-5 h-5" />
            </button>

            {/* Quick DS Indicators */}
            <div className="w-full py-1.5 px-1 flex flex-col gap-1 items-center border-y border-white/10 my-0.5">
              {MODULES_DATA.map((mod) => {
                const isSelected = activeModuleId === mod.id;
                const isCompleted = moduleStates[mod.id]?.completed;
                const isUnlocked = moduleStates[mod.id]?.unlockedWithPassword || mod.id === 1;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    className={`w-8 h-6 rounded-md font-mono text-[10px] font-bold flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#E76F51] text-white shadow-md scale-110 ring-2 ring-white/60'
                        : isCompleted
                        ? 'bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500/50'
                        : isUnlocked
                        ? 'bg-white/10 text-white/80 hover:bg-white/20'
                        : 'bg-black/20 text-white/30 hover:bg-black/30'
                    }`}
                    title={`Doppelstunde ${mod.id}: ${mod.title}`}
                  >
                    {isCompleted ? '✓' : mod.id}
                  </button>
                );
              })}
            </div>

            {/* Passwortbuch Button in Navigation Rail */}
            <button
              onClick={() => openModal('passwordBook')}
              className="w-10 h-10 rounded-xl bg-[#E76F51]/20 hover:bg-[#E76F51]/35 text-[#E76F51] hover:text-white border border-[#E76F51]/40 flex items-center justify-center transition-all relative group"
              title="Passwortbuch & Freigeschaltete Level-Schlüssel"
            >
              <KeyRound className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              {earnedPasswordsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-amber-400 text-slate-900 font-mono text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {earnedPasswordsCount}
                </span>
              )}
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
              title="Admin-Bereich für Dozierende"
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-84 bg-white border-r border-slate-200 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#264653] to-[#1E3640] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E76F51] flex items-center justify-center shadow-md">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold tracking-wide">CE08 – U2 Partnerschaftliche Entscheidungsfindung</h2>
              <p className="text-[11px] text-white/80 font-medium">Fall Stefan & Heike</p>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Progress Overview Bar */}
          <div className="bg-[#F7F9FA] rounded-2xl p-3.5 border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-[#2B2D42]/70 font-medium">Gesamtfortschritt</span>
              <span className="font-mono font-bold text-[#264653]">{overallProgressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#264653] to-[#2A9D8F] rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Module List (DS 1 - DS 7) - Clearly styled Selected vs Unselected */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#2B2D42]/60 tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>Doppelstunden (DS 1 - 7)</span>
              <span className="text-[10px] text-[#264653] font-bold">7 Einheiten</span>
            </h3>
            <div className="space-y-2">
              {MODULES_DATA.map((mod) => {
                const state = moduleStates[mod.id];
                const isSelected = activeModuleId === mod.id;
                const isCompleted = state?.completed;
                const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    className={`w-full text-left p-3 rounded-2xl text-xs flex items-center justify-between transition-all group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white shadow-lg border border-[#264653] ring-2 ring-[#E76F51]/50 scale-[1.02]'
                        : isCompleted
                        ? 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 hover:border-emerald-300'
                        : isUnlocked
                        ? 'bg-slate-50 hover:bg-slate-100 text-[#2B2D42] border border-slate-200 hover:border-slate-300'
                        : 'bg-slate-100/60 hover:bg-slate-100 text-slate-400 border border-slate-200/80 border-dashed'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-transform ${
                          isSelected
                            ? 'bg-[#E76F51] text-white shadow-sm scale-105'
                            : isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isUnlocked
                            ? 'bg-[#264653] text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted ? '✓' : mod.id}
                      </span>
                      <div className="truncate">
                        <div className={`truncate font-bold ${isSelected ? 'text-white' : ''}`}>
                          {mod.title.split(':')[0]}
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-white/80' : isCompleted ? 'text-emerald-700' : 'text-[#2B2D42]/60'
                          }`}
                        >
                          {mod.locationName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                          Aktiv
                        </span>
                      ) : !isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : null}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Menu Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#2B2D42]/60 tracking-wider mb-2 px-2">
              Lernwerkzeuge &amp; Begleiter
            </h3>
            <div className="space-y-1.5">
              {/* Passwortbuch Button in Drawer */}
              <button
                onClick={() => openModal('passwordBook')}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-xs bg-amber-50/90 hover:bg-amber-100 text-amber-950 font-bold border border-amber-200 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E76F51] text-white flex items-center justify-center shadow-xs">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <span>Passwortbuch &amp; Level-Schlüssel</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px]">
                  {earnedPasswordsCount}/7
                </span>
              </button>

              <button
                onClick={() => openModal('timetable')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-[#264653]" />
                <span>Unterrichtsverlauf &amp; Matrix</span>
              </button>

              <button
                onClick={() => openModal('media')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors"
              >
                <Film className="w-4 h-4 text-[#264653]" />
                <span>Mediathek &amp; Fachtexte</span>
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
                <span>Admin &amp; Master-Freischaltung</span>
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

      {/* Level Unlock Modal */}
      {unlockModalModuleId && (
        <LevelUnlockModal
          moduleId={unlockModalModuleId}
          onClose={() => setUnlockModalModuleId(null)}
          onSuccess={(modId) => {
            setUnlockModalModuleId(null);
            openModule(modId);
            if (window.innerWidth < 768) {
              setIsOpen(false);
            }
          }}
        />
      )}
    </>
  );
};
