import { useState, useEffect } from 'react';

export default function useConcept(conceptId: string) {
  const [content, setContent] = useState<string | null>(null);
  useEffect(() => {
    // placeholder: in real app fetch content
    setContent(`<h1>Concept ${conceptId}</h1><p>Content for concept.</p>`);
  }, [conceptId]);
  return { content };
}
