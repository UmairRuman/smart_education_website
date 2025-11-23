// ============================================================
// FILE: src/app/learn/[conceptId]/page.tsx - COMPLETELY FIXED
// ============================================================
import { doc, getDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Concept } from "@/features/learning-path/types/concept";
import ConceptContent from "@/components/learn/ConceptContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

async function getConceptById(id: string): Promise<Concept | null> {
  try {
    console.log('🔍 Fetching concept:', id);
    const db = getDb();
    const docRef = doc(db, "concepts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Concept found:', id);
      return { ...data, conceptId: docSnap.id } as Concept;
    }
    
    console.warn('⚠️ Concept not found:', id);
    return null;
  } catch (error) {
    console.error('❌ Error fetching concept:', error);
    return null;
  }
}

// Type definition for Next.js 15
type PageProps = {
  params: Promise<{ conceptId: string }>;
};

// Metadata generation with proper null checks
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { conceptId } = await params;
    const concept = await getConceptById(conceptId);
    
    // If concept doesn't exist, return basic metadata
    if (!concept) {
      return {
        title: 'Concept Not Found - Taleem AI',
        description: 'The requested concept could not be found.',
      };
    }

    // Check if localizedContent exists and has en property
    if (!concept.localizedContent || !concept.localizedContent.en) {
      console.warn('⚠️ Missing localizedContent for:', conceptId);
      return {
        title: 'Concept - Taleem AI',
        description: 'Learn Set Theory with Taleem AI',
      };
    }

    // Safe access with fallbacks
    const title = concept.localizedContent.en?.title || 'Concept';
    const description = concept.localizedContent.en?.content?.introduction || 'Learn Set Theory with Taleem AI';

    return {
      title: `${title} - Taleem AI`,
      description: description,
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Taleem AI',
      description: 'Learn Set Theory',
    };
  }
}

// Main page component
export default async function ConceptPage({ params }: PageProps) {
  try {
    const { conceptId } = await params;

    if (!conceptId) {
      console.warn('⚠️ No conceptId provided');
      notFound();
    }

    const conceptData = await getConceptById(conceptId);

    if (!conceptData) {
      console.warn('⚠️ Concept not found, showing 404');
      notFound();
    }

    // Additional safety check
    if (!conceptData.localizedContent) {
      console.error('❌ Concept missing localizedContent:', conceptId);
      notFound();
    }

    console.log('✅ Rendering concept:', conceptId);
    return <ConceptContent concept={conceptData} />;
  } catch (error) {
    console.error('❌ Error in ConceptPage:', error);
    notFound();
  }
}

// ============================================================
// OPTIONAL: Add error boundary
// ============================================================
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-red-800 mb-4">
          Error Loading Concept
        </h1>
        <p className="text-red-700 mb-4">
          {error.message}
        </p>
        <a 
          href="/learn"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Back to All Concepts
        </a>
      </div>
    </div>
  );
}