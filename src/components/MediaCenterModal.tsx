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
    description: 'Erste Begegnung von Heike mit dem intubierten Stephan auf der Intensivstation.',
  },
  {
    id: 'vid2',
    category: 'video',
    title: 'Videosequenz 2: Weaning, Trachealkanüle & Ernährung',
    subtitle: 'Doppelstunde 4: PEG-Sonde vs. Schluckversuche',
    source: 'SlidePresenter',
    url: 'https://app.slidepresenter.com/presentations/e8dfe12a-167b-4d55-824a-6c0053c887b4',
    durationOrPages: 'ca. 10 Min.',
    description: 'Weaning-Prozess, Trachealkanülenmanagement und der Wunsch nach Geschmack.',
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
    title: 'Original-Dokumentation: Der Fall Stephan & Heike (Vollversion)',
    subtitle: 'YouTube Reportage',
    source: 'YouTube',
    url: 'https://youtu.be/ik4bNoard2o?si=FO-tGrcZX6PeDlR6',
    durationOrPages: 'Vollständige Dokumentation',
    description: 'Die ungekürzte Originaldokumentation über Stephans und Heikes Schicksal.',
  },
  {
    id: 'lit1',
    category: 'literature',
    title: 'CNE Fachartikel: Partizipative Entscheidungsfindung (PEF) in der Pflege',
    subtitle: 'Thieme Gruppe / CNE Fachfortbildung',
    source: 'CNE / Pflegeethik',
    url: 'https://www.thieme.de',
    durationOrPages: '6 Seiten Fachartikel',
    description: 'Grundlagen der 3 Entscheidungsmodelle, Rollendefinitionen und pflegeethische Relevanz.',
  },
  {
    id: 'lit2',
    category: 'literature',
    title: 'ABEDL Pflegemodell nach Monika Krohwinkel',
    subtitle: 'Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens',
    source: 'Pflegewissenschaft',
    url: 'https://de.wikipedia.org/wiki/Aktivit%C3%A4ten,_Beziehungen_und_existenzielle_Erfahrungen_des_Lebens',
    durationOrPages: 'Strukturierte Übersicht',
    description: 'Definition und PESR-Operationalisierung der 13 ABEDL-Kategorien.',
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Zentrales Mediencenter (Media Library)</h2>
              <p className="text-xs text-slate-400">Alle Videosequenzen, CNE Fachartikel und Arbeitsmaterialien</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveModal('none');
            }}
            className="w-9 h-9 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Alle ({MEDIA_LIBRARY.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('video');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === 'video'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Videos ({MEDIA_LIBRARY.filter((m) => m.category === 'video').length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('literature');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === 'literature'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fachartikel & Quellen ({MEDIA_LIBRARY.filter((m) => m.category === 'literature').length})
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
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.category === 'video'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {item.source}
                  </span>
                  {item.durationOrPages && (
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.durationOrPages}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-teal-400 font-medium">{item.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Direktlink</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20"
                >
                  <span>{item.category === 'video' ? 'Video ansehen' : 'Artikel öffnen'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Alle Ressourcen sind für den Ausbildungsgebrauch freigegeben.</span>
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
