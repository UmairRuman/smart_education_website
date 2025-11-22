import React from 'react';

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#2563EB" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white">T</text>
    </svg>
  );
}
