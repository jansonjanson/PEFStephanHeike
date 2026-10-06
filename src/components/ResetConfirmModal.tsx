import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCcw,
  AlertTriangle,
  X,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ResetConfirmModal: React.FC = () => {
  const { activeModal, setActiveModal, resetAllProgress } = useApp();
  const [step, setStep] = useState<1 | 2>(1);

  if (activeModal !== ('resetConfirm' as any)) return null;

  const handleClose = () => {
    sounds.playClick();
    setStep(1);
    setActiveModal('none');
  };

  const handleFirstConfirm = () => {
    sounds.playClick();
    setStep(2);
  };

  const handleFinalReset = () => {
    sounds.playSuccess();
    resetAllProgress();
    setStep(1);
    setActiveModal('none');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-rose-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42] relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Training neu starten</h2>
              <p className="text-xs text-[#2B2D42]/70 font-medium">Fortschritt & Testdaten zurücksetzen</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 Content */}
        {step === 1 && (
          <div className="space-y-4 text-xs leading-relaxed text-[#2B2D42]">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Möchten Sie das gesamte Training und Ihren Lernfortschritt wirklich auf den Anfangszustand zurücksetzen?
              </span>
            </div>

            <p className="text-[#2B2D42]/80">
              Dies ermöglicht Ihnen, die App von der ersten Doppelstunde an vollständig neu zu durchlaufen und zu testen.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2B2D42] font-semibold text-xs transition-colors cursor-pointer"
              >
                Abbrechen
              </button>

              <button
                onClick={handleFirstConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Fortfahren</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2 Content: Double Confirmation */}
        {step === 2 && (
          <div className="space-y-4 text-xs leading-relaxed text-[#2B2D42]">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 flex items-start gap-2.5">
              <Trash2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block text-rose-900">Letzte Bestätigung erforderlich:</span>
                <span>
                  Alle Ihre erfassten Notizen, Formulareinträge in den 13 ABEDL, getroffenen Simulationsentscheidungen und freigeschalteten Module werden unwiderruflich gelöscht.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2B2D42] font-semibold text-xs transition-colors cursor-pointer"
              >
                Zurück
              </button>

              <button
                onClick={handleFinalReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Unwiderruflich zurücksetzen & neu starten</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
