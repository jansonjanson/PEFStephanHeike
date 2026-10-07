import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeftRight,
  ArrowUp,
  ArrowDown,
  User,
  Stethoscope,
  Users,
  AlertTriangle,
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  Activity,
  Maximize2,
  X,
  ZoomIn
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TheoryVisualizations: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'pef' | 'patient' | 'doctor' | 'conflict'>('pef');
  const [activeModel, setActiveModel] = useState<'pat' | 'pef' | 'inf'>('pef');
  const [isMatrixZoomed, setIsMatrixZoomed] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* GRAFIK 1: KONTINUUM DER ENTSCHEIDUNGSMODELLE & AUTONOMIE                  */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/50 border-2 border-[#264653]/25 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#264653] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Scale className="w-4 h-4 text-[#E76F51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-200">
                Visualisierung 1 • Kontinuum der Modelle
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                Entscheidungsträger, Verantwortung &amp; Patientenautonomie
              </h3>
            </div>
          </div>

          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
            Nach Gunnar Geuter (Thieme CNE)
          </span>
        </div>

        {/* Obere Achse: Wer entscheidet und trägt die Verantwortung */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#264653]">
            <ArrowLeftRight className="w-4 h-4 text-[#E76F51]" />
            <span>Entscheidung wird getroffen und Verantwortung getragen vom ...</span>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold px-2">
            <div className="flex items-center gap-1.5 text-blue-950 bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-300 shadow-xs">
              <Stethoscope className="w-4 h-4 text-blue-700" />
              <span>Arzt / Pflegekraft alleine</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-950 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs font-bold">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Gemeinsam (Partnerschaft)</span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-950 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 shadow-xs">
              <User className="w-4 h-4 text-amber-800" />
              <span>Patient / Angehörige alleine</span>
            </div>
          </div>
        </div>

        {/* Visueller Spektrums-Balken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2.5 bg-slate-100/80 rounded-2xl border border-slate-200">
          {/* Paternalistisches Modell */}
          <button
            onClick={() => {
              setActiveModel('pat');
              sounds.playClick();
            }}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer border-2 ${
              activeModel === 'pat'
                ? 'bg-gradient-to-br from-blue-700 to-indigo-900 text-white border-blue-800 shadow-md ring-2 ring-blue-400/50'
                : 'bg-white hover:bg-blue-50/70 text-blue-950 border-blue-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeModel === 'pat' ? 'bg-blue-600/80 text-white' : 'bg-blue-100 text-blue-900'
              }`}>
                Niedrige Autonomie
              </span>
              <Stethoscope className={`w-4 h-4 ${activeModel === 'pat' ? 'text-blue-200' : 'text-blue-600'}`} />
            </div>
            <h4 className="text-sm font-bold leading-tight">Paternalistisches Modell</h4>
            <p className={`text-[11px] mt-1 line-clamp-2 ${activeModel === 'pat' ? 'text-blue-100' : 'text-slate-600'}`}>
              Fachkraft bestimmt über Diagnose &amp; Therapie. Patient ordnet sich unter.
            </p>
          </button>

          {/* Partizipative Entscheidungsfindung */}
          <button
            onClick={() => {
              setActiveModel('pef');
              sounds.playClick();
            }}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer border-2 relative ${
              activeModel === 'pef'
                ? 'bg-gradient-to-br from-[#264653] to-[#2A9D8F] text-white border-[#2A9D8F] shadow-md ring-2 ring-emerald-400/50'
                : 'bg-white hover:bg-emerald-50/70 text-emerald-950 border-emerald-300 shadow-xs'
            }`}
          >
            <div className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Goldener Mittelweg
            </div>

            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeModel === 'pef' ? 'bg-emerald-700/80 text-white' : 'bg-emerald-100 text-emerald-900 font-bold'
              }`}>
                Geteilte Autonomie
              </span>
              <Users className={`w-4 h-4 ${activeModel === 'pef' ? 'text-emerald-200' : 'text-emerald-600'}`} />
            </div>
            <h4 className="text-sm font-bold leading-tight">Partizipative Entscheidungsfindung (PEF)</h4>
            <p className={`text-[11px] mt-1 line-clamp-2 ${activeModel === 'pef' ? 'text-emerald-100' : 'text-slate-600'}`}>
              Symmetrische Augenhöhe: Fachwissen trifft auf Patientenwerte &amp; Lebensrealität.
            </p>
          </button>

          {/* Informationsmodell */}
          <button
            onClick={() => {
              setActiveModel('inf');
              sounds.playClick();
            }}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer border-2 ${
              activeModel === 'inf'
                ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white border-amber-600 shadow-md ring-2 ring-amber-400/50'
                : 'bg-white hover:bg-amber-50/70 text-amber-950 border-amber-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeModel === 'inf' ? 'bg-amber-700/80 text-white' : 'bg-amber-100 text-amber-950'
              }`}>
                Maximale Autonomie
              </span>
              <User className={`w-4 h-4 ${activeModel === 'inf' ? 'text-amber-200' : 'text-amber-700'}`} />
            </div>
            <h4 className="text-sm font-bold leading-tight">Informationsmodell</h4>
            <p className={`text-[11px] mt-1 line-clamp-2 ${activeModel === 'inf' ? 'text-amber-100' : 'text-slate-600'}`}>
              Fachkraft ist reine Informationsquelle. Patient trägt Last &amp; Wahl allein.
            </p>
          </button>
        </div>

        {/* Untere Achse: Autonomie des Patienten */}
        <div className="bg-gradient-to-r from-blue-100 via-emerald-100 to-amber-100 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-bold text-[#264653]">
          <span className="text-[11px] font-medium text-slate-700">Geringe Patienten-Autonomie</span>
          <div className="flex items-center gap-2 text-center">
            <span className="uppercase tracking-wider text-[11px] text-[#264653]">Grad der Patientenautonomie</span>
            <ArrowRight className="w-4 h-4 text-[#E76F51] shrink-0" />
          </div>
          <span className="text-[11px] font-medium text-slate-700">Hohe Patienten-Autonomie</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRAFIK 2: ANWENDUNGSASSESSMENT DER PEF (2D-MATRIX)                        */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 border-2 border-[#264653]/25 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                Visualisierung 2 • Anwendungsassessment
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                Wann ist PEF indiziert? (Entscheidungsmatrix nach Gunnar Geuter)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setIsMatrixZoomed(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer transform hover:scale-[1.02]"
              title="Grafik in vergrößerter Ansicht (Modal) öffnen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>Grafik vergrößern</span>
            </button>
          </div>
        </div>

        {/* 2D Matrix Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Matrix Diagram (7 cols) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
            {/* Y-Achsen-Erklärung */}
            <div className="flex items-center justify-between text-xs font-bold text-[#264653] bg-amber-50/80 px-3.5 py-2 rounded-xl border border-amber-200">
              <span className="flex items-center gap-1.5 text-amber-950 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E76F51]" />
                Y-Achse: Subjektive Bedeutsamkeit für den Patienten
              </span>
              <span className="text-[11px] text-amber-900/80 font-medium">
                (Werte, Lebensqualität, Familie)
              </span>
            </div>

            {/* Matrix Frame with Outer Axes */}
            <div className="flex items-stretch gap-2.5">
              {/* Y-Axis Column */}
              <div className="w-14 sm:w-16 flex flex-col justify-between items-center py-2 shrink-0 select-none">
                <div className="flex flex-col items-center text-center">
                  <ArrowUp className="w-4 h-4 text-[#E76F51] stroke-[3]" />
                  <span className="text-[11px] font-extrabold text-[#E76F51] uppercase tracking-tight">hoch</span>
                </div>
                <div className="my-auto py-2">
                  <span className="-rotate-90 block text-[10px] sm:text-[11px] font-bold text-[#264653] whitespace-nowrap tracking-wider">
                    Bedeutsamkeit
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-tight">gering</span>
                  <ArrowDown className="w-4 h-4 text-slate-400 stroke-[3]" />
                </div>
              </div>

              {/* Main SVG Matrix Layout */}
              <div className="flex-1 relative aspect-[4/3] rounded-2xl border-2 border-slate-300 overflow-hidden shadow-inner select-none bg-slate-100">
                {/* SVG Visual Areas */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full absolute inset-0 cursor-pointer"
                  preserveAspectRatio="none"
                >
                  {/* Zone 1: Top-Left Polygon (Patient dominiert) */}
                  <polygon
                    points="0,0 130,0 0,130"
                    onClick={() => {
                      setSelectedZone('patient');
                      sounds.playClick();
                    }}
                    className={`transition-all duration-200 ${
                      selectedZone === 'patient'
                        ? 'fill-blue-600 stroke-blue-800 stroke-2'
                        : 'fill-blue-200/90 hover:fill-blue-300 stroke-white stroke-2'
                    }`}
                  />

                  {/* Zone 4: Top-Right Polygon (Potenzieller Konflikt) */}
                  <polygon
                    points="270,0 400,0 400,130"
                    onClick={() => {
                      setSelectedZone('conflict');
                      sounds.playClick();
                    }}
                    className={`transition-all duration-200 ${
                      selectedZone === 'conflict'
                        ? 'fill-rose-600 stroke-rose-800 stroke-2'
                        : 'fill-rose-200/90 hover:fill-rose-300 stroke-white stroke-2'
                    }`}
                  />

                  {/* Zone 3: Bottom-Right Polygon (Arzt dominiert) */}
                  <polygon
                    points="240,300 400,160 400,300"
                    onClick={() => {
                      setSelectedZone('doctor');
                      sounds.playClick();
                    }}
                    className={`transition-all duration-200 ${
                      selectedZone === 'doctor'
                        ? 'fill-slate-800 stroke-slate-950 stroke-2'
                        : 'fill-sky-700/80 hover:fill-sky-800 stroke-white stroke-2'
                    }`}
                  />

                  {/* Zone 2: Main Center PEF Corridor (Remaining Area) */}
                  <polygon
                    points="0,130 130,0 270,0 400,130 400,160 240,300 0,300"
                    onClick={() => {
                      setSelectedZone('pef');
                      sounds.playClick();
                    }}
                    className={`transition-all duration-200 ${
                      selectedZone === 'pef'
                        ? 'fill-[#2A9D8F] stroke-[#264653] stroke-2'
                        : 'fill-emerald-100 hover:fill-emerald-200 stroke-white stroke-2'
                    }`}
                  />
                </svg>

                {/* HTML Labels over the SVG Polygons */}
                <div
                  onClick={() => {
                    setSelectedZone('patient');
                    sounds.playClick();
                  }}
                  className={`absolute top-2 left-2 max-w-[130px] p-1.5 rounded-xl cursor-pointer transition-all ${
                    selectedZone === 'patient' ? 'text-white' : 'text-blue-950'
                  }`}
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-wider block opacity-90">Zone 1</span>
                  <p className="text-[11px] sm:text-xs font-bold leading-tight">
                    Entscheidung hauptsächlich durch den Patienten
                  </p>
                </div>

                <div
                  onClick={() => {
                    setSelectedZone('conflict');
                    sounds.playClick();
                  }}
                  className={`absolute top-2 right-2 max-w-[125px] p-1.5 text-right rounded-xl cursor-pointer transition-all ${
                    selectedZone === 'conflict' ? 'text-white' : 'text-rose-950'
                  }`}
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-wider block opacity-90">Zone 4</span>
                  <p className="text-[11px] sm:text-xs font-bold leading-tight">
                    potenzieller Konflikt
                  </p>
                </div>

                <div
                  onClick={() => {
                    setSelectedZone('pef');
                    sounds.playClick();
                  }}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none ${
                    selectedZone === 'pef' ? 'text-white' : 'text-[#264653]'
                  }`}
                >
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${
                    selectedZone === 'pef' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-200 text-emerald-950 font-bold'
                  }`}>
                    Hauptanwendungsfeld
                  </span>
                  <h4 className="text-xs sm:text-sm md:text-base font-extrabold leading-snug max-w-[220px]">
                    Bereich der Anwendbarkeit von PEF
                  </h4>
                  <p className={`text-[10px] mt-0.5 max-w-[180px] hidden sm:block ${
                    selectedZone === 'pef' ? 'text-emerald-100' : 'text-slate-700'
                  }`}>
                    Gemeinsames Aushandeln bei Reha, Pflegeort &amp; Hilfsmitteln
                  </p>
                </div>

                <div
                  onClick={() => {
                    setSelectedZone('doctor');
                    sounds.playClick();
                  }}
                  className={`absolute bottom-2 right-2 max-w-[130px] p-1.5 text-right rounded-xl cursor-pointer transition-all ${
                    selectedZone === 'doctor' ? 'text-white' : 'text-white'
                  }`}
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-wider block opacity-90">Zone 3</span>
                  <p className="text-[11px] sm:text-xs font-bold leading-tight">
                    Entscheidung hauptsächlich durch den Arzt
                  </p>
                </div>
              </div>
            </div>

            {/* X-Axis Row below matrix */}
            <div className="flex items-center gap-2.5 pl-14 sm:pl-16">
              <div className="flex-1 flex flex-col items-center space-y-1">
                <div className="w-full flex items-center justify-between text-[11px] font-extrabold text-[#264653]">
                  <span className="text-slate-500 uppercase">gering (unklare Evidenz)</span>
                  <div className="flex items-center gap-1.5 text-center">
                    <span className="uppercase tracking-wider">X-Achse: EbM-Sicherheit (Evidenzgrade)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  </div>
                  <span className="text-[#2A9D8F] uppercase">hoch (Leitlinienfest)</span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-slate-200 via-sky-200 to-[#2A9D8F] rounded-full" />
              </div>
            </div>
          </div>

          {/* Interactive Detail Box (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
              Detailanalyse der ausgewählten Zone:
            </span>

            {selectedZone === 'pef' && (
              <div className="bg-emerald-50 border-2 border-[#2A9D8F] rounded-2xl p-4.5 space-y-3 text-xs animate-in fade-in duration-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-950 font-bold">
                  <div className="w-7 h-7 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    PEF
                  </div>
                  <h4 className="text-sm font-bold">Bereich der Anwendbarkeit von PEF</h4>
                </div>
                <p className="text-emerald-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Charakteristik:</strong> Hier existieren mehrere fachlich vertretbare Optionen (Präferenzsensitivität). Die Evidenz schreibt nicht den einen zwingenden Pfad vor.
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-slate-800 space-y-1">
                  <strong className="text-emerald-950 block text-[11px] uppercase tracking-wider">Fallbezug Stefan &amp; Heike:</strong>
                  <p className="text-[11px] leading-relaxed">
                    Die Weichenstellung zwischen häuslicher Pflege im Fachwerkhaus und stationärer Langzeit-Phase F liegt exakt in diesem PEF-Korridor.
                  </p>
                </div>
              </div>
            )}

            {selectedZone === 'patient' && (
              <div className="bg-blue-50 border-2 border-blue-400 rounded-2xl p-4.5 space-y-3 text-xs animate-in fade-in duration-200 shadow-sm">
                <div className="flex items-center gap-2 text-blue-950 font-bold">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    1
                  </div>
                  <h4 className="text-sm font-bold">Entscheidung durch den Patienten</h4>
                </div>
                <p className="text-blue-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Charakteristik:</strong> Hohe persönliche Bedeutsamkeit bei geringer/unklarer klinischer Evidenz. Individuelle Werte und Lebensziele des Patienten wiegen am schwersten.
                </p>
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-slate-800 space-y-1">
                  <strong className="text-blue-950 block text-[11px] uppercase tracking-wider">Beispiel:</strong>
                  <p className="text-[11px] leading-relaxed">
                    Wahl des Tagesablaufs, Gestaltung des Pflegeumfelds, spirituelle Rituale.
                  </p>
                </div>
              </div>
            )}

            {selectedZone === 'doctor' && (
              <div className="bg-sky-50 border-2 border-sky-600 rounded-2xl p-4.5 space-y-3 text-xs animate-in fade-in duration-200 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <div className="w-7 h-7 rounded-xl bg-sky-700 text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    3
                  </div>
                  <h4 className="text-sm font-bold">Entscheidung durch Arzt / Fachkraft</h4>
                </div>
                <p className="text-slate-800 leading-relaxed [text-wrap:pretty]">
                  <strong>Charakteristik:</strong> Hohe wissenschaftliche Evidenz (klare Leitlinien), aber geringe persönliche Tragweite für den individuellen Lebensstil des Patienten.
                </p>
                <div className="p-3 bg-white rounded-xl border border-sky-200 text-slate-800 space-y-1">
                  <strong className="text-sky-950 block text-[11px] uppercase tracking-wider">Beispiel:</strong>
                  <p className="text-[11px] leading-relaxed">
                    Standardmäßige Wundantiseptik, Dosierung von Basismedikamenten nach Protokoll.
                  </p>
                </div>
              </div>
            )}

            {selectedZone === 'conflict' && (
              <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4.5 space-y-3 text-xs animate-in fade-in duration-200 shadow-sm">
                <div className="flex items-center gap-2 text-rose-950 font-bold">
                  <div className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                    4
                  </div>
                  <h4 className="text-sm font-bold">Potenzieller Konflikt</h4>
                </div>
                <p className="text-rose-900 leading-relaxed [text-wrap:pretty]">
                  <strong>Charakteristik:</strong> Sowohl Evidenz als auch persönliche Bedeutsamkeit sind maximal hoch. Wenn Leitlinie und Patientenwille kollidieren, entsteht ein ethisches Dilemma.
                </p>
                <div className="p-3 bg-white rounded-xl border border-rose-200 text-slate-800 space-y-1">
                  <strong className="text-rose-950 block text-[11px] uppercase tracking-wider">Beispiel:</strong>
                  <p className="text-[11px] leading-relaxed">
                    Ablehnung einer indizierten Not-OP oder Beatmung aufgrund einer Patientenverfügung.
                  </p>
                </div>
              </div>
            )}

            {/* Quick selector chips */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setSelectedZone('patient');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-left cursor-pointer border-2 ${
                  selectedZone === 'patient' ? 'bg-blue-600 text-white border-blue-700 shadow-xs' : 'bg-white hover:bg-blue-50 text-blue-900 border-blue-200'
                }`}
              >
                1. Patient dominiert
              </button>
              <button
                onClick={() => {
                  setSelectedZone('pef');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-left cursor-pointer border-2 ${
                  selectedZone === 'pef' ? 'bg-[#2A9D8F] text-white border-[#264653] shadow-xs' : 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-200'
                }`}
              >
                2. PEF-Hauptbereich
              </button>
              <button
                onClick={() => {
                  setSelectedZone('doctor');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-left cursor-pointer border-2 ${
                  selectedZone === 'doctor' ? 'bg-sky-700 text-white border-sky-800 shadow-xs' : 'bg-white hover:bg-sky-50 text-sky-900 border-sky-200'
                }`}
              >
                3. Arzt dominiert
              </button>
              <button
                onClick={() => {
                  setSelectedZone('conflict');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-left cursor-pointer border-2 ${
                  selectedZone === 'conflict' ? 'bg-rose-600 text-white border-rose-700 shadow-xs' : 'bg-white hover:bg-rose-50 text-rose-900 border-rose-200'
                }`}
              >
                4. Potenzieller Konflikt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR 2D MATRIX                                   */}
      {/* ========================================================================= */}
      {isMatrixZoomed && (
        <div className="fixed inset-0 z-50 bg-[#2B2D42]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-white border-2 border-[#264653] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative text-[#2B2D42] max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2A9D8F] text-white flex items-center justify-center font-bold shadow-md">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Großansicht • Thieme CNE
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-[#264653] mt-0.5">
                    Anwendungsassessment der Partizipativen Entscheidungsfindung (PEF)
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsMatrixZoomed(false);
                }}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors cursor-pointer"
                title="Großansicht schließen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Matrix Frame in Full Screen */}
            <div className="space-y-4">
              {/* Top Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-[#264653] bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200">
                <span className="flex items-center gap-2 text-amber-950">
                  <span className="w-3 h-3 rounded-full bg-[#E76F51]" />
                  Vertikale Y-Achse: Subjektive Bedeutsamkeit für den Patienten (Werte, Lebensqualität, Familie, Risikobereitschaft)
                </span>
                <span className="text-xs text-amber-900 font-mono">Skala: 0% bis 100%</span>
              </div>

              <div className="flex items-stretch gap-4">
                {/* Y-Axis Indicator */}
                <div className="w-20 flex flex-col justify-between items-center py-4 shrink-0 select-none bg-slate-50 rounded-2xl border border-slate-200 p-2">
                  <div className="flex flex-col items-center text-center">
                    <ArrowUp className="w-5 h-5 text-[#E76F51] stroke-[3]" />
                    <span className="text-xs font-extrabold text-[#E76F51] uppercase">Maximal</span>
                  </div>
                  <div className="my-auto py-4">
                    <span className="-rotate-90 block text-xs font-extrabold text-[#264653] whitespace-nowrap tracking-widest uppercase">
                      Patienten-Bedeutung
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-extrabold text-slate-400 uppercase">Minimal</span>
                    <ArrowDown className="w-5 h-5 text-slate-400 stroke-[3]" />
                  </div>
                </div>

                {/* SVG Visual Matrix Layout Large */}
                <div className="flex-1 relative aspect-[16/10] min-h-[380px] rounded-3xl border-2 border-slate-300 overflow-hidden shadow-inner select-none bg-slate-100">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full absolute inset-0 cursor-pointer"
                    preserveAspectRatio="none"
                  >
                    {/* Zone 1: Top-Left Polygon (Patient dominiert) */}
                    <polygon
                      points="0,0 130,0 0,130"
                      onClick={() => {
                        setSelectedZone('patient');
                        sounds.playClick();
                      }}
                      className={`transition-all duration-200 ${
                        selectedZone === 'patient'
                          ? 'fill-blue-600 stroke-blue-900 stroke-2'
                          : 'fill-blue-200/95 hover:fill-blue-300 stroke-white stroke-2'
                      }`}
                    />

                    {/* Zone 4: Top-Right Polygon (Potenzieller Konflikt) */}
                    <polygon
                      points="270,0 400,0 400,130"
                      onClick={() => {
                        setSelectedZone('conflict');
                        sounds.playClick();
                      }}
                      className={`transition-all duration-200 ${
                        selectedZone === 'conflict'
                          ? 'fill-rose-600 stroke-rose-900 stroke-2'
                          : 'fill-rose-200/95 hover:fill-rose-300 stroke-white stroke-2'
                      }`}
                    />

                    {/* Zone 3: Bottom-Right Polygon (Arzt dominiert) */}
                    <polygon
                      points="240,300 400,160 400,300"
                      onClick={() => {
                        setSelectedZone('doctor');
                        sounds.playClick();
                      }}
                      className={`transition-all duration-200 ${
                        selectedZone === 'doctor'
                          ? 'fill-slate-800 stroke-slate-950 stroke-2'
                          : 'fill-sky-700/85 hover:fill-sky-800 stroke-white stroke-2'
                      }`}
                    />

                    {/* Zone 2: Main Center PEF Corridor */}
                    <polygon
                      points="0,130 130,0 270,0 400,130 400,160 240,300 0,300"
                      onClick={() => {
                        setSelectedZone('pef');
                        sounds.playClick();
                      }}
                      className={`transition-all duration-200 ${
                        selectedZone === 'pef'
                          ? 'fill-[#2A9D8F] stroke-[#264653] stroke-2'
                          : 'fill-emerald-100 hover:fill-emerald-200 stroke-white stroke-2'
                      }`}
                    />
                  </svg>

                  {/* High Contrast HTML Labels in Lightbox */}
                  <div
                    onClick={() => {
                      setSelectedZone('patient');
                      sounds.playClick();
                    }}
                    className={`absolute top-4 left-4 max-w-[190px] p-2.5 rounded-2xl cursor-pointer transition-all ${
                      selectedZone === 'patient' ? 'bg-blue-700 text-white shadow-md' : 'bg-white/95 text-blue-950 border border-blue-200 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-90">Zone 1</span>
                    <p className="text-xs sm:text-sm font-bold leading-tight mt-0.5">
                      Entscheidung hauptsächlich durch den Patienten
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedZone('conflict');
                      sounds.playClick();
                    }}
                    className={`absolute top-4 right-4 max-w-[190px] p-2.5 text-right rounded-2xl cursor-pointer transition-all ${
                      selectedZone === 'conflict' ? 'bg-rose-700 text-white shadow-md' : 'bg-white/95 text-rose-950 border border-rose-200 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-90">Zone 4</span>
                    <p className="text-xs sm:text-sm font-bold leading-tight mt-0.5">
                      Potenzieller Konflikt (Dilemma)
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedZone('pef');
                      sounds.playClick();
                    }}
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none ${
                      selectedZone === 'pef' ? 'text-white' : 'text-[#264653]'
                    }`}
                  >
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2 shadow-sm ${
                      selectedZone === 'pef' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-200 text-emerald-950 font-bold'
                    }`}>
                      Hauptanwendungsfeld der Pflege
                    </span>
                    <h4 className="text-base sm:text-xl font-extrabold leading-tight max-w-[320px]">
                      Bereich der Anwendbarkeit von PEF
                    </h4>
                    <p className={`text-xs mt-1.5 max-w-[280px] ${
                      selectedZone === 'pef' ? 'text-emerald-100' : 'text-slate-700'
                    }`}>
                      Präferenzsensitivität: Gemeinsames Aushandeln bei Reha, Pflegeort &amp; Hilfsmitteln
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedZone('doctor');
                      sounds.playClick();
                    }}
                    className={`absolute bottom-4 right-4 max-w-[190px] p-2.5 text-right rounded-2xl cursor-pointer transition-all ${
                      selectedZone === 'doctor' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/95 text-slate-900 border border-slate-300 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-90">Zone 3</span>
                    <p className="text-xs sm:text-sm font-bold leading-tight mt-0.5">
                      Entscheidung hauptsächlich durch den Arzt / Fachkraft
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom X-Axis Indicator */}
              <div className="flex items-center gap-4 pl-24">
                <div className="flex-1 flex flex-col items-center space-y-1.5">
                  <div className="w-full flex items-center justify-between text-xs font-extrabold text-[#264653]">
                    <span className="text-slate-500 uppercase">geringe EbM-Sicherheit (unklare Leitlinien)</span>
                    <div className="flex items-center gap-2 text-center">
                      <span className="uppercase tracking-widest text-[#264653]">Horizontale X-Achse: Evidenzbasierte Medizin (EbM-Sicherheit)</span>
                      <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
                    </div>
                    <span className="text-[#2A9D8F] uppercase">hohe EbM-Sicherheit (Leitlinienfest)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gradient-to-r from-slate-200 via-sky-200 to-[#2A9D8F] rounded-full" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Klicken Sie auf eine Zone in der Matrix, um sie hervorzuheben.
              </span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsMatrixZoomed(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Schließen &amp; Zurück
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
