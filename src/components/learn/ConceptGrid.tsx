// ============================================================
// FILE: src/components/learn/ConceptGrid.tsx - FIXED
// ============================================================
"use client";

import { Concept } from "@/features/learning-path/types/concept";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface ConceptGridProps {
  concepts: Concept[];
}

type GradeLevel = 6 | 7 | 8;

interface GradeColors {
  bg: string;
  light: string;
  text: string;
  border: string;
}

export default function ConceptGrid({ concepts }: ConceptGridProps) {
  const { language } = useLanguage();

  const conceptsByGrade = concepts.reduce((acc, concept) => {
    const grade = concept.gradeLevel;
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(concept);
    return acc;
  }, {} as Record<number, Concept[]>);

  const gradeColors: Record<GradeLevel, GradeColors> = {
    6: { 
      bg: 'bg-blue-500', 
      light: 'bg-blue-50', 
      text: 'text-blue-700', 
      border: 'border-blue-200' 
    },
    7: { 
      bg: 'bg-purple-500', 
      light: 'bg-purple-50', 
      text: 'text-purple-700', 
      border: 'border-purple-200' 
    },
    8: { 
      bg: 'bg-pink-500', 
      light: 'bg-pink-50', 
      text: 'text-pink-700', 
      border: 'border-pink-200' 
    },
  };

  // Default colors for any other grade levels
  const defaultColors: GradeColors = {
    bg: 'bg-gray-500',
    light: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200'
  };

  return (
    <div className="space-y-12">
      {Object.entries(conceptsByGrade).map(([grade, gradeConcepts]) => {
        const gradeNum = parseInt(grade);
        const colors = gradeColors[gradeNum as GradeLevel] || defaultColors;

        return (
          <section key={grade}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className={`${colors.bg} text-white px-4 py-2 rounded-lg mr-3`}>
                Grade {grade}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {gradeConcepts.length} {gradeConcepts.length === 1 ? 'concept' : 'concepts'}
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradeConcepts.map((concept) => {
                const title = concept.localizedContent?.[language]?.title || 
                             concept.localizedContent?.en?.title ||
                             'Untitled Concept';
                const intro = concept.localizedContent?.[language]?.content?.introduction || 
                             concept.localizedContent?.en?.content?.introduction ||
                             'No description available';

                return (
                  <Link
                    key={concept.conceptId}
                    href={`/learn/${concept.conceptId}`}
                    className="group"
                  >
                    <div className={`
                      bg-white rounded-xl shadow-sm hover:shadow-md 
                      transition-all duration-200 p-6 border-2 
                      ${colors.border} hover:border-gray-300 h-full
                      flex flex-col
                    `}>
                      <div className="flex items-start justify-between mb-4">
                        <span className={`${colors.light} ${colors.text} px-3 py-1 rounded-full text-sm font-bold`}>
                          Concept {concept.sequenceOrder}
                        </span>
                        <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                        {intro}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">
                          {concept.topic.charAt(0).toUpperCase() + concept.topic.slice(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}