import React, { useState } from 'react';
import { useApp, LEVEL_PASSWORDS } from '../context/AppContext';
import { MODULES_DATA } from '../data/curriculumData';
import {
  KeyRound,
  X,
  CheckCircle2,
  Lock,
  Unlock,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const PasswordBookModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    earnedPasswords,
    moduleStates,
    openModule,
    unlockModuleWithPassword,
    showSuccessBanner,
  } = useApp();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<string>('');
  const [manualError, setManualError] = useState<string | null>(null);

  if (activeModal !== 'passwordBook') return null;

  const handleCopy = (password: string, modId: number) => {
    sounds.playSelectOption();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(password);
    }
    setCopiedKey(password);
    showSuccessBanner(`Passwort „${password}“ in die Zwischenablage kopiert!`);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === password ? null : curr));
    }, 2500);
  };

  const handleQuickUnlock = (modId: number, pwd: string) => {
    sounds.playClick();
    unlockModuleWithPassword(modId, pwd);
    openModule(modId);
    setActiveModal('none');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    const clean = manualInput.trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');
    if (!clean) return;

    // Find which module matches this password
    let matchedModId: number | null = null;
    MODULES_DATA.forEach((mod) => {
      const exp = (mod.requiredPassword || '').trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');
      if (clean === exp) {
        matchedModId = mod.id;
      }
    });

    if (matchedModId) {
      const success = unlockModuleWithPassword(matchedModId, clean);
      if (success) {
        setManualInput('');
        openModule(matchedModId);
        setActiveModal('none');
      }
    } else {
      sounds.playError();
      setManualError('Dieses Passwort ist ungültig oder passt zu keinem gesperrten Level.');
    }
  };

  const earnedCount = Object.keys(earnedPasswords).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#264653] to-[#1E3640] text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E76F51] text-white flex items-center justify-center shadow-md">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-wide">Passwortbuch &amp; Level-Schlüssel</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono text-[11px] font-bold">
                  {earnedCount} / 7 freigespielt
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Alle verdienten Level-Passwörter aus den abgeschlossenen Simulationen auf einen Blick
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F7F9FA]">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="leading-relaxed">
              Jedes Level schaltet nach erfolgreicher Bearbeitung der Simulation ein <strong>einteiliges Passwort</strong> frei. Sie können das Passwort hier kopieren und bei gesperrten Leveln eingeben.
            </p>
          </div>

          <div className="space-y-3">
            {MODULES_DATA.map((mod) => {
              const earnedEntry = earnedPasswords[mod.id];
              const isLevelUnlocked = moduleStates[mod.id]?.unlockedWithPassword || mod.id === 1;
              const pwdDef = LEVEL_PASSWORDS[mod.id];

              return (
                <div
                  key={mod.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    earnedEntry
                      ? 'bg-white border-emerald-300 shadow-sm'
                      : isLevelUnlocked
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-100/70 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-xs ${
                          earnedEntry
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                            : isLevelUnlocked
                            ? 'bg-[#264653] text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {earnedEntry ? (
                          <Unlock className="w-5 h-5" />
                        ) : isLevelUnlocked ? (
                          <span>DS {mod.id}</span>
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#264653]">
                            Doppelstunde {mod.id}: {mod.title}
                          </span>
                          {earnedEntry ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Im Passwortbuch
                            </span>
                          ) : isLevelUnlocked ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                              Freigeschaltet
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                              Gesperrt
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 truncate">
                          {earnedEntry ? earnedEntry.description : pwdDef?.description || `Wird in Doppelstunde ${mod.id - 1} freigespielt.`}
                        </p>
                      </div>
                    </div>

                    {/* Password & Action Area */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {earnedEntry ? (
                        <>
                          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs font-extrabold text-amber-300 tracking-wider flex items-center gap-1.5 shadow-inner">
                            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                            <span>{earnedEntry.password}</span>
                          </div>

                          <button
                            onClick={() => handleCopy(earnedEntry.password, mod.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-[#2B2D42] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                            title="Passwort kopieren"
                          >
                            {copiedKey === earnedEntry.password ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Kopiert!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Kopieren</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleQuickUnlock(mod.id, earnedEntry.password)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <span>Öffnen</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#E76F51]" />
                          </button>
                        </>
                      ) : isLevelUnlocked ? (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            openModule(mod.id);
                            setActiveModal('none');
                          }}
                          className="px-4 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <span>Öffnen</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E76F51]" />
                        </button>
                      ) : (
                        <div className="text-[11px] text-slate-400 font-medium italic flex items-center gap-1.5 px-3 py-1 bg-slate-200/60 rounded-xl">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Schließe DS {mod.id - 1} ab</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manual Password Test/Redeem Box */}
          <form
            onSubmit={handleManualSubmit}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 mt-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#264653] flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#E76F51]" />
                Passwort manuell eingeben &amp; Level entsperren:
              </span>
              <span className="text-[11px] text-slate-400">Ein einzelnes Wort (z. B. AUTONOMIE)</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Passwort eingeben..."
                value={manualInput}
                onChange={(e) => {
                  setManualInput(e.target.value);
                  setManualError(null);
                }}
                className="flex-1 bg-[#F7F9FA] border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold uppercase text-[#264653] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Einlösen</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>

            {manualError && (
              <p className="text-xs text-rose-600 font-semibold">{manualError}</p>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F7F9FA] flex items-center justify-between text-xs text-[#2B2D42]/70">
          <span>Passwörter bleiben auch nach dem Neuladen der App gespeichert.</span>
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[#2B2D42] font-bold text-xs transition-colors cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
