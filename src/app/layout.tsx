// ============================================================
// FILE: src/app/layout.tsx
// ============================================================
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/contexts/AppProviders";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Taleem AI - Adaptive Math Learning Platform",
  description: "Master Set Theory through AI-powered adaptive learning. Available in English and Urdu for Grades 6-8.",
  keywords: ["math learning", "set theory", "Pakistan education", "AI learning", "adaptive learning"],
  authors: [{ name: "Taleem AI Team" }],
  openGraph: {
    title: "Taleem AI - Adaptive Math Learning",
    description: "Master Set Theory with AI-powered learning",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
