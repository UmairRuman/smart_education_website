// src/features/learning-path/components/ConceptContent.tsx
"use client";

import { useLanguage } from "@/hooks/use-language";
import { Concept } from "../types/concept";
import { InteractiveQuiz } from "./InteractiveQuiz";

interface ConceptContentProps {
  concept: Concept;
}

export function ConceptContent({ concept }: ConceptContentProps) {
  const { language } = useLanguage();
  const content = concept.localizedContent[language] || concept.localizedContent.en;

  return (
    // The `prose` classes automatically style all child HTML tags (h1, p, ul, etc.)
    // for maximum readability. This is perfect for educational content.
    <article className="prose prose-lg max-w-4xl">
      <h1>{content.title}</h1>
      <p className="lead">{content.content.introduction}</p>
      
      {content.content.definition && (
        <>
          <h2>Definition</h2>
          <p>{content.content.definition}</p>
        </>
      )}

      {content.content.examples && (
        <>
          <h2>Examples</h2>
          <ul>
            {content.content.examples.map((ex, index) => (
              <li key={index}>
                <strong>{ex.rule || ex.type}:</strong> {ex.example || ex.description || ex.example_is_set}
                {ex.example_is_not_set && <span className="text-sm text-red-600"> (Not a set: {ex.example_is_not_set})</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      {content.practiceQuiz.length > 0 && (
        <>
          <h2 className="mt-12">Practice Quiz</h2>
          {content.practiceQuiz.map(quiz => (
            <InteractiveQuiz key={quiz.questionId} quiz={quiz} />
          ))}
        </>
      )}
    </article>
  );
}