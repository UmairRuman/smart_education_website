// src/features/learning-path/components/InteractiveQuiz.tsx
"use client";

import { useState } from "react";
import { PracticeQuiz } from "../types/concept";
import { useTranslation } from "react-i18next";

export function InteractiveQuiz({ quiz }: { quiz: PracticeQuiz }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { t } = useTranslation('common');

  return (
    <div className="p-4 border border-gray-200 rounded-lg my-6 bg-white">
      <p className="font-semibold">{quiz.questionText}</p>
      {quiz.options && (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {quiz.options.map((opt, i) => <li key={i}>{opt}</li>)}
        </ul>
      )}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        {showAnswer ? t('hide_answer') : t('show_answer')}
      </button>
      {showAnswer && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p><strong className="text-green-800">Answer:</strong> {quiz.correctAnswer}</p>
          <p className="mt-1 text-sm"><strong className="text-green-800">{t('feedback')}:</strong> {quiz.feedback}</p>
        </div>
      )}
    </div>
  );
}