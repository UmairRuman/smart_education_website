// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/contexts/AppProviders";
import ClientSidebar from "@/components/layout/ClientSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taleem AI - Learning Platform",
  description: "An adaptive learning platform for modern education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AppProviders wraps the entire application to provide context */}
        <AppProviders>
          <div className="flex">
            {/* Server-rendered static sidebar (visible even before client hydrates) */}
            <aside className="w-80 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-blue-700 mb-2">Topics</h2>
              <p className="text-sm text-gray-500 mb-6">Grades 6-8</p>
              <nav className="flex-grow overflow-y-auto">
                <ul>
                  <li className="my-1"><a className="block p-2 rounded-md text-sm hover:bg-gray-100" href="/sets/sample-1">Sample Concept 1</a></li>
                  <li className="my-1"><a className="block p-2 rounded-md text-sm hover:bg-gray-100" href="/sets/sample-2">Sample Concept 2</a></li>
                  <li className="my-1"><a className="block p-2 rounded-md text-sm hover:bg-gray-100" href="/sets/sample-3">Sample Concept 3</a></li>
                </ul>
              </nav>
              <div className="mt-auto">
                <a href="#" className="w-full inline-block text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-semibold">Switch language</a>
              </div>
            </aside>

            {/* Client sidebar - will hydrate and replace/add interactive behaviour */}
            <ClientSidebar />

            <main className="ml-80 w-full p-8">
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}