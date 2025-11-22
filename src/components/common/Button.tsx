import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...rest }: Props) {
  return (
    <button {...rest} className="px-4 py-2 rounded bg-blue-600 text-white">
      {children}
    </button>
  );
}
