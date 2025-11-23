// ============================================================
// ISSUE 1: Data Structure Mismatch
// Your Firestore has: properties, comparison, etc.
// Fix: Handle all possible content fields safely
// ============================================================

// FILE: src/components/learn/ConceptContent.tsx - COMPLETE FIX
"use client";

import { useLanguage } from "@/hooks/use-language";
import { Concept } from "@/features/learning-path/types/concept";
import InteractiveQuiz from "./InteractiveQuiz";
import { BookOpen, Lightbulb, CheckCircle, Info, Zap } from "lucide-react";

interface ConceptContentProps {
  concept: Concept;
}

type GradeLevel = 6 | 7 | 8;

export default function ConceptContent({ concept }: ConceptContentProps) {
  const { language } = useLanguage();
  const content = concept.localizedContent?.[language] || concept.localizedContent?.en;

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold">Content not available</p>
      </div>
    );
  }

  const gradeColors: Record<GradeLevel, string> = {
    6: 'bg-blue-100 text-blue-700',
    7: 'bg-purple-100 text-purple-700',
    8: 'bg-pink-100 text-pink-700',
  };

  const gradeColor = gradeColors[concept.gradeLevel as GradeLevel] || 'bg-gray-100 text-gray-700';

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${gradeColor}`}>
            Grade {concept.gradeLevel}
          </span>
          <span className="text-sm text-gray-500">
            Topic: {concept.topic.charAt(0).toUpperCase() + concept.topic.slice(1)}
          </span>
          {concept.estimatedTimeMinutes && (
            <span className="text-sm text-gray-500">
              ⏱️ {concept.estimatedTimeMinutes} min
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        {content.content?.introduction && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {content.content.introduction}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Definition */}
        {content.content?.definition && (
          <ContentSection
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            title="Definition"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          >
            <p className="text-gray-700 leading-relaxed">{content.content.definition}</p>
          </ContentSection>
        )}

        {/* Examples */}
        {content.content?.examples && content.content.examples.length > 0 && (
          <ContentSection
            icon={<Lightbulb className="w-6 h-6 text-yellow-600" />}
            title="Examples"
            bgColor="bg-yellow-50"
            borderColor="border-yellow-200"
          >
            <div className="space-y-4">
              {content.content.examples.map((ex: any, index: number) => (
                <ExampleCard key={index} example={ex} />
              ))}
            </div>
          </ContentSection>
        )}

        {/* Forms (Notation) */}
        {content.content?.forms && content.content.forms.length > 0 && (
          <ContentSection
            icon={<Info className="w-6 h-6 text-indigo-600" />}
            title="Ways to Write Sets"
            bgColor="bg-indigo-50"
            borderColor="border-indigo-200"
          >
            <div className="space-y-4">
              {content.content.forms.map((form: any, index: number) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2">{form.name}</h4>
                  <p className="text-gray-700">{form.description}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Membership Symbols */}
        {content.content?.membership_symbols && (
          <ContentSection
            icon={<Zap className="w-6 h-6 text-purple-600" />}
            title="Membership Symbols"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
          >
            <p className="text-gray-700">{content.content.membership_symbols}</p>
          </ContentSection>
        )}

        {/* Cardinality */}
        {content.content?.cardinality && (
          <ContentSection
            icon={<Info className="w-6 h-6 text-teal-600" />}
            title="Cardinality"
            bgColor="bg-teal-50"
            borderColor="border-teal-200"
          >
            <p className="text-gray-700">{content.content.cardinality}</p>
          </ContentSection>
        )}

        {/* Types by Size */}
        {content.content?.types_by_size && content.content.types_by_size.length > 0 && (
          <ContentSection
            icon={<BookOpen className="w-6 h-6 text-cyan-600" />}
            title="Types of Sets"
            bgColor="bg-cyan-50"
            borderColor="border-cyan-200"
          >
            <div className="space-y-3">
              {content.content.types_by_size.map((type: any, index: number) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-cyan-200">
                  <h4 className="font-bold text-cyan-900 mb-1">{type.name}</h4>
                  <p className="text-gray-700 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Comparison (Equal vs Equivalent) */}
        {content.content?.comparison && content.content.comparison.length > 0 && (
          <ContentSection
            icon={<Info className="w-6 h-6 text-orange-600" />}
            title="Comparing Sets"
            bgColor="bg-orange-50"
            borderColor="border-orange-200"
          >
            <div className="space-y-3">
              {content.content.comparison.map((comp: any, index: number) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-900 mb-1">{comp.name}</h4>
                  <p className="text-gray-700 text-sm">{comp.description}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Universal Set */}
        {content.content?.universal_set && (
          <ContentSection
            icon={<BookOpen className="w-6 h-6 text-pink-600" />}
            title="Universal Set"
            bgColor="bg-pink-50"
            borderColor="border-pink-200"
          >
            <p className="text-gray-700">{content.content.universal_set}</p>
          </ContentSection>
        )}

        {/* Subset/Superset */}
        {content.content?.subset_superset && (
          <ContentSection
            icon={<Info className="w-6 h-6 text-rose-600" />}
            title="Subsets and Supersets"
            bgColor="bg-rose-50"
            borderColor="border-rose-200"
          >
            <p className="text-gray-700">{content.content.subset_superset}</p>
          </ContentSection>
        )}

        {/* Proper/Improper */}
        {content.content?.proper_improper && (
          <ContentSection
            icon={<Info className="w-6 h-6 text-fuchsia-600" />}
            title="Proper and Improper Subsets"
            bgColor="bg-fuchsia-50"
            borderColor="border-fuchsia-200"
          >
            <p className="text-gray-700">{content.content.proper_improper}</p>
          </ContentSection>
        )}

        {/* Operations */}
        {content.content?.operations && content.content.operations.length > 0 && (
          <ContentSection
            icon={<Zap className="w-6 h-6 text-violet-600" />}
            title="Set Operations"
            bgColor="bg-violet-50"
            borderColor="border-violet-200"
          >
            <div className="space-y-4">
              {content.content.operations.map((op: any, index: number) => (
                <div key={index} className="p-5 bg-white rounded-lg border-2 border-violet-200">
                  <h4 className="font-bold text-violet-900 mb-2 text-lg">{op.name}</h4>
                  <p className="text-gray-700 mb-3">{op.description}</p>
                  {op.example && (
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm text-gray-800 border border-gray-200">
                      {op.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Laws (De Morgan's) */}
        {content.content?.laws && content.content.laws.length > 0 && (
          <ContentSection
            icon={<BookOpen className="w-6 h-6 text-amber-600" />}
            title="Mathematical Laws"
            bgColor="bg-amber-50"
            borderColor="border-amber-200"
          >
            <div className="space-y-4">
              {content.content.laws.map((law: any, index: number) => (
                <div key={index} className="p-5 bg-white rounded-lg border-2 border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-3 text-lg">{law.name}</h4>
                  <div className="bg-gray-50 p-4 rounded text-center mb-3 border border-gray-200">
                    <p className="font-mono text-xl text-gray-900">{law.formula}</p>
                  </div>
                  <p className="text-gray-700 text-sm italic">{law.in_words}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Properties */}
        {content.content?.properties && content.content.properties.length > 0 && (
          <ContentSection
            icon={<Zap className="w-6 h-6 text-emerald-600" />}
            title="Properties"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-200"
          >
            <div className="space-y-3">
              {content.content.properties.map((prop: any, index: number) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-1">{prop.name}</h4>
                  <p className="text-gray-700 text-sm">{prop.description}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Formula */}
        {content.content?.formula && (
          <ContentSection
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            title="Formula"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          >
            <div className="bg-white p-6 rounded-lg text-center border-2 border-blue-300">
              <p className="font-mono text-2xl text-blue-900">{content.content.formula}</p>
            </div>
          </ContentSection>
        )}

        {/* Example (for formulas) */}
       // CORRECT:
{content.content?.example && !content.content?.examples && (
  <ContentSection
    icon={<Lightbulb className="w-6 h-6 text-yellow-600" />}
    title="Example"
    bgColor="bg-yellow-50"
    borderColor="border-yellow-200"
  >
    <p className="text-gray-700 leading-relaxed">{content.content.example}</p>
  </ContentSection>
)}

        {/* Key Takeaways */}
        {content.keySentences && content.keySentences.length > 0 && (
          <ContentSection
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            title="Key Takeaways"
            bgColor="bg-green-50"
            borderColor="border-green-200"
          >
            <ul className="space-y-3">
              {content.keySentences.map((sentence: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{sentence}</span>
                </li>
              ))}
            </ul>
          </ContentSection>
        )}

        {/* Practice Quiz */}
        {content.practiceQuiz && content.practiceQuiz.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg mr-3">
                Practice Quiz
              </span>
            </h2>
            <div className="space-y-6">
              {content.practiceQuiz.map((quiz) => (
                <InteractiveQuiz key={quiz.questionId} quiz={quiz} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Quiz */}
        {(!content.practiceQuiz || content.practiceQuiz.length === 0) && (
          <div className="mt-12 p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-center">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Practice quizzes coming soon!</p>
            <p className="text-gray-500 text-sm mt-1">
              Our experts are preparing high-quality questions for you.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

// Helper Components
interface ContentSectionProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}

function ContentSection({ icon, title, bgColor, borderColor, children }: ContentSectionProps) {
  return (
    <section className={`${bgColor} border-2 ${borderColor} rounded-xl p-6`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      {children}
    </section>
  );
}

interface ExampleCardProps {
  example: any;
}

function ExampleCard({ example }: ExampleCardProps) {
  return (
    <div className="p-5 bg-white rounded-lg border-2 border-yellow-200">
      {example.rule && (
        <h4 className="font-bold text-yellow-900 mb-2">{example.rule}</h4>
      )}
      {example.type && (
        <h4 className="font-bold text-yellow-900 mb-2">{example.type}</h4>
      )}
      {example.name && (
        <h4 className="font-bold text-yellow-900 mb-2">{example.name}</h4>
      )}
      
      {example.example && (
        <p className="text-gray-700 mb-2">{example.example}</p>
      )}
      {example.description && (
        <p className="text-gray-700 mb-2">{example.description}</p>
      )}
      {example.example_is_set && (
        <p className="text-gray-700 mb-2">
          <span className="font-semibold text-green-700">✓ Is a set:</span> {example.example_is_set}
        </p>
      )}
      {example.example_is_not_set && (
        <p className="text-gray-700">
          <span className="font-semibold text-red-700">✗ Not a set:</span> {example.example_is_not_set}
        </p>
      )}
    </div>
  );
}