import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import {
  Lock,
  Unlock,
  KeyRound,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LevelUnlockModalProps {
  moduleId: number | null;
  onClose: () => void;
  onSuccess?: (moduleId: number) => void;
}

export const LevelUnlockModal: React.FC<LevelUnlockModalProps> = ({
  moduleId,
  onClose,
  onSuccess,
}) => {
  const {
    unlockModuleWithPassword,
    unlockAllWithAdminPassword,
    openModule,
    setActiveModal,
    earnedPasswords,
  } = useApp();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!moduleId) return null;

  const targetModule = MODULES_DATA.find((m) => m.id === moduleId);
  if (!targetModule) return null;

  const prevModule = MODULES_DATA.find((m) => m.id === moduleId - 1);
  const earnedEntry = earnedPasswords[moduleId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const clean = passwordInput.trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');
    if (!clean) {
      setError('Bitte geben Sie das Passwort ein.');
      return;
    }

    // Check if it matches admin password or target level password
    if (passwordInput.trim().toLowerCase() === 'janson') {
      unlockAllWithAdminPassword('janson');
      if (onSuccess) onSuccess(moduleId);
      openModule(moduleId);
      onClose();
      return;
    }

    const success = unlockModuleWithPassword(moduleId, clean);
    if (success) {
      if (onSuccess) onSuccess(moduleId);
      openModule(moduleId);
      onClose();
    } else {
      setError('Ungültiges Passwort für dieses Level. Bitte überprüfen Sie die Schreibweise oder spielen Sie das vorherige Level durch.');
    }
  };

  const handleUseEarnedPassword = () => {
    if (earnedEntry) {
      setPasswordInput(earnedEntry.password);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-[#264653] rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200 relative text-[#2B2D42]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E76F51]">
                Level gesperrt
              </span>
              <h2 className="text-sm sm:text-base font-bold text-[#264653]">
                DS {targetModule.id}: {targetModule.locationName}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs space-y-2">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-amber-600" />
            <span>Passwort erforderlich (1 Wort)</span>
          </div>
          <p className="text-amber-900 leading-relaxed [text-wrap:pretty]">
            {prevModule
              ? `Dieses Level wird durch das Beenden von Doppelstunde ${prevModule.id} freigespielt. Haben Sie das Passwort erhalten?`
              : 'Geben Sie das Freischalt-Passwort für dieses Level ein.'}
          </p>

          {earnedEntry && (
            <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Passwort im Buch verfügbar!
              </span>
              <button
                type="button"
                onClick={handleUseEarnedPassword}
                className="text-[11px] font-bold text-[#264653] underline hover:text-[#E76F51] cursor-pointer"
              >
                „{earnedEntry.password}“ einfügen
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#264653] block mb-1.5">
              Level-Passwort eingeben:
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="z. B. AUTONOMIE ..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl px-4 py-3 text-xs text-[#2B2D42] font-mono font-bold tracking-wider uppercase placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <Unlock className="w-4 h-4 text-[#E76F51]" />
              <span>Level jetzt freischalten &amp; betreten</span>
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Haben Sie das Passwort vergessen?</span>
          <button
            onClick={() => {
              onClose();
              setActiveModal('passwordBook');
            }}
            className="text-[#264653] hover:text-[#E76F51] font-bold flex items-center gap-1 underline cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Im Passwortbuch nachsehen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
