
// ============================================================
// FILE 1: src/features/learning-path/types/concept.ts - FIXED TYPO
// ============================================================
export interface PracticeQuiz {
  questionId: string;
  type: "multiple_choice" | "fill_in_the_blank" | "short_answer";
  questionText: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

export interface Content {
  introduction?: string;  // Made optional
  definition?: string;
  examples?: any[];  // This is CORRECT (plural)
  example?: string;  // Add this for single example field
  forms?: any[];
  membership_symbols?: string;
  cardinality?: string;
  types_by_size?: any[];
  comparison?: any[];
  universal_set?: string;
  subset_superset?: string;
  proper_improper?: string;
  operations?: any[];
  laws?: any[];
  formula?: string;
  properties?: any[];  // Fixed: was missing ?
}

export interface LocalizedContent {
  title: string;
  content: Content;
  keySentences: string[];
  practiceQuiz: PracticeQuiz[];
}

export interface Concept {
  conceptId: string;
  gradeLevel: number;
  sequenceOrder: number;
  topic: string;
  estimatedTimeMinutes?: number;  // Made optional
  difficulty?: string;  // Add this
  prerequisites?: string[];  // Add this
  localizedContent: {
    en: LocalizedContent;
    ur: LocalizedContent;
  };
}