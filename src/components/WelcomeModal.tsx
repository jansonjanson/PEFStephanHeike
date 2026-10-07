import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHARACTER_AVATARS } from '../data/avatarsData';
import { ArrowRight, HeartHandshake, Volume2, VolumeX, Users, Film, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const WelcomeModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    soundEnabled,
    setSoundEnabled,
  } = useApp();

  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  if (activeModal !== 'welcome') return null;

  const handleClose = () => {
    sounds.playClick();
    setActiveModal('none');
  };

  const charactersList = [
    CHARACTER_AVATARS.heike,
    CHARACTER_AVATARS.stephan,
    CHARACTER_AVATARS.sohn1,
    CHARACTER_AVATARS.sohn2_leon,
    CHARACTER_AVATARS.sohn3_lukas,
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl max-h-[94vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-300 relative text-[#2B2D42]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653] tracking-tight">
                Fallstudie Stefan & Heike (Beginn ab DS 3)
              </h2>
              <p className="text-xs text-[#E76F51] font-semibold">Start der filmischen Dokumentation & Ethik-Simulation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-100 text-[#2B2D42] hover:bg-slate-200 transition-colors cursor-pointer"
              title={soundEnabled ? 'Ton an' : 'Ton aus'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#264653]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Card with Couple Image & Mandatory Text */}
        <div className="bg-[#F7F9FA] border border-slate-200 rounded-2xl p-4 sm:p-5 card-soft-shadow space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#264653] shadow-md bg-slate-200">
              <img
                src={CHARACTER_AVATARS.paar.imageUrl}
                alt="Heike & Stefan als Paar"
                onError={() => setImageError((prev) => ({ ...prev, paar: true }))}
                className="w-full h-full object-cover filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#264653]/85 text-white py-0.5 text-center text-[10px] font-medium">
                Heike & Stefan
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <span className="text-[10px] font-bold text-[#E76F51] uppercase tracking-widest block">
                Pädagogische Fallstudie & Ethik-Simulation
              </span>
              <p className="italic text-[#2B2D42] text-xs sm:text-[13px] leading-relaxed font-serif-reading">
                „Jeder begegnet im Leben Situationen, in denen es darum geht Entscheidungen zu treffen. Manche sind banal und einfach zu treffen - andere sind kompliziert und fast nicht auszusprechen. Jeder von uns stand mindestens einmal im Leben vor einer unbeschreiblich schweren Entscheidung - vielleicht so schwer, dass alle Handlungsalternativen unpassend oder unmöglich wirkten. Heike und Stefan befanden sich vor unzähligen solcher Entscheidungen. Doch während sie sprechen und sich bewegen kann, ist Stefan durch einen Unfall so schwer verändert, dass er sich nicht mehr verbal ausdrücken kann. Wie gelingen so Entscheidungen als Lebenspartner? Wie können alle Parteien einbezogen werden? Hunderte Fragen ergeben sich in diesem Moment. Die folgenden Kapitel und Filmausschnitte skizzieren das Leben von Heike und Stefan und ihren Weg zu Entscheidungen zu finden.“
              </p>
            </div>
          </div>
        </div>

        {/* Character & Family Gallery */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-[#264653] uppercase tracking-wider flex items-center gap-1.5 px-1">
            <Users className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>Beteiligte Personen & Avatare im Fall:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {charactersList.map((char) => (
              <div
                key={char.id}
                className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-1.5 hover:border-[#264653] card-soft-shadow transition-all"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-100 shrink-0">
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264653] leading-tight">{char.name}</div>
                  <div className="text-[10px] text-[#2B2D42]/70 leading-tight truncate max-w-[110px] font-medium">{char.role.split('&')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Film className="w-4 h-4 text-[#E76F51]" />
            <span>Weiter zu Videosequenz 1 (DS 3)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
