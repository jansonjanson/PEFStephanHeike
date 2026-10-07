import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZusatzdocData, UserModuleState, AchievementBadge, PasswordBookEntry } from '../types';
import { MODULES_DATA } from '../data/curriculumData';
import { INITIAL_BADGES } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';

export const LEVEL_PASSWORDS: { [targetModuleId: number]: { password: string; title: string; sourceModuleId: number; description: string } } = {
  1: {
    password: 'START',
    title: 'DS 1: Präsenzauftakt & Emotionaler Schock',
    sourceModuleId: 1,
    description: 'Startpunkt der Lehrveranstaltung – standardmäßig freigeschaltet.',
  },
  2: {
    password: 'THEORIE',
    title: 'DS 2: Modelle der Entscheidung',
    sourceModuleId: 1,
    description: 'Freigespielt durch den erfolgreichen Abschluss von Doppelstunde 1.',
  },
  3: {
    password: 'PARTIZIPATION',
    title: 'DS 3: Ein Unfall mit schlimmen Folgen',
    sourceModuleId: 2,
    description: 'Freigespielt durch das Bestehen des Theorie-Wissenschecks in Doppelstunde 2.',
  },
  4: {
    password: 'AUTONOMIE',
    title: 'DS 4: Spezialklinik und das veränderte Zuhause',
    sourceModuleId: 3,
    description: 'Freigespielt durch das erfolgreiche Durchspielen von Fall-Adventure 1 in Doppelstunde 3.',
  },
  5: {
    password: 'PARTNERSCHAFT',
    title: 'DS 5: Komplikationen auf dem Weg der Besserung',
    sourceModuleId: 4,
    description: 'Freigespielt durch das erfolgreiche Durchspielen von Fall-Adventure 2 in Doppelstunde 4.',
  },
  6: {
    password: 'KROHWINKEL',
    title: 'DS 6: Umbauarbeiten & Katheter-Dilemma',
    sourceModuleId: 5,
    description: 'Freigespielt durch das erfolgreiche Durchspielen von Fall-Adventure 3 in Doppelstunde 5.',
  },
  7: {
    password: 'FINALE',
    title: 'DS 7: Finale Synthese & Auswertung',
    sourceModuleId: 6,
    description: 'Freigespielt durch die Pflegedokumentation und Fall-Adventure 4 in Doppelstunde 6.',
  },
};

interface AppContextType {
  activeModuleId: number | null;
  setActiveModuleId: (id: number | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeDrawerTab: 'akte' | 'simulation' | 'auswertung' | 'didaktik';
  setActiveDrawerTab: (tab: 'akte' | 'simulation' | 'auswertung' | 'didaktik') => void;
  
  // Navigation & Modals
  activeModal: 'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm' | 'passwordBook';
  setActiveModal: (modal: 'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm' | 'passwordBook') => void;
  isOnboardingActive: boolean;
  setIsOnboardingActive: (active: boolean) => void;
  
  // Admin Mode
  isAdminMode: boolean;
  unlockAllWithAdminPassword: (password: string) => boolean;
  resetAllProgress: () => void;
  
  // Custom Map Background
  customBgUrl: string;
  setCustomBgUrl: (url: string) => void;

  // Student Info
  studentName: string;
  setStudentName: (name: string) => void;

  // Success Notification Banner
  successBanner: string | null;
  showSuccessBanner: (message: string) => void;

  // Module States (local storage)
  moduleStates: { [moduleId: number]: UserModuleState };
  openModule: (moduleId: number) => void;
  advanceModuleStep: (moduleId: number, stepNumber: number) => void;
  updateZusatzdoc: (moduleId: number, data: Partial<ZusatzdocData>) => void;
  updateAbedl: (moduleId: number, abedlId: number, field: 'info' | 'p' | 'e' | 's' | 'r', val: string) => void;
  recordSimulationChoice: (moduleId: number, stepId: string, optionId: string, stats: { pefScore: number; paternalisticScore: number; informedScore: number }) => void;
  saveQuizScore: (moduleId: number, score: number, total: number) => void;
  unlockModuleWithPassword: (moduleId: number, password: string) => boolean;
  markModuleCompleted: (moduleId: number) => void;
  
  // Password Book
  earnedPasswords: { [targetModuleId: number]: PasswordBookEntry };
  awardPasswordForNextModule: (currentModuleId: number) => void;

  // Gamification & Badges
  badges: AchievementBadge[];
  unlockBadge: (badgeId: string) => void;
  
  // Audio
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;

  // Global Progress
  totalPefScore: number;
  totalPaternalisticScore: number;
  totalInformedScore: number;
  overallProgressPercent: number;
}

const STORAGE_KEY = 'pflege_app_stephan_heike_v2';
const DEFAULT_MAP_URL = 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Map.jpg?raw=true';

const defaultEmptyState = (): { [moduleId: number]: UserModuleState } => {
  const map: { [moduleId: number]: UserModuleState } = {};
  MODULES_DATA.forEach((mod) => {
    map[mod.id] = {
      completed: false,
      stepProgress: 1, // Step 1 = Video, Step 2 = Doku, Step 3 = Sim, Step 4 = Auswertung
      zusatzdoc: {
        who: '',
        whatHappened: '',
        decisionsMade: '',
        ethicalDilemmas: '',
      },
      abedl: {},
      simulationAnswers: {},
      simulationStats: { pef: 0, paternalistic: 0, informed: 0 },
      unlockedWithPassword: mod.id === 1, // Only DS 1 initially
    };
  });
  return map;
};

const defaultInitialPasswords = (): { [targetModuleId: number]: PasswordBookEntry } => {
  return {
    1: {
      moduleId: 1,
      password: 'START',
      unlockedAt: new Date().toISOString(),
      sourceModuleId: 1,
      title: 'DS 1: Präsenzauftakt',
      description: 'Startpunkt der Lehrveranstaltung – dauerhaft verfügbar.',
    },
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'akte' | 'simulation' | 'auswertung' | 'didaktik'>('akte');
  const [activeModal, setActiveModal] = useState<'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm' | 'passwordBook'>('none');
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const tourCompleted = localStorage.getItem(`${STORAGE_KEY}_tour_completed`);
      return !tourCompleted;
    }
    return false;
  });
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(`${STORAGE_KEY}_seen_intro`);
    }
    return false;
  });
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [customBgUrl, setCustomBgUrl] = useState<string>(DEFAULT_MAP_URL);
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`${STORAGE_KEY}_student_name`) || '';
    }
    return '';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Password Book State
  const [earnedPasswords, setEarnedPasswords] = useState<{ [targetModuleId: number]: PasswordBookEntry }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY}_earned_passwords`);
        if (saved) {
          return { ...defaultInitialPasswords(), ...JSON.parse(saved) };
        }
      } catch {}
    }
    return defaultInitialPasswords();
  });

  // Save earned passwords to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_earned_passwords`, JSON.stringify(earnedPasswords));
    } catch {}
  }, [earnedPasswords]);

  // Success Banner Toast handler
  const showSuccessBanner = (message: string) => {
    setSuccessBanner(message);
    setTimeout(() => {
      setSuccessBanner((curr) => (curr === message ? null : curr));
    }, 5000);
  };

  // Save student name to local storage
  const handleSetStudentName = (name: string) => {
    setStudentName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_student_name`, name);
    }
  };

  // Load from local storage
  const [moduleStates, setModuleStates] = useState<{ [moduleId: number]: UserModuleState }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...defaultEmptyState(), ...parsed };
        }
      } catch (e) {
        console.error('Failed to load local storage state:', e);
      }
    }
    return defaultEmptyState();
  });

  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedBadges = localStorage.getItem(`${STORAGE_KEY}_badges`);
        if (savedBadges) {
          return JSON.parse(savedBadges);
        }
      } catch {}
    }
    return INITIAL_BADGES;
  });

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moduleStates));
    } catch {}
  }, [moduleStates]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_badges`, JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlockedAt) {
          sounds.playBadgeUnlock();
          showSuccessBanner(`Neue Auszeichnung freigeschaltet: „${b.title}“!`);
          return { ...b, unlockedAt: new Date().toISOString() };
        }
        return b;
      })
    );
  };

  // Award password for next module and add to password book
  const awardPasswordForNextModule = (currentModuleId: number) => {
    const nextModId = currentModuleId + 1;
    if (nextModId > 7) return;

    const pwdDef = LEVEL_PASSWORDS[nextModId];
    if (!pwdDef) return;

    sounds.playUnlockLevel();
    setEarnedPasswords((prev) => {
      const alreadyHave = prev[nextModId];
      if (alreadyHave) return prev;

      return {
        ...prev,
        [nextModId]: {
          moduleId: nextModId,
          password: pwdDef.password,
          unlockedAt: new Date().toISOString(),
          sourceModuleId: currentModuleId,
          title: pwdDef.title,
          description: pwdDef.description,
        },
      };
    });

    showSuccessBanner(`🔑 Neues Level-Passwort freigespielt: „${pwdDef.password}“ für Doppelstunde ${nextModId}! Im Passwortbuch gespeichert.`);
    unlockBadge('badge_code_breaker');
  };

  const openModule = (moduleId: number) => {
    sounds.playClick();
    setActiveModuleId(moduleId);
    setIsDrawerOpen(true);
    setActiveDrawerTab('akte');

    // Pop up case intro with quote & characters ONLY when opening DS 3 for the first time outside tour!
    if (moduleId === 3 && !hasSeenIntro && !isOnboardingActive) {
      setActiveModal('welcome');
      setHasSeenIntro(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${STORAGE_KEY}_seen_intro`, 'true');
      }
    }
  };

  const advanceModuleStep = (moduleId: number, stepNumber: number) => {
    sounds.playSuccess();
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const maxStep = Math.max(current.stepProgress || 1, stepNumber);
      return {
        ...prev,
        [moduleId]: {
          ...current,
          stepProgress: maxStep,
        },
      };
    });
  };

  const updateZusatzdoc = (moduleId: number, data: Partial<ZusatzdocData>) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      return {
        ...prev,
        [moduleId]: {
          ...current,
          zusatzdoc: {
            ...current.zusatzdoc,
            ...data,
          },
        },
      };
    });
  };

  const updateAbedl = (
    moduleId: number,
    abedlId: number,
    field: 'info' | 'p' | 'e' | 's' | 'r',
    val: string
  ) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const currentAbedl = current.abedl[abedlId] || {
        info: '',
        pesr: { p: '', e: '', s: '', r: '' },
      };

      let newAbedlObj = { ...currentAbedl };
      if (field === 'info') {
        newAbedlObj.info = val;
      } else {
        newAbedlObj.pesr = {
          ...newAbedlObj.pesr,
          [field]: val,
        };
      }

      return {
        ...prev,
        [moduleId]: {
          ...current,
          abedl: {
            ...current.abedl,
            [abedlId]: newAbedlObj,
          },
        },
      };
    });
  };

  const recordSimulationChoice = (
    moduleId: number,
    stepId: string,
    optionId: string,
    stats: { pefScore: number; paternalisticScore: number; informedScore: number }
  ) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const currentStats = current.simulationStats || { pef: 0, paternalistic: 0, informed: 0 };

      return {
        ...prev,
        [moduleId]: {
          ...current,
          stepProgress: Math.max(current.stepProgress || 1, 3),
          simulationAnswers: {
            ...current.simulationAnswers,
            [stepId]: optionId,
          },
          simulationStats: {
            pef: currentStats.pef + stats.pefScore,
            paternalistic: currentStats.paternalistic + stats.paternalisticScore,
            informed: currentStats.informed + stats.informedScore,
          },
        },
      };
    });

    if (stats.pefScore > 0) {
      unlockBadge('badge_empathie_profi');
    }
  };

  const saveQuizScore = (moduleId: number, score: number, total: number) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      return {
        ...prev,
        [moduleId]: {
          ...current,
          stepProgress: Math.max(current.stepProgress || 1, 4),
          quizScore: { score, total, completed: true },
        },
      };
    });

    // When DS 2 Quiz is completed, award DS 3 password (PARTIZIPATION)
    if (moduleId === 2) {
      awardPasswordForNextModule(2);
    }
  };

  const unlockModuleWithPassword = (moduleId: number, password: string): boolean => {
    const targetModule = MODULES_DATA.find((m) => m.id === moduleId);
    if (!targetModule) return false;

    const cleanInput = password.trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');
    const expected = (targetModule.requiredPassword || '').trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');
    const fragmentExpected = (targetModule.simulation?.passwordFragment || '').trim().toUpperCase().replace(/[^A-ZÄÖÜß]/g, '');

    const isMatch = cleanInput === expected || cleanInput === fragmentExpected;

    if (isMatch) {
      sounds.playSuccess();
      showSuccessBanner(`Doppelstunde ${moduleId} erfolgreich entsperrt!`);
      
      // Also register in password book
      const pwdDef = LEVEL_PASSWORDS[moduleId];
      if (pwdDef) {
        setEarnedPasswords((prev) => ({
          ...prev,
          [moduleId]: {
            moduleId,
            password: pwdDef.password,
            unlockedAt: new Date().toISOString(),
            sourceModuleId: pwdDef.sourceModuleId,
            title: pwdDef.title,
            description: pwdDef.description,
          },
        }));
      }

      setModuleStates((prev) => {
        const current = prev[moduleId] || defaultEmptyState()[moduleId];
        return {
          ...prev,
          [moduleId]: {
            ...current,
            unlockedWithPassword: true,
          },
        };
      });
      unlockBadge('badge_code_breaker');
      return true;
    } else {
      sounds.playError();
      return false;
    }
  };

  const markModuleCompleted = (moduleId: number) => {
    sounds.playSuccess();
    const nextModId = moduleId + 1;

    // Award the password for the next level into the password book
    awardPasswordForNextModule(moduleId);

    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];

      return {
        ...prev,
        [moduleId]: {
          ...current,
          completed: true,
        },
      };
    });

    if (nextModId <= 7) {
      const pwdDef = LEVEL_PASSWORDS[nextModId];
      showSuccessBanner(`Doppelstunde ${moduleId} abgeschlossen! Passwort für DS ${nextModId}: „${pwdDef?.password || ''}“ (im Passwortbuch gespeichert).`);
    } else {
      showSuccessBanner(`Herzlichen Glückwunsch! Alle 7 Doppelstunden wurden erfolgreich abgeschlossen.`);
    }

    if (moduleId === 1) unlockBadge('badge_ethik_pionier');
    if (moduleId === 7) unlockBadge('badge_grand_master');
  };

  const unlockAllWithAdminPassword = (password: string): boolean => {
    const clean = password.trim().toLowerCase();
    if (clean === 'janson') {
      sounds.playSuccess();
      showSuccessBanner(`Admin-Modus aktiviert: Alle 7 Doppelstunden & Passwörter freigeschaltet!`);

      // Unlock all modules
      setModuleStates((prev) => {
        const next: { [key: number]: UserModuleState } = {};
        MODULES_DATA.forEach((mod) => {
          const current = prev[mod.id] || defaultEmptyState()[mod.id];
          next[mod.id] = {
            ...current,
            stepProgress: 4,
            unlockedWithPassword: true,
            completed: true,
          };
        });
        return next;
      });

      // Populate all passwords in password book
      const allPwds: { [modId: number]: PasswordBookEntry } = {};
      Object.entries(LEVEL_PASSWORDS).forEach(([modIdStr, val]) => {
        const mId = Number(modIdStr);
        allPwds[mId] = {
          moduleId: mId,
          password: val.password,
          unlockedAt: new Date().toISOString(),
          sourceModuleId: val.sourceModuleId,
          title: val.title,
          description: val.description,
        };
      });
      setEarnedPasswords(allPwds);

      // Unlock all badges
      setBadges((prev) =>
        prev.map((b) => ({
          ...b,
          unlockedAt: b.unlockedAt || new Date().toISOString(),
        }))
      );

      setIsAdminMode(true);
      return true;
    } else {
      sounds.playError();
      return false;
    }
  };

  const resetAllProgress = () => {
    sounds.playClick();
    const fresh = defaultEmptyState();
    setModuleStates(fresh);
    setBadges(INITIAL_BADGES);
    setEarnedPasswords(defaultInitialPasswords());
    setIsAdminMode(false);
    setActiveModuleId(null);
    setIsDrawerOpen(false);
    setHasSeenIntro(false);
    setStudentName('');
    setIsOnboardingActive(true);
    showSuccessBanner('Training und Fortschritt wurden vollständig zurückgesetzt. Das Tutorial startet erneut.');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_badges`);
      localStorage.removeItem(`${STORAGE_KEY}_earned_passwords`);
      localStorage.removeItem(`${STORAGE_KEY}_seen_tour`);
      localStorage.removeItem(`${STORAGE_KEY}_seen_intro`);
      localStorage.removeItem(`${STORAGE_KEY}_student_name`);
    }
  };

  // Calculate Scores
  let totalPefScore = 0;
  let totalPaternalisticScore = 0;
  let totalInformedScore = 0;
  let completedCount = 0;

  Object.values(moduleStates).forEach((st) => {
    if (st.simulationStats) {
      totalPefScore += st.simulationStats.pef || 0;
      totalPaternalisticScore += st.simulationStats.paternalistic || 0;
      totalInformedScore += st.simulationStats.informed || 0;
    }
    if (st.completed) {
      completedCount++;
    }
  });

  const overallProgressPercent = Math.round((completedCount / MODULES_DATA.length) * 100);

  return (
    <AppContext.Provider
      value={{
        activeModuleId,
        setActiveModuleId,
        isDrawerOpen,
        setIsDrawerOpen,
        activeDrawerTab,
        setActiveDrawerTab,
        activeModal,
        setActiveModal,
        isOnboardingActive,
        setIsOnboardingActive,
        isAdminMode,
        unlockAllWithAdminPassword,
        resetAllProgress,
        customBgUrl,
        setCustomBgUrl,
        studentName,
        setStudentName: handleSetStudentName,
        successBanner,
        showSuccessBanner,
        moduleStates,
        openModule,
        advanceModuleStep,
        updateZusatzdoc,
        updateAbedl,
        recordSimulationChoice,
        saveQuizScore,
        unlockModuleWithPassword,
        markModuleCompleted,
        earnedPasswords,
        awardPasswordForNextModule,
        badges,
        unlockBadge,
        soundEnabled,
        setSoundEnabled,
        totalPefScore,
        totalPaternalisticScore,
        totalInformedScore,
        overallProgressPercent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
