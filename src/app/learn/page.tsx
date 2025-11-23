// ============================================================
// FILE: src/app/learn/page.tsx - WITH DEBUG
// ============================================================
import { collection, getDocs, query } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Concept } from "@/features/learning-path/types/concept";
import ConceptGrid from "@/components/learn/ConceptGrid";
import { BookOpen, AlertCircle } from "lucide-react";

async function getAllConcepts(): Promise<Concept[]> {
  try {
    const db = getDb();
    console.log('🔍 [Server] Fetching concepts from Firestore...');
    
    const conceptsCollection = collection(db, "concepts");
    const q = query(conceptsCollection);
    const querySnapshot = await getDocs(q);
    
    console.log('📊 [Server] Documents found:', querySnapshot.size);
    
    if (querySnapshot.empty) {
      console.warn('⚠️ [Server] No documents found in "concepts" collection');
      return [];
    }
    
    const concepts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('📄 [Server] Document:', doc.id);
      return { 
        ...data, 
        conceptId: doc.id 
      } as Concept;
    });
    
    const sorted = concepts.sort((a, b) => {
      if (a.gradeLevel !== b.gradeLevel) {
        return a.gradeLevel - b.gradeLevel;
      }
      return a.sequenceOrder - b.sequenceOrder;
    });
    
    console.log('✅ [Server] Concepts sorted:', sorted.length);
    return sorted;
  } catch (error) {
    console.error('❌ [Server] Error fetching concepts:', error);
    return [];
  }
}

export default async function LearnPage() {
  const concepts = await getAllConcepts();

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Set Theory Learning Path</h1>
        </div>
        <p className="text-xl text-gray-600">
          Master Set Theory through a structured progression from Grade 6 to 8
        </p>
      </div>

      {/* Concepts Grid or Empty State */}
      {concepts.length === 0 ? (
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Concepts Found
            </h2>
            <p className="text-gray-700 mb-6">
              We couldn't find any concepts in your Firestore database.
            </p>
            <div className="bg-white rounded-lg p-6 text-left space-y-4 border border-yellow-300">
              <p className="font-semibold text-gray-900">Please check:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Your Firestore collection is named exactly <code className="bg-gray-100 px-2 py-1 rounded">concepts</code></li>
                <li>You have uploaded the concept documents to Firebase</li>
                <li>Firebase rules allow read access</li>
                <li>Your Firebase configuration in <code className="bg-gray-100 px-2 py-1 rounded">firebase.ts</code> is correct</li>
              </ol>
              <p className="text-xs text-gray-500 mt-4">
                Check browser console (F12) for detailed error messages
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ConceptGrid concepts={concepts} />
      )}
    </div>
  );
}