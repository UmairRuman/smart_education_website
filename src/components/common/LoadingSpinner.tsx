// ============================================================
// FILE: src/components/common/LoadingSpinner.tsx - COMPLETE
// ============================================================
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-4 text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
}

// Alternative: Pulse Loading Spinner
export function PulseLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

// Alternative: Skeleton Loader for Content
export function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
      {/* Title skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
      
      {/* Subtitle skeleton */}
      <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      {/* Card skeleton */}
      <div className="bg-gray-100 rounded-xl p-6 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}