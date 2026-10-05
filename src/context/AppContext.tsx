import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZusatzdocData, UserModuleState, AchievementBadge } from '../types';
import { MODULES_DATA } from '../data/curriculumData';
import { INITIAL_BADGES } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeModuleId: number | null;
  setActiveModuleId: (id: number | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeDrawerTab: 'akte' | 'simulation' | 'auswertung' | 'didaktik';
  setActiveDrawerTab: (tab: 'akte' | 'simulation' | 'auswertung' | 'didaktik') => void;
  
  // Navigation & Modals
  activeModal: 'none' | 'welcome' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate';
  setActiveModal: (modal: 'none' | 'welcome' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate') => void;
  isOnboardingActive: boolean;
  setIsOnboardingActive: (active: boolean) => void;
  
  // Custom Map Background
  customBgUrl: string;
  setCustomBgUrl: (url: string) => void;

  // Student Info
  studentName: string;
  setStudentName: (name: string) => void;

  // Module States (local storage)
  moduleStates: { [moduleId: number]: UserModuleState };
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

const defaultEmptyState = (): { [moduleId: number]: UserModuleState } => {
  const map: { [moduleId: number]: UserModuleState } = {};
  MODULES_DATA.forEach((mod) => {
    map[mod.id] = {
      completed: false,
      zusatzdoc: {
        who: '',
        whatHappened: '',
        decisionsMade: '',
        ethicalDilemmas: '',
      },
      abedl: {},
      simulationAnswers: {},
      simulationStats: { pef: 0, paternalistic: 0, informed: 0 },
      unlockedWithPassword: mod.id === 1, // DS 1 unlocked by default
    };
  });
  return map;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'akte' | 'simulation' | 'auswertung' | 'didaktik'>('akte');
  const [activeModal, setActiveModal] = useState<'none' | 'welcome' | 'timetable' | 'media' | 'badges' | 'teacherGuide' | 'certificate'>('welcome');
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(false);
  const [customBgUrl, setCustomBgUrl] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

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
          try {
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.7 },
            });
          } catch {}
          return { ...b, unlockedAt: new Date().toISOString() };
        }
        return b;
      })
    );
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
      const existingEntry = current.abedl[abedlId] || { info: '', pesr: { p: '', e: '', s: '', r: '' } };
      
      let updatedEntry = { ...existingEntry };
      if (field === 'info') {
        updatedEntry.info = val;
      } else {
        updatedEntry.pesr = {
          ...updatedEntry.pesr,
          [field]: val,
        };
      }

      // Check if user filled multiple ABEDLs -> reward badge
      const countFilled = Object.keys({ ...current.abedl, [abedlId]: updatedEntry }).length;
      if (countFilled >= 5) {
        unlockBadge('badge_anamnese_profi');
      }

      return {
        ...prev,
        [moduleId]: {
          ...current,
          abedl: {
            ...current.abedl,
            [abedlId]: updatedEntry,
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
      const newAnswers = {
        ...current.simulationAnswers,
        [stepId]: optionId,
      };
      const newStats = {
        pef: current.simulationStats.pef + stats.pefScore,
        paternalistic: current.simulationStats.paternalistic + stats.paternalisticScore,
        informed: current.simulationStats.informed + stats.informedScore,
      };

      if (newStats.pef >= 3) {
        unlockBadge('badge_pef_champion');
      }

      return {
        ...prev,
        [moduleId]: {
          ...current,
          simulationAnswers: newAnswers,
          simulationStats: newStats,
        },
      };
    });
  };

  const saveQuizScore = (moduleId: number, score: number, total: number) => {
    setModuleStates((prev) => {
      const current = prev[moduleId] || defaultEmptyState()[moduleId];
      if (score / total >= 0.75) {
        unlockBadge('badge_quiz_master');
      }
      return {
        ...prev,
        [moduleId]: {
          ...current,
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
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch {}
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

    if (moduleId === 1) unlockBadge('badge_ethik_pionier');
    if (moduleId === 7) unlockBadge('badge_grand_master');
  };

  // Aggregated calculations
  let totalPefScore = 0;
  let totalPaternalisticScore = 0;
  let totalInformedScore = 0;
  let completedCount = 0;

  Object.values(moduleStates).forEach((ms) => {
    totalPefScore += ms.simulationStats?.pef || 0;
    totalPaternalisticScore += ms.simulationStats?.paternalistic || 0;
    totalInformedScore += ms.simulationStats?.informed || 0;
    if (ms.completed || ms.unlockedWithPassword) completedCount++;
  });

  const overallProgressPercent = Math.min(100, Math.round((completedCount / MODULES_DATA.length) * 100));

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
        customBgUrl,
        setCustomBgUrl,
        studentName,
        setStudentName,
        moduleStates,
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
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
