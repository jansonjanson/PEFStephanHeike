import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZusatzdocData, UserModuleState, AchievementBadge } from '../types';
import { MODULES_DATA } from '../data/curriculumData';
import { INITIAL_BADGES } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';

interface AppContextType {
  activeModuleId: number | null;
  setActiveModuleId: (id: number | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeDrawerTab: 'akte' | 'simulation' | 'auswertung' | 'didaktik';
  setActiveDrawerTab: (tab: 'akte' | 'simulation' | 'auswertung' | 'didaktik') => void;
  
  // Navigation & Modals
  activeModal: 'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm';
  setActiveModal: (modal: 'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm') => void;
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'akte' | 'simulation' | 'auswertung' | 'didaktik'>('akte');
  const [activeModal, setActiveModal] = useState<'none' | 'welcome' | 'namePrompt' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate' | 'admin' | 'resetConfirm'>('none');
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(true); // Start tutorial automatically on first launch
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

  // Success Banner Toast handler
  const showSuccessBanner = (message: string) => {
    setSuccessBanner(message);
    setTimeout(() => {
      setSuccessBanner((curr) => (curr === message ? null : curr));
    }, 4500);
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
          showSuccessBanner(`🏆 Neue Auszeichnung freigeschaltet: „${b.title}“!`);
          return { ...b, unlockedAt: new Date().toISOString() };
        }
        return b;
      })
    );
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

  const updateAbedl = (moduleId: number, abedlId: number, field: 'info' | 'p' | 'e' | 's' | 'r', val: string) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const currentAbedl = current.abedl || {};
      const currentItem = currentAbedl[abedlId] || { info: '', pesr: { p: '', e: '', s: '', r: '' } };

      let updatedItem = { ...currentItem };
      if (field === 'info') {
        updatedItem.info = val;
      } else {
        updatedItem.pesr = {
          ...updatedItem.pesr,
          [field]: val,
        };
      }

      return {
        ...prev,
        [moduleId]: {
          ...current,
          abedl: {
            ...currentAbedl,
            [abedlId]: updatedItem,
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
    sounds.playSelectOption();
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const nextStats = {
        pef: current.simulationStats.pef + stats.pefScore,
        paternalistic: current.simulationStats.paternalistic + stats.paternalisticScore,
        informed: current.simulationStats.informed + stats.informedScore,
      };

      return {
        ...prev,
        [moduleId]: {
          ...current,
          stepProgress: Math.max(current.stepProgress || 1, 4),
          simulationAnswers: {
            ...current.simulationAnswers,
            [stepId]: optionId,
          },
          simulationStats: nextStats,
        },
      };
    });

    unlockBadge('badge_first_choice');
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
  };

  const unlockModuleWithPassword = (moduleId: number, password: string): boolean => {
    const targetModule = MODULES_DATA.find((m) => m.id === moduleId);
    if (!targetModule) return false;

    const cleanInput = password.trim().toUpperCase();
    const expected = (targetModule.requiredPassword || '').trim().toUpperCase();
    const fragmentExpected = (targetModule.simulation?.passwordFragment || '').trim().toUpperCase();

    const isMatch = cleanInput === expected || cleanInput === fragmentExpected;

    if (isMatch) {
      sounds.playSuccess();
      showSuccessBanner(`🔓 Musterlösung für Doppelstunde ${moduleId} erfolgreich entsperrt!`);
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

    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      const nextModCurrent = prev[nextModId] || defaultEmptyState()[nextModId];

      const updated = {
        ...prev,
        [moduleId]: {
          ...current,
          completed: true,
        },
      };

      // Auto-unlock next module
      if (nextModId <= 7 && nextModCurrent) {
        updated[nextModId] = {
          ...nextModCurrent,
          unlockedWithPassword: true,
        };
      }

      return updated;
    });

    if (nextModId <= 7) {
      showSuccessBanner(`✨ Doppelstunde ${moduleId} abgeschlossen! Doppelstunde ${nextModId} ist jetzt freigeschaltet.`);
    } else {
      showSuccessBanner(`🎓 Herzlichen Glückwunsch! Alle 7 Doppelstunden wurden erfolgreich abgeschlossen.`);
    }

    if (moduleId === 1) unlockBadge('badge_ethik_pionier');
    if (moduleId === 7) unlockBadge('badge_grand_master');
  };

  const unlockAllWithAdminPassword = (password: string): boolean => {
    const clean = password.trim().toLowerCase();
    if (clean === 'janson') {
      sounds.playSuccess();
      showSuccessBanner(`🛡️ Admin-Modus aktiviert: Alle 7 Doppelstunden & Dozenten-Regiepläne freigeschaltet!`);

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
