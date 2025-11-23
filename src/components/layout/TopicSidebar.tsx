// ============================================================
// FILE: src/components/layout/TopicSidebar.tsx - GOOGLE STYLE
// ============================================================
"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Concept } from "@/features/learning-path/types/concept";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { BookOpen, ChevronDown, ChevronRight, Globe, Clock } from "lucide-react";
import { useState } from "react";

const fetchConcepts = async (): Promise<Concept[]> => {
  try {
    const db = getDb();
    const conceptsCollection = collection(db, "concepts");
    const q = query(conceptsCollection);
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return [];
    }
    
    const concepts = querySnapshot.docs.map(doc => ({ 
      ...doc.data(), 
      conceptId: doc.id 
    } as Concept));
    
    return concepts.sort((a, b) => {
      if (a.gradeLevel !== b.gradeLevel) {
        return a.gradeLevel - b.gradeLevel;
      }
      return a.sequenceOrder - b.sequenceOrder;
    });
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return [];
  }
};

type GradeLevel = 6 | 7 | 8;

interface GradeColors {
  bg: string;
  text: string;
  border: string;
  hover: string;
}

export default function TopicSidebar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [expandedGrades, setExpandedGrades] = useState<Set<number>>(new Set([6, 7, 8]));

  const { data: concepts, isLoading } = useQuery<Concept[]>({
    queryKey: ["concepts"],
    queryFn: fetchConcepts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const conceptsByGrade = concepts?.reduce((acc, concept) => {
    const grade = concept.gradeLevel;
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(concept);
    return acc;
  }, {} as Record<number, Concept[]>) || {};

  const gradeColors: Record<GradeLevel, GradeColors> = {
    6: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100'
    },
    7: { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      border: 'border-purple-200',
      hover: 'hover:bg-purple-100'
    },
    8: { 
      bg: 'bg-pink-50', 
      text: 'text-pink-700', 
      border: 'border-pink-200',
      hover: 'hover:bg-pink-100'
    },
  };

  const defaultColors: GradeColors = {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100'
  };

  const toggleGrade = (grade: number) => {
    const newExpanded = new Set(expandedGrades);
    if (newExpanded.has(grade)) {
      newExpanded.delete(grade);
    } else {
      newExpanded.add(grade);
    }
    setExpandedGrades(newExpanded);
  };

  return (
    <aside className="w-[var(--sidebar-width)] h-screen fixed top-0 left-0 bg-white border-r border-gray-200 flex flex-col shadow-sm z-40 overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center space-x-2 mb-4 group">
          <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
          <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Taleem AI
          </span>
        </Link>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Set Theory</h2>
          <p className="text-sm text-gray-500">Grades 6-8</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(conceptsByGrade).map(([grade, gradeConcepts]) => {
                const gradeNum = parseInt(grade);
                const colors = gradeColors[gradeNum as GradeLevel] || defaultColors;
                const isExpanded = expandedGrades.has(gradeNum);
                const totalTime = gradeConcepts.reduce((sum, c) => sum + (c.estimatedTimeMinutes || 0), 0);
                
                return (
                  <div key={grade} className="mb-1">
                    {/* Grade Header - Google Style */}
                    <button
                      onClick={() => toggleGrade(gradeNum)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg 
                        transition-all duration-200
                        ${colors.hover} ${isExpanded ? colors.bg : 'bg-white'}
                        border ${isExpanded ? colors.border : 'border-transparent'}
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className={`w-4 h-4 ${colors.text}`} />
                        ) : (
                          <ChevronRight className={`w-4 h-4 ${colors.text}`} />
                        )}
                        <span className={`font-bold text-sm ${colors.text}`}>
                          Grade {grade}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({gradeConcepts.length})
                        </span>
                      </div>
                      {totalTime > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{totalTime} min</span>
                        </div>
                      )}
                    </button>

                    {/* Concepts List - Collapsible */}
                    {isExpanded && (
                      <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                        {gradeConcepts.map((concept, index) => {
                          const isActive = pathname === `/learn/${concept.conceptId}`;
                          const title = concept.localizedContent?.[language]?.title || 
                                       concept.localizedContent?.en?.title ||
                                       'Untitled Concept';
                          
                          return (
                            <Link
                              key={concept.conceptId}
                              href={`/learn/${concept.conceptId}`}
                              className={`
                                group block p-3 rounded-lg text-sm
                                transition-all duration-150
                                ${isActive
                                  ? `${colors.bg} ${colors.text} font-medium shadow-sm border ${colors.border}`
                                  : "hover:bg-gray-50 text-gray-700 border border-transparent"
                                }
                              `}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className={`
                                      text-xs font-semibold px-2 py-0.5 rounded
                                      ${isActive ? colors.bg : 'bg-gray-100 text-gray-600'}
                                    `}>
                                      {index + 1}
                                    </span>
                                    {concept.estimatedTimeMinutes && (
                                      <span className="text-xs text-gray-500 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {concept.estimatedTimeMinutes}m
                                      </span>
                                    )}
                                  </div>
                                  <div className="leading-tight line-clamp-2">
                                    {title}
                                  </div>
                                </div>
                                <ChevronRight className={`
                                  w-4 h-4 flex-shrink-0 ml-2 transition-all
                                  ${isActive 
                                    ? `${colors.text} opacity-100` 
                                    : 'text-gray-400 opacity-0 group-hover:opacity-100'
                                  }
                                `} />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </nav>
      </div>

      {/* Language Toggle - Fixed Bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 
                     bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold 
                     text-gray-700 transition-colors group"
        >
          <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>
            {language === 'en' ? 'اردو میں دیکھیں' : 'View in English'}
          </span>
        </button>
      </div>
    </aside>
  );
}