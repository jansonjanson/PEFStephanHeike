import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Film,
  X,
  ExternalLink,
  BookOpen,
  Download,
  FileText,
  Search,
  Sparkles,
  Play,
  GraduationCap,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MediaItem {
  id: string;
  category: 'video' | 'literature' | 'template' | 'science';
  typeLabel: string;
  title: string;
  subtitle: string;
  source: string;
  url: string;
  durationOrPages?: string;
  description: string;
}

const MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'vid1',
    category: 'video',
    typeLabel: 'Video-Ausschnitt',
    title: 'Videosequenz 1: Die Akutphase nach dem Unfall',
    subtitle: 'Doppelstunde 3: Notaufnahme & Schock',
    source: 'SlidePresenter Video',
    url: 'https://app.slidepresenter.com/presentations/0888b573-24ee-4ae4-bdd8-44a95bf1c4e0?time=0',
    durationOrPages: 'ca. 8-10 Min.',
    description: 'Erste Begegnung von Heike mit dem intubierten Stefan auf der Intensivstation.',
  },
  {
    id: 'vid2',
    category: 'video',
    typeLabel: 'Video-Ausschnitt',
    title: 'Videosequenz 2: Ernährung, Zweitmeinung & Gehversuche',
    subtitle: 'Doppelstunde 4: PEG-Sonde vs. Schluckversuche',
    source: 'SlidePresenter Video',
    url: 'https://app.slidepresenter.com/presentations/e8dfe12a-167b-4d55-824a-6c0053c887b4',
    durationOrPages: 'ca. 10 Min.',
    description: 'Spezialdiagnostik in Belgien, PEG-Ernährung und der Kampf um erste Schritte.',
  },
  {
    id: 'vid3',
    category: 'video',
    typeLabel: 'Video-Ausschnitt',
    title: 'Videosequenz 3: Frührehabilitation & Kommunikationshilfen',
    subtitle: 'Doppelstunde 5: Augensteuerung, Talker & Frustration',
    source: 'SlidePresenter Video',
    url: 'https://app.slidepresenter.com/presentations/46eba7a7-3e4d-4c70-ad6c-e9e1b6bb584a?time=0',
    durationOrPages: 'ca. 11 Min.',
    description: 'Einsatz von High-Tech Hilfsmitteln und Bewältigung von Erschöpfung.',
  },
  {
    id: 'vid4',
    category: 'video',
    typeLabel: 'Video-Ausschnitt',
    title: 'Videosequenz 4: Die Entscheidung – Pflegeheim oder Zuhause?',
    subtitle: 'Doppelstunde 6: Angehörigenbelastung & Entlassmanagement',
    source: 'SlidePresenter Video',
    url: 'https://app.slidepresenter.com/presentations/b29b77b4-810d-4c5a-a961-3b7a7a07c29d?time=0',
    durationOrPages: 'ca. 12 Min.',
    description: 'Heikes existentieller Konflikt und die Suche nach professionellen Hilfen.',
  },
  {
    id: 'vid5',
    category: 'video',
    typeLabel: 'Video-Ausschnitt',
    title: 'Videosequenz 5: Das Finale – Leben mit der Entscheidung',
    subtitle: 'Doppelstunde 7: Häusliche Intensivpflege & Alltag',
    source: 'SlidePresenter Video',
    url: 'https://app.slidepresenter.com/presentations/87e3e111-e072-4b05-a384-5af77b284961?time=0',
    durationOrPages: 'ca. 12 Min.',
    description: 'Gemeinsames Leben zu Hause mit ambulanter Unterstützung.',
  },
  {
    id: 'vid_doku',
    category: 'video',
    typeLabel: 'Vollständige Doku',
    title: 'Original-Dokumentation: Der Fall Stefan & Heike (Vollversion)',
    subtitle: 'YouTube Reportage',
    source: 'YouTube Video',
    url: 'https://youtu.be/ik4bNoard2o?si=FO-tGrcZX6PeDlR6',
    durationOrPages: 'ca. 45 Min.',
    description: 'Die ungekürzte Originaldokumentation über Stefans und Heikes Schicksal.',
  },
  {
    id: 'lit1',
    category: 'literature',
    typeLabel: 'CNE Fachartikel (PDF)',
    title: 'CNE Fachartikel: Informationen teilen, gemeinsam entscheiden (Thieme)',
    subtitle: 'Thieme Fachfortbildung • Entscheidungsfindungsmodelle',
    source: 'Thieme CNE Fortbildung',
    url: 'https://github.com/jansonjanson/PEFStephanHeike/raw/main/Informationen%20teilen%20gemeinsam%20entscheiden_Thieme.pdf',
    durationOrPages: 'Direkt-Download PDF',
    description: 'Vollständiger Fachartikel zur partizipativen Entscheidungsfindung (PEF), Paternalismus und dem Informed Decision Making Model in der Pflege.',
  },
  {
    id: 'lit1_elearn',
    category: 'literature',
    typeLabel: 'Online Fachportal',
    title: 'Zusatzquelle: E-Learning Ressource (ZFG Münster)',
    subtitle: 'Zentrum für Gesundheitsberufe • Online-Fachquelle',
    source: 'ZFG Moodle E-Learning',
    url: 'https://elearn.zfg-ms.de/mod/resource/view.php?id=230710',
    durationOrPages: 'Online-Ressource',
    description: 'Offizielle zusätzliche Bereitstellung des CNE-Fachartikels über das Lernportal des ZFG Münster.',
  },
  {
    id: 'lit2',
    category: 'template',
    typeLabel: 'Word-Vorlage (.docx)',
    title: 'Arbeitsdokument: 3. Entscheidungen Videosequenzen (.docx)',
    subtitle: 'Digitale Vorlage zur Situations- & Entscheidungsanalyse',
    source: 'Word-Vorlage (.docx)',
    url: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/3.%20Entscheidungsidentifikation.docx',
    durationOrPages: 'Formatierte Word-Datei',
    description: 'Offizielle Vorlage zur Beantwortung von: Wer war zu sehen?, Was ist passiert?, Welche Entscheidungen wurden getroffen?',
  },
  {
    id: 'lit3',
    category: 'science',
    typeLabel: 'Pflegemodell & Theorie',
    title: 'ABEDL Pflegemodell nach Monika Krohwinkel',
    subtitle: 'Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens',
    source: 'Pflegewissenschaftliche Quelle',
    url: 'https://de.wikipedia.org/wiki/Aktivit%C3%A4ten,_Beziehungen_und_existenzielle_Erfahrungen_des_Lebens',
    durationOrPages: 'Strukturierte Übersicht',
    description: 'Definition und Operationalisierung der 13 ABEDL-Kategorien im Pflegeprozess.',
  },
];

export const MediaCenterModal: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [filterCategory, setFilterCategory] = useState<'all' | 'video' | 'literature' | 'template' | 'science'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (activeModal !== 'media') return null;

  const filteredItems = MEDIA_LIBRARY.filter((item) => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getMediaTheme = (category: MediaItem['category']) => {
    switch (category) {
      case 'video':
        return {
          cardBg: 'bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40',
          border: 'border-amber-300 hover:border-amber-500 shadow-amber-900/5',
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          titleColor: 'text-amber-950 group-hover:text-amber-700',
          icon: <Film className="w-4 h-4 text-amber-600" />,
          btn: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-amber-600/20',
          btnLabel: 'Video abspielen',
        };
      case 'literature':
        return {
          cardBg: 'bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/40',
          border: 'border-teal-300 hover:border-teal-500 shadow-teal-900/5',
          badge: 'bg-teal-100 text-teal-900 border-teal-300',
          titleColor: 'text-teal-950 group-hover:text-teal-700',
          icon: <BookOpen className="w-4 h-4 text-teal-600" />,
          btn: 'bg-gradient-to-r from-[#264653] to-[#2A9D8F] hover:from-[#1E3640] hover:to-[#227D72] text-white shadow-teal-800/20',
          btnLabel: 'Fachartikel öffnen',
        };
      case 'template':
        return {
          cardBg: 'bg-gradient-to-br from-emerald-50/80 via-white to-green-50/40',
          border: 'border-emerald-300 hover:border-emerald-500 shadow-emerald-900/5',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          titleColor: 'text-emerald-950 group-hover:text-emerald-700',
          icon: <Download className="w-4 h-4 text-emerald-600" />,
          btn: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-700/20',
          btnLabel: 'Vorlage herunterladen',
        };
      case 'science':
        return {
          cardBg: 'bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/40',
          border: 'border-indigo-300 hover:border-indigo-500 shadow-indigo-900/5',
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          titleColor: 'text-indigo-950 group-hover:text-indigo-700',
          icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
          btn: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-indigo-700/20',
          btnLabel: 'Pflegemodell öffnen',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#264653] to-[#1E3640] text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E76F51] text-white flex items-center justify-center shadow-md">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide">Zentrales Mediencenter (Mediathek)</h2>
              <p className="text-xs text-white/80">
                Farblich sortiert nach Videos, CNE Fachartikeln, Arbeitsvorlagen und Pflegemodellen
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-[#F7F9FA] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs with Media Colors */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#264653] text-white shadow-xs'
                  : 'text-[#2B2D42] bg-white border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Alle ({MEDIA_LIBRARY.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('video');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'video'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos ({MEDIA_LIBRARY.filter((m) => m.category === 'video').length})</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('literature');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'literature'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-teal-900 bg-teal-50 border border-teal-200 hover:bg-teal-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Fachartikel ({MEDIA_LIBRARY.filter((m) => m.category === 'literature').length})</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('template');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'template'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-900 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Vorlagen ({MEDIA_LIBRARY.filter((m) => m.category === 'template').length})</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('science');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'science'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-indigo-900 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Theorie ({MEDIA_LIBRARY.filter((m) => m.category === 'science').length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Mediathek durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] shadow-xs"
            />
          </div>
        </div>

        {/* Media Grid with Category Color Coding */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F7F9FA]">
          {filteredItems.map((item) => {
            const theme = getMediaTheme(item.category);

            return (
              <div
                key={item.id}
                className={`${theme.cardBg} border-2 ${theme.border} rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-md group relative`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${theme.badge}`}>
                        {theme.icon}
                        <span>{item.typeLabel}</span>
                      </span>
                    </div>

                    {item.durationOrPages && (
                      <span className="text-[11px] font-mono font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/80">
                        {item.durationOrPages}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold leading-snug transition-colors ${theme.titleColor}`}>
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-700 font-semibold mt-0.5">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed [text-wrap:pretty]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3.5 mt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
                    {item.source}
                  </span>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${theme.btn}`}
                  >
                    <span>{theme.btnLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-[#2B2D42]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Alle Ressourcen sind für den generalistischen Ausbildungsgebrauch freigegeben.</span>
          </div>
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
