// src/features/learning-path/types/concept.ts
export interface PracticeQuiz {
  questionId: string;
  type: "multiple_choice" | "fill_in_the_blank" | "short_answer";
  questionText: string;
  options?: string[];
  correctAnswer: string;
  feedback: string;
}

export interface Content {
  introduction: string;
  definition?: string;
  examples?: any[];
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
  localizedContent: {
    en: LocalizedContent;
    ur: LocalizedContent;
  };
}