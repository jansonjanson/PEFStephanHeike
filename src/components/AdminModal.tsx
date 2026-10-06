import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  KeyRound,
  X,
  Unlock,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const AdminModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    isAdminMode,
    unlockAllWithAdminPassword,
    resetAllProgress,
  } = useApp();

  const [inputPassword, setInputPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (activeModal !== 'admin') return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const success = unlockAllWithAdminPassword(inputPassword);
    if (success) {
      setSuccessMessage('Alle 7 Doppelstunden, Musterlösungen und Badges wurden erfolgreich freigeschaltet!');
      setInputPassword('');
    } else {
      setErrorMessage('Ungültiges Admin-Passwort. (Tipp: Das Passwort lautet "Janson")');
    }
  };

  const handleReset = () => {
    setActiveModal('resetConfirm');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200 relative text-[#2B2D42]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Admin-Bereich & Master-Unlock</h2>
              <p className="text-xs text-[#2B2D42]/70">Dozenten-Zugang zur Vollfreischaltung aller Inhalte</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isAdminMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[#2B2D42]/70 font-semibold">Status:</span>
            <span className={`font-bold ${isAdminMode ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isAdminMode ? 'Alle Inhalte freigeschaltet (Admin-Modus aktiv)' : 'Regulärer Lernmodus'}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#264653] flex items-center gap-2 mb-1.5">
              <KeyRound className="w-4 h-4 text-[#E76F51]" />
              <span>Admin-Passwort zur Freischaltung:</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Passwort eingeben (z. B. Janson)..."
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white font-mono tracking-wide"
              />
            </div>
            <p className="text-[11px] text-[#2B2D42]/70 mt-1">
              Mit dem Passwort <strong className="text-[#264653] font-mono">Janson</strong> werden sofort alle 7 Doppelstunden, Musterlösungen und Erfolge freigeschaltet.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Alle Inhalte freischalten</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2B2D42] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Alle Fortschritte zurücksetzen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 text-[11px] text-[#2B2D42]/60 flex items-center justify-between">
          <span>Dozenten-Administration • Blended Learning</span>
          <button
            onClick={() => setActiveModal('none')}
            className="text-[#264653] hover:underline font-bold"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
