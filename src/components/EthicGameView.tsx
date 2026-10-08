import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Users,
  HeartPulse,
  Scale,
  ExternalLink,
  MessageSquare,
  Layers,
  BookOpen,
  FileSpreadsheet,
  HelpCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface EthicGameViewProps {
  onComplete: () => void;
}

const PADLET_URL = 'https://padlet.com/Jan_Rosenow_ZPA/ce08-u2-stephan-heike-r4xwez0sk2l99nn3';

const CE_OVERVIEW_STEPS = [
  { ds: 'DS 1', title: 'Ethik-Fundament', desc: 'Selbsterfahrung Fremdbestimmung & Verhaltensregeln', color: 'bg-emerald-600' },
  { ds: 'DS 2', title: 'PEF-Theorie & CNE', desc: '3 Entscheidungsmodelle nach Gunnar Geuter & Quiz', color: 'bg-teal-600' },
  { ds: 'DS 3', title: 'Akutphase & Koma', desc: 'Videosequenz 1, 13 ABEDL & Entlassungs-Adventure', color: 'bg-[#264653]' },
  { ds: 'DS 4', title: 'Zweitmeinung Belgien', desc: 'Videosequenz 2, MCS-Diagnostik & Kassen-Adventure', color: 'bg-[#1E3640]' },
  { ds: 'DS 5', title: 'Frühreha & Krise', desc: 'Videosequenz 3, Absaugen & Schockraum-Adventure', color: 'bg-indigo-700' },
  { ds: 'DS 6', title: 'Wohnraum & Entlassung', desc: 'Videosequenz 4, 4h-Katheter & Caregiver-Adventure', color: 'bg-purple-700' },
  { ds: 'DS 7', title: 'Finale & Synthese', desc: 'Videosequenz 5, Ethik-Manifest & Zertifikat', color: 'bg-amber-600' },
];

const RULES_DATA = [
  {
    title: '1. Geschützter Raum (Safe Space) & Vertraulichkeit',
    desc: 'Persönliche Erfahrungen, emotionale Reaktionen und Wortmeldungen bleiben im Kursraum. Es gibt kein „falsches Gefühl“.',
  },
  {
    title: '2. Respekt vor unterschiedlichen ethischen Haltungen',
    desc: 'In Dilemmasituationen gibt es selten einfache Schwarz-Weiß-Lösungen. Wir hören aktiv zu und lassen andere Perspektiven stehen.',
  },
  {
    title: '3. Selbstfürsorge & Stopp-Signal',
    desc: 'Der Fall berührt existenzielle Themen (Wachkoma, Überlastung). Jede/r darf kurz durchatmen oder sich aus emotionalen Debatten zurückziehen.',
  },
  {
    title: '4. Wertschätzende Feedbackkultur',
    desc: 'Kritik richtet sich immer an Handlungen und Argumente, niemals an Personen. Wir lernen gemeinsam am realen Pflegefall.',
  },
];

export const EthicGameView: React.FC<EthicGameViewProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState<'game' | 'overview' | 'rules'>('overview');
  const [unlockedStep, setUnlockedStep] = useState<number>(1);

  const handleUnlockNext = (nextStep: number) => {
    sounds.playSuccess();
    setUnlockedStep(nextStep);

    setTimeout(() => {
      const el = document.getElementById(`ethic-game-step-${nextStep}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="space-y-6 text-[#2B2D42]">
      {/* Top Header Navigation Tabs */}
      <div className="bg-white border-2 border-[#264653]/20 rounded-2xl p-4 sm:p-5 card-soft-shadow space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white">
                Doppelstunde 1 • Einstieg &amp; Selbsterfahrung
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Curriculare Einheit 08 (CE 08)
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-[#264653] mt-1">
              Unsere Entscheidung? – Ethisches Fundament &amp; Selbstbestimmung
            </h1>
          </div>

          {/* 3 Main Navigation Buttons for DS 1 */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); setActiveTab('overview'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-[#264653] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Übersicht über die CE</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTab('rules'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-[#264653] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#2B2D42]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Verhaltensregeln</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTab('game'); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'game'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. Ethik-Spiel (Hauptteil)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Übersicht über die CE (SmartArt Process Flow) */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#264653] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#E76F51]" />
                <span>Curriculare Struktur der gesamten Unterrichtsreihe (7 Doppelstunden)</span>
              </h3>
              <p className="text-xs text-[#2B2D42]/80 leading-relaxed [text-wrap:pretty]">
                Diese Unterrichtsreihe verknüpft die bewegende Originaldokumentation von Stefan und Heike mit den Modellen der Partizipativen Entscheidungsfindung (PEF), den 13 ABEDL nach Monika Krohwinkel und interaktiven Fall-Adventures:
              </p>
            </div>

            {/* Visual SmartArt Timeline / Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 pt-1">
              {CE_OVERVIEW_STEPS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-slate-200 rounded-xl p-3 space-y-1.5 card-soft-shadow hover:border-[#264653] transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${item.color}`}>
                      {item.ds}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#264653] line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-600 leading-snug line-clamp-3 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-start pt-2">
              <button
                onClick={() => { sounds.playClick(); setActiveTab('rules'); }}
                className="px-4 py-2 rounded-xl bg-[#264653] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#1E3640] cursor-pointer"
              >
                <span>Weiter zu: 2. Verhaltensregeln</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Verhaltensregeln absprechen */}
        {activeTab === 'rules' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Gemeinsame Verhaltensregeln &amp; Safe Space für ethische Diskussionen</span>
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed [text-wrap:pretty]">
                Der Fall Stefan &amp; Heike berührt existenzielle Fragen zu Leben, Tod, Behinderung und familiärer Überlastung. Bitte sprechen Sie folgende 4 Grundregeln im Klassenverband ab:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {RULES_DATA.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border-2 border-slate-200 space-y-1.5 card-soft-shadow"
                >
                  <strong className="text-xs font-bold text-[#264653] block">
                    {rule.title}
                  </strong>
                  <p className="text-xs text-[#2B2D42]/80 leading-relaxed [text-wrap:pretty]">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-start pt-2">
              <button
                onClick={() => { sounds.playClick(); setActiveTab('game'); }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Verstanden – Jetzt zum 3. Ethik-Spiel starten</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TAB 3: ETHIK-SPIEL (PROGRESSIVES ZETTEL-EXPERIMENT)                       */}
      {/* ========================================================================= */}
      {activeTab === 'game' && (
        <div className="space-y-6">
          {/* SmartArt-Style Visual Flow Header for the 4 Steps */}
          <div className="bg-gradient-to-br from-[#264653] via-[#1E3640] to-[#15272E] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#264653] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#E76F51]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white">
                  Selbsterfahrungs-Experiment
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Schritt für Schritt aufdecken
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white [text-wrap:balance]">
                Das Zettel-Spiel: Was bedeutet Selbstbestimmung und Fremdbestimmung?
              </h2>

              <p className="text-xs text-slate-200 leading-relaxed [text-wrap:pretty]">
                Die Teilnehmenden erarbeiten dieses Experiment auf <strong>physischen Notizzetteln/Kärtchen</strong>. Die einzelnen Schritte werden von der Lehrkraft nacheinander freigeschaltet, um die didaktische Spannung zu wahren.
              </p>
            </div>

            {/* SmartArt Process Chevron Diagram */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                {/* Step 1 Visual Box */}
                <div className={`p-2.5 rounded-xl border transition-all ${unlockedStep >= 1 ? 'bg-white/15 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                    <span>1. Physisch</span>
                    {unlockedStep > 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <strong className="block text-xs mt-0.5">10 Zettel notieren</strong>
                  <span className="text-[10px] text-slate-300 block">Werte &amp; Identität</span>
                </div>

                {/* Step 2 Visual Box */}
                <div className={`p-2.5 rounded-xl border transition-all ${unlockedStep >= 2 ? 'bg-white/15 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                    <span>2. Padlet Spalte 1</span>
                    {unlockedStep > 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <strong className="block text-xs mt-0.5">5 Zettel streichen</strong>
                  <span className="text-[10px] text-slate-300 block">Eintrag &amp; Plenum</span>
                </div>

                {/* Step 3 Visual Box */}
                <div className={`p-2.5 rounded-xl border transition-all ${unlockedStep >= 3 ? 'bg-white/15 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                    <span>3. Padlet Spalte 2</span>
                    {unlockedStep > 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <strong className="block text-xs mt-0.5">Zetteltausch Lehrkraft</strong>
                  <span className="text-[10px] text-slate-300 block">Fremdstreichung &amp; Plenum</span>
                </div>

                {/* Step 4 Visual Box */}
                <div className={`p-2.5 rounded-xl border transition-all ${unlockedStep >= 4 ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  <div className="flex items-center justify-between text-[10px] uppercase">
                    <span>4. Synthese</span>
                    {unlockedStep >= 4 && <Sparkles className="w-3.5 h-3.5" />}
                  </div>
                  <strong className="block text-xs mt-0.5">Plenums-Auswertung</strong>
                  <span className="text-[10px] block">Transfer zu DS 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SCHRITT 1: 10 PHYSISCHE KÄRTCHEN BESCHRIFTEN                              */}
          {/* ========================================================================= */}
          <div
            id="ethic-game-step-1"
            className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#264653] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  1
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-[#264653]">
                    Phase 1 • Physische Einzelarbeit (ca. 5–7 Min.)
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                    Schritt 1: Das persönliche Werte-Fundament auf 10 Kärtchen notieren
                  </h3>
                </div>
              </div>

              {unlockedStep > 1 && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Kärtchen bereit
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed">
              <div className="p-4 bg-[#F8FAFB] rounded-xl border border-slate-200 space-y-2">
                <strong className="text-[#264653] block font-bold">Arbeitsauftrag an die Teilnehmenden:</strong>
                <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
                  <li>Nehmen Sie sich <strong>10 leere physische Notizzettel oder Moderationskarten</strong> zur Hand.</li>
                  <li>Schreiben Sie auf jedes Kärtchen genau <strong>einen Begriff</strong> (eine Person, einen Wert, eine Gewohnheit, ein Hobby oder ein Lebensziel), der für Ihr persönliches Lebensglück und Ihre Identität unverzichtbar ist.</li>
                  <li><em>Beispiele:</em> „Meine Familie“, „Unabhängig sein“, „Reisen“, „Mein Motorrad“, „Körperliche Fitness“, „Privatsphäre &amp; eigene Wohnung“, „Guter Kaffee &amp; Essen“, „Mein Beruf als Pflegekraft“, etc.</li>
                </ol>
              </div>
            </div>

            {unlockedStep === 1 && (
              <div className="pt-2 flex justify-start border-t border-slate-100">
                <button
                  onClick={() => handleUnlockNext(2)}
                  className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                >
                  <Unlock className="w-4 h-4 text-amber-400" />
                  <span>Alle 10 Zettel bereit – Weiter zu Schritt 2 (Eigene Reduktion &amp; Padlet Spalte 1)</span>
                  <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                </button>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SCHRITT 2: 5 STREICHEN & PADLET SPALTE 1                                  */}
          {/* ========================================================================= */}
          {unlockedStep >= 2 && (
            <div
              id="ethic-game-step-2"
              className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#264653] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    2
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                      Phase 2 • Krisensimulation &amp; Padlet Spalte 1
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                      Schritt 2: Die erste persönliche Reduktion (5 von 10 Zetteln streichen)
                    </h3>
                  </div>
                </div>

                {unlockedStep > 2 && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Padlet Spalte 1 erfasst
                  </span>
                )}
              </div>

              <div className="space-y-4 text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed">
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <strong className="text-amber-950 font-bold block">1. Physischer Streich-Auftrag:</strong>
                  <p className="text-amber-900 [text-wrap:pretty]">
                    Stellen Sie sich vor, eine schwere Lebenskrise, ein Unfall oder eine plötzliche Erkrankung trifft Sie: <strong>Streichen Sie selbst 5 Ihrer 10 Kärtchen durch</strong> bzw. legen Sie diese zur Seite. Welche 5 existenziellen Dinge behalten Sie in Ihren Händen?
                  </p>
                </div>

                {/* Direct Padlet Launch Box for Column 1 */}
                <div className="p-5 bg-gradient-to-br from-[#264653] to-[#1E3640] text-white rounded-2xl border border-[#264653] space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono">
                      Padlet • Spalte 1 Eintragung
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white">
                    2. Tragen Sie Ihre Entscheidung in Spalte 1 im Padlet ein:
                  </h4>

                  <p className="text-xs text-slate-200 leading-relaxed [text-wrap:pretty]">
                    <strong>Arbeitsauftrag für Spalte 1:</strong> Beschreiben Sie kurz: <em>Wie kamen Sie zu dieser Entscheidung? Nach welchen Kriterien haben Sie ausgewählt, was gestrichen und was behalten wurde?</em>
                  </p>

                  <div className="pt-2">
                    <a
                      href={PADLET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all transform hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Padlet öffnen &amp; in Spalte 1 eintragen</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Plenum Evaluation Note */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <strong className="text-[#264653] font-bold block">• Gemeinsame Auswertung im Plenum:</strong>
                  <p className="text-slate-700">
                    Die Lehrkraft bespricht die ersten Eindrücke aus Spalte 1 mit dem Kurs, bevor Schritt 3 eingeleitet wird.
                  </p>
                </div>
              </div>

              {unlockedStep === 2 && (
                <div className="pt-2 flex justify-start border-t border-slate-100">
                  <button
                    onClick={() => handleUnlockNext(3)}
                    className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                  >
                    <Unlock className="w-4 h-4 text-amber-400" />
                    <span>Plenumsbesprechung Spalte 1 abgeschlossen – Weiter zu Schritt 3 (Zetteltausch &amp; Padlet Spalte 2)</span>
                    <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCHRITT 3: ZETTELTAUSCH DURCH LEHRKRAFT & PADLET SPALTE 2                 */}
          {/* ========================================================================= */}
          {unlockedStep >= 3 && (
            <div
              id="ethic-game-step-3"
              className="bg-white border-2 border-rose-300 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    3
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300">
                      Phase 3 • Ethischer Schock &amp; Padlet Spalte 2
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                      Schritt 3: Zetteltausch durch die Lehrkraft &amp; Fremdbestimmung
                    </h3>
                  </div>
                </div>

                {unlockedStep > 3 && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Padlet Spalte 2 erfasst
                  </span>
                )}
              </div>

              <div className="space-y-4 text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed">
                {/* Methodischer Ablauf des Tauschs */}
                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-xl space-y-2">
                  <strong className="text-rose-950 font-bold block">1. Ablauf der Fremdstreichung durch die Lehrkraft:</strong>
                  <ol className="space-y-1.5 list-decimal list-inside text-rose-900">
                    <li>Die Lehrkraft sammelt die 5 verbliebenen Kärtchen aller Teilnehmenden ein und <strong>tauscht diese gemischt im Raum aus</strong>.</li>
                    <li>Jede/r erhält 5 fremde Kärtchen und streicht <strong>ohne Rücksprache und ohne Begründung 2 weitere Kriterien weg</strong>.</li>
                    <li>Die Lehrkraft sammelt die Kärtchen wieder ein und <strong>verteilt sie an die Ursprungsperson zurück</strong>.</li>
                  </ol>
                </div>

                {/* Direct Padlet Launch Box for Column 2 */}
                <div className="p-5 bg-gradient-to-br from-[#264653] to-[#1E3640] text-white rounded-2xl border border-[#264653] space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-400 text-slate-950 font-mono">
                      Padlet • Spalte 2 Eintragung
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white">
                    2. Tragen Sie Ihre Reaktion in Spalte 2 im Padlet ein:
                  </h4>

                  <p className="text-xs text-slate-200 leading-relaxed [text-wrap:pretty]">
                    <strong>Arbeitsauftrag für Spalte 2:</strong> <em>Wie haben Sie sich gefühlt, als jemand fremdes über Ihre existentiellen Zettel entschieden hat? Was hat dieser Kontrollverlust ausgelöst?</em>
                  </p>

                  <div className="pt-2">
                    <a
                      href={PADLET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-400 hover:bg-rose-300 active:bg-rose-500 text-slate-950 font-bold text-xs shadow-md transition-all transform hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Padlet öffnen &amp; in Spalte 2 eintragen</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Plenum Evaluation Note */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <strong className="text-[#264653] font-bold block">• Gemeinsame Auswertung im Plenum:</strong>
                  <p className="text-slate-700">
                    Die Lehrkraft reflektiert gemeinsam mit dem Kurs die Einträge aus Spalte 2: Wut, Machtlosigkeit, Bevormundung und der Schock des Kontrollverlusts.
                  </p>
                </div>
              </div>

              {unlockedStep === 3 && (
                <div className="pt-2 flex justify-start border-t border-slate-100">
                  <button
                    onClick={() => handleUnlockNext(4)}
                    className="px-6 py-3 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
                  >
                    <Unlock className="w-4 h-4 text-amber-400" />
                    <span>Plenumsbesprechung Spalte 2 abgeschlossen – Weiter zu Schritt 4 (Gemeinsame Sammlung Pflegepraxis)</span>
                    <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCHRITT 4: GEMEINSAME SAMMLUNG PFLEGEPRAXIS & ENTSCHEIDUNGSMOMENTE        */}
          {/* ========================================================================= */}
          {unlockedStep >= 4 && (
            <div
              id="ethic-game-step-4"
              className="bg-white border-2 border-[#264653]/30 rounded-2xl p-5 sm:p-6 card-soft-shadow space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#264653] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    4
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Phase 4 • Transfer &amp; Sammlung in der Pflege
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#264653] mt-0.5">
                      Schritt 4: Gemeinsame Sammlung – Entscheidungssituationen in der Pflege
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Abschluss DS 1
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-[13px] text-[#2B2D42] leading-relaxed">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <strong className="text-[#264653] font-bold block text-sm">
                    Arbeitsauftrag für das Plenum:
                  </strong>
                  <p className="text-slate-700 [text-wrap:pretty]">
                    Sammeln Sie gemeinsam im Kurs konkrete Situationen aus dem pflegerischen Alltag, in denen Entscheidungen gefällt werden müssen:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Spalte 1: Zu pflegende Personen */}
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span>1. Zu pflegende Personen</span>
                    </div>
                    <p className="text-[12px] text-emerald-950 [text-wrap:pretty]">
                      Welche existenziellen Entscheidungen müssen Pflegebedürftige treffen? (z.&nbsp;B. Therapiezustimmung, PEG-Anlage, Heimeinzug, Schmerztherapie).
                    </p>
                  </div>

                  {/* Spalte 2: Angehörige / Zugehörige */}
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span>2. Angehörige &amp; Zugehörige</span>
                    </div>
                    <p className="text-[12px] text-amber-950 [text-wrap:pretty]">
                      Vor welchen Weichenstellungen stehen Nahestehende? (z.&nbsp;B. Berufsaufgabe, häusliche 24h-Pflege, Entlastungsangebote, Patientenverfügung).
                    </p>
                  </div>

                  {/* Spalte 3: Umstände & Rahmen */}
                  <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 font-bold text-purple-900">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span>3. Umstände (Eigen vs. Fremd)</span>
                    </div>
                    <p className="text-[12px] text-purple-950 [text-wrap:pretty]">
                      Unter welchen Bedingungen geschieht dies? Wann agieren Personen eigenbestimmt, wann erleben sie Fremdbestimmung oder Paternalismus?
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-[#264653] to-[#1E3640] text-white rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Didaktischer Bogen zum Fall Stefan &amp; Heike:</span>
                  </div>
                  <p className="text-xs text-slate-200 [text-wrap:pretty] leading-relaxed">
                    Genau dieses Spannungsfeld aus existentiellen Weichenstellungen, Fremdbestimmung und partnerschaftlicher Entscheidungsfindung (PEF) begleitet uns durch die folgenden Doppelstunden im Fall Stefan &amp; Heike.
                  </p>
                </div>
              </div>

              {/* Completion Button to advance to DS 2 */}
              <div className="pt-3 border-t border-slate-200 flex justify-start">
                <button
                  onClick={onComplete}
                  className="px-7 py-3.5 rounded-2xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Doppelstunde 1 abschließen &amp; Zurück zur Übersicht (DS 2 freischalten)</span>
                  <ArrowRight className="w-4 h-4 text-[#E76F51]" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
