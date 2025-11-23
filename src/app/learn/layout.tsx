// ============================================================
// FILE: src/app/learn/layout.tsx - NEW LEARNING LAYOUT
// ============================================================
import { Suspense } from 'react';
import TopicSidebar from '@/components/layout/TopicSidebar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Suspense fallback={<SidebarSkeleton />}>
        <TopicSidebar />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1 ml-[var(--sidebar-width)]">
        <div className="max-w-5xl mx-auto p-8">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="w-[var(--sidebar-width)] h-screen fixed top-0 left-0 bg-white border-r border-gray-200 p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-6"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </aside>
  );
}