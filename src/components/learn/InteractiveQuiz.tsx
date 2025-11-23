// ============================================================
// FILE: src/components/learn/InteractiveQuiz.tsx - ENHANCED
// ============================================================
"use client";

import { useState } from "react";
import { PracticeQuiz } from "@/features/learning-path/types/concept";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

interface InteractiveQuizProps {
  quiz: PracticeQuiz;
}

export default function InteractiveQuiz({ quiz }: InteractiveQuizProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrect = quiz.correctAnswer.trim().toLowerCase();
    const correct = normalizedAnswer === normalizedCorrect;
    
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Question */}
      <div className="mb-4">
        <div className="flex items-start space-x-2 mb-3">
          <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <p className="text-lg font-semibold text-gray-900">
            {quiz.questionText}
          </p>
        </div>

        {/* Multiple Choice Options */}
        {quiz.type === "multiple_choice" && quiz.options && (
          <div className="space-y-2 mt-4">
            {quiz.options.map((option, index) => (
              <label
                key={index}
                className={`
                  flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${userAnswer === option
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                  }
                  ${showFeedback && option === quiz.correctAnswer
                    ? "border-green-600 bg-green-50"
                    : ""
                  }
                `}
              >
                <input
                  type="radio"
                  name={quiz.questionId}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showFeedback}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {/* Text Input */}
        {(quiz.type === "fill_in_the_blank" || quiz.type === "short_answer") && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={showFeedback}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={!userAnswer}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-lg border-2 ${
          isCorrect 
            ? "bg-green-50 border-green-200" 
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-start space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-bold mb-1 ${
                isCorrect ? "text-green-800" : "text-red-800"
              }`}>
                {isCorrect ? "Correct! 🎉" : "Not quite right"}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Correct Answer:</strong> {quiz.correctAnswer}
                </p>
              )}
              <p className="text-sm text-gray-700">
                <strong>Explanation:</strong> {quiz.feedback}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
