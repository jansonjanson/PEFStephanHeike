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
    title: 'CNE Fachartikel: Informationen teilen, gemeinsam entscheiden (Thieme)',
    subtitle: 'Thieme Fachfortbildung • Entscheidungsfindungsmodelle',
    source: 'CNE / Thieme PDF',
    url: 'https://github.com/jansonjanson/PEFStephanHeike/raw/main/Informationen%20teilen%20gemeinsam%20entscheiden_Thieme.pdf',
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
    url: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/3.%20Entscheidungsidentifikation.docx',
    durationOrPages: 'Formatierte Word-Datei',
    description: 'Offizielle Vorlage zur Beantwortung von: Wer war zu sehen?, Was ist passiert?, Welche Entscheidungen wurden getroffen?',
  },
  {
    id: 'lit3',
    category: 'literature',
    title: 'ABEDL Pflegemodell nach Monika Krohwinkel',
    subtitle: 'Aktivitäten, Beziehungen und existenzielle Erfahrungen des Lebens',
    source: 'Pflegewissenschaft',
    url: 'https://de.wikipedia.org/wiki/Aktivit%C3%A4ten,_Beziehungen_und_existenzielle_Erfahrungen_des_Lebens',
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
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#264653] text-white'
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'video'
                  ? 'bg-[#264653] text-white'
                  : 'text-[#2B2D42] bg-slate-100 hover:bg-slate-200'
              }`}
            >
              Videos ({MEDIA_LIBRARY.filter((m) => m.category === 'video').length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFilterCategory('literature');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === 'literature'
                  ? 'bg-[#264653] text-white'
                  : 'text-[#2B2D42] bg-slate-100 hover:bg-slate-200'
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
              className="w-full bg-[#F7F9FA] border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2B2D42] placeholder-slate-400 focus:outline-none focus:border-[#264653] focus:bg-white"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F9FA] border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#264653]/40 transition-all card-soft-shadow group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.category === 'video'
                        ? 'bg-[#264653]/10 text-[#264653]'
                        : 'bg-[#E76F51]/10 text-[#E76F51]'
                    }`}
                  >
                    {item.source}
                  </span>
                  {item.durationOrPages && (
                    <span className="text-[11px] font-mono text-[#2B2D42]/60 font-semibold">
                      {item.durationOrPages}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-[#264653] group-hover:text-[#E76F51] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#2B2D42]/80 font-medium">{item.subtitle}</p>
                <p className="text-xs text-[#2B2D42]/70 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-[#2B2D42]/50">Direktlink</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#264653] hover:bg-[#1E3640] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>{item.category === 'video' ? 'Video ansehen' : 'Artikel öffnen'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
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
