import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  X,
  Printer,
  CheckCircle2,
  Award,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CertificateModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    studentName,
    totalPefScore,
    overallProgressPercent,
    badges,
  } = useApp();

  if (activeModal !== 'certificate') return null;

  const candidate = studentName.trim() || 'Auszubildende/r Pflegefachkraft';
  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[92vh] bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Abschluss-Zertifikat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Zertifikat drucken / PDF</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveModal('none');
              }}
              className="w-8 h-8 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex items-center justify-center bg-slate-950">
          <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-double border-teal-500/60 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-teal-400" />

            {/* Emblem */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/20">
              <HeartHandshake className="w-8 h-8" />
            </div>

            <div>
              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">
                GENERALISTISCHE PFLEGEAUSBILDUNG • PFLEGEETHIK
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide mt-1 font-serif">
                KOMPETENZZERTIFIKAT
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Partnerschaftliche Entscheidungsfindung (PEF) in existenziellen Pflegesituationen
              </p>
            </div>

            <div className="py-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Hiermit wird bescheinigt, dass</p>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 font-serif my-1 underline decoration-teal-500/50 underline-offset-8">
                {candidate}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              die 7-teilige Blended-Learning-Unterrichtsreihe zum Fall <strong className="text-white">„Stephan & Heike“</strong> erfolgreich absolviert und herausragende Kompetenzen in der partizipativen Entscheidungsfindung, der strukturierten Pflegeanamnese nach Krohwinkel (13 ABEDL) und der multiprofessionellen Ethikberatung nachgewiesen hat.
            </p>

            {/* Score Badges */}
            <div className="flex justify-center items-center gap-6 pt-2">
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">PEF-Score</div>
                <div className="text-base font-bold font-mono text-teal-300">{totalPefScore} Punkte</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Lernfortschritt</div>
                <div className="text-base font-bold font-mono text-emerald-400">{overallProgressPercent}%</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Ausstellungsdatum</div>
                <div className="text-xs font-bold text-slate-200">{currentDate}</div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="text-left">
                <div className="w-32 border-b border-slate-700 mb-1" />
                <span>Lehrkraft / Dozent/in</span>
              </div>
              <div className="text-right">
                <div className="w-32 border-b border-slate-700 mb-1" />
                <span>Pflegeschule / Akademie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
