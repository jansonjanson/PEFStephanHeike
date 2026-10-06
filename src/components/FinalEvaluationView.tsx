import React, { useState } from 'react';
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
  FileCheck,
  HeartPulse,
  Scale,
  Compass,
  Download,
  Users,
  MessageSquare,
  BookOpen,
  Check,
  Printer,
  ChevronRight,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FinalEvaluationViewProps {
  module: ModuleData;
  onFinishModule: () => void;
}

export const FinalEvaluationView: React.FC<FinalEvaluationViewProps> = ({
  module,
  onFinishModule,
}) => {
  const { badges, setActiveModal, studentName } = useApp();

  const [manifesto, setManifesto] = useState({
    principle1: 'Patientenautonomie ist auch bei schwerster Kommunikationsbehinderung aktiv zu erkunden und zu achten.',
    principle2: 'Angehörige sind unverzichtbare Partner auf Augenhöhe, bedürfen jedoch aktiver Entlastung vor Überlastung.',
    principle3: 'Partizipative Entscheidungsfindung (PEF) leitet mein tägliches pflegerisches Handeln als Grundhaltung.',
  });

  const [activeDebriefTab, setActiveDebriefTab] = useState<'resonance' | 'transfer' | 'caregiver' | 'manifesto'>('resonance');
  const [manifestoSaved, setManifestoSaved] = useState<boolean>(false);

  const handleSaveManifesto = () => {
    sounds.playSuccess();
    setManifestoSaved(true);
  };

  const unlockedBadgesCount = badges.filter((b) => !!b.unlockedAt).length;

  return (
    <div className="space-y-8 text-[#2B2D42]">
      {/* ========================================================================= */}
      {/* [BLOCK 1] VIDEO-PLAYER: HOCHWERTIGE SCHALTFLÄCHE (SLIDEPRESENTER)         */}
      {/* ========================================================================= */}
      <section id="final-video" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#264653] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              1
            </span>
            <span>[Block 1] Finale Dokumentation: Leben mit der Entscheidung</span>
          </div>

          <span className="text-[11px] font-mono text-[#2B2D42]/70 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
            Dauer: ca. 12 Min.
          </span>
        </div>

        {/* High-End Video Launch Card */}
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
                Videosequenz 5: Das Vermächtnis von Stephan &amp; Heike
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
            <span>Öffnet sich in einem neuen Browser-Tab. Kehren Sie anschließend für die Nachbesprechung hierher zurück.</span>
            <span className="hidden sm:inline text-amber-300 font-mono">Status: Bereit für Auswertung</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 2] METHODISCHE NACHBESPRECHUNG (4 INTERAKTIVE REFLEXIONS-DIMENSIONEN)*/}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center font-mono text-[11px] shadow-xs">
              2
            </span>
            <span>[Block 2] Interaktive Nachbesprechung &amp; Fall-Debriefing</span>
          </div>
          <span className="text-xs text-[#2A9D8F] font-semibold">4 Reflexions-Dimensionen</span>
        </div>

        <div className="bg-white border-2 border-[#264653]/20 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5">
          {/* Debrief Tabs Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => { sounds.playClick(); setActiveDebriefTab('resonance'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDebriefTab === 'resonance'
                  ? 'bg-[#264653] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>1. Emotionaler Resonanzraum</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveDebriefTab('transfer'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDebriefTab === 'transfer'
                  ? 'bg-[#264653] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>2. PEF im Härtetest</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveDebriefTab('caregiver'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDebriefTab === 'caregiver'
                  ? 'bg-[#264653] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>3. Angehörigen-Überlastung</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveDebriefTab('manifesto'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDebriefTab === 'manifesto'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>4. Mein Pflege-Ethik-Manifest</span>
            </button>
          </div>

          {/* Tab 1: Emotionaler Resonanzraum */}
          {activeDebriefTab === 'resonance' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  <span>Murmelphase &amp; Gefühlsreflexion: Was bleibt im Gedächtnis?</span>
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed [text-wrap:pretty]">
                  Tauschen Sie sich 5 Minuten zu zweit oder im Plenum aus: Welcher Augenblick aus der 7-teiligen Reise von Stephan und Heike hat Sie emotional am stärksten berührt?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-[#264653] font-bold block">• Heikes unerschütterliche Loyalität:</strong>
                  <span className="text-slate-700 leading-relaxed [text-wrap:pretty]">
                    „Für mich war ein Leben ohne ihn nie eine Option.“ Wie bewerten Sie die Gratwanderung zwischen wahrer Liebe und existenzieller Selbstaufgabe?
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-[#264653] font-bold block">• Stephans Kampf um Autonomie:</strong>
                  <span className="text-slate-700 leading-relaxed [text-wrap:pretty]">
                    Der mühsame Knopfdruck an der Kaffeemaschine, das Blinzeln und die Tränen beim Gehtraining: Wie verändert sich der Begriff „Lebensqualität“ durch diesen Fall?
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: PEF im Härtetest */}
          {activeDebriefTab === 'transfer' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-teal-700" />
                  <span>Transfer in die Pflegepraxis: Wann greift welches Modell?</span>
                </h4>
                <p className="text-xs text-teal-900 leading-relaxed [text-wrap:pretty]">
                  Partizipative Entscheidungsfindung (PEF) ist das humanistische Leitbild. Doch wie verhält es sich in Akutsituationen oder bei chronischer Erschöpfung?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-[#2B2D42] font-bold text-[10px] uppercase">
                    Paternalismus
                  </span>
                  <p className="text-slate-700 leading-relaxed [text-wrap:pretty]">
                    Gerechtfertigt in vitalen Akut-Notfällen (z. B. Reanimation, Not-OP), toxisch in der Langzeitpflege.
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase">
                    PEF (Partner-Modell)
                  </span>
                  <p className="text-emerald-950 font-medium leading-relaxed [text-wrap:pretty]">
                    Fachwissen der Pflege + persönliche Werte des Patienten bilden eine gemeinsame Entscheidung.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-[#2B2D42] font-bold text-[10px] uppercase">
                    Informed Consent
                  </span>
                  <p className="text-slate-700 leading-relaxed [text-wrap:pretty]">
                    Reine Informationsübergabe lässt schwerkranke Menschen und Angehörige oft orientierungslos zurück.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Angehörigen-Überlastung */}
          {activeDebriefTab === 'caregiver' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>Caregiver Burden: Wer pflegt die Pflegenden?</span>
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed [text-wrap:pretty]">
                  Heikes Zusammenbruch bei hohem Fieber und der unerbittliche 4-Stunden-Katheter-Rhythmus zeigen die Schattenseiten häuslicher Pflege.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <strong className="text-[#264653] font-bold block">
                  Pflegerische Handlungsempfehlungen für Angehörige:
                </strong>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  <li>Frühzeitige Einbindung von Verhinderungs- und Kurzzeitpflege ohne Schuldgefühle.</li>
                  <li>Inanspruchnahme ambulanter Pflegedienste für nächtliche Prozeduren (z. B. ISK oder Absaugen).</li>
                  <li>Regelmäßige Beratungseinsätze (§ 37.3 SGB XI) als partnerschaftliche Entlastungsgespräche nutzen.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Mein Pflege-Ethik-Manifest */}
          {activeDebriefTab === 'manifesto' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 rounded-xl space-y-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#264653] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Ihr persönliches Pflegerisches Ethik-Manifest</span>
                </h4>
                <p className="text-xs text-[#2B2D42] leading-relaxed [text-wrap:pretty]">
                  Halten Sie hier Ihre 3 persönlichen Grundsätze für Ihre berufliche Pflegepraxis fest. Diese Leitsätze fließen in Ihr Abschlusszertifikat ein:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#264653] block mb-1">
                    1. Grundsatz zur Patientenautonomie:
                  </label>
                  <input
                    type="text"
                    value={manifesto.principle1}
                    onChange={(e) => setManifesto({ ...manifesto, principle1: e.target.value })}
                    className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#264653] block mb-1">
                    2. Grundsatz zur Partnerschaft mit Angehörigen:
                  </label>
                  <input
                    type="text"
                    value={manifesto.principle2}
                    onChange={(e) => setManifesto({ ...manifesto, principle2: e.target.value })}
                    className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#264653] block mb-1">
                    3. Mein PEF-Leitmotiv im Pflegealltag:
                  </label>
                  <input
                    type="text"
                    value={manifesto.principle3}
                    onChange={(e) => setManifesto({ ...manifesto, principle3: e.target.value })}
                    className="w-full bg-[#F4F7F8] border border-slate-300 rounded-xl p-3 text-xs text-[#2B2D42] focus:outline-none focus:border-[#264653] focus:bg-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveManifesto}
                    className="px-5 py-2.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{manifestoSaved ? 'Manifest gespeichert' : 'Manifest speichern & im Zertifikat verankern'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 3] GAMIFICATION-RADAR & CURRICULUM-GESAMTERFOLG                    */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#264653] uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-mono text-[11px] shadow-xs font-bold">
              3
            </span>
            <span>[Block 3] Gamification-Erfolg &amp; Kompetenz-Radar</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
            Alle 7 Doppelstunden absolviert
          </span>
        </div>

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
      </section>

      {/* ========================================================================= */}
      {/* [BLOCK 4] FEIERLICHER ABSCHLUSS & ZERTIFIKAT-AUFRUF                       */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#264653] relative overflow-hidden space-y-5">
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
              Öffnen Sie Ihr offizielles Zertifikat zur Anzeige und zum Druck oder kehren Sie zur Übersicht zurück.
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
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Zurück zur Gaming-Roadmap</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
