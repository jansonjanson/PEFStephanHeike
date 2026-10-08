import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ModuleData } from '../types';
import {
  Film,
  Play,
  ExternalLink,
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  HeartPulse,
  Scale,
  Users,
  Check,
  Printer,
  Lock,
  ArrowDown,
  ArrowRight,
  Star,
  Lightbulb,
  Stethoscope,
  User,
  Heart
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FinalEvaluationViewProps {
  module: ModuleData;
  onFinishModule: () => void;
}

const EXAMPLE_MOMENTS = [
  {
    id: 'loyalitaet',
    title: 'Heikes unerschütterliche Loyalität',
    quote: '„Für mich war ein Leben ohne ihn nie eine Option.“',
    description: 'Die Gratwanderung zwischen tiefer Liebe, Fürsorge und existenzieller Selbstaufgabe im Fachwerkhaus.',
  },
  {
    id: 'autonomie',
    title: 'Stefans nonverbaler Kampf um Autonomie',
    quote: '„Der mühsame Knopfdruck an der Kaffeemaschine & das Blinzeln beim Gehtraining.“',
    description: 'Wie kleinste Willensäußerungen den Begriff von Lebensqualität und Würde neu definieren.',
  },
  {
    id: 'teamwork',
    title: 'Zusammenhalt der drei Söhne',
    quote: '„Gemeinsam den Vater stützen, wenn das Leben aus den Fugen gerät.“',
    description: 'Die Rolle von Angehörigen und Kindern als gleichberechtigte Partner im Pflegeprozess.',
  },
];

export const FinalEvaluationView: React.FC<FinalEvaluationViewProps> = ({
  module,
  onFinishModule,
}) => {
  const { badges, setActiveModal, moduleStates, advanceModuleStep } = useApp();
  const state = moduleStates[module.id];
  const stepProgress = state?.stepProgress || 1; // 1 = Video/Resonanz, 2 = 3 Modelle Praxis, 3 = Top 3 Erkenntnisse & Abschluss

  // Schritt 1 State
  const [selectedMomentId, setSelectedMomentId] = useState<string>('loyalitaet');
  const [customMomentText, setCustomMomentText] = useState<string>('');
  const [resonanceNote, setResonanceNote] = useState<string>('');

  // Schritt 2 State: Wo setze ich die 3 Modelle ein?
  const [modelUsePat, setModelUsePat] = useState<string>(
    'In vital bedrohlichen Akut-Notfällen (z. B. plötzliche Reanimation, Koma-Notfall, akute Bewusstlosigkeit), wo keine Zeit zum Aushandeln bleibt.'
  );
  const [modelUsePef, setModelUsePef] = useState<string>(
    'Im regulären Pflegealltag, bei Reha-Zielen, Hilfsmittelauswahl, Wahl des Versorgungsorts (stationär vs. ambulant) und individueller Pflegeplanung.'
  );
  const [modelUseInf, setModelUseInf] = useState<string>(
    'Bei rein formalen oder rechtlichen Optionen, standardisierten Leistungsansprüchen und wenn urteilsfähige Patienten nach voller Aufklärung autonom entscheiden wollen.'
  );

  // Schritt 3 State: Top 3 Erkenntnisse zur Entscheidungsfindung
  const [topInsights, setTopInsights] = useState({
    insight1: 'Echte Partizipation erfordert das aktive Erforschen von Patientenwerten – auch und besonders bei nonverbaler Kommunikation.',
    insight2: 'Paternalismus schützt kurzfristig, überfordert aber langfristig und entmündigt die Lebenswelt der Betroffenen.',
    insight3: 'Angehörige sind elementare Partner auf Augenhöhe; ihre Ressourcen müssen durch professionelle Netzwerke geschützt werden.',
  });

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const handleAdvanceStep = (nextStep: number) => {
    sounds.playSuccess();
    advanceModuleStep(module.id, nextStep);

    setTimeout(() => {
      if (nextStep === 2) step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nextStep === 3) step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const unlockedBadgesCount = badges.filter((b) => !!b.unlockedAt).length;

  return (
    <div className="space-y-8 text-[#2B2D42]">
      {/* ========================================================================= */}
      {/* [SCHRITT 1] VIDEO 5 & 1. EMOTIONALER RESONANZRAUM                         */}
      {/* ========================================================================= */}
      <section id="ds7-step-1" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              1
            </span>
            <span>Schritt 1: Videosequenz 5 &amp; Emotionaler Resonanzraum</span>
          </div>

          <span className="text-[11px] font-mono text-[#2B2D42]/70 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
            Dauer: ca. 12 Min.
          </span>
        </div>

        {/* Video Launch Card */}
        <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden border border-[#264653]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono">
                  Finale Synthese &amp; Dokumentation
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Doppelstunde 7 • Abschluss
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-bold text-white [text-wrap:balance]">
                Videosequenz 5: Das Vermächtnis von Stefan &amp; Heike
              </h2>

              <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed [text-wrap:pretty]">
                Schauen Sie das Finale der Dokumentation auf SlidePresenter. Erleben Sie, wie sich das Leben nach Jahren des Kampfes eingespielt hat, welche Rolle Humor und Würde im Alltag spielen und wie beide ihren Weg gefunden haben.
              </p>
            </div>

            {module.videoUrl && (
              <a
                href={module.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-full md:w-auto shrink-0 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/30 transition-all transform hover:scale-[1.02] cursor-pointer"
                title="Videosequenz im gesicherten SlidePresenter-Player in neuem Tab öffnen"
              >
                <div className="w-6 h-6 rounded-full bg-slate-950/20 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Video 5 auf SlidePresenter starten</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span>Öffnet sich in einem neuen Browser-Tab. Kehren Sie anschließend für die Auswertungsschritte hierher zurück.</span>
          </div>
        </div>

        {/* 1. Emotionaler Resonanzraum Card with Custom or Example Selection */}
        <div className="bg-white border-2 border-[#264653]/20 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in duration-300">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <span>Gefühlsreflexion &amp; Schlüsselsituation: Welcher Augenblick hat Sie am stärksten berührt?</span>
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:pretty]">
              Wählen Sie eine der beispielhaften Schlüsselsituationen aus oder formulieren Sie eine ganz eigene Situation aus der gemeinsamen Reise von Stefan und Heike.
            </p>
          </div>

          {/* Situation Cards Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EXAMPLE_MOMENTS.map((mom) => (
              <button
                key={mom.id}
                type="button"
                onClick={() => {
                  setSelectedMomentId(mom.id);
                  sounds.playClick();
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMomentId === mom.id
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300/40'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Beispiel
                    </span>
                    {selectedMomentId === mom.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-[#264653]">{mom.title}</h5>
                  <p className="italic text-[11px] text-slate-700 font-serif-reading">
                    {mom.quote}
                  </p>
                  <p className="text-[11px] text-[#2B2D42]/70">
                    {mom.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Situation Input */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#E76F51]" />
              <label className="text-xs font-bold text-[#264653]">
                Eigene Schlüsselsituation auswählen oder ergänzen:
              </label>
            </div>
            <textarea
              rows={2}
              value={customMomentText}
              onChange={(e) => setCustomMomentText(e.target.value)}
              placeholder="Haben Sie einen anderen Moment oder eine eigene Szene im Kopf? Beschreiben Sie diesen Augenblick kurz..."
              className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white resize-y leading-relaxed"
            />
          </div>

          {/* Reflection Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#264653] block">
              Ihre persönlichen Notizen zur emotionalen Resonanz:
            </label>
            <textarea
              rows={3}
              value={resonanceNote}
              onChange={(e) => setResonanceNote(e.target.value)}
              placeholder="Wie bewerten Sie diese Situation aus pflegeethischer Sicht? Was hat Sie daran nachdenklich gestimmt?"
              className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white resize-y leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-start">
            <button
              onClick={() => handleAdvanceStep(2)}
              className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Schritt 1 bestätigen &amp; Weiter zu Schritt 2 (Praxiseinsatz der 3 Modelle)</span>
              <ArrowDown className="w-4 h-4 text-[#E76F51]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [SCHRITT 2] 2. EINSATZ DER DREI MODELLE IN DER PFLEGEPRAXIS               */}
      {/* ========================================================================= */}
      <section ref={step2Ref} id="ds7-step-2" className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 2 ? 'bg-[#2A9D8F] text-white font-bold' : 'bg-slate-200 text-slate-500'}`}>
              2
            </span>
            <span>Schritt 2: Gezielter Einsatz der 3 Modelle in der Pflegepraxis</span>
          </div>

          {stepProgress > 2 ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Erledigt
            </span>
          ) : stepProgress === 2 ? (
            <span className="text-[11px] font-bold text-[#E76F51] bg-[#E76F51]/10 border border-[#E76F51]/20 px-3 py-0.5 rounded-full animate-pulse">
              Aktiver Schritt
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Gesperrt
            </span>
          )}
        </div>

        {stepProgress < 2 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
            <Lock className="w-6 h-6 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-[#264653]">Schritt 2 noch gesperrt</h4>
            <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
              Schließen Sie Schritt 1 oben ab, um die Modellverortung für Ihren Pflegealltag freizuschalten.
            </p>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#264653]/20 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in duration-300">
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-700" />
                <span>Praxistransfer: Wo und wann setzen Sie die drei Modelle im Berufsalltag gezielt ein?</span>
              </h4>
              <p className="text-xs text-teal-900 leading-relaxed [text-wrap:pretty]">
                Reflektieren Sie die Vor- und Nachteile der drei Dimensionen. In welchen konkreten Pflegesituationen ist welches Modell fachlich und ethisch begründet?
              </p>
            </div>

            <div className="space-y-4">
              {/* Modell 1: Paternalistisch */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/40 border-2 border-blue-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Stethoscope className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs font-bold text-blue-950">
                    1. Paternalistisches Modell – Wo setze ich es ein?
                  </h5>
                </div>
                <p className="text-[11px] text-blue-900">
                  <em>Fachkraft entscheidet zum Schutz / zur Gefahrenabwehr.</em> Wann ist dieses Modell im Alltag unvermeidlich?
                </p>
                <textarea
                  rows={2}
                  value={modelUsePat}
                  onChange={(e) => setModelUsePat(e.target.value)}
                  className="w-full bg-white border border-blue-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-blue-600 resize-y leading-relaxed"
                />
              </div>

              {/* Modell 2: PEF */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border-2 border-emerald-300 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs font-bold text-emerald-950">
                    2. Partizipative Entscheidungsfindung (PEF) – Wo setze ich es ein?
                  </h5>
                </div>
                <p className="text-[11px] text-emerald-900">
                  <em>Pflege &amp; Patient/Angehörige entscheiden gemeinsam als Partner auf Augenhöhe.</em> Wann ist PEF Ihr Standard-Leitbild?
                </p>
                <textarea
                  rows={2}
                  value={modelUsePef}
                  onChange={(e) => setModelUsePef(e.target.value)}
                  className="w-full bg-white border border-emerald-400 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-emerald-600 resize-y leading-relaxed"
                />
              </div>

              {/* Modell 3: Informationsmodell */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 border-2 border-amber-300 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs font-bold text-amber-950">
                    3. Informationsmodell (Informed Choice) – Wo setze ich es ein?
                  </h5>
                </div>
                <p className="text-[11px] text-amber-900">
                  <em>Pflege informiert neutral; Patient entscheidet vollkommen eigenverantwortlich.</em> In welchen Konstellationen ist dies passend?
                </p>
                <textarea
                  rows={2}
                  value={modelUseInf}
                  onChange={(e) => setModelUseInf(e.target.value)}
                  className="w-full bg-white border border-amber-400 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-amber-600 resize-y leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-start">
              <button
                onClick={() => handleAdvanceStep(3)}
                className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] active:bg-[#15272E] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Schritt 2 bestätigen &amp; Weiter zu Schritt 3 (Top 3 Erkenntnisse &amp; Abschluss)</span>
                <ArrowDown className="w-4 h-4 text-[#E76F51]" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* [SCHRITT 3] 3. TOP 3 ERKENNTNISSE ZUR ENTSCHEIDUNGSFINDUNG & ABSCHLUSS     */}
      {/* ========================================================================= */}
      <section ref={step3Ref} id="ds7-step-3" className="space-y-4 pt-4 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] shadow-xs ${stepProgress >= 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200 text-slate-500'}`}>
              3
            </span>
            <span>Schritt 3: Meine Top 3 Erkenntnisse zur Entscheidungsfindung &amp; Abschluss</span>
          </div>

          {stepProgress >= 3 && (
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Abschlussphase
            </span>
          )}
        </div>

        {stepProgress < 3 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 card-soft-shadow">
            <Lock className="w-6 h-6 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-[#264653]">Schritt 3 noch gesperrt</h4>
            <p className="text-[11px] text-[#2B2D42]/70 [text-wrap:pretty]">
              Schließen Sie Schritt 2 oben ab, um Ihre 3 Kern-Erkenntnisse festzuhalten und das Abschlusszertifikat freizuschalten.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border-2 border-amber-400/50 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5">
              <div className="p-4 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Eigene Synthese: Formulieren Sie Ihre 3 wichtigsten persönlichen Erkenntnisse</span>
                </h4>
                <p className="text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
                  Was haben Sie aus dem Fall Stefan &amp; Heike, den Simulationen und den theoretischen Modellen für Ihre Haltung und Handlungskompetenz gelernt?
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="font-bold text-[#264653] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[10px]">1</span>
                    <span>Erkenntnis 1 (zur Patientenautonomie &amp; Willensbildung):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={topInsights.insight1}
                    onChange={(e) => setTopInsights({ ...topInsights, insight1: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] resize-y leading-relaxed"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="font-bold text-[#264653] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[10px]">2</span>
                    <span>Erkenntnis 2 (zur Zusammenarbeit mit Angehörigen &amp; Überlastungsschutz):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={topInsights.insight2}
                    onChange={(e) => setTopInsights({ ...topInsights, insight2: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] resize-y leading-relaxed"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="font-bold text-[#264653] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[10px]">3</span>
                    <span>Erkenntnis 3 (zur Rolle &amp; Verantwortung der Pflegekraft):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={topInsights.insight3}
                    onChange={(e) => setTopInsights({ ...topInsights, insight3: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Gamification Radar & Curriculum-Erfolg */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4.5 card-soft-shadow space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#264653]">7 / 7</div>
                <div className="text-[11px] text-[#2B2D42]/70 font-medium">Doppelstunden abgeschlossen</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4.5 card-soft-shadow space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#264653]">{unlockedBadgesCount} / {badges.length}</div>
                <div className="text-[11px] text-[#2B2D42]/70 font-medium">Badges &amp; Trophäen freigeschaltet</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4.5 card-soft-shadow space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#264653]">100% PEF</div>
                <div className="text-[11px] text-[#2B2D42]/70 font-medium">Partizipations-Kompetenz</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4.5 card-soft-shadow space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#264653]">Zertifiziert</div>
                <div className="text-[11px] text-[#2B2D42]/70 font-medium">Abschluss-Zertifikat bereit</div>
              </div>
            </div>

            {/* Feierlicher Abschluss & Zertifikat-Aufruf */}
            <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#264653] relative overflow-hidden space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Herzlichen Glückwunsch!
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Sie haben die curriculare Unterrichtsreihe erfolgreich gemeistert!
                  </h3>
                  <p className="text-xs text-slate-300 [text-wrap:pretty]">
                    Öffnen Sie Ihr offizielles Zertifikat zur Anzeige und zum Druck oder vollenden Sie das Training.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      sounds.playBadgeUnlock();
                      setActiveModal('certificate');
                    }}
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Abschluss-Zertifikat anzeigen &amp; drucken</span>
                  </button>

                  <button
                    onClick={onFinishModule}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-white/20"
                  >
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span>Training vollenden &amp; Zurück zur Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
