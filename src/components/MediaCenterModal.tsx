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
  CheckCircle2,
  Sparkles,
  Play
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MediaItem {
  id: string;
  category: 'video' | 'literature' | 'template';
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
    title: 'Videosequenz 1: Die Akutphase nach dem Unfall',
    subtitle: 'Doppelstunde 3: Notaufnahme & Schock',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/0888b573-24ee-4ae4-bdd8-44a95bf1c4e0?time=0',
    durationOrPages: 'ca. 8-10 Min.',
    description: 'Erste Begegnung von Heike mit dem intubierten Stefan auf der Intensivstation.',
  },
  {
    id: 'vid2',
    category: 'video',
    title: 'Videosequenz 2: Ernährung, Zweitmeinung & Gehversuche',
    subtitle: 'Doppelstunde 4: PEG-Sonde vs. Schluckversuche',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/e8dfe12a-167b-4d55-824a-6c0053c887b4',
    durationOrPages: 'ca. 10 Min.',
    description: 'Spezialdiagnostik in Belgien, PEG-Ernährung und der Kampf um erste Schritte.',
  },
  {
    id: 'vid3',
    category: 'video',
    title: 'Videosequenz 3: Frührehabilitation & Kommunikationshilfen',
    subtitle: 'Doppelstunde 5: Augensteuerung, Talker & Frustration',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/46eba7a7-3e4d-4c70-ad6c-e9e1b6bb584a?time=0',
    durationOrPages: 'ca. 11 Min.',
    description: 'Einsatz von High-Tech Hilfsmitteln und Bewältigung von Erschöpfung.',
  },
  {
    id: 'vid4',
    category: 'video',
    title: 'Videosequenz 4: Die Entscheidung – Pflegeheim oder Zuhause?',
    subtitle: 'Doppelstunde 6: Angehörigenbelastung & Entlassmanagement',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/b29b77b4-810d-4c5a-a961-3b7a7a07c29d?time=0',
    durationOrPages: 'ca. 12 Min.',
    description: 'Heikes existentieller Konflikt und die Suche nach professionellen Hilfen.',
  },
  {
    id: 'vid5',
    category: 'video',
    title: 'Videosequenz 5: Das Finale – Leben mit der Entscheidung',
    subtitle: 'Doppelstunde 7: Häusliche Intensivpflege & Alltag',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/87e3e111-e072-4b05-a384-5af77b284961?time=0',
    durationOrPages: 'ca. 12 Min.',
    description: 'Gemeinsames Leben zu Hause mit ambulanter Unterstützung.',
  },
  {
    id: 'vid_doku',
    category: 'video',
    title: 'Original-Dokumentation: Der Fall Stefan & Heike (Vollversion)',
    subtitle: 'YouTube Reportage',
    source: 'YouTube',
    url: 'https://youtu.be/ik4bNoard2o?si=FO-tGrcZX6PeDlR6',
    durationOrPages: 'Vollständige Dokumentation',
    description: 'Die ungekürzte Originaldokumentation über Stefans und Heikes Schicksal.',
  },
  {
    id: 'lit1',
    category: 'literature',
    title: 'CNE Fachartikel: Informationen teilen, gemeinsam entscheiden (Thieme)',
    subtitle: 'Thieme Fachfortbildung • Entscheidungsfindungsmodelle',
    source: 'CNE / Thieme PDF',
    url: '/docs/Informationen%20teilen%20gemeinsam%20entscheiden_Thieme.pdf',
    durationOrPages: 'Direkt-Download PDF',
    description: 'Vollständiger Fachartikel zur partizipativen Entscheidungsfindung (PEF), Paternalismus und dem Informed Decision Making Model in der Pflege.',
  },
  {
    id: 'lit1_elearn',
    category: 'literature',
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
    title: 'Arbeitsdokument: 3. Entscheidungen Videosequenzen (.docx)',
    subtitle: 'Digitale Vorlage zur Situations- & Entscheidungsanalyse',
    source: 'Word-Vorlage (.docx)',
    url: '/docs/3.%20Entscheidungsidentifikation.docx',
    durationOrPages: 'Formatierte Word-Datei',
    description: 'Offizielle Vorlage zur Beantwortung von: Wer war zu sehen?, Was ist passiert?, Welche Entscheidungen wurden getroffen?',
  },
  {
    id: 'lit3',
    category: 'literature',
    title: 'ABEDL Pflegemodell nach Monika Krohwinkel',
    subtitle: 'Aktivitäten und existenzielle Erfahrungen des Lebens',
    source: 'Pflegewissenschaft',
    url: 'https://de.wikipedia.org/wiki/Aktivit%C3%A4ten_und_existenzielle_Erfahrungen_des_Lebens',
    durationOrPages: 'Strukturierte Übersicht',
    description: 'Definition und Operationalisierung der 13 ABEDL-Kategorien.',
  },
];

export const MediaCenterModal: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [filterCategory, setFilterCategory] = useState<'all' | 'video' | 'literature'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (activeModal !== 'media') return null;

  const filteredItems = MEDIA_LIBRARY.filter((item) => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#2B2D42]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#264653] text-white flex items-center justify-center shadow-md">
              <Film className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#264653]">Zentrales Mediencenter (Media Library)</h2>
              <p className="text-xs text-[#2B2D42]/70">Alle Videosequenzen, CNE Fachartikel und Arbeitsmaterialien</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-[#2B2D42] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#264653] text-white shadow-xs'
                  : 'text-[#2B2D42] bg-slate-100 hover:bg-slate-200'
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
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/60'
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
                  : 'text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Fachartikel ({MEDIA_LIBRARY.filter((m) => m.category === 'literature').length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Materialien suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white"
            />
          </div>
        </div>

        {/* Media Grid - Color coded by MediaType */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F7F9FA]">
          {filteredItems.map((item) => {
            const isVideo = item.category === 'video';
            const isTemplate = item.category === 'template';
            const isLiterature = item.category === 'literature';

            return (
              <div
                key={item.id}
                className={`border rounded-2xl p-4 flex flex-col justify-between transition-all card-soft-shadow group ${
                  isVideo
                    ? 'bg-gradient-to-br from-white via-rose-50/20 to-amber-50/30 border-rose-200/80 hover:border-rose-400 hover:shadow-md'
                    : isTemplate
                    ? 'bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 border-blue-200/80 hover:border-blue-400 hover:shadow-md'
                    : 'bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30 border-teal-200/80 hover:border-teal-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-xs shrink-0 ${
                          isVideo
                            ? 'bg-rose-500 text-white'
                            : isTemplate
                            ? 'bg-blue-600 text-white'
                            : 'bg-teal-600 text-white'
                        }`}
                      >
                        {isVideo ? (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        ) : isTemplate ? (
                          <Download className="w-3.5 h-3.5" />
                        ) : (
                          <FileText className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isVideo
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : isTemplate
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-teal-100 text-teal-800 border-teal-200'
                        }`}
                      >
                        {item.source}
                      </span>
                    </div>

                    {item.durationOrPages && (
                      <span className="text-[11px] font-mono text-[#2B2D42]/60 font-semibold bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/60">
                        {item.durationOrPages}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xs font-bold transition-colors leading-snug ${
                      isVideo
                        ? 'text-slate-900 group-hover:text-rose-700'
                        : isTemplate
                        ? 'text-slate-900 group-hover:text-blue-700'
                        : 'text-slate-900 group-hover:text-teal-700'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#2B2D42]/80 font-medium">{item.subtitle}</p>
                  <p className="text-xs text-[#2B2D42]/70 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3.5 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-[#2B2D42]/50 font-medium">
                    {isVideo ? 'Streaming / Video' : isTemplate ? 'Word-Dokument' : 'Fachartikel / PDF'}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3.5 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                      isVideo
                        ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                        : isTemplate
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        : 'bg-teal-700 hover:bg-teal-800 shadow-teal-700/20'
                    }`}
                  >
                    <span>{isVideo ? 'Video ansehen' : isTemplate ? 'Vorlage öffnen' : 'Artikel öffnen'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#F7F9FA] flex items-center justify-between text-xs text-[#2B2D42]/70">
          <span>Alle Ressourcen sind für den Ausbildungsgebrauch freigegeben.</span>
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[#2B2D42] font-bold text-xs transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
