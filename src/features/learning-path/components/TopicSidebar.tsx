// src/features/learning-path/components/TopicSidebar.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Concept } from "../types/concept";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";

// Fetcher function for React Query
const fetchConcepts = async (): Promise<Concept[]> => {
  try {
    const db = getDb();
    const conceptsCollection = collection(db, "concepts");
    // Simpler query until index is created
    const q = query(conceptsCollection, orderBy("sequenceOrder"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), conceptId: doc.id } as Concept));
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return [];
  }
};

export function TopicSidebar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');

  const { data: concepts, isLoading, isError } = useQuery<Concept[]>({
    queryKey: ["concepts"],
    queryFn: fetchConcepts,
    retry: 2,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ur' : 'en';
    setLanguage(newLang);
  };

  return (
    <aside className="w-80 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 p-6 flex flex-col">
      <h2 className="text-xl font-bold text-blue-700 mb-2">{t('sidebar_title')}</h2>
      <p className="text-sm text-gray-500 mb-6">Grades 6-8</p>

      <div className="flex-grow overflow-y-auto">
        {isLoading && <p>{t('loading')}</p>}
        {isError && <p>Error loading topics.</p>}
        <nav>
          <ul>
            {concepts?.map((concept) => (
              <li key={concept.conceptId}>
                <Link
                  href={`/sets/${concept.conceptId}`}
                  className={`block p-2 my-1 rounded-md text-sm transition-colors ${
                    pathname === `/sets/${concept.conceptId}`
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {concept.localizedContent[language]?.title || concept.localizedContent.en.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto">
        <button
          onClick={toggleLanguage}
          className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-semibold"
        >
          {language === 'en' ? 'Switch to Urdu (اردو)' : 'انگریزی پر جائیں (English)'}
        </button>
      </div>
    </aside>
  );
}