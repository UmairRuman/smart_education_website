import React from 'react';

export default function Loader() {
  return (
    <div role="status" aria-busy>
      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none" />
      </svg>
    </div>
  );
}
