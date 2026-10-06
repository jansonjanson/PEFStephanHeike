export type DecisionModel = 'paternalistic' | 'pef' | 'informed';

export interface DecisionOption {
  id: string;
  model: DecisionModel;
  modelLabel: string; // "Paternalistisches Modell", "Partizipative Entscheidungsfindung (PEF)", "Informed Decision Making"
  quote: string; // The dialogue spoken by the nurse/participant
  actionText: string;
  immediateReaction: string; // How Heike/Stephan react
  explanation: string; // Didactic rationale
  statsImpact: {
    pefScore: number; // +1 or 0
    paternalisticScore: number;
    informedScore: number;
    autonomyScore: number;
  };
}

export interface SimulationStep {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: string;
  sceneDescription: string;
  dialogueText: string;
  dilemmaPrompt: string;
  options: DecisionOption[];
}

export interface SimulationScenario {
  id: string;
  title: string;
  initialDescription: string;
  steps: SimulationStep[];
  passwordFragment: string;
  reflectionQuestions: string[];
}

export interface AbedlItemData {
  id: number;
  name: string;
  description: string;
  information: string;
  pesr: {
    problem: string;
    etiology: string;
    symptoms: string;
    resources: string;
  };
}

export interface DecisionMomentItem {
  title: string;
  person?: string;
  description: string;
}

export interface DecisionMomentsData {
  derivable: DecisionMomentItem[];
  probable: DecisionMomentItem[];
  hypothetical: DecisionMomentItem[];
  reflectionPrompt: string;
}

export interface ZusatzdocData {
  who: string;
  whatHappened: string;
  decisionsMade: string;
  ethicalDilemmas: string;
  decisionMomentsIdentified?: string;
  decisionMomentsConfirmed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'matching';
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  matchingPairs?: {
    model: string;
    definition: string;
  }[];
}

export interface TeacherMaterial {
  doppelstunde: number;
  topic: string;
  duration: string;
  pedagogicalGoals: string[];
  schedule: {
    phase: string;
    timeMinutes: number;
    activity: string;
    socialForm: string; // Plenum, Einzelarbeit, Partnerarbeit, Gruppenarbeit
    media: string;
    didacticNotes: string;
  }[];
  blackboardSummary: string;
  padletQuestions?: string[];
  reflectionPrompts: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  locationName: string;
  icon: string;
  timeEstimate: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  videoDescription?: string;
  narrativeSummary?: string;
  decisionMoments?: DecisionMomentsData;
  mapCoordinates: { x: number; y: number };
  badgeId?: string;
  simulation?: SimulationScenario;
  quiz?: QuizQuestion[];
  teacherGuide: TeacherMaterial;
  sampleSolution: {
    zusatzdoc: ZusatzdocData;
    abedl: { [key: number]: { info: string; pesr: string } };
    decisionAnalysis: string;
    passwordHint: string;
  };
  requiredPassword?: string;
}

export interface UserModuleState {
  completed: boolean;
  stepProgress?: number; // 1 = Video, 2 = Doku, 3 = Simulation, 4 = Auswertung / Musterlösung
  zusatzdoc: ZusatzdocData;
  abedl: { [key: number]: { info: string; pesr: { p: string; e: string; s: string; r: string } } };
  simulationAnswers: { [stepId: string]: string }; // stepId -> optionId
  simulationStats: {
    pef: number;
    paternalistic: number;
    informed: number;
  };
  quizScore?: { score: number; total: number; completed: boolean };
  unlockedWithPassword: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'ethics' | 'simulation' | 'documentation';
  unlockedAt?: string;
}
