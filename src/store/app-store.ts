// src/store/app-store.ts
import * as zustand from 'zustand';

// zustand's package may export `create` as a named export or as default
const create: typeof zustand.create = (zustand as any).default ?? (zustand as any).create;

type Language = 'en' | 'ur';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));