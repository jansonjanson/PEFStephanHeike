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

export interface AdventureOption {
  id: string;
  label: string;
  model: DecisionModel;
  quote: string;
  actionText?: string;
  scores: {
    pat: number;
    pef: number;
    inf: number;
  };
  targetNodeId?: string;
  targetEndingId?: string;
}

export interface AdventureNode {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar?: string;
  sceneDescription: string;
  dialogueText: string;
  dilemmaPrompt: string;
  options: AdventureOption[];
}

export interface AdventureEnding {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  isRealDocumentaryOutcome?: boolean;
  resultDescription: string;
  reflectionText: string;
}

export interface AdventureData {
  id: string;
  title: string;
  roleProfile: string;
  leitfrage: string;
  ausgangslage: string;
  startNodeId: string;
  nodes: { [nodeId: string]: AdventureNode };
  endings: { [endingId: string]: AdventureEnding };
  passwordFragment: string;
  finalQuestion: string;
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
  centralQuestion?: string;
  contextDescription?: string;
  derivable: DecisionMomentItem[];
  probable: DecisionMomentItem[];
  hypothetical: DecisionMomentItem[];
  reflectionPrompt: string;
  adventureTeaser?: string;
}

export interface ZusatzdocData {
  who: string;
  whatHappened: string;
  decisionsMade: string;
  ethicalDilemmas: string;
  decisionMomentsIdentified?: string;
  derivableInput?: string;
  probableInput?: string;
  hypotheticalInput?: string;
  decisionMomentsConfirmed?: boolean;
  abedlConfirmed?: boolean;
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
  adventure?: AdventureData;
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

export interface PasswordBookEntry {
  moduleId: number; // Target module unlocked
  password: string; // Single word in uppercase
  unlockedAt: string;
  sourceModuleId: number; // Module where it was earned
  title: string;
  description?: string;
}
