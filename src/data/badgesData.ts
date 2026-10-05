import { AchievementBadge } from '../types';

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge_onboarding',
    title: 'Startlinie überquert',
    description: 'Onboarding abgeschlossen und den Fall Stephan & Heike kennengelernt.',
    icon: 'Flag',
    category: 'progress',
  },
  {
    id: 'badge_ethik_pionier',
    title: 'Ethischer Kompass',
    description: 'DS 1: Zettel-Streichen-Übung reflektiert und Kriterien zur Selbstbestimmung erarbeitet.',
    icon: 'Compass',
    category: 'ethics',
  },
  {
    id: 'badge_quiz_master',
    title: 'Theorie-Experte',
    description: 'DS 2: Das Quiz zu den 3 Entscheidungsmodellen mit mindestens 80% bestanden.',
    icon: 'Award',
    category: 'progress',
  },
  {
    id: 'badge_anamnese_profi',
    title: 'Krohwinkel-Spezialist',
    description: 'Alle 13 ABEDL nach Krohwinkel in einer Pflegeanamnese vollständig mit PESR befüllt.',
    icon: 'FileSpreadsheet',
    category: 'documentation',
  },
  {
    id: 'badge_pef_champion',
    title: 'PEF-Champion',
    description: 'In den Simulationen wiederholt die partizipative Entscheidungsfindung (PEF) gewählt.',
    icon: 'Users',
    category: 'simulation',
  },
  {
    id: 'badge_code_breaker',
    title: 'Passwort-Tresor geknackt',
    description: 'Alle Musterlösungen durch das Erspielen der Passwörter freigeschaltet.',
    icon: 'KeyRound',
    category: 'progress',
  },
  {
    id: 'badge_grand_master',
    title: 'Pflegeethik & Partizipations-Zertifikat',
    description: 'Alle 7 Doppelstunden erfolgreich absolviert und das Abschluss-Zertifikat erworben.',
    icon: 'Trophy',
    category: 'progress',
  },
];
