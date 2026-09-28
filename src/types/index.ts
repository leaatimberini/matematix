// src/types/index.ts

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5; // 1: Muy fácil, 2: Básico, 3: Intermedio, 4: Aplicación/Examen, 5: Desafío

export type MasteryStatus = 
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'PRACTICING'
  | 'WEAK'
  | 'IMPROVING'
  | 'MASTERED'
  | 'EXAM_READY';

export type ExerciseType = 
  | 'multiple_choice'
  | 'true_false'
  | 'numeric'
  | 'math_expression'
  | 'step_by_step'
  | 'fill_blanks'
  | 'order_steps'
  | 'detect_error'
  | 'match_concepts';

export type SourceType = 'SOURCE' | 'DERIVED' | 'GENERATED';

export type ExamRelevance = 'GENERAL_CONTENT' | 'PRACTICE' | 'EXAM_RELEVANT' | 'EXAM_PATTERN' | 'EXAM_EXERCISE';

export interface StepItem {
  id: number;
  label: string;
  math: string;
  explanation: string;
  isCorrect?: boolean;
}

export interface MatchingPair {
  leftId: string;
  leftText: string;
  leftMath?: string;
  rightId: string;
  rightText: string;
  rightMath?: string;
}

export interface Exercise {
  id: string;
  unitId: number; // 1 to 10
  topic: string;
  subtopic: string;
  title: string;
  statement: string; // KaTeX markdown string
  type: ExerciseType;
  difficulty: DifficultyLevel;
  examRelevance: ExamRelevance;
  sourceType: SourceType;
  sourceReference: string; // e.g. "Examen Real Tema 1 Ej. 1" o "Ficha 2 p. 204 Ej. 8"
  points: number;

  // Options for multiple choice / true_false
  options?: {
    id: string;
    text: string;
    math?: string;
    isCorrect: boolean;
    feedback?: string;
  }[];

  // For numeric / math_expression / interval answers
  correctAnswer?: string; // e.g. "(-2, 6]" or "2x(x-2)" or "4"
  acceptableAnswers?: string[]; // alternate valid forms e.g. ["2x^2 - 4x", "2x(x-2)"]
  answerType?: 'number' | 'fraction' | 'interval' | 'coordinate' | 'expression';

  // For step by step / order steps
  steps?: StepItem[];

  // For fill in the blanks
  blanks?: {
    index: number;
    correctAnswer: string;
    hint: string;
    acceptable?: string[];
  }[];

  // For detect error
  errorStepIndex?: number;
  errorExplanation?: string;

  // For matching
  matchingPairs?: MatchingPair[];

  // 5 progressive pedagogical hints
  hints: [string, string, string, string, string]; // [Concepto, Método, Primer Paso, Procedimiento Parcial, Solución Completa]

  // Step-by-step complete solution
  solution: {
    steps: { text: string; math?: string }[];
    finalAnswer: string;
  };

  // Diagnostic feedback for common traps
  commonTraps?: {
    trapId: string;
    triggerAnswer: string;
    diagnosis: string;
    remedy: string;
  }[];

  // Visualizer hint if applicable
  visualizerType?: 'number_line' | 'linear_plot' | 'parabola' | 'piecewise' | 'trig_circle';
  visualizerData?: any;
}

export interface ConceptFromScratch {
  whatIsIt: string;
  whyExists: string;
  whatMeans: string;
  whenUsed: string;
  howRecognized: string;
  correspondingFormula: string;
  howApplied: string;
  commonMistakes: string;
  howAppearsInExam: string;
  checkpointQuestion: {
    question: string;
    options: { text: string; isCorrect: boolean; explanation: string }[];
  };
}

export interface TopicUnit {
  id: number; // 1 to 10
  slug: string;
  title: string;
  subtitle: string;
  manualPages: string;
  keywords: string[];
  prerequisites: number[];
  videoTopics: string[];
  whatYouWillLearn: string[];
  summaryTheory: {
    title: string;
    content: string;
    math?: string;
  }[];
  keyFormulas: {
    name: string;
    latex: string;
    description: string;
  }[];
  workedExample: {
    title: string;
    statement: string;
    steps: { stepNumber: number; title: string; math: string; explanation: string }[];
    conclusion: string;
  };
  explainFromScratch: ConceptFromScratch;
  noEntiendoBackup: {
    simpleAnalogy: string;
    visualExplanation: string;
    stepByStepFallback: string[];
    simplerExample: {
      problem: string;
      solution: string;
    };
  };
  examTips: string[];
  visualizerType?: 'number_line' | 'linear_plot' | 'parabola' | 'piecewise' | 'trig_circle';
  exercises: Exercise[];
}

export interface ExamQuestionAttempt {
  exerciseId: string;
  userAnswer: any;
  isCorrect: boolean;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  pointsEarned: number;
  maxPoints: number;
  diagnosticFeedback?: string;
  flaggedForReview?: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  timestamp: number;
  totalTimeSeconds: number;
  totalScore: number;
  maxScore: number;
  scorePercentage: number;
  passed: boolean;
  topicBreakdown: {
    unitId: number;
    unitTitle: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
  }[];
  attempts: ExamQuestionAttempt[];
  recommendations: string[];
}

export interface UserStats {
  totalStudyTimeSeconds: number;
  streakDays: number;
  lastStudyDate: string;
  totalAnswered: number;
  totalCorrect: number;
  accuracyPercentage: number;
  topicMastery: Record<number, {
    status: MasteryStatus;
    score: number; // 0 to 100
    attemptCount: number;
    correctCount: number;
    hintsUsedCount: number;
    lastPracticed: number;
  }>;
  mistakeBank: {
    exerciseId: string;
    unitId: number;
    failedCount: number;
    lastAttemptAnswer: string;
    timestamp: number;
  }[];
  examHistory: ExamResult[];
}
