// src/contexts/AppProviders.tsx
"use client";

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';


export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    // dynamically import i18n on the client to avoid server build issues
    import('../utils/i18n').then((mod) => {
      const inst = mod.default ?? mod.initI18n?.();
      if (mounted) setI18nInstance(inst);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {i18nInstance ? (
        <I18nextProvider i18n={i18nInstance}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </I18nextProvider>
      ) : (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      )}
    </>
  );
}