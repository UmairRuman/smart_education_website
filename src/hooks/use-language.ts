// src/hooks/use-language.ts
import { useAppStore } from '../store/app-store';

export const useLanguage = () => {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  return { language, setLanguage };
};
