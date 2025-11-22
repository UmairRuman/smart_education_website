// src/app/(main)/sets/[conceptId]/page.tsx
import { doc, getDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { Concept } from "@/features/learning-path/types/concept";
import { ConceptContent } from "@/features/learning-path/components/ConceptContent";
import { notFound } from "next/navigation";

// This function fetches data on the server
async function getConceptById(id: string): Promise<Concept | null> {
  try {
    const db = getDb();
    const docRef = doc(db, "concepts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), conceptId: docSnap.id } as Concept;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in getConceptById:', error);
    return null;
  }
}

// The page component
export default async function ConceptPage({ params }: { params: { conceptId: string } }) {
  if (!params?.conceptId) {
    notFound();
  }

  try {
    const conceptData = await getConceptById(params.conceptId);

    if (!conceptData) {
      notFound();
    }

    return (
      <div className="p-4">
        {/* We pass the server-fetched data as a prop to the client component */}
        <ConceptContent concept={conceptData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching concept:', error);
    return (
      <div className="p-4">
        <h1 className="text-red-600">Error loading concept</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}