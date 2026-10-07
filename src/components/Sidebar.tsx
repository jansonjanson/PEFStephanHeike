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
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import { sounds } from '../utils/soundEffects';
import { LevelUnlockModal } from './LevelUnlockModal';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockModalModuleId, setUnlockModalModuleId] = useState<number | null>(null);

  const {
    activeModuleId,
    setActiveModuleId,
    setIsDrawerOpen,
    setActiveModal,
    isAdminMode,
    badges,
    soundEnabled,
    setSoundEnabled,
    moduleStates,
    openModule,
    overallProgressPercent,
    setIsOnboardingActive,
    earnedPasswords,
  } = useApp();

  const unlockedBadgesCount = badges.filter((b) => b.unlockedAt).length;
  const earnedPasswordsCount = Object.keys(earnedPasswords).length;

  const handleSelectModule = (id: number) => {
    sounds.playClick();
    const state = moduleStates[id];
    const isUnlocked = state?.unlockedWithPassword || id === 1;

    if (!isUnlocked) {
      sounds.playError();
      setUnlockModalModuleId(id);
      return;
    }

    openModule(id);
    setIsOpen(false);
  };

  const openModal = (
    modalName:
      | 'timetable'
      | 'media'
      | 'badges'
      | 'teacherGuide'
      | 'admin'
      | 'resetConfirm'
      | 'passwordBook'
  ) => {
    sounds.playClick();
    setActiveModal(modalName);
    setIsOpen(false);
  };

  return (
    <>
      {/* Collapsed Left Sticky Nav Bar */}
      <aside className="fixed top-0 left-0 bottom-0 z-40 w-16 bg-[#264653] text-white flex flex-col items-center justify-between py-4 shadow-xl border-r border-[#264653]/80 select-none">
        {/* Top: App Logo & Menu Toggle */}
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={() => {
              sounds.playClick();
              setIsOpen(!isOpen);
            }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all group cursor-pointer"
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
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group cursor-pointer ${
                activeModuleId === null
                  ? 'bg-white/20 text-white shadow-xs'
                  : 'hover:bg-white/15 text-white/80 hover:text-white'
              }`}
              title="Zur Roadmap / Übersicht"
            >
              <Home className="w-5 h-5" />
            </button>

            {/* Quick DS 1 - 7 Indicator Strip */}
            <div className="flex flex-col items-center gap-1.5 py-1.5 border-y border-white/10 w-full">
              {MODULES_DATA.map((mod) => {
                const isSelected = activeModuleId === mod.id;
                const state = moduleStates[mod.id];
                const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    title={`Doppelstunde ${mod.id}: ${mod.title} (${
                      isSelected
                        ? 'Ausgewählt'
                        : state?.completed
                        ? 'Abgeschlossen'
                        : isUnlocked
                        ? 'Freigeschaltet'
                        : 'Gesperrt - Klick zum Entsperren'
                    })`}
                    className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E76F51] text-white ring-2 ring-white shadow-md scale-110'
                        : state?.completed
                        ? 'bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/40'
                        : isUnlocked
                        ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                        : 'bg-black/25 hover:bg-black/40 text-white/40 border border-white/5'
                    }`}
                  >
                    {state?.completed ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : !isUnlocked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      mod.id
                    )}
                  </button>
                );
              })}
            </div>

            {/* Passwortbuch Button in Navigation Bar */}
            <button
              onClick={() => openModal('passwordBook')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative cursor-pointer group"
              title="Passwortbuch & Level-Schlüssel"
            >
              <KeyRound className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              {earnedPasswordsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {earnedPasswordsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => openModal('timetable')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative cursor-pointer"
              title="Stundenplan & 7 Doppelstunden"
            >
              <CalendarDays className="w-5 h-5" />
            </button>

            <button
              onClick={() => openModal('media')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative cursor-pointer"
              title="Mediathek (Farblich sortiert: Videos & CNE Fachartikel)"
            >
              <Film className="w-5 h-5 text-cyan-300" />
            </button>

            <button
              onClick={() => openModal('badges')}
              className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all relative cursor-pointer"
              title="Erfolge & Auszeichnungen"
            >
              <Award className="w-5 h-5" />
              {unlockedBadgesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E76F51] text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unlockedBadgesCount}
                </span>
              )}
            </button>

            {isAdminMode && (
              <button
                onClick={() => openModal('teacherGuide')}
                className="w-10 h-10 rounded-xl hover:bg-white/15 text-emerald-300 flex items-center justify-center transition-all relative cursor-pointer"
                title="Dozenten-Leitfaden & Didaktik (Admin freigeschaltet)"
              >
                <GraduationCap className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => openModal('admin')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative cursor-pointer ${
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
            className="w-10 h-10 rounded-xl hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 flex items-center justify-center transition-all cursor-pointer"
            title="Training neu starten (Fortschritt zurücksetzen)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.playClick();
            }}
            className="w-10 h-10 rounded-xl hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
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
            className="w-10 h-10 rounded-xl bg-[#E76F51] hover:bg-[#D45D40] text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-84 bg-white border-r border-slate-200 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#264653] to-[#1E3640] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E76F51] flex items-center justify-center shadow-md">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">PFLEGE-LERNAPP</h2>
              <p className="text-[11px] text-white/80 font-medium">Fall Stefan &amp; Heike</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
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

          {/* Module List (DS 1 - DS 7) with Selected vs Unselected Color Mode */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#2B2D42]/60 tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>Doppelstunden (DS 1 - 7)</span>
              <span className="text-[10px] text-[#264653] font-bold">7 Einheiten</span>
            </h3>
            <div className="space-y-2">
              {MODULES_DATA.map((mod) => {
                const state = moduleStates[mod.id];
                const isSelected = activeModuleId === mod.id;
                const isUnlocked = state?.unlockedWithPassword || mod.id === 1;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#264653] to-[#2A9D8F] text-white font-bold border-2 border-emerald-400 shadow-md ring-2 ring-[#264653]/25'
                        : isUnlocked
                        ? 'bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                        : 'bg-slate-100/70 text-slate-500 border border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                          isSelected
                            ? 'bg-[#E76F51] text-white shadow-xs'
                            : state?.completed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isUnlocked
                            ? 'bg-[#264653] text-white'
                            : 'bg-slate-200 text-slate-400 border border-slate-300'
                        }`}
                      >
                        {state?.completed ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : !isUnlocked ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          mod.id
                        )}
                      </span>
                      <div className="truncate">
                        <div className={`truncate ${isSelected ? 'text-white font-bold' : 'font-semibold text-slate-900'}`}>
                          {mod.title.split(':')[0]}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                          {mod.locationName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold border border-white/30">
                          Aktiv
                        </span>
                      ) : state?.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : !isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      ) : null}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'text-white translate-x-0.5'
                            : 'text-slate-400 group-hover:text-slate-600'
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
              Lernwerkzeuge &amp; Passwörter
            </h3>
            <div className="space-y-1">
              {/* Passwortbuch Tool Link */}
              <button
                onClick={() => openModal('passwordBook')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-amber-950 bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-200 cursor-pointer font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Passwortbuch &amp; Schlüssel</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  {earnedPasswordsCount}/7
                </span>
              </button>

              <button
                onClick={() => openModal('timetable')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 text-[#264653]" />
                <span>Unterrichtsverlauf &amp; Matrix</span>
              </button>

              <button
                onClick={() => openModal('media')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Film className="w-4 h-4 text-cyan-600" />
                <span>Mediathek &amp; Fachtexte</span>
              </button>

              <button
                onClick={() => openModal('badges')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#E76F51]" />
                <span>Erfolge ({unlockedBadgesCount}/{badges.length})</span>
              </button>

              {isAdminMode && (
                <button
                  onClick={() => openModal('teacherGuide')}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium border border-emerald-200 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Dozenten-Regieplan (Admin)</span>
                </button>
              )}

              <button
                onClick={() => openModal('admin')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-[#2B2D42] hover:bg-slate-100 transition-colors font-medium cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#E76F51]" />
                <span>Admin &amp; Master-Freischaltung</span>
              </button>

              <button
                onClick={() => openModal('resetConfirm')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-rose-700 hover:bg-rose-50 transition-colors font-medium border border-rose-100 cursor-pointer"
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
      {unlockModalModuleId !== null && (
        <LevelUnlockModal
          moduleId={unlockModalModuleId}
          onClose={() => setUnlockModalModuleId(null)}
        />
      )}
    </>
  );
};
