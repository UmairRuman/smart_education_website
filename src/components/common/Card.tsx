import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-4 rounded shadow bg-white">{children}</div>;
}
