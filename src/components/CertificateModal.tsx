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
    overallProgressPercent,
    badges,
  } = useApp();

  if (activeModal !== 'certificate') return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 relative text-[#2B2D42]">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 no-print">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-[#E76F51]" />
            <span>Offizielles Abschluss-Zertifikat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drucken / PDF</span>
            </button>

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
        </div>

        {/* Printable Certificate Canvas */}
        <div className="border-4 border-double border-[#264653] rounded-2xl p-8 sm:p-10 bg-[#F7F9FA] text-center space-y-6 relative overflow-hidden shadow-inner">
          {/* Watermark Logo */}
          <div className="w-16 h-16 rounded-3xl bg-[#264653] text-white mx-auto flex items-center justify-center shadow-md">
            <HeartHandshake className="w-9 h-9 text-[#E76F51]" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#E76F51] uppercase tracking-widest">
              Zertifikat über fachpraktische & ethische Kompetenz
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#264653] mt-1">
              Partnerschaftliche Entscheidungsfindung
            </h1>
            <p className="text-xs text-[#2B2D42]/70 mt-1">
              Generalistische Pflegeausbildung • Fallstudie & Simulation „Stefan & Heike“
            </p>
          </div>

          <div className="py-2">
            <span className="text-xs text-[#2B2D42]/60 block uppercase tracking-wider font-semibold">Hiermit wird bescheinigt, dass</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#264653] mt-1 border-b-2 border-[#264653]/30 inline-block px-8 pb-1">
              {studentName || 'Pflegefachfrau / Pflegefachmann (Auszubildende/r)'}
            </div>
          </div>

          <p className="text-xs text-[#2B2D42] max-w-xl mx-auto leading-relaxed">
            die 7-teilige curriculare E-Learning-Einheit zur partnerschaftlichen Entscheidungsfindung erfolgreich absolviert hat. Dies umfasst die methodische Differenzierung der drei Entscheidungsmodelle (Paternalismus, Partizipative Entscheidungsfindung nach Gunnar Geuter, Informed Consent) sowie die Erstellung von Pflegediagnosen nach den 13 ABEDL (Monika Krohwinkel) im multiprofessionellen Kontext.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 text-left text-xs border-t border-slate-300">
            <div>
              <span className="text-[10px] text-[#2B2D42]/60 block font-bold uppercase">Datum & Ort:</span>
              <span className="font-semibold text-[#264653]">{todayStr}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#2B2D42]/60 block font-bold uppercase">Leistungsnachweis:</span>
              <span className="font-semibold text-emerald-700">100% Curriculum vollständig abgeschlossen</span>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs text-[#2B2D42]/60 border-t border-slate-200">
            <div className="text-center w-40 border-t border-slate-400 pt-1">
              Unterschrift Dozent/in
            </div>
            <div className="text-center w-40 border-t border-slate-400 pt-1">
              Unterschrift Auszubildende/r
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
