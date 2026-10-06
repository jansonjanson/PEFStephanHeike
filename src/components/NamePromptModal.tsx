import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Sparkles, ArrowRight, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const NamePromptModal: React.FC = () => {
  const { activeModal, setActiveModal, studentName, setStudentName } = useApp();
  const [nameInput, setNameInput] = useState<string>(studentName);

  if (activeModal !== 'namePrompt') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (nameInput.trim().length > 0) {
      setStudentName(nameInput.trim());
    }
    setActiveModal('none');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200 relative text-[#2B2D42]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <UserCheck className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Willkommen zur Lerneinheit!</h2>
              <p className="text-xs text-[#2B2D42]/70">Personalisierung für Pflegedokumente & Zertifikate</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
          Bitte tragen Sie Ihren Namen ein. Dieser wird automatisch in Ihre exportierten Word-Pflegeanamnesen (<strong>.docx</strong>) und auf Ihr offizielles <strong>Ethik-Abschlusszertifikat</strong> übernommen.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#264653] block">
              Ihr Name (Auszubildende/r / Pflegefachkraft):
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="z.B. Alex Schmidt"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-[#F7F9FA] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setActiveModal('none');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2B2D42] text-xs font-semibold transition-colors cursor-pointer"
            >
              Später eingeben
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Speichern & Starten</span>
              <ArrowRight className="w-4 h-4 text-[#E76F51]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
